// -------------------- IMPORTS FIREBASE ----------------------
import { db } from './firebaseConfig.js';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// -------------------- VARIABLES GLOBALES ----------------------
const autos = [];
let carrito = []; // carrito en memoria

const usuar = JSON.parse(localStorage.getItem("usuario")) || { nom: "invitado" };
const carritoRef = doc(db, "carritos", `carritoUsuario_${usuar.nom}`);

// -------------------- INICIALIZAR FIRESTORE Y CARGAR CARRITO ----------------------
async function cargarCarrito() {
    try {
        const carritoSnap = await getDoc(carritoRef);
        if (carritoSnap.exists()) {
            carrito = carritoSnap.data().autos || [];
        } else {
            await setDoc(carritoRef, { autos: [] });
        }
        carritoHTML();
    } catch (error) {
        console.error("Error cargando carrito:", error);
    }
}

cargarCarrito()

// -------------------- VARIABLES DOM ----------------------
const carritoo = document.getElementById("carrito");
const botonBuscar = document.getElementById("botonSearch");
const botonSegu = document.getElementById("botonSeguro");
const muestro = document.getElementById("muestroPrecio");
const botonFiat = document.getElementById("fiat");
const botonVw = document.getElementById("vw");
const botonRenault = document.getElementById("renault");
const botonChevrolet = document.getElementById("chevrolet");
const kilometrosLista = document.getElementById("listadoKilometros");
const salud = document.getElementById("saludo");

// -------------------- FUNCIONES ----------------------

function limpiarSaludo() {
    salud.innerHTML = "";
}

// Saludo temporal
salud.innerHTML = `<h2 class="bienvenida">Bienvenido \"${usuar.nom}\"</h2>`;
setTimeout(() => limpiarSaludo(), 4000);

function limpiar() {
    muestro.innerHTML = "";
}

function calcularPrecio() {
    const marcaa = document.getElementById("marca").value.toLowerCase();
    const precios = {
        fiat: "El precio del Fiat Cronos es de 3.500.000",
        vw: "El precio del Volkswagen Up es de 1.500.000",
        chevrolet: "El precio del Chevrolet Corsa es de 2.650.000",
        renault: "El precio del Renault Sandero es de 5.000.000"
    };
    const mensaje = precios[marcaa] || "No se ingresó ninguna marca válida";
    muestro.innerHTML = `
        <div class="alert alert-primary" role="alert">
            <h3>${mensaje}</h3>
            <button id="botonBo" class="btn btn-danger">Aceptar</button>
        </div>`;
    document.getElementById("botonBo").addEventListener("click", limpiar);
}

botonBuscar.addEventListener("click", calcularPrecio);

async function calcularSeguro() {
    const { value: formValues } = await Swal.fire({
        title: 'Ingrese el año y precio del vehículo',
        html: '<input id="swal-input1" class="swal2-input">' +
              '<input id="swal-input2" class="swal2-input">',
        focusConfirm: false,
        preConfirm: () => {
            const precio = parseInt(document.getElementById('swal-input1').value);
            const anio = parseInt(document.getElementById('swal-input2').value);
            return "El precio del seguro es: " + Math.floor(precio / anio);
        }
    });
    if (formValues) {
        Swal.fire(formValues);
    }
}

botonSegu.addEventListener("click", calcularSeguro);

function calcularKilometros(marca) {
    kilometrosLista.innerHTML = "";
    const listado = document.createElement("ul");
    listado.classList.add("list-group", "mb-3");
    let kmPorLitro = {
        fiat: 9.5,
        vw: 10,
        renault: 8,
        chevrolet: 8
    }[marca] || 0;

    if (kmPorLitro === 0) {
        listado.innerHTML = `<li class="list-group-item text-danger">Marca no reconocida.</li>`;
    } else {
        for (let i = 1; i <= 10; i++) {
            const li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = `Con ${i} litro(s), su ${marca.toUpperCase()} recorrerá aproximadamente ${i * kmPorLitro} km.`;
            listado.appendChild(li);
        }
    }

    kilometrosLista.appendChild(listado);
    kilometrosLista.innerHTML += `<div class="text-center"><button id="botonCerrarKilometros" class="btn btn-danger mt-2">Cerrar</button></div>`;
    document.getElementById("botonCerrarKilometros").addEventListener("click", () => kilometrosLista.innerHTML = "");
}

botonFiat.addEventListener("click", () => calcularKilometros("fiat"));
botonVw.addEventListener("click", () => calcularKilometros("vw"));
botonRenault.addEventListener("click", () => calcularKilometros("renault"));
botonChevrolet.addEventListener("click", () => calcularKilometros("chevrolet"));

// -------------------- CLASE AUTO Y FIRESTORE FETCH ----------------------
class Auto {
    constructor(img, marca, id) {
        this.img = img;
        this.marca = marca;
        this.id = id;
    }

    mostrarAutos() {
      const contenedor = document.getElementById("contenedorCards");
      contenedor.innerHTML = autos.map(auto => `
        <div class="card">
            <img src="${auto.img}" class="card-img-top" alt="${auto.marca}">
          <div class="card-body">
            <h5 class="card-title">${auto.marca}</h5>
            <button class="btn btn-primary w-100 mt-2" id="${auto.id}">Comprar</button>
          </div>
        </div>
        `).join('');
  
  autos.forEach(auto => {
    const botonAgregar = document.getElementById(auto.id);
    if (botonAgregar) {
      botonAgregar.addEventListener("click", () => {
        agregarAlCarro({
          img: auto.img,
          marca: auto.marca,
          id: auto.id,
        });
      });
    }
  });
    }
      


}

async function obtenerAutos() {
  try {
    const autosCollection = collection(db, "Autos");
    const autosSnapshot = await getDocs(autosCollection);

    autosSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const newAuto = new Auto(data.img, data.marca, doc.id);
      autos.push(newAuto);
    });

    if (autos.length > 0) {
      autos[0].mostrarAutos(); // Solo llamamos una vez
    }

  } catch (error) {
    console.error("Error obteniendo autos:", error);
  }

}

obtenerAutos();

// -------------------- FUNCIONES DE CARRITO SINCRONIZADO ----------------------

async function agregarAlCarro(auto) {
    const enCarrito = carrito.find(aut => aut.id === auto.id);
    if (!auto || !auto.id || !auto.img || !auto.marca) {
        console.error("Auto inválido al intentar agregar al carrito:", auto);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo agregar este auto al carrito por datos incompletos.'
        });
        return;
    }
    if (!enCarrito) {
        carrito.push({
            img: auto.img,
            marca: auto.marca,
            id: auto.id
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Auto ya en el carrito',
            text: 'Este auto ya fue agregado previamente.',
            timer: 1500,
            showConfirmButton: false
        });
        return;
    }
    console.log("Auto recibido:", auto);
    await actualizarCarritoFirestore();
    carritoHTML();

    Swal.fire({
        icon: 'success',
        title: 'Carrito actualizado',
        timer: 800,
        showConfirmButton: false
    });
}

async function actualizarCarritoFirestore() {
    try {
        await updateDoc(carritoRef, { autos: carrito });
    } catch (error) {
        console.error("Error actualizando carrito en Firestore:", error);
    }
}

function carritoHTML() {
    carritoo.innerHTML = "";
    carrito.forEach(auto => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-2");
        card.innerHTML = `
            <img src="${auto.img}" alt="${auto.marca}" class="card-img-top">
            <div class="card-body text-center">
                <h5 class="card-title">${auto.marca}</h5>
                <button class="btn btn-danger" id="${auto.id}">Eliminar Auto</button>
            </div>`;
        carritoo.appendChild(card);
    });
}

carritoo.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-danger")) {
        const autoID = e.target.getAttribute("id");
        carrito = carrito.filter(auto => auto.id !== autoID);
        await actualizarCarritoFirestore();
        carritoHTML();

        Swal.fire({
            icon: 'info',
            title: 'Auto eliminado del carrito',
            timer: 800,
            showConfirmButton: false
        });
    }
});
