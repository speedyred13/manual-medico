# Manual Médico

Biblioteca clínica en español con React, TypeScript y Vite, preparada para el despliegue existente en Vercel. El catálogo conserva sus 76 temas y 14 especialidades, el diseño azul, los modos claro/oscuro, el buscador, los filtros y las ventanas de lectura.

Las fichas incluyen contenido clínico, alcance de la población, fecha de revisión y bibliografía visible. Los temas semiológicos, preventivos y de procedimientos adaptan sus secciones al objetivo de consulta. Las dosis se acompañan de límites, contraindicaciones y ajustes pertinentes; se contrastan con el protocolo institucional y la presentación local.

## Desarrollo

Node.js 22.18 o posterior; verificado con Node.js 24.19.

```sh
npm ci
npm run dev
```

## Comprobaciones

```sh
npm run lint
npm run verify:content
npm run build
```

Para comprobar la interfaz sobre la compilación de producción:

```sh
npx playwright install chromium
npm run test:e2e
```

Las pruebas abren las 76 fichas en escritorio y móvil, verifican sus secciones y enlaces, desplazan la lectura hasta la bibliografía y comprueban filtros, búsqueda combinada, estado vacío y persistencia del tema. `MANUAL_MEDICO_CHROMIUM` permite usar un Chromium instalado en otra ruta. Si la red bloquea Google Fonts, `MANUAL_MEDICO_OFFLINE_FONTS=1` permite probar con las fuentes alternativas ya definidas en el CSS, simulando únicamente esa hoja externa. Las capturas y trazas temporales se guardan en `test-results/` y están excluidas de Git.

## Organización del contenido

- `src/data/catalogo.ts`: nombres, especialidades y resúmenes del catálogo original.
- `src/data/types.ts` y `crearFicha.ts`: formato compartido de las fichas.
- `src/data/diabetes.ts`: las dos fichas prioritarias de diabetes tipo 2.
- `src/data/existentes.ts`: cetoacidosis conservada y crisis hiperosmolares ampliadas.
- Los otros módulos de `src/data/` agrupan el contenido por especialidad.
- `src/data/fichas.ts`: registro tipado que exige cobertura de los 76 nombres.
- `docs/avance-clinico.md`: inventario y revisión de esta entrega.

El contenido clínico se empaqueta por separado de la interfaz para mantener los archivos de producción por debajo del aviso de tamaño de Vite. No se modificaron las hojas de estilo.

## Actualización de una ficha

1. Identificar población, versión de guía y diferencias frente a protocolos mexicanos.
2. Revisar diagnóstico, diferenciales, tratamiento, dosis, contraindicaciones, vigilancia y referencia según el tema.
3. Enlazar documentos concretos con una nota que explique qué respaldan; no usar búsquedas como bibliografía.
4. Actualizar fecha y ejecutar las comprobaciones.

Una compilación o prueba de interfaz correcta no equivale a validación clínica institucional.

## Vercel

Se mantiene el flujo existente: `npm run build`, salida `dist`. Esta entrega se prepara en una rama de revisión; el despliegue de producción depende de integrar los cambios en la rama configurada en Vercel.
