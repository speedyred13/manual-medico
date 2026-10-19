import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import './App.css'
import { temas } from './data/catalogo.ts'
import type { NombreTema } from './data/catalogo.ts'
import { fichasClinicas } from './data/fichas.ts'
import type { FichaClinica } from './data/types.ts'
import { CADReferenciaRapida } from './components/CADReferenciaRapida.tsx'

// Los filtros se generan automáticamente a partir de los temas.

const especialidades = [

   'Todas',

   ...new Set(temas.map((tema) => tema.especialidad)),

]



type IconName = 'dashboard' | 'book' | 'star' | 'clock' | 'layers' | 'graduation' | 'search' | 'moon' | 'sun' | 'menu' | 'arrow' | 'arrowRight' | 'shield' | 'activity' | 'sparkles' | 'check' | 'cross' | 'x' | 'chevron' | 'filter' | 'compass' | 'file' | 'heart'

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const content = {
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.4"/><rect x="14" y="3" width="7" height="5" rx="1.4"/><rect x="14" y="12" width="7" height="9" rx="1.4"/><rect x="3" y="16" width="7" height="5" rx="1.4"/></>,
    book: <><path d="M12 7c-2-2-5-3-9-2v14c4-1 7 0 9 2 2-2 5-3 9-2V5c-4-1-7 0-9 2Z"/><path d="M12 7v14"/></>,
    star: <path d="m12 2.6 2.9 6.1 6.7 1-4.8 4.7 1.1 6.7-5.9-3.2-5.9 3.2 1.1-6.7-4.8-4.7 6.7-1L12 2.6Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2.3"/></>,
    layers: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    graduation: <><path d="m2 9 10-5 10 5-10 5-10-5Z"/><path d="M6 11v5c3 3 9 3 12 0v-5M22 9v7"/></>,
    search: <><circle cx="10.8" cy="10.8" r="7.1"/><path d="m16 16 5 5"/></>,
    moon: <path d="M20.1 15.7A8.6 8.6 0 0 1 8.3 3.9 8.7 8.7 0 1 0 20.1 15.7Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    arrow: <><path d="M5 19 19 5M9 5h10v10"/></>,
    arrowRight: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
    shield: <><path d="m12 2 8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z"/><path d="m9 12 2 2 4-4"/></>,
    activity: <path d="M2 12h4l3-7 5.3 14 3.2-7H22"/>,
    sparkles: <><path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/><path d="m19 2 1 2.5L22.5 5.5 20 6.5 19 9l-1-2.5-2.5-1 2.5-1L19 2Z"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    cross: <path d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z"/>,
    x: <path d="M5 5 19 19M19 5 5 19"/>,
    chevron: <path d="m9 18 6-6-6-6"/>,
    filter: <><path d="M4 7h16M7 12h10m-7 5h4"/><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none"/></>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.7 8.3-2.5 5-5 2.4 2.5-5 5-2.4Z"/></>,
    file: <><path d="M6 2h8l4 4v16H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v5h5M8 12h8M8 16h8"/></>,
    heart: <path d="M20.2 5.6a5.3 5.3 0 0 0-7.5 0l-.7.7-.7-.7a5.3 5.3 0 0 0-7.5 7.5 5.3 5.3 0 0 0 0 7.5L12 21l8.2-7.9a5.3 5.3 0 0 0 0-7.5Z"/>
  } satisfies Record<IconName, ReactNode>

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {content[name]}
    </svg>
  )
}


function tituloCortoCAD(titulo: string) {
  if (/^definición y fisiopatología/i.test(titulo)) return 'Definición y fisiopatología'
  if (/desencadenantes/i.test(titulo)) return 'Desencadenantes'
  if (/criterios diagnósticos/i.test(titulo)) return 'Diagnóstico'
  if (/evaluación inicial/i.test(titulo)) return 'Evaluación inicial'
  if (/gravedad y sitio/i.test(titulo)) return 'Gravedad'
  if (/tratamiento: secuencia práctica/i.test(titulo)) return 'Tratamiento'
  if (/monitorización/i.test(titulo)) return 'Monitorización'
  if (/resolución y transición/i.test(titulo)) return 'Resolución'
  if (/errores clínicos/i.test(titulo)) return 'Errores frecuentes'
  return titulo
}

function FichaInteractivaCAD({ ficha }: { ficha: FichaClinica }) {
  // Un botón = un apartado clínico original; ninguna sección pertenece a otra.
  const [seleccion, setSeleccion] = useState<number | 'fuentes'>(() => {
    const diagnostico = ficha.secciones.findIndex((seccion) => /criterios diagnósticos/i.test(seccion.titulo))
    return diagnostico >= 0 ? diagnostico : 0
  })
  const panelRef = useRef<HTMLDivElement | null>(null)
  const navegacionRef = useRef<HTMLElement | null>(null)
  const total = ficha.secciones.length + 1
  const ordenActual = seleccion === 'fuentes' ? ficha.secciones.length : seleccion

  const cambiarApartado = (destino: number | 'fuentes') => {
    setSeleccion(destino)
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  const cambiarPorOrden = (orden: number) => {
    cambiarApartado(orden === ficha.secciones.length ? 'fuentes' : orden)
  }

  return (
    <div className="cad-unica">
      <nav className="cad-unica-navegacion" aria-label="Apartados de la ficha" ref={navegacionRef}>
        {ficha.secciones.map((seccion, indice) => (
          <button
            type="button"
            key={seccion.titulo}
            className={'cad-unica-boton' + (seleccion === indice ? ' activo' : '')}
            aria-pressed={seleccion === indice}
            onClick={() => cambiarApartado(indice)}
            title={seccion.titulo}
          >
            {tituloCortoCAD(seccion.titulo)}
          </button>
        ))}
        <button type="button" className={'cad-unica-boton' + (seleccion === 'fuentes' ? ' activo' : '')} aria-pressed={seleccion === 'fuentes'} onClick={() => cambiarApartado('fuentes')}>Bibliografía</button>
      </nav>

      <div className="cad-unica-panel ficha-clinica" ref={panelRef}>
        {seleccion === 'fuentes' ? (
          <section className="cad-unica-seccion" aria-label="Bibliografía y guías">
            <h2>Bibliografía y guías</h2>
            <ul className="fuentes-clinicas cad-unica-fuentes">
              {ficha.fuentes.map((fuente) => (
                <li key={fuente.url}>
                  <a href={fuente.url} target="_blank" rel="noreferrer">{fuente.titulo}<Icon name="arrow" size={15}/></a>
                  <p>{fuente.nota}</p>
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="cad-unica-seccion" aria-label={ficha.secciones[seleccion].titulo}>
            <h2>{ficha.secciones[seleccion].titulo}</h2>
            <CADReferenciaRapida seccion={ficha.secciones[seleccion]}/>
          </section>
        )}

        <div className="cad-unica-siguiente" aria-label="Cambiar de apartado">
          <button type="button" onClick={() => cambiarPorOrden(ordenActual - 1)} disabled={ordenActual === 0}><Icon name="arrowRight" size={16}/> Anterior</button>
          <span>{ordenActual + 1} de {total}</span>
          <button type="button" onClick={() => cambiarPorOrden(ordenActual + 1)} disabled={ordenActual === total - 1}>Siguiente <Icon name="arrowRight" size={16}/></button>
        </div>
        <button className="cad-unica-volver-apartados" type="button" onClick={() => navegacionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Ver todos los apartados ↑</button>
      </div>
    </div>
  )
}

function ContenidoFicha({ nombre }: { nombre: NombreTema }) {
  const ficha = fichasClinicas[nombre]
  if (!ficha) {
    return <div className="aviso"><strong>Ficha en desarrollo y verificación</strong><p>Este tema aún no cuenta con una ficha completa validada contra una GPC mexicana y una guía internacional vigente. No se muestran dosis ni recomendaciones terapéuticas como si estuvieran verificadas. La ficha se debe completar con diagnóstico, diagnóstico diferencial, tratamiento, monitorización, criterios de referencia y bibliografía trazable.</p></div>
  }
  if (nombre === 'Cetoacidosis diabética') return <FichaInteractivaCAD ficha={ficha}/>

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

   const [seleccionado, setSeleccionado] = useState<(typeof temas)[number] | null>(() => window.location.hash === '#/ficha/cetoacidosis-diabetica' ? temas.find((tema) => tema.nombre === 'Cetoacidosis diabética') ?? null : null)
   const [menuAbierto, setMenuAbierto] = useState(false)
   const [navActivo, setNavActivo] = useState<'inicio' | 'biblioteca' | 'favoritos' | 'recientes'>('inicio')
   const buscadorRef = useRef<HTMLInputElement>(null)
   const posicionBiblioteca = useRef(0)
   useEffect(() => {
     const actualizarRuta = () => {
       if (window.location.hash === '#/ficha/cetoacidosis-diabetica') {
         const tema = temas.find((entrada) => entrada.nombre === 'Cetoacidosis diabética')
         if (tema) setSeleccionado(tema)
         window.scrollTo({ top: 0, behavior: 'instant' })
       } else {
         setSeleccionado((actual) => actual?.nombre === 'Cetoacidosis diabética' ? null : actual)
         requestAnimationFrame(() => window.scrollTo({ top: posicionBiblioteca.current, behavior: 'instant' }))
       }
     }
     window.addEventListener('popstate', actualizarRuta)
     window.addEventListener('hashchange', actualizarRuta)
     return () => { window.removeEventListener('popstate', actualizarRuta); window.removeEventListener('hashchange', actualizarRuta) }
   }, [])

   useEffect(() => {
     const manejarAtajos = (evento: KeyboardEvent) => {
       if ((evento.metaKey || evento.ctrlKey) && evento.key.toLowerCase() === 'k') {
         evento.preventDefault()
         buscadorRef.current?.focus()
       }
       if (evento.key === 'Escape') {
         setMenuAbierto(false)
         setSeleccionado((actual) => actual?.nombre === 'Cetoacidosis diabética' ? actual : null)
       }
     }
     document.addEventListener('keydown', manejarAtajos)
     return () => document.removeEventListener('keydown', manejarAtajos)
   }, [])



   // Preferencias de estudio, independientes del contenido médico.
   const [favoritos, setFavoritos] = useState<NombreTema[]>(() => {
     try {
       const guardados: unknown = JSON.parse(localStorage.getItem('manual-medico-favoritos') || '[]')
       return Array.isArray(guardados)
         ? guardados.filter((nombre): nombre is NombreTema => typeof nombre === 'string' && temas.some((tema) => tema.nombre === nombre))
         : []
     } catch { return [] }
   })
   const [recientes, setRecientes] = useState<NombreTema[]>(() => {
     try {
       const guardados: unknown = JSON.parse(localStorage.getItem('manual-medico-recientes') || '[]')
       return Array.isArray(guardados)
         ? guardados.filter((nombre): nombre is NombreTema => typeof nombre === 'string' && temas.some((tema) => tema.nombre === nombre)).slice(0, 5)
         : []
     } catch { return [] }
   })
   useEffect(() => {
     try { localStorage.setItem('manual-medico-favoritos', JSON.stringify(favoritos)) } catch { /* almacenamiento opcional */ }
   }, [favoritos])
   useEffect(() => {
     try { localStorage.setItem('manual-medico-recientes', JSON.stringify(recientes)) } catch { /* almacenamiento opcional */ }
   }, [recientes])
   const abrirFicha = (tema: (typeof temas)[number]) => {
     if (tema.nombre === 'Cetoacidosis diabética') {
       posicionBiblioteca.current = window.scrollY
       if (window.location.hash !== '#/ficha/cetoacidosis-diabetica') window.history.pushState({ manualCAD: true }, '', '#/ficha/cetoacidosis-diabetica')
       window.scrollTo({ top: 0, behavior: 'instant' })
     }
     setSeleccionado(tema)
     setRecientes((actual) => [tema.nombre, ...actual.filter((nombre) => nombre !== tema.nombre)].slice(0, 5))
   }
   const volverDeCAD = () => {
     if (window.history.state?.manualCAD) window.history.back()
     else {
       window.history.replaceState(null, '', '#biblioteca')
       setSeleccionado(null)
       window.scrollTo({ top: 0, behavior: 'instant' })
     }
   }
   const alternarFavorito = (nombre: NombreTema) => {
     setFavoritos((actual) => actual.includes(nombre) ? actual.filter((item) => item !== nombre) : [...actual, nombre])
   }
   const abrirPorNombre = (nombre: NombreTema) => {
     const tema = temas.find((item) => item.nombre === nombre)
     if (tema) abrirFicha(tema)
   }
   const accesosRapidos = ['Cetoacidosis diabética', 'Diabetes mellitus tipo 2', 'Sepsis y choque'] as const

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

   const tituloSeccion = {
     inicio: 'Panel principal',
     biblioteca: 'Biblioteca clínica',
     favoritos: 'Mis favoritos',
     recientes: 'Consultas recientes'
   }[navActivo]

   if (seleccionado?.nombre === 'Cetoacidosis diabética') {
     const fichaCAD = fichasClinicas['Cetoacidosis diabética']
     return (
       <main className={'app tema-' + temaVisual + ' cad-pagina'} id="cad-pagina">
         <header className="cad-pagina-barra">
           <button type="button" className="cad-pagina-volver" onClick={volverDeCAD} aria-label="Volver al manual"><Icon name="arrowRight" size={18}/> <span>Volver al manual</span></button>
           <span className="cad-pagina-marca"><span className="cad-pagina-cruz"><Icon name="cross" size={15}/></span>Manual Médico</span>
           <button type="button" className="cad-pagina-tema" onClick={() => setTemaVisual((actual) => actual === 'claro' ? 'oscuro' : 'claro')} aria-label={temaVisual === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'}><Icon name={temaVisual === 'claro' ? 'moon' : 'sun'} size={19}/></button>
         </header>
         <div className="cad-pagina-contenedor">
           <header className="cad-pagina-encabezado">
             <p className="cad-pagina-ruta">Biblioteca clínica <span>/</span> Endocrinología</p>
             <h1>Cetoacidosis diabética</h1>

           </header>
           <FichaInteractivaCAD ficha={fichaCAD}/>
         </div>
       </main>
     )
   }

   return (
     <main className={'app tema-' + temaVisual}>
       {menuAbierto && <button className="sidebar-scrim" aria-label="Cerrar menú de navegación" type="button" onClick={() => setMenuAbierto(false)} />}
       <div className="app-layout">
         <aside className={'app-sidebar' + (menuAbierto ? ' is-open' : '')} id="navegacion-lateral" aria-label="Navegación principal">
           <a className="sidebar-brand" href="#inicio-dashboard" onClick={() => { setNavActivo('inicio'); setMenuAbierto(false) }}>
             <span className="sidebar-logo"><Icon name="cross" size={23}/></span>
             <span className="sidebar-brand-copy"><strong>Manual <em>Médico</em></strong><small>PLATAFORMA CLÍNICA</small></span>
           </a>

           <div className="sidebar-group">
             <span className="sidebar-group-label">ESPACIO DE TRABAJO</span>
             <nav className="sidebar-navigation" aria-label="Secciones del manual">
               <a className={'sidebar-link' + (navActivo === 'inicio' ? ' active' : '')} href="#inicio-dashboard" onClick={() => { setNavActivo('inicio'); setMenuAbierto(false) }} aria-current={navActivo === 'inicio' ? 'page' : undefined}><Icon name="dashboard"/> <span>Inicio</span><Icon name="chevron" size={16}/></a>
               <a className={'sidebar-link' + (navActivo === 'biblioteca' ? ' active' : '')} href="#biblioteca" onClick={() => { setNavActivo('biblioteca'); setMenuAbierto(false) }} aria-current={navActivo === 'biblioteca' ? 'page' : undefined}><Icon name="book"/> <span>Biblioteca clínica</span><span className="sidebar-number">{temas.length}</span></a>
               <a className={'sidebar-link' + (navActivo === 'favoritos' ? ' active' : '')} href="#favoritos-dashboard" onClick={() => { setNavActivo('favoritos'); setMenuAbierto(false) }} aria-current={navActivo === 'favoritos' ? 'page' : undefined}><Icon name="star"/> <span>Mis favoritos</span><span className="sidebar-number">{favoritos.length}</span></a>
               <a className={'sidebar-link' + (navActivo === 'recientes' ? ' active' : '')} href="#recientes-dashboard" onClick={() => { setNavActivo('recientes'); setMenuAbierto(false) }} aria-current={navActivo === 'recientes' ? 'page' : undefined}><Icon name="clock"/> <span>Consultas recientes</span></a>
             </nav>
           </div>

           <div className="sidebar-group sidebar-second-group">
             <span className="sidebar-group-label">HERRAMIENTAS</span>
             <a className="sidebar-link sidebar-sub-link" href="#especialidades" onClick={() => setMenuAbierto(false)}><Icon name="layers"/> <span>Especialidades</span><Icon name="chevron" size={16}/></a>
             <div className="sidebar-link sidebar-disabled"><Icon name="graduation"/> <span>Modo estudio</span><span className="sidebar-soon">PRÓX.</span></div>
           </div>

           <div className="sidebar-spacer"/>
           <div className="sidebar-feature">
             <div className="sidebar-feature-top"><span className="sidebar-feature-icon"><Icon name="sparkles" size={18}/></span><span>CRECIMIENTO CONTINUO</span></div>
             <strong>Tu biblioteca médica,<br/>siempre a la mano.</strong>
             <p>Consulta, guarda y retoma los temas de cada rotación.</p>
             <div className="sidebar-feature-progress"><span style={{ width: (Object.keys(fichasClinicas).length / temas.length) * 100 + '%' }}/></div>
             <span className="sidebar-feature-small">{Object.keys(fichasClinicas).length} de {temas.length} fichas con contenido</span>
           </div>
           <div className="sidebar-footer"><Icon name="shield" size={16}/><span>Contenido para estudio clínico</span></div>
         </aside>

         <div className="workspace">
           <header className="workspace-topbar">
             <div className="workspace-location">
               <button className="menu-toggle" type="button" aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuAbierto} aria-controls="navegacion-lateral" onClick={() => setMenuAbierto((actual) => !actual)}><Icon name={menuAbierto ? 'x' : 'menu'} size={22}/></button>
               <span className="workspace-location-icon"><Icon name="dashboard" size={18}/></span>
               <div><span className="workspace-breadcrumb">ESPACIO DE CONSULTA <span>/</span></span><strong>{tituloSeccion}</strong></div>
             </div>
             <div className="workspace-topbar-actions">
               <div className="search-container">
                 <label className="buscador">
                   <span className="icono-busqueda"><Icon name="search" size={19}/></span>
                   <input ref={buscadorRef} value={busqueda} onChange={(evento) => setBusqueda(evento.target.value)} placeholder="Buscar enfermedades, signos o temas..." aria-label="Buscar tema médico" autoComplete="off"/>
                   {busqueda && <button type="button" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda"><Icon name="x" size={17}/></button>}
                   <kbd>⌘ K</kbd>
                 </label>
                 {busqueda.trim() && <div className="search-suggestions" role="status" aria-live="polite">
                   <span className="search-suggestions-label">{resultados.length} RESULTADOS</span>
                   {resultados.slice(0, 5).map((tema) => <button type="button" key={tema.nombre} onClick={() => abrirFicha(tema)}><span className="search-result-icon"><Icon name="file" size={16}/></span><span><strong>{tema.nombre}</strong><small>{tema.especialidad}</small></span><Icon name="arrow" size={15}/></button>)}
                   {resultados.length === 0 && <p>No hay coincidencias. Prueba con otro término.</p>}
                   {resultados.length > 5 && <a href="#biblioteca" onClick={() => setNavActivo('biblioteca')}>Ver los {resultados.length} resultados <Icon name="arrowRight" size={15}/></a>}
                 </div>}
               </div>
               <button className="boton-tema" type="button" onClick={() => setTemaVisual((actual) => actual === 'claro' ? 'oscuro' : 'claro')} aria-label={temaVisual === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'} title={temaVisual === 'claro' ? 'Activar modo oscuro' : 'Activar modo claro'}><Icon name={temaVisual === 'claro' ? 'moon' : 'sun'} size={19}/></button>
             </div>
           </header>

           <div className="workspace-content">
             <section className="dashboard shell" id="inicio-dashboard" aria-labelledby="dashboard-titulo">
               <div className="dashboard-intro"><div><span className="dashboard-kicker"><span className="kicker-dot"/> TU CENTRO DE CONOCIMIENTO</span><h1>Buenos momentos para <em>seguir aprendiendo.</em></h1><p>Tu espacio para consultar, repasar y dominar la medicina clínica.</p></div><span className="dashboard-intro-mark"><Icon name="sparkles" size={20}/></span></div>

               <div className="dashboard-hero">
                 <div className="hero-pattern"/>
                 <div className="hero-copy">
                   <span className="hero-eyebrow"><span className="hero-live-dot"/> BIBLIOTECA CLÍNICA DIGITAL</span>
                   <h2 id="dashboard-titulo">Conocimiento que <br/><em>te acompaña.</em></h2>
                   <p>Todo lo que necesitas para estudiar, consultar y tomar decisiones mejor informadas, organizado en un solo lugar.</p>
                   <div className="hero-actions">
                     <a className="hero-primary" href="#biblioteca" onClick={() => setNavActivo('biblioteca')}>Explorar biblioteca <Icon name="arrowRight" size={17}/></a>
                     <button type="button" className="hero-secondary" onClick={() => abrirPorNombre('Cetoacidosis diabética')}><Icon name="book" size={17}/> Abrir ficha destacada</button>
                   </div>
                   <div className="hero-caption"><Icon name="shield" size={15}/> Bibliografía y guías incluidas en las fichas</div>
                 </div>
                 <div className="hero-visual" aria-hidden="true">
                   <span className="hero-halo hero-halo-one"/><span className="hero-halo hero-halo-two"/>
                   <div className="hero-glass">
                     <span className="hero-glass-symbol"><Icon name="activity" size={30}/></span>
                     <span className="hero-glass-label">BIBLIOTECA MÉDICA</span>
                     <strong>{temas.length}</strong>
                     <span className="hero-glass-foot">temas para explorar</span>
                     <div className="hero-glass-line"/>
                     <div className="hero-glass-stats"><span><Icon name="layers" size={14}/> {especialidades.length - 1} especialidades</span><Icon name="check" size={17}/></div>
                   </div>
                   <div className="hero-floating hero-floating-first"><Icon name="book" size={17}/><span>Consulta clínica</span><Icon name="check" size={15}/></div>
                   <div className="hero-floating hero-floating-second"><Icon name="star" size={15}/><span>Tu espacio personal</span></div>
                 </div>
               </div>

               <div className="dashboard-metricas" aria-label="Estadísticas del manual">
                 <div className="dashboard-metrica"><span className="metric-icon metric-blue"><Icon name="book" size={21}/></span><div><span className="metric-label">Temas disponibles</span><strong>{temas.length}</strong><small>En tu biblioteca</small></div><span className="metric-arrow"><Icon name="arrow" size={16}/></span></div>
                 <div className="dashboard-metrica"><span className="metric-icon metric-violet"><Icon name="layers" size={21}/></span><div><span className="metric-label">Especialidades</span><strong>{especialidades.length - 1}</strong><small>Áreas de conocimiento</small></div><span className="metric-arrow"><Icon name="arrow" size={16}/></span></div>
                 <div className="dashboard-metrica"><span className="metric-icon metric-cyan"><Icon name="file" size={21}/></span><div><span className="metric-label">Fichas clínicas</span><strong>{Object.keys(fichasClinicas).length}</strong><small>Con contenido y fuentes</small></div><span className="metric-arrow"><Icon name="arrow" size={16}/></span></div>
                 <div className="dashboard-metrica"><span className="metric-icon metric-amber"><Icon name="star" size={21}/></span><div><span className="metric-label">Mis favoritos</span><strong>{favoritos.length}</strong><small>Guardados en este dispositivo</small></div><span className="metric-arrow"><Icon name="arrow" size={16}/></span></div>
               </div>

               <div className="dashboard-section-heading"><div><span className="section-eyebrow">ACCESO INMEDIATO</span><h2>Empieza por aquí</h2></div><a href="#biblioteca" onClick={() => setNavActivo('biblioteca')}>Ver biblioteca <Icon name="arrowRight" size={17}/></a></div>
               <div className="dashboard-quick-grid">
                 {accesosRapidos.map((nombre, indice) => <button className="quick-card" key={nombre} type="button" onClick={() => abrirPorNombre(nombre)}>
                   <span className="quick-card-top"><span className={'quick-card-icon quick-card-tone-' + indice}><Icon name={indice === 0 ? 'activity' : indice === 1 ? 'layers' : 'shield'} size={21}/></span><span className="quick-card-arrow"><Icon name="arrow" size={17}/></span></span>
                   <span className="quick-card-specialty">{temas.find((tema) => tema.nombre === nombre)?.especialidad}</span>
                   <strong>{nombre}</strong>
                   <span className="quick-card-foot">Consultar ficha <Icon name="arrowRight" size={15}/></span>
                 </button>)}
               </div>

               <div className="dashboard-paneles">
                 <section className="dashboard-panel" id="favoritos-dashboard">
                   <div className="dashboard-panel-cabecera"><span className="panel-title-icon"><Icon name="star" size={20}/></span><div><span className="section-eyebrow">TU COLECCIÓN</span><h3>Mis favoritos</h3></div><span className="panel-count">{favoritos.length}</span></div>
                   {favoritos.length ? <div className="dashboard-enlaces">{favoritos.map((nombre) => <button type="button" key={nombre} onClick={() => abrirPorNombre(nombre)}><span className="list-entry-icon"><Icon name="book" size={17}/></span><span>{nombre}</span><Icon name="arrow" size={16}/></button>)}</div> : <div className="dashboard-empty"><Icon name="heart" size={27}/><strong>Tu biblioteca personal comienza aquí</strong><p>Pulsa la estrella de cualquier tema para guardarlo y encontrarlo fácilmente.</p></div>}
                 </section>
                 <section className="dashboard-panel" id="recientes-dashboard">
                   <div className="dashboard-panel-cabecera"><span className="panel-title-icon recent-icon"><Icon name="clock" size={20}/></span><div><span className="section-eyebrow">DONDE LO DEJASTE</span><h3>Consultas recientes</h3></div><span className="panel-count">{recientes.length}/5</span></div>
                   {recientes.length ? <div className="dashboard-enlaces">{recientes.map((nombre) => <button type="button" key={nombre} onClick={() => abrirPorNombre(nombre)}><span className="list-entry-icon"><Icon name="file" size={17}/></span><span>{nombre}</span><Icon name="arrow" size={16}/></button>)}</div> : <div className="dashboard-empty"><Icon name="clock" size={27}/><strong>Retoma donde lo dejaste</strong><p>Las últimas cinco fichas que consultes aparecerán automáticamente aquí.</p></div>}
                 </section>
               </div>
             </section>

             <section className="seccion shell seccion-especialidades" id="especialidades">
               <div className="titulo-seccion"><div><span className="section-eyebrow">BIBLIOTECA / ÁREAS CLÍNICAS</span><h2>Explora por especialidad</h2><p>Elige un área para filtrar la biblioteca y profundizar en sus temas.</p></div><div className="section-icon"><Icon name="compass" size={21}/></div></div>
               <div className="filtros">{especialidades.map((item, indice) => <button key={item} type="button" className={'filtro' + (especialidad === item ? ' activo' : '')} onClick={() => { setEspecialidad(item); setNavActivo('biblioteca') }} aria-pressed={especialidad === item}><span className="filtro-icono">{indice === 0 ? <Icon name="layers" size={15}/> : <Icon name="file" size={15}/>}</span>{item}</button>)}</div>
             </section>

             <section className="seccion shell biblioteca" id="biblioteca">
               <div className="titulo-seccion titulo-biblioteca"><div><span className="section-eyebrow">CONSULTA Y APRENDIZAJE</span><h2>Biblioteca médica</h2><p>Información clínica organizada, con secciones y referencias dentro de cada ficha.</p></div><span className="contador"><Icon name="file" size={17}/><strong>{resultados.length}</strong> {resultados.length === 1 ? 'tema' : 'temas'}</span></div>
               <div className="lista-temas">{resultados.map((tema, indice) => <div className="tarjeta-contenedor" key={tema.nombre}>
                 <button className="tarjeta-tema" type="button" onClick={() => abrirFicha(tema)}>
                   <span className="icono-tema" aria-hidden="true"><Icon name="file" size={21}/></span>
                   <span className="contenido-tema"><span className="categoria"><span className="category-dot"/>{tema.especialidad}</span><strong>{tema.nombre}</strong><span className="resumen">{tema.resumen}</span><span className="card-bottom"><span>VER FICHA CLÍNICA</span><Icon name="arrowRight" size={15}/></span></span>
                   <span className="card-number" aria-hidden="true">{String(indice + 1).padStart(2, '0')}</span>
                 </button>
                 <button type="button" className={'favorito-boton' + (favoritos.includes(tema.nombre) ? ' es-favorito' : '')} onClick={() => alternarFavorito(tema.nombre)} aria-label={(favoritos.includes(tema.nombre) ? 'Quitar de favoritos' : 'Agregar a favoritos') + ': ' + tema.nombre} aria-pressed={favoritos.includes(tema.nombre)} title={favoritos.includes(tema.nombre) ? 'Quitar de favoritos' : 'Agregar a favoritos'}><Icon name="star" size={17}/></button>
               </div>)}
                 {resultados.length === 0 && <div className="vacio"><Icon name="search" size={34}/><strong>No encontramos resultados</strong><p>Prueba con otra palabra o selecciona “Todas” las especialidades.</p><button type="button" onClick={() => { setBusqueda(''); setEspecialidad('Todas') }}>Limpiar filtros</button></div>}
               </div>
             </section>

             <footer className="pie shell"><div className="pie-marca"><span className="footer-mark"><Icon name="cross" size={18}/></span><div><strong>Manual Médico</strong><span>Conocimiento que te acompaña en cada rotación.</span></div></div><div className="pie-nota"><p>Material de apoyo para estudio. Verifica siempre las guías vigentes y los protocolos institucionales.</p><span>© MANUAL MÉDICO · BIBLIOTECA CLÍNICA</span></div></footer>
           </div>
         </div>
       </div>

       {seleccionado && <div className="fondo-modal" onClick={() => setSeleccionado(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal" onClick={(evento) => evento.stopPropagation()}><div className="modal-cabecera"><span className="sobretitulo">{seleccionado.especialidad}</span><button className="cerrar" type="button" onClick={() => setSeleccionado(null)} aria-label="Cerrar ficha"><Icon name="x" size={20}/></button></div><div className="modal-intro"><span className="modal-etiqueta">FICHA CLÍNICA</span><h2 id="titulo-modal">{seleccionado.nombre}</h2><p>{seleccionado.resumen}</p></div><div className="modal-contenido"><ContenidoFicha nombre={seleccionado.nombre}/></div><div className="modal-pie"><span>Consulta siempre la versión vigente de las guías.</span><button className="boton-principal" type="button" onClick={() => setSeleccionado(null)}>Volver al manual <Icon name="arrowRight" size={17}/></button></div></section></div>}
     </main>
   )
}

export default App
