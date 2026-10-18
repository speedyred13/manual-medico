import { useEffect, useMemo, useState } from 'react'

import './App.css'
import { temas } from './data/catalogo.ts'
import type { NombreTema } from './data/catalogo.ts'
import { fichasClinicas } from './data/fichas.ts'

// Los filtros se generan automáticamente a partir de los temas.

const especialidades = [

   'Todas',

   ...new Set(temas.map((tema) => tema.especialidad)),

]


function ContenidoFicha({ nombre }: { nombre: NombreTema }) {
  const ficha = fichasClinicas[nombre]
  if (!ficha) {
    return <div className="aviso"><strong>Ficha en desarrollo y verificación</strong><p>Este tema aún no cuenta con una ficha completa validada contra una GPC mexicana y una guía internacional vigente. No se muestran dosis ni recomendaciones terapéuticas como si estuvieran verificadas. La ficha se debe completar con diagnóstico, diagnóstico diferencial, tratamiento, monitorización, criterios de referencia y bibliografía trazable.</p></div>
  }
  return <div className="ficha-clinica">
    <p><strong>Revisión de fuentes:</strong> {ficha.actualizacion}</p>
    <p><strong>Alcance:</strong> {ficha.alcance}</p>
    {ficha.secciones.map((seccion) => <section key={seccion.titulo}>
      <h3>{seccion.titulo}</h3>
      {seccion.texto && <p>{seccion.texto}</p>}
      {seccion.puntos && <ul>{seccion.puntos.map((punto) => <li key={punto}>{punto}</li>)}</ul>}
    </section>)}
    <h3>Bibliografía y guías</h3>
    <ul className="fuentes-clinicas">{ficha.fuentes.map((fuente) => <li key={fuente.url}><a href={fuente.url} target="_blank" rel="noreferrer">{fuente.titulo}</a><p>{fuente.nota}</p></li>)}</ul>
    <p><strong>Nota de seguridad:</strong> material de apoyo para estudio. Verificar la versión vigente de las guías, el cuadro básico y el protocolo institucional; las decisiones y dosis se individualizan según el paciente.</p>
  </div>
}

function App() {

   const [temaVisual, setTemaVisual] = useState<'claro' | 'oscuro'>(() => {
     try { return localStorage.getItem('manual-medico-tema') === 'oscuro' ? 'oscuro' : 'claro' } catch { return 'claro' }
   })

   useEffect(() => {
     document.documentElement.dataset.theme = temaVisual
     try { localStorage.setItem('manual-medico-tema', temaVisual) } catch { /* El tema sigue funcionando aunque el almacenamiento esté bloqueado. */ }
   }, [temaVisual])

   const [busqueda, setBusqueda] = useState('')

   const [especialidad, setEspecialidad] = useState('Todas')

   const [seleccionado, setSeleccionado] = useState<(typeof temas)[number] | null>(null)

   const resultados = useMemo(() => {

     const termino = busqueda.trim().toLocaleLowerCase()

     return temas.filter((tema) => {

       const coincideTexto = `${tema.nombre} ${tema.especialidad} ${tema.resumen}`

         .toLocaleLowerCase()

         .includes(termino)

       const coincideEspecialidad =

         especialidad === 'Todas' || tema.especialidad === especialidad

       return coincideTexto && coincideEspecialidad

     })

   }, [busqueda, especialidad])

   return (
     <main className={`app tema-${temaVisual}`}>
       <header className="encabezado shell">
         <a className="marca" href="#inicio" aria-label="Manual Médico, inicio">
           <span className="simbolo" aria-hidden="true"><span>+</span></span>
           <span className="marca-texto"><span className="sobretitulo">BIBLIOTECA DE CONSULTA</span><h1>Manual Médico</h1></span>
         </a>
         <div className="acciones-encabezado">
           <span className="etiqueta"><span className="punto-estado" /> EDICIÓN CLÍNICA</span>
           <button className="boton-tema" type="button" onClick={() => setTemaVisual((actual) => actual === 'claro' ? 'oscuro' : 'claro')} aria-label={temaVisual === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'} title={temaVisual === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'}><span aria-hidden="true">{temaVisual === 'claro' ? '☾' : '☼'}</span><span className="texto-tema">{temaVisual === 'claro' ? 'Modo oscuro' : 'Modo claro'}</span></button>
         </div>
       </header>

       <section className="bienvenida shell" id="inicio">
         <div className="bienvenida-contenido">
           <span className="sobretitulo"><span className="linea-acento" /> TU ESPACIO DE CONSULTA CLÍNICA</span>
           <h2>Decisiones mejor informadas.<br /><em>Conocimiento a tu alcance.</em></h2>
           <p>Una biblioteca médica organizada para estudiar, repasar y consultar temas clínicos con fuentes visibles.</p>
           <label className="buscador"><span className="icono-busqueda" aria-hidden="true">⌕</span><input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar enfermedad, signo o tema..." aria-label="Buscar tema médico" />{busqueda && <button type="button" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">×</button>}<kbd>BUSCAR</kbd></label>
           <div className="resumen-biblioteca"><span><strong>{temas.length}</strong> temas en la biblioteca</span><span className="separador-resumen" /><span><strong>{especialidades.length - 1}</strong> especialidades</span></div>
         </div>
         <div className="panel-destacado" aria-label="Información del manual">
           <div className="panel-destacado-top"><span className="mini-icono">✳</span><span>CONSULTA RÁPIDA</span><span className="estado-panel">ACTIVO</span></div>
           <div className="ilustracion-medica" aria-hidden="true"><div className="anillo anillo-uno" /><div className="anillo anillo-dos" /><div className="cruz-grande">+</div><div className="dato-flotante dato-uno"><span>✓</span> Guías y referencias</div><div className="dato-flotante dato-dos"><span>⌕</span> Búsqueda integrada</div></div>
           <div className="panel-destacado-bottom"><span>Diseñado para acompañarte</span><strong>En cada rotación clínica <span>↗</span></strong></div>
         </div>
       </section>

       <section className="seccion shell seccion-especialidades"><div className="titulo-seccion"><div><span className="sobretitulo">NAVEGACIÓN</span><h2>Explora por especialidad</h2><p>Selecciona un área para encontrar los temas relacionados.</p></div></div>
         <div className="filtros">{especialidades.map((item, indice) => <button key={item} className={`filtro ${especialidad === item ? 'activo' : ''}`} onClick={() => setEspecialidad(item)} aria-pressed={especialidad === item}><span className="filtro-icono">{indice === 0 ? '▦' : '✳'}</span>{item}</button>)}</div>
       </section>

       <section className="seccion shell biblioteca"><div className="titulo-seccion titulo-biblioteca"><div><span className="sobretitulo">CONTENIDO CLÍNICO</span><h2>Biblioteca médica</h2><p>Abre una ficha para consultar el contenido disponible y sus referencias.</p></div><span className="contador"><strong>{resultados.length}</strong> {resultados.length === 1 ? 'tema' : 'temas'}</span></div>
         <div className="lista-temas">{resultados.map((tema, indice) => <button className="tarjeta-tema" key={tema.nombre} onClick={() => setSeleccionado(tema)}><span className="icono-tema" aria-hidden="true"><span>{String(indice + 1).padStart(2, '0')}</span><b>↗</b></span><span className="contenido-tema"><span className="categoria">{tema.especialidad}</span><strong>{tema.nombre}</strong><span className="resumen">{tema.resumen}</span></span><span className="flecha" aria-hidden="true">↗</span></button>)}
           {resultados.length === 0 && <div className="vacio"><span>⌕</span><strong>No encontramos resultados</strong><p>Prueba con otra palabra o selecciona “Todas” las especialidades.</p><button type="button" onClick={() => { setBusqueda(''); setEspecialidad('Todas') }}>Limpiar filtros</button></div>}
         </div>
       </section>

       <footer className="pie shell"><div className="pie-marca"><span className="simbolo simbolo-pequeno">+</span><div><strong>Manual Médico</strong><span>Una herramienta para aprender y consultar.</span></div></div><div className="pie-nota"><p>Material de apoyo para estudio. Verifica siempre la guía vigente y el protocolo institucional.</p><span>© MANUAL MÉDICO · VERSIÓN INICIAL</span></div></footer>

       {seleccionado && <div className="fondo-modal" onClick={() => setSeleccionado(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal" onClick={(e) => e.stopPropagation()}><div className="modal-cabecera"><span className="sobretitulo">{seleccionado.especialidad}</span><button className="cerrar" type="button" onClick={() => setSeleccionado(null)} aria-label="Cerrar ficha">×</button></div><div className="modal-intro"><span className="modal-etiqueta">FICHA CLÍNICA</span><h2 id="titulo-modal">{seleccionado.nombre}</h2><p>{seleccionado.resumen}</p></div><div className="modal-contenido"><ContenidoFicha nombre={seleccionado.nombre} /></div><div className="modal-pie"><span>Consulta siempre la versión vigente de las guías.</span><button className="boton-principal" type="button" onClick={() => setSeleccionado(null)}>Volver al manual <span>→</span></button></div></section></div>}
     </main>
   )
}

export default App
