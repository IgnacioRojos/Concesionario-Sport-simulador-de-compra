// @vitest-environment node
//
// js/__tests__/main.test.js
//
// main.js es un script "clásico" pensado para insertarse directo con
// <script> en el navegador (no es un módulo): usa variables globales sin
// declarar que en realidad son elementos del DOM (resueltos por el
// "named access" que el navegador expone automáticamente para ids), y
// alguna asignación implícita típica de JS en modo no estricto. Para
// poder testearlo tal cual está en el repo, lo corremos dentro de un
// jsdom propio con dom.window.eval(), que reproduce ese mismo modo
// "sloppy"/no-módulo que un <script src="js/main.js"> real tiene en el
// navegador (a diferencia de importarlo como módulo ES, que lo obliga a
// modo estricto y rompe con ReferenceError).
import { describe, test, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const mainJsSource = fs.readFileSync(
  path.resolve(__dirname, '../main.js'),
  'utf-8'
);

const buildDom = () => {
  const dom = new JSDOM(
    `<!doctype html><html><body>
      <input id="usuario" type="text" />
      <input id="contraseña" type="password" />
      <button id="botonLogin">Iniciar</button>
    </body></html>`,
    { runScripts: 'dangerously', url: 'http://localhost/' }
  );
  dom.window.eval(mainJsSource);
  return dom;
};

describe('main.js - login', () => {
  let dom;

  beforeEach(() => {
    dom = buildDom();
  });

  test('con usuario y contraseña correctos, guarda el usuario en localStorage', () => {
    const { document, localStorage } = dom.window;

    document.getElementById('usuario').value = 'ignacio';
    document.getElementById('contraseña').value = '1234';
    document.getElementById('botonLogin').click();

    const guardado = JSON.parse(localStorage.getItem('usuario:'));
    expect(guardado).toEqual({ nom: 'ignacio', pass: '1234' });
  });

  test('con credenciales incorrectas, muestra un mensaje de error y no guarda nada', () => {
    const { document, localStorage } = dom.window;

    document.getElementById('usuario').value = 'otro';
    document.getElementById('contraseña').value = 'incorrecta';
    document.getElementById('botonLogin').click();

    expect(localStorage.getItem('usuario:')).toBeNull();
    expect(document.body.innerHTML.toLowerCase()).toContain('datos erroneos al iniciar sesion');
  });

  test('con contraseña correcta pero usuario incorrecto, no guarda nada', () => {
    const { document, localStorage } = dom.window;

    document.getElementById('usuario').value = 'noesignacio';
    document.getElementById('contraseña').value = '1234';
    document.getElementById('botonLogin').click();

    expect(localStorage.getItem('usuario:')).toBeNull();
  });
});
