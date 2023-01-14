

const autos = [{
    img : "../assets/img/fiat punto.jpg",
    titulo : "Fiat Uno",
    id: "1"
},
 {
    img : "../assets/img/vento.jpg",
    titulo : "Wolsvagen Vento",
    id: "2"
 },
 {
    img : "../assets/img/bora.jpg",
    titulo : "Wolsvagen Bora",
    id: "3"
 },
 {
    img : "../assets/img/chevrolet corsa.jpg",
    titulo : "Chevrolet Corsa",
    id: "4"
 },
 {  
    img : "../assets/img/ford fiesta.jpg",
    titulo : "Ford Fiesta",
    id: "5"

 },
 {
    img : "../assets/img/wolsvagen up.jpg",
    titulo : "wolsvagen up",
    id: "6"
 },
 {
    img : "../assets/img/ford ka.jpg",
    titulo : "Ford Ka",
    id: "7"
 },
 {
    img : "../assets/img/fiat siena.jpg",
    titulo : "Fiat Siena",
    id: "8"
 },
 {
    img : "../assets/img/yaris.jpg",
    titulo : "Toyota Yaris",
    id: "9"
 },
]
const
    boton = document.getElementById("botonLogin"),
    carritoo = document.getElementById("carrito")


const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("click", (e) =>{
        leerDatosProductos(e.target.parentElement);

    });
});

let articulosCarro = [];

function leerDatosProductos(producto){
    const infoProducto ={
        imagen: producto.querySelector(".card-img-top").getAttribute("src"),
        titulo:producto.querySelector(".card-title").textContent,
        id: producto.querySelector(".btn").getAttribute("data-id")
    };
    
    articulosCarro = [...articulosCarro, infoProducto];

    carritoHTML();
}


function carritoHTML() {
    limpiarHTML();
    articulosCarro.forEach((producto)=>{
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
    if(e.target.classList.contains("btn-danger")) {
        let productoID = e.target.getAttribute("id");
        articulosCarro = articulosCarro.filter((producto) => producto.id !== productoID);

        carritoHTML();
    }



}

carritoo.addEventListener("click", eliminarProducto);



    



const salud = document.getElementById("saludo");
const roww = document.createElement("div");
const usuar = JSON.parse(localStorage.getItem("usuario:"));


roww.innerHTML = `<h2 class = "bienvenida">Bienvenido "${usuar.nom}"</h2>`;
salud.appendChild(roww);


const alerta = document.getElementById("datos");
const botonBorr = document.getElementById("botonBorrar");
let fila = document.createElement("div");

function datosUsuario(){
    const fila = document.createElement("div");
    const alerta = document.getElementById("datos");


    fila.innerHTML =    `<div class= "alert alert-danger" role= "alert"> Sus datos son: Usuario: "${usuar.nom}", Contraseña: "${usuar.pass}"
                            <button id= "botonBorrar" class = "btn btn-danger">Aceptar</button>
                        </div>`;
    alerta.appendChild(fila);
    const botonBorr = document.getElementById("botonBorrar");

    botonBorr.addEventListener("click",limpiarAlertas);
}

botonMuestra.addEventListener("click",datosUsuario);

function limpiarAlertas(){
    alerta.innerHTML = "";
}



