export const AuthFormConfig = Object.freeze({
  text: {
    validateAccount : "Selecciona y digita los datos del documento de identidad del titular de la cuenta",
    validateContact: "Los datos que registraste no se encuentran en nuestro sistema. Por favor verifica e intenta de nuevo.",
    errorAccount: "Por tu seguridad, enviaremos un código para validar tu identidad. Confírmanos por cuál medio te gustaría recibirlo:"
  },
  routes: {
    pinGenerate: '/pin',
  },
  errorGeneral: {
    icon: "x-circle",
    title: "¡Oops, algo salió mal!",
    text: "Se ha presentado un error al hacer la consulta, por favor intenta nuevamente.",
    redText: "Intentar nuevamente"
  }
});
