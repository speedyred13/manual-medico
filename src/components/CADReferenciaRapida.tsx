import { useState } from 'react'
import type { FichaClinica } from '../data/types.ts'

type Vista = 'diagnostico' | 'tratamiento' | 'vigilancia' | 'alertas'

type Paso = {
  numero: number
  etiqueta: string
  texto: string
}

const pestañas: { id: Vista; titulo: string; abreviatura: string }[] = [
  { id: 'diagnostico', titulo: 'Diagnóstico', abreviatura: '01' },
  { id: 'tratamiento', titulo: 'Algoritmo terapéutico', abreviatura: '02' },
  { id: 'vigilancia', titulo: 'Vigilancia y resolución', abreviatura: '03' },
  { id: 'alertas', titulo: 'Errores a evitar', abreviatura: '04' },
]

function dividirEtiqueta(texto: string) {
  const separador = texto.indexOf(':')
  if (separador < 0) return { etiqueta: '', detalle: texto }
  return { etiqueta: texto.slice(0, separador).trim(), detalle: texto.slice(separador + 1).trim() }
}

function obtenerPasos(puntos: string[]): Paso[] {
  return puntos.map((texto, indice) => {
    const partes = /^(\d+)\)\s*([^:]+):/.exec(texto)
    return {
      numero: partes ? Number(partes[1]) : indice + 1,
      etiqueta: partes ? partes[2].trim() : 'Paso ' + (indice + 1),
      texto,
    }
  })
}

/**
 * Referencia visual derivada de fichasClinicas["Cetoacidosis diabética"].
 * Ninguna recomendación, dosis, criterio ni fuente se almacena aquí:
 * las tablas y el algoritmo leen el texto clínico original en tiempo real.
 */
export function CADReferenciaRapida({
  ficha,
  onIrASeccion,
}: {
  ficha: FichaClinica
  onIrASeccion: (indice: number) => void
}) {
  const [vista, setVista] = useState<Vista>('diagnostico')

  const indiceCriterios = ficha.secciones.findIndex((seccion) => /criterios diagnósticos/i.test(seccion.titulo))
  const indiceTratamiento = ficha.secciones.findIndex((seccion) => /tratamiento: secuencia práctica/i.test(seccion.titulo))
  const indiceMonitorizacion = ficha.secciones.findIndex((seccion) => /monitorización durante tratamiento/i.test(seccion.titulo))
  const indiceResolucion = ficha.secciones.findIndex((seccion) => /resolución y transición/i.test(seccion.titulo))
  const indiceErrores = ficha.secciones.findIndex((seccion) => /errores clínicos/i.test(seccion.titulo))
  const indiceEvaluacion = ficha.secciones.findIndex((seccion) => /evaluación inicial/i.test(seccion.titulo))

  const criterios = indiceCriterios >= 0 ? ficha.secciones[indiceCriterios].puntos ?? [] : []
  const tratamiento = indiceTratamiento >= 0 ? ficha.secciones[indiceTratamiento].puntos ?? [] : []
  const monitorizacion = indiceMonitorizacion >= 0 ? ficha.secciones[indiceMonitorizacion].puntos ?? [] : []
  const resolucion = indiceResolucion >= 0 ? ficha.secciones[indiceResolucion].puntos ?? [] : []
  const errores = indiceErrores >= 0 ? ficha.secciones[indiceErrores].puntos ?? [] : []
  const evaluacion = indiceEvaluacion >= 0 ? ficha.secciones[indiceEvaluacion].puntos ?? [] : []

  const pasos = obtenerPasos(tratamiento)
  const pasoPotasioPrevio = evaluacion.find((punto) => /ECG y potasio antes de iniciar insulina/i.test(punto))

  const irA = (indice: number) => {
    if (indice >= 0) onIrASeccion(indice)
  }

  return (
    <div className="cad-rapida" aria-label="Herramientas de consulta rápida">
      <div className="cad-rapida-cabecera">
        <div>
          <span className="cad-rapida-eyebrow"><span aria-hidden="true" className="cad-rapida-luz"/> NUEVO · CONSULTA VISUAL</span>
          <h3>Panel de consulta rápida</h3>
          <p>Tablas y flujos construidos a partir del contenido original de esta ficha.</p>
        </div>
        <span className="cad-rapida-icono" aria-hidden="true">
          <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12h4l3-7 5.3 14 3.2-7H22"/>
          </svg>
        </span>
      </div>

      <div className="cad-rapida-pestañas" role="group" aria-label="Vista rápida de cetoacidosis">
        {pestañas.map((pestaña) => (
          <button
            key={pestaña.id}
            type="button"
            className={'cad-rapida-pestaña' + (vista === pestaña.id ? ' seleccionada' : '')}
            aria-pressed={vista === pestaña.id}
            onClick={() => setVista(pestaña.id)}
          >
            <span aria-hidden="true">{pestaña.abreviatura}</span>{pestaña.titulo}
          </button>
        ))}
      </div>

      <div className="cad-rapida-panel" aria-live="polite">
        {vista === 'diagnostico' && (
          <div className="cad-rapida-vista" data-vista="diagnostico">
            <div className="cad-rapida-vista-cabecera">
              <div><span className="cad-rapida-kicker">CRITERIOS DIAGNÓSTICOS</span><h4>Tres componentes de la CAD</h4></div>
              <button type="button" onClick={() => irA(indiceCriterios)}>Ver apartado completo <span aria-hidden="true">↗</span></button>
            </div>
            {criterios.length >= 3 && (
              <>
                <div className="cad-criterios-cadena" aria-label="Los tres componentes diagnósticos de la ficha">
                  {criterios.slice(0, 3).map((punto, indice) => {
                    const dato = dividirEtiqueta(punto)
                    return (
                      <div className="cad-criterio-posicion" key={punto}>
                        <div className="cad-criterio-tarjeta">
                          <span className="cad-criterio-numero">0{indice + 1}</span>
                          <strong>{dato.etiqueta || 'Componente ' + (indice + 1)}</strong>
                          <p>{dato.detalle}</p>
                        </div>
                        {indice < 2 && <span className="cad-criterios-y" aria-hidden="true">Y</span>}
                      </div>
                    )
                  })}
                </div>
                <div className="cad-tabla-scroll">
                  <table className="cad-tabla" aria-label="Tabla de criterios diagnósticos de cetoacidosis">
                    <thead><tr><th scope="col">Componente</th><th scope="col">Criterio íntegro de la ficha</th></tr></thead>
                    <tbody>
                      {criterios.slice(0, 3).map((punto) => {
                        const dato = dividirEtiqueta(punto)
                        return <tr key={punto}><th scope="row">{dato.etiqueta}</th><td>{punto}</td></tr>
                      })}
                    </tbody>
                  </table>
                </div>
                {criterios.slice(3).map((punto) => <p className="cad-rapida-nota" key={punto}><span aria-hidden="true">i</span>{punto}</p>)}
              </>
            )}
          </div>
        )}

        {vista === 'tratamiento' && (
          <div className="cad-rapida-vista" data-vista="tratamiento">
            <div className="cad-rapida-vista-cabecera">
              <div><span className="cad-rapida-kicker">SECUENCIA TERAPÉUTICA</span><h4>Algoritmo de manejo</h4></div>
              <button type="button" onClick={() => irA(indiceTratamiento)}>Ver tratamiento completo <span aria-hidden="true">↗</span></button>
            </div>
            {pasoPotasioPrevio && <p className="cad-rapida-advertencia"><span aria-hidden="true">!</span><span>{pasoPotasioPrevio}</span></p>}
            <div className="cad-algoritmo" aria-label="Pasos terapéuticos tomados del texto original">
              {pasos.map((paso) => (
                <div key={paso.numero} className="cad-algoritmo-paso">
                  <span className="cad-algoritmo-marca">{String(paso.numero).padStart(2,'0')}</span>
                  <div className="cad-algoritmo-tarjeta">
                    <div className="cad-algoritmo-etiqueta"><strong>{paso.etiqueta}</strong><span>PASO {paso.numero}</span></div>
                    <p>{paso.texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="cad-rapida-pie">El orden y el texto clínico proceden de «Tratamiento: secuencia práctica». Individualizar según el protocolo institucional.</div>
          </div>
        )}

        {vista === 'vigilancia' && (
          <div className="cad-rapida-vista" data-vista="vigilancia">
            <div className="cad-rapida-vista-cabecera">
              <div><span className="cad-rapida-kicker">SEGUIMIENTO INTRAHOSPITALARIO</span><h4>Monitorización y resolución</h4></div>
              <button type="button" onClick={() => irA(indiceMonitorizacion)}>Ver monitorización <span aria-hidden="true">↗</span></button>
            </div>
            <div className="cad-tabla-scroll">
              <table className="cad-tabla cad-tabla-vigilancia" aria-label="Tabla de monitorización durante el tratamiento">
                <thead><tr><th scope="col">Control</th><th scope="col">Indicaciones de la ficha</th></tr></thead>
                <tbody>{monitorizacion.map((punto, indice) => <tr key={indice}><th scope="row">0{indice + 1}</th><td>{punto}</td></tr>)}</tbody>
              </table>
            </div>
            <div className="cad-rapida-subtitulo"><h5>Resolución y transición</h5><button type="button" onClick={() => irA(indiceResolucion)}>Ir al apartado <span aria-hidden="true">↗</span></button></div>
            <div className="cad-resolucion-lista">{resolucion.map((punto, indice) => (
              <div className="cad-resolucion-item" key={indice}><span aria-hidden="true">{String(indice + 1).padStart(2,'0')}</span><p>{punto}</p></div>
            ))}</div>
          </div>
        )}

        {vista === 'alertas' && (
          <div className="cad-rapida-vista" data-vista="alertas">
            <div className="cad-rapida-vista-cabecera">
              <div><span className="cad-rapida-kicker">SEGURIDAD CLÍNICA</span><h4>Errores que conviene evitar</h4></div>
              <button type="button" onClick={() => irA(indiceErrores)}>Ver apartado completo <span aria-hidden="true">↗</span></button>
            </div>
            <div className="cad-alertas-grid">{errores.map((punto, indice) => (
              <div className="cad-alerta" key={indice}><span className="cad-alerta-marca" aria-hidden="true">!</span><span>{punto}</span></div>
            ))}</div>
            <p className="cad-rapida-pie">Alertas copiadas del apartado «Errores clínicos que conviene evitar», sin añadir recomendaciones nuevas.</p>
          </div>
        )}
      </div>
    </div>
  )
}
