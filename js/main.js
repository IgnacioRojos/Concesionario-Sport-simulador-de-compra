/*var usuarioLogin,contraseñaLogin,recordar;

usuarioLogin = document.getElementById("usuario"),
contraseñaLogin = document.getElementById("contraseña"),
Checked = document.getElementById("recordar");*/
/*recordar = document.getElementById("recordar").Checked;*/




function login(){
    
    usuarioLogin = document.getElementById("usuario").value,
    contraseñaLogin = document.getElementById("contraseña").value;
    const user ={
        nom : usuarioLogin,
        pass : contraseñaLogin
    }

    if (usuarioLogin == "ignacio" && contraseñaLogin == "1234"){
        window.location = "views/ComprarAuto.html";
        if(recordar.checked){
            guardarDatosLocal(user);
        }else{
            guardarDatosSesion(user);
        }
    }else{
        if (usuarioLogin != "ignacio" || contraseñaLogin != "1234"){
            let alerta = document.createElement("div");
            alerta.innerHTML = `<div class= "alert alert-danger" role= "alert"> Datos erroneos al iniciar sesion</div>`
            document.body.append(alerta);
            
        }
    }
        
}

function guardarDatosLocal(user){
    localStorage.setItem("usuario:",JSON.stringify(user))
}

function guardarDatosSesion(user){
    sessionStorage.setItem("usuario:",JSON.stringify(user))
}

botonLogin.addEventListener("click",()=>{
  login();

})










