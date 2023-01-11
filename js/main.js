var usuarioLogin,contraseñaLogin,recordar;

usuarioLogin = document.getElementById("usuario"),
contraseñaLogin = document.getElementById("contraseña"),
Checked = document.getElementById("recordar");
/*recordar = document.getElementById("recordar").Checked;*/




function login(){
    
    usuarioLogin = document.getElementById("usuario").value,
    contraseñaLogin = document.getElementById("contraseña").value;
  

    if (usuarioLogin == "ignacio" && contraseñaLogin == "1234"){
        window.location = "views/ComprarAuto.html";
    }else{
        if (usuarioLogin != "ignacio" || contraseñaLogin != "1234"){
            let alerta = document.createElement("div");
            alerta.innerHTML = `<div class= "alert alert-danger" role= "alert"> Datos erroneos al iniciar sesion</div>`
            document.body.append(alerta);
            
        }
    }
        
}

function guardarDatosLocal(){
    const user = {
        nom: "ignacio",
        pass: 1234
    }
    localStorage.setItem("usuario:",JSON.stringify(user))
}

function guardarDatosSesion(){
    const user = {
        nom: "ignacio",
        pass: 1234
    }
    sessionStorage.setItem("usuario:",JSON.stringify(user))
}

function recuperarDatos(storage){
    let usuarioStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioStorage;
}


botonLogin.addEventListener("click",(e)=>{
    e.preventDefault();
    if(Checked == true){
        alert("esta seleccionado");
        /*guardarDatosLocal();*/
    }
    

})










