export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]) {
        validadores[tipoInput](input);
    };

    if(input.validity.valid){
        input.parentElement.classList.remove('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = '';
    }else{
        input.parentElement.classList.add('input-container--invalid');
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoInput, input);
    };
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensjesDeError = {
    nombre: {
        valueMissing: 'El campo nombre no puede estar vacio'
    },
    email: {
        valueMissing: 'El campo email puede estar vacio',
        typeMismatch: 'El email no es valido'
    },
    password: {
        valueMissing: 'El campo contraseña no puede estar vacio',
        patternMismatch: 'Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.'
    },
    nacimiento: {
        valueMissing: 'El campo fecha de nacimiento no puede estar vacio',
        customError: 'Debes de tener al menos 18 años de edad'
    }
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoInput, input){
    let mensaje = '';
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]){
            console.log(tipoInput, error);
            console.log(input.validity[error]);
            console.log(mensjesDeError[tipoInput][error]);
            mensaje = mensjesDeError[tipoInput][error];
        }
    });


    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad (fechaCliente)){
        mensaje = "Debes de tener al menos 18 años de edad";
    };

    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFEchas = new Date(
        fecha.getUTCFullYear() +18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    return diferenciaFEchas <= fechaActual;
};