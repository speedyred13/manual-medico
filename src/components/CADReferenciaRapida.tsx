import { useState } from 'react'
import type { SeccionFicha } from '../data/types.ts'

type PasoTratamiento = { numero: number; titulo: string; detalle: string }

function desglosarPunto(punto: string) {
  const separador = punto.indexOf(':')
  if (separador < 0) return { titulo: '', detalle: punto }
  return { titulo: punto.slice(0, separador).trim(), detalle: punto.slice(separador + 1).trim() }
}

function pasosDelTratamiento(puntos: string[]): PasoTratamiento[] {
  return puntos.map((punto, indice) => {
    const partes = /^(\d+)\)\s*([^:]+):\s*(.*)$/.exec(punto)
    return {
      numero: partes ? Number(partes[1]) : indice + 1,
      titulo: partes ? partes[2].trim() : '',
      detalle: partes ? partes[3] : punto,
    }
  })
}

/**
 * Presentación visual de UN solo apartado clínico.
 * Los textos, las dosis y los criterios proceden siempre del archivo src/data/existentes.ts.
 * No incorpora información de otros apartados ni genera recomendaciones independientes.
 */
export function CADReferenciaRapida({ seccion }: { seccion: SeccionFicha }) {
  const [formatoTratamiento, setFormatoTratamiento] = useState<'algoritmo' | 'tabla'>('algoritmo')
  const puntos = seccion.puntos ?? []
  const criterios = /criterios diagnósticos/i.test(seccion.titulo)
  const tratamiento = /tratamiento: secuencia práctica/i.test(seccion.titulo)
  const monitorizacion = /monitorización durante tratamiento/i.test(seccion.titulo)
  const errores = /errores clínicos/i.test(seccion.titulo)
  const pasos = tratamiento ? pasosDelTratamiento(puntos) : []

  return (
    <div className="cad-apartado-contenido">
      {seccion.texto && <p className="cad-apartado-texto">{seccion.texto}</p>}

      {criterios && puntos.length > 0 && (
        <>
          <div className="cad-tabla-scroll">
            <table className="cad-tabla" aria-label="Tabla de criterios diagnósticos de cetoacidosis">
              <thead><tr><th scope="col">Componente</th><th scope="col">Criterio</th></tr></thead>
              <tbody>{puntos.slice(0, 3).map((punto) => {
                const detalle = desglosarPunto(punto)
                return <tr key={punto}><th scope="row">{detalle.titulo}</th><td>{detalle.detalle}</td></tr>
              })}</tbody>
            </table>
          </div>
          {puntos.slice(3).map((punto) => <p className="cad-apartado-nota" key={punto}>{punto}</p>)}
        </>
      )}

      {tratamiento && (
        <>
          <div className="cad-apartado-formato" role="group" aria-label="Presentación del tratamiento">
            <button type="button" className={formatoTratamiento === 'algoritmo' ? 'activo' : ''} aria-pressed={formatoTratamiento === 'algoritmo'} onClick={() => setFormatoTratamiento('algoritmo')}>Algoritmo</button>
            <button type="button" className={formatoTratamiento === 'tabla' ? 'activo' : ''} aria-pressed={formatoTratamiento === 'tabla'} onClick={() => setFormatoTratamiento('tabla')}>Tabla</button>
          </div>
          {formatoTratamiento === 'algoritmo'
            ? <div className="cad-algoritmo" aria-label="Algoritmo terapéutico">
                {pasos.map((paso) => <div key={paso.numero} className="cad-algoritmo-paso">
                  <span className="cad-algoritmo-marca">{String(paso.numero).padStart(2, '0')}</span>
                  <div className="cad-algoritmo-tarjeta">
                    {paso.titulo && <div className="cad-algoritmo-etiqueta"><strong>{paso.titulo}</strong></div>}
                    <p>{paso.detalle}</p>
                  </div>
                </div>)}
              </div>
            : <div className="cad-tabla-scroll">
                <table className="cad-tabla cad-tabla-tratamiento" aria-label="Tabla de tratamiento de cetoacidosis">
                  <thead><tr><th scope="col">Paso</th><th scope="col">Intervención</th><th scope="col">Indicaciones y precauciones</th></tr></thead>
                  <tbody>{pasos.map((paso) => <tr key={paso.numero}>
                    <th scope="row">{String(paso.numero).padStart(2, '0')}</th>
                    <td>{paso.titulo}</td><td>{paso.detalle}</td>
                  </tr>)}</tbody>
                </table>
              </div>}
        </>
      )}

      {monitorizacion && puntos.length > 0 && (
        <div className="cad-tabla-scroll">
          <table className="cad-tabla cad-tabla-vigilancia" aria-label="Tabla de monitorización durante el tratamiento">
            <thead><tr><th scope="col">Control</th><th scope="col">Indicaciones</th></tr></thead>
            <tbody>{puntos.map((punto, indice) => <tr key={indice}>
              <th scope="row">{String(indice + 1).padStart(2, '0')}</th><td>{punto}</td>
            </tr>)}</tbody>
          </table>
        </div>
      )}

      {!criterios && !tratamiento && !monitorizacion && puntos.length > 0 && (
        <ul className={errores ? 'cad-lista-errores' : 'cad-lista-puntos'}>
          {puntos.map((punto, indice) => <li key={indice}>{punto}</li>)}
        </ul>
      )}
    </div>
  )
}
