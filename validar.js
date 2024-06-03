//ejecucion cuando el Dom esta completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    //selecciona el formulario del dom
    const formulario = document.querySelector('form');

    //funcion mostrar error
    const mostrarError = (input, mensaje) => {
        //acceder al div contenedor
        const divPadre = input.parentNode;
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text'); 
        //agregamos la clase error al el.padre
        divPadre.classList.add('error');
        //agregamos mensaje de error
        errorText.innerText = mensaje;
    }

    //const input = document.querySelector('email'); //usa selectores para id: email
    //const mensaje = 'campo obligatorio';
    //funcion que elimina el error en caso de campo lleno
    const eliminarError = input =>{
        //acceder a la etiqueta contenedora
        const divPadre = input.parentNode;
        //eliminar la clase de error del elemento padre/contenedor
        divPadre.classList.remove('error');
        //encontramos el elemento error-text
        const errorText = divPadre.querySelector('.error-text');
        //establecemos el texto como vacío
        errorText.innerText = '';
    }
    //funcion que corrobora si los campos esta llenos con la finalidad de quitar el error
    formulario.querySelector('input').forEach(input => {
        //se activa cuando cambia el valor de un elemento del formulario. Se sale del elemento
        input.addEventListener('change', () =>{
            //obtenemos el valor del campo seleccionado
            const valor = input.value.trim(); //elimina cualquier espacio en blanco al principio y al final del valor obtenido.
            //condicion para evaluar
            if(valor !== ''){
                eliminarError(input);
            }
        })
    
    });
    //funciones que validan los campos
    function validarCampo(campoId, mensaje){
        const campo = document.getElementById(campoId);
        const value = campo.value.trim();

        if(value == ' '){
            mostrarError(campo, mensaje);
            return false; //indicamos que la validacion fallo
        } else {
            eliminarError(campo)
            return true; //validacion exitosa
        }
    }    
    //funcion para validar un correo electronico usando una expresion regular
    function isEmail(email){
        const expresionRegular =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return expresionRegular.test(email); //devuelve true si la cadena coincide con el patron de la expresion regular
    
    }
    //funcion para validar email
    function validarEmail(campoId, mensaje){
        //obtenemos elementos mediante id
        const campo = document.getElementById(campoId);
        const email = campo.value.trim();

        //si el campo esta vacio 
        if(email === ' '){
            //establecemos mensaje de error
            mostrarError (campo, 'El correo electronico es obligatorio');
            //indicamos el fallo de la validacion
            return false
        } else if (!isEmail(email)){
            //ponemos mensaje de error
            mostrarError(campo, mensaje);
            return false
        } else {
            //eliminamos cualquier error si es valido
            eliminarError(campo);
            //indicamos la validacion exitosa
            return true
        }
    }
    // funcion para validar el formulario
    const validarFormulario = () => {
        let validar = true;

        // validar campo email
        validar = validarEmail('email', 'El correo electronico no es valido') && validar;
        // validar contraseña
        validar = validarCampo('password', 'Ea contraseña es obligatoria') && validar;

        return validar;
    }
    // agregar un evento de escucha para cuando se envia el formulario

    formulario.addEventListener('submit', event => {
        event.preventDefault();
        if (!validarFormulario()) {
            // mensaje no valido
            event.preventDefault() //evita que el formulario se envie
            console.log("El formulario no es valido");
        } else {
            event.preventDefault();
            console.log("El fomrulario es valido");
        }
    })    
})








    





