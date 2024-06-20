
// todo se ejecuta cuando el DOM se carga completamente
document.addEventListener('DOMContentLoaded', () => {

    // selecciona el formulario del dom
    const formulario = document.querySelector('form');
    

    // funcion que muestra el error
    const mostrarError = (input, mensaje) => {
        //acceder al div contenedor
        const divPadre = input.parentNode;
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //agregar la clase de error al elemento padre
        divPadre.classList.add('error');
        //agregamos mensaje de error
        errorText.innerText = mensaje;
    }

    

    //eliminar mensaje de error
    const eliminarError = input => {
        //accede a la etiqueta contenedora
        const divPadre = input.parentNode;
        //elmina la clase de error del elemento padre/contenedor
        divPadre.classList.remove('error');
        //encuentra el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //se pone el texto como vacio
        errorText.innerText = '';
    }

    
    //funcion que corrobora si los campos estan llenos para quitar error

    formulario.querySelectorAll('input').forEach(input => {
        // se activa cuando el valor de un elemento cambia y se sale del elemento 
        input.addEventListener('change', () => {
            // obtenemos valor del campo seleccionado
            const valor = input.value.trim();//elimina cualquier espacio en blanco al principio y al final del valor obtenido.
            // condicion para evaluar
            if (valor !== '') {
                eliminarError(input);
            }
        })
    });

    
    // funcion validar campo
    function validarCampo(campoId, mensaje) {
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if (value == '') {
            mostrarError(campo, mensaje);
            return false;//indicamos fallo de la validacion 
        } else {
            eliminarError(campo)
            return true;//indicamos validacion exitosa
        }
    }

    // Función para validar un correo electrónico utilizando una expresión regular
    function isEmail(email) {
        const expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email);//devuelve true si la cadena coincide con el patrón de la expresión regular
    }

    // funcion para validar email
    function validarEmail(campoId, mensaje) {
        // obtenemos elemento mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();

        // si el campo esta vacio
        if (email === '') {
            //establecemos mensaje de error
            mostrarError(campo, 'El correo electronico es obligatorio');
            // indicamos validacion fallida
            return false
        } else if (!isEmail(email)) {
            //establecemos mensaje de error 
            mostrarError(campo, mensaje);
            // indicamos validacion fallida
            return false
        } else {
            // en caso de ser valido eliminamos cualquier error
            eliminarError(campo);
            // indicamos validacion es exitosa
            return true
        }
    }

    
    
    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;

        // validar campo email
        validar = validarEmail('email', 'El correo electronico no es valido') && validar;
        // validar contraseña
        validar = validarCampo('password', 'La contraseña es obligatoria') && validar;

        return validar;
    }

    
    // añadimos evento de escucha para cuando se envia el formulario

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarFormulario()) {
            // mensaje no valido
            event.preventDefault()//evita que el formulario se envie
            console.log("El formulario no es valido");
        } else {
            event.preventDefault();
            console.log("El fomrulario es valido");
        }
    })
})









    





