import assert from 'node:assert/strict'
import { temas } from '../src/data/catalogo.ts'
import { fichasClinicas } from '../src/data/fichas.ts'

const nombres = new Set(temas.map(t => t.nombre))
assert.equal(temas.length, 76, 'El catálogo debe conservar sus 76 temas')
assert.equal(nombres.size, 76, 'No debe haber nombres duplicados')
const faltantes = temas.filter(t => !fichasClinicas[t.nombre])
for (const [nombre, ficha] of Object.entries(fichasClinicas)) {
  assert(nombres.has(nombre), `Ficha fuera de catálogo: ${nombre}`)
  assert(ficha.alcance && ficha.actualizacion, `Falta alcance/fecha: ${nombre}`)
  assert(ficha.secciones.length >= 8, `Ficha demasiado breve: ${nombre}`)
  assert.equal(new Set(ficha.secciones.map(s => s.titulo)).size, ficha.secciones.length, `Secciones repetidas: ${nombre}`)
  assert(ficha.fuentes.length, `Sin bibliografía: ${nombre}`)
  for (const s of ficha.secciones) assert(s.titulo && (s.texto || s.puntos?.length), `Sección vacía: ${nombre}`)
  for (const f of ficha.fuentes) {
    assert.equal(new URL(f.url).protocol, 'https:', `Fuente no HTTPS: ${nombre}`)
    assert(f.titulo && f.nota, `Fuente sin contexto: ${nombre}`)
    assert(!/[?&](?:term|query)=/.test(f.url), `Bibliografía debe enlazar documento, no búsqueda: ${nombre}`)
  }
}
if (process.argv.includes('--complete')) assert.equal(faltantes.length, 0, `Faltan: ${faltantes.map(t => t.nombre).join(', ')}`)
console.log(`${Object.keys(fichasClinicas).length}/76 fichas con contenido. ${faltantes.length} pendientes.`)
