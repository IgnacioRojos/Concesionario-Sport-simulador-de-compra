/*const autos = [
  {
    img: "../assets/img/fiat punto.jpg",
    titulo: "Fiat Uno",
    id: "1",
  },
  {
    img: "../assets/img/vento.jpg",
    titulo: "Wolsvagen Vento",
    id: "2",
  },
  {
    img: "../assets/img/bora.jpg",
    titulo: "Wolsvagen Bora",
    id: "3",
  },
  {
    img: "../assets/img/chevrolet corsa.jpg",
    titulo: "Chevrolet Corsa",
    id: "4",
  },
  {
    img: "../assets/img/ford fiesta.jpg",
    titulo: "Ford Fiesta",
    id: "5",
  },
  {
    img: "../assets/img/wolsvagen up.jpg",
    titulo: "wolsvagen up",
    id: "6",
  },
  {
    img: "../assets/img/ford ka.jpg",
    titulo: "Ford Ka",
    id: "7",
  },
  {
    img: "../assets/img/fiat siena.jpg",
    titulo: "Fiat Siena",
    id: "8",
  },
  {
    img: "../assets/img/yaris.jpg",
    titulo: "Toyota Yaris",
    id: "9",
  },
];*/
const boton = document.getElementById("botonLogin"),
      carritoo = document.getElementById("carrito");
      muestro = document.getElementById("muestroPrecio");
 



function calcularPrecio(){
  /*let precio = 0;*/
  const marcaa = document.getElementById("marca").value;
  if (marcaa == "fiat"){
    const muestro = document.getElementById("muestroPrecio");
    const aviso = document.createElement("div");
    aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                          <h3>El precio del Fiat Cronos es de 3.500.000</h3>
                          <buttom id= "botonBo" class = "btn btn-danger" >Aceptar </buttom> 
                       </div>`;
    muestro.appendChild(aviso);

    const botonBor = document.getElementById("botonBo");
    botonBor.addEventListener("click", limpiar);
  } else {
    if(marcaa == "vw"){
      muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>El precio del vowlsvagen up es de 1.500.000</h3>
                            <buttom id= "botonBo" class = "btn btn-danger" >Aceptar </buttom> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);

    } 
  }
  if (marcaa == "chevrolet"){
    muestro = document.getElementById("muestroPrecio");
    aviso = document.createElement("div");
    aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                          <h3>El precio del chevrolet corsa es de 2.650.000</h3>
                          <buttom id= "botonBo" class = "btn btn-danger" >Aceptar </buttom> 
                       </div>`;
    muestro.appendChild(aviso);

    const botonBor = document.getElementById("botonBo");
    botonBor.addEventListener("click", limpiar);    

  } else{
    if (marcaa== "renault"){
      muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>El precio del renault sandero es de 5.000.000</h3>
                            <buttom id= "botonBo" class = "btn btn-danger" >Aceptar </buttom> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);
    }
  }
  if(marcaa == ""){
    muestro = document.getElementById("muestroPrecio");
      aviso = document.createElement("div");
      aviso.innerHTML = `<div class="alert alert-primary" role="alert" > 
                            <h3>No se ingreso ninguna marca</h3>
                            <buttom id= "botonBo" class = "btn btn-danger" >Aceptar </buttom> 
                         </div>`;
      muestro.appendChild(aviso);
  
      const botonBor = document.getElementById("botonBo");
      botonBor.addEventListener("click", limpiar);
  }
}

function limpiar(){
  muestro.innerHTML= "";
}

const botonBuscar = document.getElementById("botonSearch");

botonBuscar.addEventListener("click", calcularPrecio);



  /*if (op == 3) {
    let auto = prompt("ingrese la marca de su auto (si no ingresa nada volvera al menu): ");
    calcularKilometros(auto);
  }
  if (op == 4) {
    let opci = prompt( "Desea calculcar su presupuesto con seguro ingrese SI, en el caso contrario ingrese NO: ");
    calcularPresupuesto(500, opci);
  }

  op = prompt("ingrese la opcion que desee (1- calcular precio 2- calcular seguro 3- calcular la cantidad de KM que hace tu auto 4- calcular el presupuesto de tu auto con o sin seguro 0- para salir): ");
}*/

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

const botonSegu = document.getElementById("botonSeguro");

botonSegu.addEventListener("click", calcularSeguro);

/*function calcularKilometros(auto) {
  if (auto == "fiat") {
    for (let i = 1; i <= 45; i++) {
      kilometros = i * 9.5;
      let blanco = " ";
      console.log("la cantidad de kilometros que va a hacer con: " + blanco + i +" litros es de: " + blanco + kilometros + "km");
    }
  } else {
    if (auto == "vw") {
      for (let i = 1; i <= 50; i++) {
        kilometros = i * 10;
        let blanco = " ";
        console.log("la cantidad de kilometros que va a hacer con: " + blanco + i + " litros es de: " + blanco + kilometros + "km");
      }
    }
  }
  if (auto == "chevrolet") {
    for (let i = 1; i <= 55; i++) {
      kilometros = i * 7;
      let blanco = " ";
      console.log("la cantidad de kilometros que va a hacer con: " + blanco + i + " litros es de: " + blanco + kilometros + "km");
    }
  }

  if (auto == "renault") {
    for (let i = 1; i <= 40; i++) {
      kilometros = i * 8;
      let blanco = " ";
      console.log("la cantidad de kilometros que va a hacer con: " + blanco + i +" litros es de: " + blanco + kilometros +"km");
    }
  }
}*/

/* HACER ALGO CON ESTA FUNCION */


/*SEGUNDA ENTREGA */ 








const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    leerDatosProductos(e.target.parentElement);
  });
});

let articulosCarro = [];

function leerDatosProductos(producto) {
  const infoProducto = {
    imagen: producto.querySelector(".card-img-top").getAttribute("src"),
    titulo: producto.querySelector(".card-title").textContent,
    id: producto.querySelector(".btn").getAttribute("data-id"),
  };

  articulosCarro = [...articulosCarro, infoProducto];

  carritoHTML();
}

function carritoHTML() {
  limpiarHTML();
  articulosCarro.forEach((producto) => {
    const row = document.createElement("div");
    row.innerHTML = `
        <div class=" row row-cols-1 row-cols-md-3 g-4">    
            <div class="card h-100">
                <div class="card-body">
                    <img src= "${producto.imagen}" class = "card-img-top">
                    <h5>${producto.titulo}</h5>
                    <button class="btn btn-danger" id="${producto.id}">Eliminar Auto</button>
                </div>
            </div>
        </div>
                `;

    carritoo.appendChild(row);
  });
}

function limpiarHTML() {
  carritoo.innerHTML = "";
}

function eliminarProducto(e) {
  if (e.target.classList.contains("btn-danger")) {
    let productoID = e.target.getAttribute("id");
    articulosCarro = articulosCarro.filter(
      (producto) => producto.id !== productoID
    );

    carritoHTML();
  }
}

carritoo.addEventListener("click", eliminarProducto);

const salud = document.getElementById("saludo");
const roww = document.createElement("div");
const usuar = JSON.parse(localStorage.getItem("usuario:")) || [];

roww.innerHTML = `<h2 class = "bienvenida">Bienvenido "${usuar.nom}"</h2>`;
salud.appendChild(roww);

const alerta = document.getElementById("datos");
const botonBorr = document.getElementById("botonBorrar");
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

botonMuestra.addEventListener("click", datosUsuario);

function limpiarAlertas() {
  alerta.innerHTML = "";
}


class Auto{

	constructor(img,titulo,id){
		this.img = img;
    this.titulo = titulo;
    this.id = id;
	}

}


fetch ('./data.json')
  .then((res) => res.json())
  .then((data) => console.log(data));

/*<div class="row row-cols-1 row-cols-md-3 g-4">
			  <div class="col">
			    <div class="card h-100 card">
			      <div class="card-body">
					<img src="../assets/img/fiat punto.jpg" class="card-img-top perfilFoto" alt="...">
			        <h5 class="card-title">Fiat Punto</h5>
					<button class="btn btn-primary" data-id="1">Comprar</button>
	      </div>
  </div>
*/