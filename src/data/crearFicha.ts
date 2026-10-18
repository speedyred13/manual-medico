import type { FichaClinica } from './types.ts'

// Mantiene un único formato de datos y el mismo componente de lectura.
export function ficha(
  alcance: string,
  secciones: [string, ...string[]][],
  fuentes: [string, string, string][],
  actualizacion = 'Fuentes consultadas el 18 de octubre de 2026; versiones y poblaciones identificadas en bibliografía.',
): FichaClinica {
  return {
    alcance,
    actualizacion,
    secciones: secciones.map(([titulo, ...puntos]) => ({ titulo, puntos })),
    fuentes: fuentes.map(([titulo, url, nota]) => ({ titulo, url, nota })),
  }
}
