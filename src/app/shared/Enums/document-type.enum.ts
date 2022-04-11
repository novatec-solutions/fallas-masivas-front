export const TIPOS_DOCUMENTOS = {
    CC: { id: 1, code:"CC", label: "CEDULA DE CIUDADANIA" },
    CE: { id: 4, code:"CE", label: "CEDULA DE EXTRANJERIA" },
    PS: { id: 5, code:"PS", label: "PASAPORTE" },
    NI: { id: 2, code:"NI", label: "NIT" },
    CD: { id: 6, code:"CD", label: "CARNET DIPLOMATICO" }
} 

export function getValue(tipo:string){
    return (TIPOS_DOCUMENTOS as any)[tipo]
}