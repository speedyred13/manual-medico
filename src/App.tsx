
import { useMemo, useState } from 'react'
import './App.css'

const temas = [
  { nombre: 'Cetoacidosis diabética', especialidad: 'Endocrinología', resumen: 'Diagnóstico, criterios de gravedad y manejo inicial.' },
  { nombre: 'Estado hiperosmolar', especialidad: 'Endocrinología', resumen: 'Evaluación de hiperglucemia grave y deshidratación.' },
  { nombre: 'Lesión renal aguda', especialidad: 'Nefrología', resumen: 'Clasificación, evaluación y abordaje inicial.' },
  { nombre: 'Neumonía adquirida en la comunidad', especialidad: 'Neumología', resumen: 'Evaluación clínica y estratificación de gravedad.' },
  { nombre: 'Cetoacidosis y estado mixto', especialidad: 'Urgencias', resumen: 'Reconocimiento de trastornos metabólicos combinados.' },
  { nombre: 'Hipertensión arterial', especialidad: 'Cardiología', resumen: 'Evaluación y principios del tratamiento.' },
]

const especialidades = ['Todas', 'Cardiología', 'Endocrinología', 'Nefrología', 'Neumología', 'Urgencias']

function App() {
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
    <main className="app">
      <header className="encabezado">
        <div className="marca">
          <div className="simbolo">+</div>
          <div>
            <span className="sobretitulo">CONSULTA CLÍNICA</span>
            <h1>Manual Médico</h1>
          </div>
        </div>
        <span className="etiqueta">EDICIÓN DE BOLSILLO</span>
      </header>

      <section className="bienvenida">
        <span className="sobretitulo">TU APOYO EN LA PRÁCTICA CLÍNICA</span>
        <h2>Conocimiento médico,<br />siempre a mano.</h2>
        <p>Consulta temas clínicos, repasa conceptos y encuentra información organizada por especialidad.</p>
        <label className="buscador">
          <span aria-hidden="true">⌕</span>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar enfermedad o tema..."
            aria-label="Buscar tema médico"
          />
          {busqueda && <button onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda">×</button>}
        </label>
      </section>

      <section className="seccion">
        <div className="titulo-seccion">
          <div>
            <span className="sobretitulo">EXPLORA EL MANUAL</span>
            <h2>Especialidades</h2>
          </div>
        </div>
        <div className="filtros">
          {especialidades.map((item) => (
            <button
              key={item}
              className={`filtro ${especialidad === item ? 'activo' : ''}`}
              onClick={() => setEspecialidad(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="seccion">
        <div className="titulo-seccion">
          <div>
            <span className="sobretitulo">BIBLIOTECA CLÍNICA</span>
            <h2>Temas médicos</h2>
          </div>
          <span className="contador">{resultados.length} temas</span>
        </div>

        <div className="lista-temas">
          {resultados.map((tema) => (
            <button className="tarjeta-tema" key={tema.nombre} onClick={() => setSeleccionado(tema)}>
              <span className="icono-tema">＋</span>
              <span className="contenido-tema">
                <span className="categoria">{tema.especialidad}</span>
                <strong>{tema.nombre}</strong>
                <span className="resumen">{tema.resumen}</span>
              </span>
              <span className="flecha" aria-hidden="true">›</span>
            </button>
          ))}
          {resultados.length === 0 && (
            <p className="vacio">No encontramos temas con esa búsqueda. Prueba con otra palabra.</p>
          )}
        </div>
      </section>

      <footer>
        <p>MANUAL MÉDICO · VERSIÓN INICIAL</p>
        <p>Contenido demostrativo. Verifica las guías clínicas vigentes antes de tomar decisiones asistenciales.</p>
      </footer>

      {seleccionado && (
        <div className="fondo-modal" onClick={() => setSeleccionado(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={() => setSeleccionado(null)} aria-label="Cerrar">×</button>
            <span className="sobretitulo">{seleccionado.especialidad}</span>
            <h2 id="titulo-modal">{seleccionado.nombre}</h2>
            <p>{seleccionado.resumen}</p>
            <div className="aviso">
              <strong>Ficha pendiente de revisión clínica</strong>
              <p>Esta versión solo contiene ejemplos de navegación. Aquí añadiremos definición, criterios diagnósticos, tratamiento, dosis cuando proceda y referencias verificables.</p>
            </div>
            <button className="boton-principal" onClick={() => setSeleccionado(null)}>Volver al manual</button>
          </section>
        </div>
      )}
    </main>
  )
}

export default App
