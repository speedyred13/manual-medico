export type SeccionFicha = { titulo: string; texto?: string; puntos?: string[] }
export type FuenteFicha = { titulo: string; url: string; nota: string }
export type FichaClinica = { actualizacion: string; alcance: string; secciones: SeccionFicha[]; fuentes: FuenteFicha[] }

