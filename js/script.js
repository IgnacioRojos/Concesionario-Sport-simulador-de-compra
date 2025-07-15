
/*variables y DOM que necesito*/

const autos= [];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

import { db } from './firebaseConfig.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";




const boton = document.getElementById("botonLogin"),
      carritoo = document.getElementById("carrito"),
      muestro = document.getElementById("muestroPrecio"),
      salud = document.getElementById("saludo"),
      roww = document.createElement("div"),
      usuar = JSON.parse(localStorage.getItem("usuario:")) || [],
      botonBuscar = document.getElementById("botonSearch"),
      botonSegu = document.getElementById("botonSeguro"),
      alerta = document.getElementById("datos"),
      botonBorr = document.getElementById("botonBorrar"),
      botonFiat = document.getElementById("fiat"),
      botonVw = document.getElementById("vw"),
      botonRenault = document.getElementById("renault"),
      botonChevrolet = document.getElementById("chevrolet"),
      listado = document.createElement("div"),
      cerrado = document.createElement("div"),
      kilometrosLista = document.getElementById("listadoKilometros"),
      botonParaSalir = document.getElementById("botonSalida");

/*fin de variables y DOM que necesito*/

/*funcion para deslogearse*/
function loginOut(){
  window.location ="../index.html";
  localStorage.clear();
}

/*boton al cual se le da la funcion de volver a la pagina de login del usuario eliminando los datos guardados en el local*/

botonParaSalir.addEventListener("click", loginOut);


/*funcion para calcular precio del auto dependiendo la marca que se ingrese*/

/*function calcularPrecio(){
  const marcaa = document.getElementById("marca").value;
  if (marcaa == "fiat"){
    const muestro = document.getElementById("muestroPrecio");
    const aviso = document.createElement("div");
    aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                          <h3>El precio del Fiat Cronos es de 3.500.000</h3>
                          <button id= "botonBo" class = "btn btn-danger" >Aceptar </button> 
                       </div>`;
    muestro.appendChild(aviso);

    const botonBor = document.getElementById("botonBo");
    botonBor.addEventListener("click", limpiar);
  } else {
    if(marcaa == "vw"){
      const muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>El precio del vowlsvagen up es de 1.500.000</h3>
                            <button id= "botonBo" class = "btn btn-danger" >Aceptar </button> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);

    } 
  }
  if (marcaa == "chevrolet"){
    const muestro = document.getElementById("muestroPrecio");
    aviso = document.createElement("div");
    aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                          <h3>El precio del chevrolet corsa es de 2.650.000</h3>
                          <button id= "botonBo" class = "btn btn-danger" >Aceptar </button> 
                       </div>`;
    muestro.appendChild(aviso);

    const botonBor = document.getElementById("botonBo");
    botonBor.addEventListener("click", limpiar);    

  } else{
    if (marcaa== "renault"){
      const muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>El precio del renault sandero es de 5.000.000</h3>
                            <button id= "botonBo" class = "btn btn-danger" >Aceptar </button> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);
    }
  }
  if(marcaa == ""){
      const muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>No se ingreso ninguna marca</h3>
                            <button id= "botonBo" class = "btn btn-danger" >Aceptar </button> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);
  }
  
}*/


function calcularPrecio() {
  const marcaa = document.getElementById("marca").value.toLowerCase();
  const precios = {
    fiat: "El precio del Fiat Cronos es de 3.500.000",
    vw: "El precio del Volkswagen Up es de 1.500.000",
    chevrolet: "El precio del Chevrolet Corsa es de 2.650.000",
    renault: "El precio del Renault Sandero es de 5.000.000"
  };

  const mensaje = precios[marcaa] || "No se ingresó ninguna marca válida";

  const aviso = document.createElement("div");
  aviso.innerHTML = `
    <div class="alert alert-primary" role="alert">
      <h3>${mensaje}</h3>
      <button id="botonBo" class="btn btn-danger">Aceptar</button>
    </div>
  `;
  muestro.appendChild(aviso);

  document.getElementById("botonBo").addEventListener("click", limpiar);
}


function limpiar(){
  muestro.innerHTML= "";
}

/*boton al cual se le da la funcion de calcular el precio*/

botonBuscar.addEventListener("click", calcularPrecio);

/*funcion asincronica que calcula el seguro de tu auto (se ingresa el año y el precio del vehiculo y se divide el año por el precio)*/

async function calcularSeguro() {
  const { value: formValues } = await Swal.fire({
    title: 'Ingrese el año y precio del vehiculo',
    html:
      '<input id="swal-input1" class="swal2-input">' +
      '<input id="swal-input2" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      precio = parseInt(document.getElementById('swal-input1').value),
      anio = parseInt(document.getElementById('swal-input2').value)
      return  title = "el precio del seguro es: "+ precio/anio;
  
    }
  })
  
  if (formValues) {
    Swal.fire(JSON.stringify(formValues))
  }
}

/*boton al cual se le da la funcion de calcular el precio del seguro*/

botonSegu.addEventListener("click", calcularSeguro);


/*funcion que calcula los kilometros que puede hacer un auto, se presiona el boton de la marca de tu auto y se desplegará una lista*/

/*function calcularKilometros(auto) {
  const listado = document.createElement("div"),
        cerrado = document.createElement("div");

        
  switch(auto){
    
    case fiat:
      for (let i = 1; i <= 10; i++) {
        kilometros = i * 9.5;
        listado.innerHTML += `<li class= "listKm">La cantidad de kilometros que va a a hacer con ${i} litros es de: ${kilometros} "km" </li>`
        cerrado.innerHTML = `<button class="btn btn-danger"id="botonLista">aceptar</button>`
        kilometrosLista.appendChild(listado), 
        kilometrosLista.appendChild(cerrado); 
      }

    const botonList = document.getElementById("botonLista");
    botonList.addEventListener("click",limpiarLista);
    break;

    case vw:
      for (let i = 1; i <= 10; i++) {
        kilometros = i * 10;
        listado.innerHTML += `<li class= "listKm">La cantidad de kilometros que va a a hacer con ${i} litros es de: ${kilometros} "km" </li>`
        cerrado.innerHTML = `<button class="btn btn-danger" id= "botonList">aceptar</button>`
        kilometrosLista.appendChild(listado);
        kilometrosLista.appendChild(cerrado);

      }

    const botonLis = document.getElementById("botonList")
    botonLis.addEventListener("click",limpiarLista);
    break;

    case renault:
      for (let i = 1; i <= 10; i++) {
        kilometros = i * 8;
        listado.innerHTML += `<li class= "listKm">La cantidad de kilometros que va a a hacer con ${i} litros es de: ${kilometros} "km" </li>`
        cerrado.innerHTML = `<button class="btn btn-danger" id= "botonLis">aceptar</button>`
        kilometrosLista.appendChild(listado);
        kilometrosLista.appendChild(cerrado);

      }

    botonLi = document.getElementById("botonLis"),
    botonLi.addEventListener("click",limpiarLista);
    break;

    case chevrolet:
      for (let i = 1; i <= 10; i++) {
        kilometros = i * 8;
        listado.innerHTML += `<li class= "listKm">La cantidad de kilometros que va a a hacer con ${i} litros es de: ${kilometros} "km" </li>`
        cerrado.innerHTML = `<button class="btn btn-danger" id="botonLi">aceptar</button>`
        kilometrosLista.appendChild(listado);
        kilometrosLista.appendChild(cerrado);

      }

    botonL = document.getElementById("botonLi"),
    botonL.addEventListener("click",limpiarLista);
    break;


  }
}*/

function calcularKilometros(marca) {
  // Limpia antes de mostrar nuevos datos
  kilometrosLista.innerHTML = "";

  const listado = document.createElement("ul");
  listado.classList.add("list-group", "mb-3");

  let kmPorLitro;

  switch (marca) {
    case "fiat":
      kmPorLitro = 9.5;
      break;
    case "vw":
      kmPorLitro = 10;
      break;
    case "renault":
      kmPorLitro = 8;
      break;
    case "chevrolet":
      kmPorLitro = 8;
      break;
    default:
      kmPorLitro = 0;
      break;
  }

  if (kmPorLitro === 0) {
    const li = document.createElement("li");
    li.classList.add("list-group-item", "text-danger");
    li.textContent = "Marca no reconocida.";
    listado.appendChild(li);
  } else {
    for (let i = 1; i <= 10; i++) {
      const kilometros = i * kmPorLitro;
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `Con ${i} litro(s) su ${marca.toUpperCase()} recorrerá aproximadamente ${kilometros} km.`;
      listado.appendChild(li);
    }
  }

  // Botón para cerrar la lista
  const cerrarDiv = document.createElement("div");
  cerrarDiv.classList.add("text-center");
  cerrarDiv.innerHTML = `
    <button class="btn btn-danger mt-2" id="botonCerrarKilometros">Cerrar</button>
  `;

  kilometrosLista.appendChild(listado);
  kilometrosLista.appendChild(cerrarDiv);

  document.getElementById("botonCerrarKilometros").addEventListener("click", () => {
    kilometrosLista.innerHTML = "";
  });
}



function limpiarLista(){
  kilometrosLista.innerHTML= " ";
 

}

/*botones a los cuales se le da la funcion de desplegar la lista con los kilometros que un auto puede hacer*/

botonFiat.addEventListener("click", () => calcularKilometros("fiat"));
botonVw.addEventListener("click", () => calcularKilometros("vw"));
botonRenault.addEventListener("click", () => calcularKilometros("renault"));
botonChevrolet.addEventListener("click", () => calcularKilometros("chevrolet"));



/*botonFiat.addEventListener("click",()=> calcularKilometros(fiat));
botonVw.addEventListener("click",()=> calcularKilometros(vw));
botonRenault.addEventListener("click",()=> calcularKilometros(renault));
botonChevrolet.addEventListener("click",()=> calcularKilometros(chevrolet));*/

/*titulo de bienvenida al usuario con un temporizador para que se vaya y no estorbe al usuario*/ 

roww.innerHTML = `<h2 class = "bienvenida">Bienvenido "${usuar.nom}"</h2>`;
salud.appendChild(roww);

function limpiarSaludo(){
  roww.innerHTML="";
}


setTimeout(()=>{
  limpiarSaludo();
}, 4000);

/*variable y funcion que utilizo para mostrar datos del usuario si se los olvido, tiene un boton adentro que hace que se elimine el cartel con los datos*/

let fila = document.createElement("div");

function datosUsuario() {
  const fila = document.createElement("div");
  const alerta = document.getElementById("datos");

  fila.innerHTML = `<div class= "alert alert-danger" role= "alert"> Sus datos son: Usuario: "${usuar.nom}", Contraseña: "${usuar.pass}"
                            <button id= "botonBorrar" class = "btn btn-danger">Aceptar</button>
                        </div>`;
  alerta.appendChild(fila);
  const botonBorr = document.getElementById("botonBorrar");

  botonBorr.addEventListener("click", limpiarAlertas);
}

/*boton al cual se le da la funcion de mostrar los datos */

botonMuestra.addEventListener("click", datosUsuario);

function limpiarAlertas() {
  alerta.innerHTML = "";
}

/*PARTE DEL ECOMERCE se crea una clase de auto y se utiliza fetch, data.json,etc..*/ 
class Auto{

	constructor(img,titulo,id){
		this.img = img;
    this.titulo = titulo;
    this.id = id;
	}
  mostrarAutos() {
    const tarjeta = `
    <div class="card">
        <img src="${this.img}" class="card-img-top" alt="${this.titulo}">
        <div class="card-body">
            <h5 class="card-title">${this.titulo}</h5>
            <button class="btn btn-primary w-100 mt-2" id="${this.id}">Comprar</button>
        </div>
    </div>`;
    const contenedor = document.getElementById("contenedorCards");
    contenedor.innerHTML += tarjeta;
  }

  agregarEvent(){
    const botonAgregar = document.getElementById(this.id);
    const encontrarAuto = autos.find(p => p.id == this.id);
    botonAgregar.addEventListener("click", () => agregarAlCarro(encontrarAuto));
  }



}
/*fetch con diferentes funcionalidades*/ 

/*fetch("../data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach(aut => {
      const newAuto = new Auto(aut.img, aut.titulo, aut.id);
      autos.push(newAuto);
      newAuto.mostrarAutos();
    });
    autos.forEach(e => e.agregarEvent());
  })
  .catch(err => console.error(err));*/

async function obtenerAutos() {
  const autosCollection = collection(db, "autos");
  const autosSnapshot = await getDocs(autosCollection);
  const autosData = autosSnapshot.docs.map(doc => doc.data());

  autosData.forEach(aut => {
    let newAuto = new Auto(aut.img, aut.titulo, aut.id);
    autos.push(newAuto);
  });
  autos.forEach(e => e.mostrarAutos());
  autos.forEach(e => e.agregarEvent());
}

obtenerAutos();

  /*funcion que agrega autos al carro,la parte del carro se encuentra abajo de los autos que se muestran*/

function agregarAlCarro(auto){
  const enCarrito = carrito.find(aut => aut.id === auto.id)
  if(!enCarrito){
    carrito.push({...auto})
    localStorage.setItem("carrito",JSON.stringify(carrito))
  } else {
    let carritoFilt = carrito.filter(aut => aut.id != auto.id)
    carrito = [...carritoFilt]
  }

  carritoHTML();
}

/*funcion para mostrar los autos en el carro*/

function carritoHTML() {
  limpiarHTML();
  carrito.forEach((auto) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${auto.img}" alt="${auto.titulo}">
      <div class="card-body text-center">
        <h5 class="card-title">${auto.titulo}</h5>
        <button class="btn btn-danger" id="${auto.id}">Eliminar Auto</button>
      </div>
    `;

    carritoo.appendChild(card);
  });
}

function limpiarHTML() {
  carritoo.innerHTML = "";
}

/*funcion que elimina los autos del carrito*/

function eliminarProducto(e) {
  if (e.target.classList.contains("btn-danger")) {
    let autoID = e.target.getAttribute("id");
    carrito = carrito.filter(
      (auto) => auto.id != autoID
    );

    carritoHTML();
  }
}

carritoo.addEventListener("click", eliminarProducto);