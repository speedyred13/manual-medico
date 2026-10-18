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
