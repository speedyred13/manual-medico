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
    if (esCAD) {
      await expect(pantalla.getByRole('navigation', { name: 'Apartados de la ficha' }).locator('button')).toHaveCount(ficha.secciones.length + 1)
      await expect(pantalla.locator('.cad-unica-seccion')).toHaveCount(1)
      await pantalla.getByRole('navigation', { name: 'Apartados de la ficha' }).getByRole('button', { name: 'Bibliografía' }).click()
    } else {
      await expect(pantalla.locator('.ficha-clinica section')).toHaveCount(ficha.secciones.length)
    }
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


test('CAD muestra diez botones independientes, sin textos destacados ni índice extra', async ({ page }, testInfo) => {
  const ficha = fichasClinicas['Cetoacidosis diabética']
  await page.goto('/')
  await page.getByRole('button', { name: 'Abrir ficha destacada' }).click()

  const pantalla = page.locator('#cad-pagina')
  await expect(pantalla).toBeVisible()
  await expect(page).toHaveURL(/#\/ficha\/cetoacidosis-diabetica$/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(pantalla.getByRole('heading', { name: 'Cetoacidosis diabética' })).toBeVisible()
  await expect(pantalla.locator('.cad-pagina-descripcion, .cad-pagina-datos, .cad-reader-movil, .cad-reader-aside')).toHaveCount(0)
  await expect(pantalla.getByText('Índice de contenidos')).toHaveCount(0)
  await expect(pantalla.getByText('¿Qué necesitas consultar?')).toHaveCount(0)
  await expect(pantalla.getByText('Ir a la ficha completa')).toHaveCount(0)
  await expect(pantalla.getByText('Precauciones clínicas: errores que evitar')).toHaveCount(0)

  const navegacion = pantalla.getByRole('navigation', { name: 'Apartados de la ficha' })
  await expect(navegacion.locator('button')).toHaveCount(ficha.secciones.length + 1)
  const etiquetas = ['Definición y fisiopatología', 'Desencadenantes', 'Diagnóstico', 'Evaluación inicial', 'Gravedad', 'Tratamiento', 'Monitorización', 'Resolución', 'Errores frecuentes', 'Bibliografía']
  for (const etiqueta of etiquetas) await expect(navegacion.getByRole('button', { name: etiqueta, exact: true })).toHaveCount(1)
  await expect(navegacion.getByRole('button', { name: 'Diagnóstico' })).toHaveAttribute('aria-pressed', 'true')

  // Cada botón muestra exclusivamente su apartado original, con todos sus datos.
  for (let indice = 0; indice < ficha.secciones.length; indice++) {
    const seccion = ficha.secciones[indice]
    await navegacion.locator('button').nth(indice).click()
    const contenido = pantalla.locator('.cad-unica-seccion')
    await expect(contenido).toHaveCount(1)
    await expect(contenido.getByRole('heading', { name: seccion.titulo, exact: true })).toBeVisible()
    if (seccion.texto) await expect(contenido).toContainText(seccion.texto)

    if (/criterios diagnósticos/i.test(seccion.titulo)) {
      const tabla = contenido.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })
      await expect(tabla.locator('tbody tr')).toHaveCount(3)
      for (const criterio of seccion.puntos?.slice(0, 3) ?? []) {
        const separador = criterio.indexOf(':')
        await expect(tabla).toContainText(criterio.slice(0, separador).trim())
        await expect(tabla).toContainText(criterio.slice(separador + 1).trim())
      }
      for (const nota of seccion.puntos?.slice(3) ?? []) await expect(contenido).toContainText(nota)
    } else if (/tratamiento: secuencia práctica/i.test(seccion.titulo)) {
      await expect(contenido.locator('.cad-algoritmo-paso')).toHaveCount(seccion.puntos?.length ?? 0)
      for (const punto of seccion.puntos ?? []) {
        const partes = /^\d+\)\s*([^:]+):\s*(.*)$/.exec(punto)
        expect(partes).not.toBeNull()
        await expect(contenido).toContainText(partes![2])
        await expect(contenido).toContainText(partes![3])
      }
      await contenido.getByRole('button', { name: 'Tabla', exact: true }).click()
      const tabla = contenido.getByRole('table', { name: 'Tabla de tratamiento de cetoacidosis' })
      await expect(tabla.locator('tbody tr')).toHaveCount(seccion.puntos?.length ?? 0)
    } else {
      for (const punto of seccion.puntos ?? []) await expect(contenido).toContainText(punto)
    }
  }

  // La bibliografía conserva todos sus títulos, enlaces y anotaciones.
  await navegacion.getByRole('button', { name: 'Bibliografía', exact: true }).click()
  const fuentes = pantalla.locator('.fuentes-clinicas a')
  await expect(fuentes).toHaveCount(ficha.fuentes.length)
  for (const fuente of ficha.fuentes) {
    const enlace = pantalla.getByRole('link', { name: fuente.titulo })
    await expect(enlace).toHaveAttribute('href', fuente.url)
    await expect(pantalla).toContainText(fuente.nota)
  }

  await pantalla.getByRole('button', { name: 'Anterior' }).click()
  await expect(navegacion.getByRole('button', { name: 'Errores frecuentes' })).toHaveAttribute('aria-pressed', 'true')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true)
  if (testInfo.project.name === 'movil') {
    await navegacion.getByRole('button', { name: 'Diagnóstico' }).click()
    await expect(pantalla.locator('.cad-unica .cad-tabla-scroll')).toHaveCSS('overflow-x', 'visible')
  }
  await page.screenshot({ path: testInfo.outputPath('cad-apartados-independientes.png'), fullPage: true, animations: 'disabled' })

  await pantalla.getByRole('button', { name: 'Volver al manual' }).click()
  await expect(pantalla).toHaveCount(0)
  await page.goto('/#/ficha/cetoacidosis-diabetica')
  await expect(page.locator('#cad-pagina')).toBeVisible()
  await page.locator('#cad-pagina').getByRole('button', { name: 'Volver al manual' }).click()
  await expect(page.locator('#cad-pagina')).toHaveCount(0)
})

test('CAD: diagnóstico, tratamiento, monitorización y resolución no se agrupan', async ({ page }) => {
  await page.goto('/#/ficha/cetoacidosis-diabetica')
  const pantalla = page.locator('#cad-pagina')
  const navegacion = pantalla.getByRole('navigation', { name: 'Apartados de la ficha' })

  await expect(pantalla.locator('.cad-unica-seccion').getByRole('heading')).toHaveText(/criterios diagnósticos/i)
  await navegacion.getByRole('button', { name: 'Monitorización' }).click()
  await expect(pantalla.getByRole('table', { name: 'Tabla de monitorización durante el tratamiento' })).toBeVisible()
  await expect(pantalla.getByRole('heading', { name: 'Resolución y transición' })).toHaveCount(0)

  await navegacion.getByRole('button', { name: 'Resolución', exact: true }).click()
  await expect(pantalla.getByRole('heading', { name: 'Resolución y transición' })).toBeVisible()
  await expect(pantalla.getByRole('table', { name: 'Tabla de monitorización durante el tratamiento' })).toHaveCount(0)

  await navegacion.getByRole('button', { name: 'Tratamiento', exact: true }).click()
  await expect(pantalla.locator('.cad-algoritmo-paso')).toHaveCount(fichasClinicas['Cetoacidosis diabética'].secciones.find(s => /tratamiento: secuencia práctica/i.test(s.titulo))!.puntos!.length)
  await expect(pantalla.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })).toHaveCount(0)
  await navegacion.getByRole('button', { name: 'Diagnóstico', exact: true }).click()
  await expect(pantalla.getByRole('table', { name: 'Tabla de criterios diagnósticos de cetoacidosis' })).toBeVisible()
  await expect(pantalla.locator('.cad-algoritmo-paso')).toHaveCount(0)
})
