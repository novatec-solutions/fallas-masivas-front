export const TIPOS_DOCUMENTOS = {
    CC: { id: 1, code:"CC", label: "Cédula de Ciudadanía" },
    CE: { id: 4, code:"CE", label: "Cédula de extranjería" },
    PS: { id: 5, code:"PS", label: "Pasaporte" },
    NI: { id: 2, code:"NI", label: "NIT" },
    CD: { id: 6, code:"CD", label: "Carnet diplomático" }
}

export function getValue(tipo:string){
    return (TIPOS_DOCUMENTOS as any)[tipo]
}
