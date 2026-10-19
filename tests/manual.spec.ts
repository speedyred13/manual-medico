import { expect, test } from '@playwright/test'
import { temas } from '../src/data/catalogo.ts'
import { fichasClinicas } from '../src/data/fichas.ts'

// Solo para entornos que bloquean la hoja externa de Google Fonts; no altera la app.
test.beforeEach(async ({ page }) => {
  if (process.env.MANUAL_MEDICO_OFFLINE_FONTS === '1') {
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }))
  }
})

test('las 76 fichas abren completas, se desplazan y cierran sin errores', async ({ page }, testInfo) => {
  const errores: string[] = []
  page.on('pageerror', error => errores.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errores.push(message.text()) })
  await page.goto('/')
  if (testInfo.project.name === 'movil') await page.getByLabel('Activar modo oscuro').click()
  await expect(page.locator('.tarjeta-tema')).toHaveCount(76)
  for (let i = 0; i < temas.length; i++) {
    const tema = temas[i]
    const ficha = fichasClinicas[tema.nombre]
    await page.locator('.tarjeta-tema').nth(i).click()
    const ventana = page.getByRole('dialog')
    await expect(ventana.getByRole('heading', { name: tema.nombre, exact: true })).toBeVisible()
    await expect(ventana.locator('.ficha-clinica section')).toHaveCount(ficha.secciones.length)
    await expect(ventana.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
    await expect(ventana.getByText('Ficha en desarrollo y verificación')).toHaveCount(0)
    for (const enlace of await ventana.locator('.fuentes-clinicas a').all()) {
      expect(await enlace.getAttribute('href')).toMatch(/^https:\/\//)
      await expect(enlace).toHaveAttribute('target', '_blank')
    }
    expect(await ventana.locator('.modal-contenido').evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true)
    await ventana.getByRole('heading', { name: 'Bibliografía y guías' }).scrollIntoViewIfNeeded()
    await expect(ventana.getByRole('heading', { name: 'Bibliografía y guías' })).toBeVisible()
    if (tema.nombre === 'Diabetes mellitus tipo 2') await page.screenshot({ path: testInfo.outputPath('diabetes-bibliografia.png'), animations: 'disabled' })
    await ventana.getByLabel('Cerrar ficha').click()
    await expect(ventana).toHaveCount(0)
  }
  expect(errores).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
})

test('los filtros, búsqueda combinada y estado vacío conservan su comportamiento', async ({ page }) => {
  await page.goto('/')
  for (const especialidad of new Set(temas.map(t => t.especialidad))) {
    await page.locator('.filtro').filter({ hasText: especialidad }).click()
    await expect(page.locator('.tarjeta-tema')).toHaveCount(temas.filter(t => t.especialidad === especialidad).length)
  }
  await page.locator('.filtro').filter({ hasText: 'Endocrinología' }).click()
  await page.getByLabel('Buscar tema médico').fill('  CETOACIDOSIS  ')
  await expect(page.locator('.tarjeta-tema')).toHaveCount(2)
  await page.locator('.filtro').filter({ hasText: 'Pediatría' }).click()
  await expect(page.getByText('No encontramos resultados')).toBeVisible()
  await page.getByRole('button', { name: 'Limpiar filtros' }).click()
  await expect(page.getByLabel('Buscar tema médico')).toHaveValue('')
  await expect(page.locator('.tarjeta-tema')).toHaveCount(76)
  await page.getByLabel('Buscar tema médico').fill('diabetes')
  await page.getByLabel('Limpiar búsqueda').click()
  await expect(page.locator('.tarjeta-tema')).toHaveCount(76)
})

test('claro y oscuro persisten y mantienen ventanas utilizables', async ({ page }, testInfo) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'claro')
  await page.screenshot({ path: testInfo.outputPath('inicio-claro.png'), animations: 'disabled' })
  await page.getByLabel('Activar modo oscuro').click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'oscuro')
  await page.screenshot({ path: testInfo.outputPath('inicio-oscuro.png'), animations: 'disabled' })
  await page.getByLabel('Buscar tema médico').fill('Diabetes mellitus tipo 2')
  await page.locator('.tarjeta-tema').click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: /Volver al manual/ }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await page.getByLabel('Activar modo claro').click()
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'claro')
})


test('cetoacidosis despliega la vista interactiva y conserva todos sus apartados', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()
  const ventana = page.getByRole('dialog')
  const ficha = fichasClinicas['Cetoacidosis diabética']

  await expect(ventana.locator('.ficha-premium-layout')).toBeVisible()
  await expect(ventana.locator('.ficha-clinica section')).toHaveCount(ficha.secciones.length)
  await expect(ventana.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
  const primera = ventana.locator('.ficha-premium-seccion').first()
  const abrirPrimera = primera.getByRole('button', { name: /Definición y fisiopatología/i })
  await expect(abrirPrimera).toHaveAttribute('aria-expanded', 'true')
  await abrirPrimera.click()
  await expect(abrirPrimera).toHaveAttribute('aria-expanded', 'false')
  await expect(primera.locator('.ficha-premium-seccion-contenido')).toBeHidden()
  await abrirPrimera.click()
  await expect(abrirPrimera).toHaveAttribute('aria-expanded', 'true')

  await ventana.getByRole('button', { name: 'Contraer todas' }).click()
  await expect(ventana.locator('.ficha-premium-seccion button[aria-expanded="false"]')).toHaveCount(ficha.secciones.length)
  await ventana.getByRole('button', { name: 'Expandir todas' }).click()
  await expect(ventana.locator('.ficha-premium-seccion button[aria-expanded="true"]')).toHaveCount(ficha.secciones.length)

  const indice = ventana.getByRole('navigation', { name: 'Ir a una sección' })
  await indice.getByRole('button', { name: /Bibliografía y guías/ }).click()
  await expect(ventana.getByRole('heading', { name: 'Bibliografía y guías' })).toBeVisible()

  await ventana.getByLabel('Cerrar ficha').click()
  await page.getByRole('button', { name: /Diabetes mellitus tipo 2/ }).last().click()
  await expect(page.getByRole('dialog').locator('.ficha-premium-layout')).toHaveCount(0)
});


test('panel clínico CAD muestra tablas y algoritmo sin alterar texto fuente', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()
  const ventana = page.getByRole('dialog')
  const panel = ventana.locator('.cad-rapida')
  const datos = fichasClinicas['Cetoacidosis diabética']
  const criterios = datos.secciones.find(s => /criterios diagnósticos/i.test(s.titulo))?.puntos ?? []
  const tratamiento = datos.secciones.find(s => /tratamiento: secuencia práctica/i.test(s.titulo))?.puntos ?? []
  const monitorizacion = datos.secciones.find(s => /monitorización durante tratamiento/i.test(s.titulo))?.puntos ?? []
  const resolucion = datos.secciones.find(s => /resolución y transición/i.test(s.titulo))?.puntos ?? []
  const errores = datos.secciones.find(s => /errores clínicos/i.test(s.titulo))?.puntos ?? []

  await expect(panel).toBeVisible()
  const barra = panel.getByRole('group', { name: 'Vista rápida de cetoacidosis' })
  await expect(barra.getByRole('button', { name: /Diagnóstico/ })).toHaveAttribute('aria-pressed', 'true')
  const tablaDiagnostico = panel.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })
  await expect(tablaDiagnostico.locator('tbody tr')).toHaveCount(3)
  for (const criterio of criterios.slice(0, 3)) await expect(tablaDiagnostico).toContainText(criterio)

  await barra.getByRole('button', { name: /Algoritmo terapéutico/ }).click()
  await expect(barra.getByRole('button', { name: /Algoritmo terapéutico/ })).toHaveAttribute('aria-pressed', 'true')
  const pasos = panel.locator('.cad-algoritmo-paso')
  await expect(pasos).toHaveCount(tratamiento.length)
  for (let i = 0; i < tratamiento.length; i++) await expect(pasos.nth(i)).toContainText(tratamiento[i])

  await barra.getByRole('button', { name: /Vigilancia y resolución/ }).click()
  await expect(panel.getByRole('table', { name: 'Tabla de monitorización durante el tratamiento' }).locator('tbody tr')).toHaveCount(monitorizacion.length)
  await expect(panel.locator('.cad-resolucion-item')).toHaveCount(resolucion.length)
  await barra.getByRole('button', { name: /Errores a evitar/ }).click()
  await expect(panel.locator('.cad-alerta')).toHaveCount(errores.length)

  await ventana.getByRole('navigation', { name: 'Ir a una sección' })
    .getByRole('button', { name: /Vista rápida: tablas y algoritmos/ }).click()
  await expect(panel).toBeVisible()
  await expect(ventana.locator('.ficha-premium-seccion')).toHaveCount(datos.secciones.length)
  await expect(ventana.locator('.fuentes-clinicas a')).toHaveCount(datos.fuentes.length)
  await ventana.getByLabel('Cerrar ficha').click()
})


test('la consulta rápida de CAD genera tablas y algoritmo sin modificar sus datos clínicos', async ({ page }, testInfo) => {
  const ficha = fichasClinicas['Cetoacidosis diabética']
  const diagnostico = ficha.secciones.find((seccion) => /criterios diagnósticos/i.test(seccion.titulo))!
  const tratamiento = ficha.secciones.find((seccion) => /tratamiento: secuencia práctica/i.test(seccion.titulo))!
  const vigilancia = ficha.secciones.find((seccion) => /monitorización durante tratamiento/i.test(seccion.titulo))!
  const errores = ficha.secciones.find((seccion) => /errores clínicos/i.test(seccion.titulo))!

  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()
  const dialogo = page.getByRole('dialog')
  const panel = dialogo.locator('.cad-rapida')
  await expect(panel).toBeVisible()
  await expect(panel.locator('.cad-criterio-tarjeta')).toHaveCount(3)
  await expect(panel.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' }).locator('tbody tr')).toHaveCount(3)
  for (const punto of diagnostico.puntos!.slice(0, 3)) {
    await expect(panel.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })).toContainText(punto)
  }

  await panel.getByRole('button', { name: /Algoritmo terapéutico/ }).click()
  await expect(panel.locator('.cad-algoritmo-paso')).toHaveCount(tratamiento.puntos!.length)
  for (let indice = 0; indice < tratamiento.puntos!.length; indice++) {
    await expect(panel.locator('.cad-algoritmo-paso').nth(indice)).toContainText(tratamiento.puntos![indice])
  }
  await panel.getByRole('button', { name: 'Tabla terapéutica' }).click()
  const tablaTratamiento = panel.getByRole('table', { name: 'Tabla de tratamiento de cetoacidosis' })
  await expect(tablaTratamiento.locator('tbody tr')).toHaveCount(tratamiento.puntos!.length)
  for (const punto of tratamiento.puntos!) await expect(tablaTratamiento).toContainText(punto)

  await panel.getByRole('button', { name: /Vigilancia y resolución/ }).click()
  await expect(panel.getByRole('table', { name: 'Tabla de monitorización durante el tratamiento' }).locator('tbody tr')).toHaveCount(vigilancia.puntos!.length)
  await panel.getByRole('button', { name: /Errores a evitar/ }).click()
  await expect(panel.locator('.cad-alerta')).toHaveCount(errores.puntos!.length)

  // La vista rápida no reemplaza las nueve secciones originales ni los enlaces a las fuentes.
  await expect(dialogo.locator('.ficha-premium-seccion')).toHaveCount(ficha.secciones.length)
  await expect(dialogo.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
  for (let indice = 0; indice < ficha.secciones.length; indice++) {
    const contenido = dialogo.locator('.ficha-premium-seccion').nth(indice).locator('.ficha-premium-seccion-contenido')
    const seccion = ficha.secciones[indice]
    if (seccion.texto) await expect(contenido).toContainText(seccion.texto)
    for (const punto of seccion.puntos ?? []) await expect(contenido).toContainText(punto)
  }

  const indice = dialogo.getByRole('navigation', { name: 'Ir a una sección' })
  await indice.getByRole('button', { name: /Vista rápida: tablas y algoritmos/ }).click()
  await expect(panel).toBeVisible()
  await page.screenshot({ path: testInfo.outputPath('cad-consulta-rapida.png'), animations: 'disabled' })
});
