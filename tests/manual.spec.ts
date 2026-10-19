import { expect, test } from '@playwright/test'
import { temas } from '../src/data/catalogo.ts'
import { fichasClinicas } from '../src/data/fichas.ts'

// Solo para entornos que bloquean la hoja externa de Google Fonts; no altera la app.
test.beforeEach(async ({ page }) => {
  if (process.env.MANUAL_MEDICO_OFFLINE_FONTS === '1') {
    await page.route('https://fonts.googleapis.com/**', route => route.fulfill({ contentType: 'text/css', body: '' }))
  }
})

test('las 76 fichas abren completas, se leen y regresan sin errores', async ({ page }, testInfo) => {
  const errores: string[] = []
  page.on('pageerror', error => errores.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errores.push(message.text()) })
  await page.goto('/')
  if (testInfo.project.name === 'movil') await page.getByLabel('Activar modo oscuro').click()
  await expect(page.locator('.tarjeta-tema')).toHaveCount(76)
  for (let indice = 0; indice < temas.length; indice++) {
    const tema = temas[indice]
    const ficha = fichasClinicas[tema.nombre]
    const esCAD = tema.nombre === 'Cetoacidosis diabética'
    await page.locator('.tarjeta-tema').nth(indice).click()
    const pantalla = esCAD ? page.locator('#cad-pagina') : page.getByRole('dialog')
    await expect(pantalla.getByRole('heading', { name: tema.nombre, exact: true })).toBeVisible()
    await expect(pantalla.locator(esCAD ? '.ficha-premium-seccion' : '.ficha-clinica section')).toHaveCount(ficha.secciones.length)
    await expect(pantalla.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
    await expect(pantalla.getByText('Ficha en desarrollo y verificación')).toHaveCount(0)
    for (const enlace of await pantalla.locator('.fuentes-clinicas a').all()) {
      expect(await enlace.getAttribute('href')).toMatch(/^https:\/\//)
      await expect(enlace).toHaveAttribute('target', '_blank')
    }
    if (esCAD) {
      await expect(page).toHaveURL(/#\/ficha\/cetoacidosis-diabetica$/)
      await pantalla.getByRole('button', { name: 'Volver al manual' }).click()
      await expect(pantalla).toHaveCount(0)
    } else {
      expect(await pantalla.locator('.modal-contenido').evaluate(e => e.scrollWidth <= e.clientWidth + 1)).toBe(true)
      await pantalla.getByRole('heading', { name: 'Bibliografía y guías' }).scrollIntoViewIfNeeded()
      await expect(pantalla.getByRole('heading', { name: 'Bibliografía y guías' })).toBeVisible()
      if (tema.nombre === 'Diabetes mellitus tipo 2') await page.screenshot({ path: testInfo.outputPath('diabetes-bibliografia.png'), animations: 'disabled' })
      await pantalla.getByLabel('Cerrar ficha').click()
      await expect(pantalla).toHaveCount(0)
    }
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


test('CAD abre página completa, conserva el contenido y permite regresar', async ({ page }, testInfo) => {
  const ficha = fichasClinicas['Cetoacidosis diabética']
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()
  const lector = page.locator('#cad-pagina')
  await expect(lector).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page).toHaveURL(/#\/ficha\/cetoacidosis-diabetica$/)
  await expect(lector.getByRole('heading', { name: 'Cetoacidosis diabética' })).toBeVisible()
  await expect(lector.locator('.ficha-premium-seccion')).toHaveCount(ficha.secciones.length)
  await expect(lector.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)

  const primera = lector.locator('.ficha-premium-seccion').first()
  const botonPrimero = primera.getByRole('button', { name: /Definición y fisiopatología/i })
  await expect(botonPrimero).toHaveAttribute('aria-expanded', 'true')
  await botonPrimero.click()
  await expect(botonPrimero).toHaveAttribute('aria-expanded', 'false')
  await expect(primera.locator('.ficha-premium-seccion-contenido')).toBeHidden()
  await botonPrimero.click()
  await expect(botonPrimero).toHaveAttribute('aria-expanded', 'true')

  await lector.getByRole('button', { name: 'Contraer todas' }).click()
  await expect(lector.locator('.ficha-premium-seccion button[aria-expanded="false"]')).toHaveCount(ficha.secciones.length)
  await lector.getByRole('button', { name: 'Expandir todas' }).click()
  await expect(lector.locator('.ficha-premium-seccion button[aria-expanded="true"]')).toHaveCount(ficha.secciones.length)

  const indiceEscritorio = lector.getByRole('navigation', { name: 'Ir a una sección' })
  if (testInfo.project.name === 'movil') {
    await lector.locator('.cad-reader-movil summary').click()
    const indiceMovil = lector.getByRole('navigation', { name: 'Índice de la ficha en móvil' })
    await expect(indiceMovil).toBeVisible()
    await indiceMovil.getByRole('button', { name: /Bibliografía y guías/ }).click()
    await expect(lector.locator('.cad-reader-movil')).not.toHaveAttribute('open', '')
  } else {
    await indiceEscritorio.getByRole('button', { name: /Bibliografía y guías/ }).click()
  }
  await expect(lector.getByRole('heading', { name: 'Bibliografía y guías' })).toBeVisible()
  await lector.getByRole('button', { name: 'Volver al manual' }).click()
  await expect(lector).toHaveCount(0)

  await page.goto('/#/ficha/cetoacidosis-diabetica')
  await expect(page.locator('#cad-pagina')).toBeVisible()
  await page.locator('#cad-pagina').getByRole('button', { name: 'Volver al manual' }).click()
  await expect(page.locator('#cad-pagina')).toHaveCount(0)
})

test('CAD conserva cifras, algoritmo y tabla derivados del texto original', async ({ page }, testInfo) => {
  const ficha = fichasClinicas['Cetoacidosis diabética']
  const criterios = ficha.secciones.find(s => /criterios diagnósticos/i.test(s.titulo))?.puntos ?? []
  const tratamiento = ficha.secciones.find(s => /tratamiento: secuencia práctica/i.test(s.titulo))?.puntos ?? []
  const monitorizacion = ficha.secciones.find(s => /monitorización durante tratamiento/i.test(s.titulo))?.puntos ?? []
  const resolucion = ficha.secciones.find(s => /resolución y transición/i.test(s.titulo))?.puntos ?? []
  const errores = ficha.secciones.find(s => /errores clínicos/i.test(s.titulo))?.puntos ?? []

  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()
  const pantalla = page.locator('#cad-pagina')
  const panel = pantalla.locator('.cad-rapida')
  await expect(panel).toBeVisible()
  await expect(panel.locator('.cad-criterio-tarjeta')).toHaveCount(0)
  const tablaDiagnostico = panel.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })
  await expect(tablaDiagnostico.locator('tbody tr')).toHaveCount(3)
  for (const criterio of criterios.slice(0, 3)) await expect(tablaDiagnostico).toContainText(criterio)

  const navegacion = panel.getByRole('group', { name: 'Vista rápida de cetoacidosis' })
  await navegacion.getByRole('button', { name: 'Tratamiento' }).click()
  await expect(panel.locator('.cad-algoritmo-paso')).toHaveCount(tratamiento.length)
  for (let indice = 0; indice < tratamiento.length; indice++) await expect(panel.locator('.cad-algoritmo-paso').nth(indice)).toContainText(tratamiento[indice])
  await panel.getByRole('button', { name: 'Tabla terapéutica' }).click()
  const tablaTratamiento = panel.getByRole('table', { name: 'Tabla de tratamiento de cetoacidosis' })
  await expect(tablaTratamiento.locator('tbody tr')).toHaveCount(tratamiento.length)
  for (const punto of tratamiento) await expect(tablaTratamiento).toContainText(punto)

  await navegacion.getByRole('button', { name: 'Seguimiento' }).click()
  await expect(panel.getByRole('table', { name: 'Tabla de monitorización durante el tratamiento' }).locator('tbody tr')).toHaveCount(monitorizacion.length)
  await expect(panel.locator('.cad-resolucion-item')).toHaveCount(resolucion.length)
  await navegacion.getByRole('button', { name: 'Precauciones' }).click()
  await expect(panel.locator('.cad-alerta')).toHaveCount(errores.length)

  for (let indice = 0; indice < ficha.secciones.length; indice++) {
    const contenido = pantalla.locator('.ficha-premium-seccion').nth(indice).locator('.ficha-premium-seccion-contenido')
    const seccion = ficha.secciones[indice]
    if (seccion.texto) await expect(contenido).toContainText(seccion.texto)
    for (const punto of seccion.puntos ?? []) await expect(contenido).toContainText(punto)
  }
  await expect(pantalla.locator('.fuentes-clinicas a')).toHaveCount(ficha.fuentes.length)
  await navegacion.getByRole('button', { name: 'Diagnóstico' }).click()
  await pantalla.locator('.cad-reader-resumen').scrollIntoViewIfNeeded()
  await page.screenshot({ path: testInfo.outputPath('cad-pagina-completa.png'), fullPage: true, animations: 'disabled' })
})
