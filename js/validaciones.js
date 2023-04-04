export function valida(input) {
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    };
};

const validadores = {
    nacimiento: input => validarNacimiento(input),
};

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