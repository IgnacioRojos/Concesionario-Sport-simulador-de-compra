const usuarios = [{
    usu : "ignacio",
    contraseña: "1234"
},
{
    usu: "miguel",
    contrseña: "12345" 
},
{
    usu: "valentina",
    contrseña: "56123"
}
]
const usuarioLogin = document.getElementById("usuario"),
      contraseñaLogin = document.getElementById("contraseña"),
      botonLogin = document.getElementById("botonLoginn"),
      recordar = document.getElementById("recordar"),
      carritoo = document.getElementById("carrito")

function guardarDatos(usuarioDB, storage){
    const user = {
        nom: usuarioDB.usu,
        pass:usuarioDB.contraseña
    }
    storage.setItem("usuario",JSON.stringify(user));
}

function recuperarDatos(storage){
    let usuarioStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioStorage;
}

function validarUsuario(userDB, nombre, pass){
    let encontrado = userDB.find((userDB) => userDB.usu == nombre);

    if (typeof encontrado == 'undefined'){
        return false;
    }else{
        if (encontrado.contraseña != pass){
            return false;
        }else{
            return encontrado;
        }
    }
}

botonLogin.addEventListener("click",(event)=>  {
    event.preventDefault();
    
    if(!usuarioLogin.value || !contraseñaLogin.value){
        alert("escribi");
    }else{
        let data = validarUsuario(usuarios, usuarioLogin.value, contraseñaLogin.value);
        window.location = "views/comprarAuto.html";
    }
    if(!data){
        alert("usuario incorrecto");

    }else{
        if(recordar.checked) {
            guardarDatos(data,localStorage);
        }else{
            guardarDatos(data,sessionStorage);
        }
    }
    
  
});


const cards = document.querySelectorAll(".card");
cards.forEach((card) => {
    card.addEventListener("click", (e) =>{
        leerDatosProductos(e.target.parentElement);

    });
});

let articulosCarro = [];

function leerDatosProductos(producto){
    const infoProducto ={
        titulo: producto.querySelector(".card-title").textContent,
        id: producto.querySelector(".btn").getAttribute("data-id"),
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


