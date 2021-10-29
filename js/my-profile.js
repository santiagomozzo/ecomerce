//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  usuarioEnPerfil();
  datosPersonales(JSON.parse(localStorage.getItem("infoPerfil")));
  document.getElementById("guardarPerfil").addEventListener("click", botonGuardar);

});

//boton que guarda la info
const botonGuardar = () => {
  const nombrePerfil = document.getElementById("nombrePerfil").value;
  const apellidoPerfil = document.getElementById("apellidoPerfil").value;
  const edadPerfil = document.getElementById("edadPerfil").value;
  const telPerfil = document.getElementById("telPerfil").value;
  const emailPerfil = document.getElementById("emailPerfil").value;

  var obj = ({
    nombrePerfil,
    apellidoPerfil,
    edadPerfil,
    telPerfil,
    emailPerfil,
  });

  localStorage.setItem("infoPerfil", JSON.stringify(obj));
}



//funcion que muestra el usuario logeado en el miperfil
function usuarioEnPerfil() {
  const usuarioPerfil = document.getElementById("usuarioPerfil");
  const infoUsuario = localStorage.getItem("usuario");

  usuarioPerfil.innerHTML = `<div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="basic-addon1">Usuario</span>
    </div>
    <p class="form-control" aria-label="Usuario" aria-describedby="basic-addon1">${infoUsuario}</p>
  </div>`;

}

//funcion que muestra los datos personales
function datosPersonales(obj) {

  if (JSON.parse(localStorage.getItem("infoPerfil"))) {

    const perfilNombre = document.getElementById("nombrePerfil");
    const perfilApellido = document.getElementById("apellidoPerfil");
    const perfilEdad = document.getElementById("edadPerfil");
    const perfilTel = document.getElementById("telPerfil");
    const perfilEmail = document.getElementById("emailPerfil");

    perfilNombre.value = obj.nombrePerfil;
    perfilApellido.value = obj.apellidoPerfil;
    perfilEdad.value = obj.edadPerfil;
    perfilTel.value = obj.telPerfil;
    perfilEmail.value = obj.emailPerfil;

   
  }
};