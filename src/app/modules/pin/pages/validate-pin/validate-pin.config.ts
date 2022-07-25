export const PinFormConfig = Object.freeze({
    text: {
      validatePin: "Ingresa aquí el código de verificación que te enviamos. Recuerda, este código tiene una vigencia de 15 minutos.",
      successPin: "Pin Generado satisfactoriamente",
      errorPin: "El código que acabaste de ingresar es incorrecto, por favor verifícalo de nuevo.",
      errorMaxTime: "Tu código de verificación ha superado el tiempo máximo de verificación, solicita un nuevo código para continuar con el proceso."
    },
    routes: {
      accountAddress: '/cuenta',
    },
    btnText: {
        requestCode: "Solicitar Código",
        back: "Atrás"
    },
    errTypes: {
        general: "Verificar la información ingresada, el pin, propiedades o operación no corresponden con el cliente registrado.",
        maxTime: "La fecha del PIN ha expirado, por favor genere uno nuevo."
  }
});
  