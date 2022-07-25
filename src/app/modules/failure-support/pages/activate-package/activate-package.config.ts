export const packageFormConfig = Object.freeze({
    routes: {
        assistedSupport: 'https://wa.me/573117488888?text=Fallas%20Masivas',
    },
    invalidPhone: {
        icon: "error.png",
        title: "¡Oops, algo salió mal!",
        text: "El número que ingresaste no es válido, revisa que no tenga espacio, ni signos de puntuación e inténtalo de nuevo.",
        redText: "Intentar nuevamente"
    },
    errorGeneral: {
        icon: "error.png",
        title: "¡Oops, algo salió mal!",
        text: "Se ha presentado un error al hacer la consulta, por favor intenta nuevamente.",
        redText: "Intentar nuevamente"
    },
    successActivation: {
        icon: "check.png",
        text: "Recuerda que este paquete de datos no tiene costo y estará activo por las próximas 72 horas, a partir de este momento.",
        text2: "Te notificaremos al número de contacto del titular cuando el servicio ya se encuentre normalizado.",
        redText: "Cerrar"
    }
});