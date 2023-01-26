/*constante que voy a usar*/

const alerta= "";


/*funcion de login del usuario*/
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
            var alerta = document.createElement("div");
            alerta.innerHTML = `<div class= "alert alert-danger" role= "alert"> Datos erroneos al iniciar sesion</div>`
            document.body.append(alerta);
            setTimeout(()=>{
                limpiarDatosErroneos();
            },1000)

            function limpiarDatosErroneos(){
                alerta.innerHTML="";
            }
            
        }
    }       
}

/*funcion que guarda los datos en localStorge*/

function guardarDatosLocal(usuario){
    localStorage.setItem("usuario:",JSON.stringify(usuario))
}

/*boton de login*/

botonLogin.addEventListener("click",()=>{
  login();
})













