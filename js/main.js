// Elementos del DOM
const botonLogin = document.getElementById("botonLogin");
const inputUsuario = document.getElementById("usuario");
const inputContraseña = document.getElementById("contraseña");
const mensajeError = document.getElementById("mensajeError");

// Usuario y contraseña válidos 
const usuarioValido = "ignacio";
const contraseñaValida = "1234";

// Evento al hacer click en el botón
botonLogin.addEventListener("click", login);

// Función principal de login
function login() {
  const usuarioLogin = inputUsuario.value.trim();
  const contraseñaLogin = inputContraseña.value.trim();

  if (usuarioLogin === usuarioValido && contraseñaLogin === contraseñaValida) {
    const user = {
      nom: usuarioLogin,
      pass: contraseñaLogin
    };

    guardarDatosLocal(user);
    window.location = "views/ComprarAuto.html";
  } else {
    mostrarMensajeError("Usuario o contraseña incorrectos.");
  }
}

// Función para guardar en localStorage
function guardarDatosLocal(usuario) {
  localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Función para mostrar mensaje de error
function mostrarMensajeError(texto) {
  mensajeError.textContent = texto;
  mensajeError.classList.remove("d-none");

  setTimeout(() => {
    mensajeError.classList.add("d-none");
    mensajeError.textContent = "";
  }, 2000);
}