export const accountFormConfig = Object.freeze({
    text: {
        addressList: "Selecciona la dirección en la cual presentas la falla en tus servicios:",
        equipmentList: "Selecciona el equipo que no está funcionando correctamente. Si son varios equipos selecciona el módem de internet",
        noEquipment: "No encontramos equipos asociados a tu cuenta hogar. Selecciona la opción “soporte asistido WhatsApp” para recibir asesoría personalizada."
    },
    routes: {
        assistedSupport: 'https://wa.me/573117488888?text=Fallas%20Masivas',
        goPay: '/soporte',
        packageSupport: '/soporte/paquete',
        goAccountList: '/cuenta'
    },
    errorGeneral: {
        icon: "x-circle",
        title: "¡Oops, algo salió mal!",
        text: "Se ha presentado un error al hacer la consulta, por favor intenta nuevamente.",
        redText: "Intentar nuevamente"
    },
    infoModem: {
        icon: "info",
        title: "Información del cable módem",
        text: "Recuerda que en la parte posterior del dispositivo encuentras",
        redLabel:"la marca, modelo y serial", 
        nextText: "del cable módem.", img: "modem.png",
        redText: "Cerrar"
    },
    radicado: {
        text1: "Nuestro equipo técnico está trabajando para solucionar las fallas presentadas en tu zona.",
        text2: "Una vez hayamos restablecido los servicios, notificaremos por medios de un mensaje de texto al número de celular del titular."
    },
    specificFailure: {
        text: "Actualmente nuestros técnicos se encuentran realizando trabajos de mantenimiento en tu zona. Esperamos restablecer tus servicios lo antes posible."
    },
    generalFailure:{
        text: "No encontramos fallas asociadas al equipo seleccionado",
        redText: "Finalizar"
    }
});