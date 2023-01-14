function login(){
    
    usuarioLogin = document.getElementById("usuario").value,
    contraseñaLogin = document.getElementById("contraseña").value;
    const user ={
        nom : usuarioLogin,
        pass : contraseñaLogin
    }

    if (usuarioLogin == "ignacio" && contraseñaLogin == "1234"){
        window.location = "views/ComprarAuto.html";
        guardarDatosLocal(user);
    }else{
        if (usuarioLogin != "ignacio" || contraseñaLogin != "1234"){
            let alerta = document.createElement("div");
            alerta.innerHTML = `<div class= "alert alert-danger" role= "alert"> Datos erroneos al iniciar sesion</div>`
            document.body.append(alerta);
            
        }
    }

   
        
}

function guardarDatosLocal(usuario){
    localStorage.setItem("usuario:",JSON.stringify(usuario))
}



botonLogin.addEventListener("click",()=>{
  login();

})

/*function recuperarUsuario(localStorage){
    let usuarioStorage = JSON.parse(localStorage.getItem("usuario"));
    return usuarioStorage;
}*/












