//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
function validacion(){
   
    //Obtengo los valores de los campos tanto de Email como del Password
    let usuario = document.getElementById("inputEmail").value;
    let contraseña = document.getElementById("inputPassword").value

    //Declaro la variable con la regular expresion que controla 
    //si se ingreso bien o no un correo valido en el campo email    
    var RegEx= new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

    console.log( "Valor: "+ usuario);
    console.log("Regex: " + RegEx.test(usuario));
    console.log("Regex2: " + !RegEx.test(usuario));
    

        // Primero chequeo que los dos campos tienen valor y de no tener envio una alerta
        if ( usuario === "" && contraseña === "" ){
            alert("Para ingresar debe completar ambos campos");
            //Aqui se controla que el campo mail tenga un valor, que sea valido y que no haya datos en el campo password 
        }else if ( contraseña === "" &&  !RegEx.test(usuario) ){
                  alert("Por favor, ingrese un email válido y complete el campo contraseña");

                } else if ( usuario !== "" && contraseña === "" && RegEx.test(usuario) ){
                           alert("Por favor, ingrese un valor el campo contraseña");

                        } else if ( usuario === "" && contraseña !== "" ){
                                   alert("Por favor, Ingrese su email");
                                    
                                }else if ( contraseña !== "" &&  !RegEx.test(usuario) ){
                                          alert("Por favor, ingrese un email válido");
                                   
                                }       else if (usuario !== "" && contraseña !== "" &&  RegEx.test(usuario) ){
                                                alert("Bienvenido: "+ usuario);                                                                                 
                                                //window.open('index.html');
                                                window.open('index.html');                                               
                                }
}






document.addEventListener("DOMContentLoaded", function(e){


    
});