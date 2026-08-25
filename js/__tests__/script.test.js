// @vitest-environment node
//
// js/__tests__/script.test.js
//
// Igual que main.js, script.js es un script clásico pensado para
// <script defer src="js/script.js"> en views/ComprarAuto.html: usa
// variables globales sin declarar (ej. "botonMuestra") y depende de
// fetch("../data.json") para traer el listado de autos. Lo corremos
// dentro de un jsdom propio (con el fixture de esa página) usando
// dom.window.eval(), y mockeamos fetch para no depender del archivo
// real ni de la red.
import { describe, test, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';

const scriptJsSource = fs.readFileSync(
  path.resolve(__dirname, '../script.js'),
  'utf-8'
);

const autosFalsos = [
  { id: '1', img: 'fiat.jpg', titulo: 'Fiat Cronos' },
  { id: '2', img: 'vw.jpg', titulo: 'VW Up' },
];

const buildDom = (autos = autosFalsos) => {
  const dom = new JSDOM(
    `<!doctype html><html><body>
      <div id="salida">
        <button id="botonSalida"></button>
        <button id="botonMuestra">Olvido sus datos</button>
      </div>
      <div id="saludo"></div>
      <div id="datos"></div>
      <input id="marca" />
      <button id="botonSearch">Buscar</button>
      <div id="muestroPrecio"></div>
      <button id="botonSeguro"></button>
      <button id="fiat"></button>
      <button id="vw"></button>
      <button id="renault"></button>
      <button id="chevrolet"></button>
      <div id="listadoKilometros"></div>
      <div id="contenedorCards"></div>
      <div id="carrito"></div>
    </body></html>`,
    { runScripts: 'dangerously', url: 'http://localhost/' }
  );

  dom.window.fetch = () =>
    Promise.resolve({ json: () => Promise.resolve(autos) });

  dom.window.eval(scriptJsSource);
  return dom;
};

// Deja pasar los microtasks encadenados al fetch("../data.json") mockeado
const flushPromesas = () => new Promise((resolve) => setTimeout(resolve, 0));

describe('script.js - catálogo y carrito', () => {
  let dom;

  beforeEach(async () => {
    // Cada test arranca con un JSDOM nuevo, así que el localStorage
    // (que jsdom aísla por instancia de window) ya arranca vacío.
    dom = buildDom();
    await flushPromesas();
  });

  test('renderiza una tarjeta "Comprar" por cada auto que devuelve el fetch', () => {
    const { document } = dom.window;
    const contenedor = document.getElementById('contenedorCards');

    expect(contenedor.innerHTML).toContain('Fiat Cronos');
    expect(contenedor.innerHTML).toContain('VW Up');
    expect(document.getElementById('1')).not.toBeNull();
    expect(document.getElementById('2')).not.toBeNull();
  });

  test('agregar un auto al carrito lo guarda en localStorage y lo muestra en el carrito', async () => {
    const { document, localStorage } = dom.window;

    document.getElementById('1').click();
    await flushPromesas();

    const carrito = JSON.parse(localStorage.getItem('carrito'));
    expect(carrito).toHaveLength(1);
    expect(carrito[0]).toMatchObject({ id: '1', titulo: 'Fiat Cronos' });

    expect(document.getElementById('carrito').innerHTML).toContain('Fiat Cronos');
    expect(document.getElementById('carrito').innerHTML).toContain('Eliminar Auto');
  });

  test('volver a clickear "Comprar" sobre un auto ya agregado lo saca del carrito visualmente', async () => {
    const { document } = dom.window;

    document.getElementById('1').click(); // lo agrega
    await flushPromesas();
    document.getElementById('1').click(); // lo saca (toggle)
    await flushPromesas();

    // El carrito en memoria (y por lo tanto lo que se ve en pantalla) sí
    // se actualiza correctamente al sacar el producto...
    expect(document.getElementById('carrito').innerHTML).not.toContain('Fiat Cronos');
  });

  // Bug detectado al escribir este test: en la rama de "sacar del carrito"
  // de agregarAlCarro(), el código reasigna la variable local `carrito`
  // pero nunca vuelve a llamar a localStorage.setItem("carrito", ...).
  // Resultado: la UI queda bien (se recalcula desde la variable en
  // memoria), pero localStorage se queda con el producto que en teoría
  // se sacó — si el usuario recarga la página, el auto "vuelve" al carrito.
  test('bug conocido: al sacar un producto por toggle, localStorage no se actualiza', async () => {
    const { document, localStorage } = dom.window;

    document.getElementById('1').click();
    await flushPromesas();
    document.getElementById('1').click();
    await flushPromesas();

    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1); // debería ser 0 si el fix se aplicara
    expect(carritoGuardado[0].id).toBe('1');
  });

  test('el botón "Eliminar Auto" del carrito saca el producto correspondiente de la vista', async () => {
    const { document, localStorage } = dom.window;

    document.getElementById('1').click();
    document.getElementById('2').click();
    await flushPromesas();

    expect(JSON.parse(localStorage.getItem('carrito'))).toHaveLength(2);

    // Dentro del carrito, el botón "Eliminar Auto" tiene el mismo id que el auto (btn-danger)
    const botonEliminarFiat = document
      .getElementById('carrito')
      .querySelector('.btn-danger[id="1"]');
    botonEliminarFiat.click();

    const carritoHtml = document.getElementById('carrito').innerHTML;
    expect(carritoHtml).not.toContain('Fiat Cronos');
    expect(carritoHtml).toContain('VW Up');

    // Mismo bug que en el toggle de "Comprar": eliminarProducto() tampoco
    // vuelve a llamar a localStorage.setItem, así que localStorage se
    // queda desactualizado aunque la vista ya esté correcta.
    expect(JSON.parse(localStorage.getItem('carrito'))).toHaveLength(2);
  });
});
