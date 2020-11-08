loginUsuario = sessionStorage.getItem("email");

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

//CREO UN ARRAY DONDE LUEGO VOY A INSERTAR LOS OBJETOS(USUARIOS)
arrayUsuarios = [];

arrayUsuarios = JSON.parse(localStorage.getItem("usuarios"));


//TOMO VALORES DEL FORMULARIO PARA CREAR USUARIO/OBJETO Y LO PUSHEO AL ARRAY
crearUsuarios = () => {

    arrayUsuarios = JSON.parse(localStorage.getItem("usuarios"));

    userNameLS = document.getElementById("userNameLS").value;
    userAgeLS = document.getElementById("userAgeLS").value;
    userEmailLS = document.getElementById("userEmailLS").value;
    userNumLS = document.getElementById("userNumLS").value;
    imgURL = document.getElementById("inputIMG").value;

    usuario = {
        nombre: userNameLS,
        edad: userAgeLS,
        correo: userEmailLS,
        telefono: userNumLS,
        imgPerfil: imgURL
    }

    if (arrayUsuarios == null) {
        arrayUsuarios = [];
    }

    arrayUsuarios.push(usuario);

    //COLOCO ARRAY EN LOCALSTORAGE
    localStorage.setItem("usuarios", JSON.stringify(arrayUsuarios));

};

formularioUI = document.getElementById("formularioUI");

//EVENTO QUE APLICA LAS FUNCIONES DE CREAR USUARIOS Y GUARDARLOS EN EL LOCALSTORAGE UNA VEZ QUE LE DAMOS AL BOTON DE GUARDAR.
formularioUI.addEventListener('submit', (e) => {

    e.preventDefault();

    crearUsuarios();

})

//EMAIL DEL SESSION STORAGE
userEmailLS.value = loginUsuario;

//CARGAR DATOS DE USUARIO EN PANTALLA
obtenerUsuario = JSON.parse(localStorage.getItem("usuarios"));

function cargarDatosUsuario() {
    userNameLS = document.getElementById("userNameLS");
    userAgeLS = document.getElementById("userAgeLS");
    userEmailLS = document.getElementById("userEmailLS");
    userNumLS = document.getElementById("userNumLS");

    if (obtenerUsuario != null) {


        for (i = 0; i < obtenerUsuario.length; i++) {


            if (obtenerUsuario[i].correo == loginUsuario) {

                userNameLS.value = obtenerUsuario[i].nombre;
                userAgeLS.value = obtenerUsuario[i].edad;
                userNumLS.value = obtenerUsuario[i].telefono;
                document.getElementById("divIMG").innerHTML = obtenerUsuario[i].imgPerfil;
                break;
            }

        }
    }
}
cargarDatosUsuario();


//VALIDACIÓN DE LOS CAMPOS
function validationUserData() {

    mensajeError = document.getElementById("mensajeError");
    mensajeConfirmacion = document.getElementById("mensajeConfirmacion")
    var error = document.getElementById("error");
    error.style.color = 'red';

    var mensajeError = [];


    if (userNameLS.value === null || userNameLS.value === '') {
        mensajeError.push('Ingrese su nombre y apellido.')
    }

    if (userEmailLS.value === null || userEmailLS.value === '') {
        mensajeError.push('Ingrese su email.')
    }

    if (userAgeLS.value === null || userAgeLS.value === '') {
        mensajeError.push('Ingrese su edad.')
    }
    if (userNumLS.value === null || userNumLS.value === '') {

        mensajeError.push('Ingrese su número de teléfono.')
    }

    else {
        crearUsuarios();
        mensajeConfirmacion.innerHTML =
            `<div class="alert h5 alert-success" role="alert">
        <img src="img/check.png" height="100">
        Guardado con éxito!
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
      </div>
      `
    }

    error.innerHTML = mensajeError.join('<br>');

    return false;
}

