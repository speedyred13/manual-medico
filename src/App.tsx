import { useEffect, useMemo, useState } from 'react'

import './App.css'

const temas = [

   // MEDICINA INTERNA — CARDIOLOGÍA

   { nombre: 'Hipertensión arterial sistémica', especialidad: 'Cardiología', resumen: 'Diagnóstico, metas terapéuticas, combinaciones farmacológicas y daño a órgano blanco.' },

   { nombre: 'Insuficiencia cardíaca', especialidad: 'Cardiología', resumen: 'Fracción de eyección, clasificación y tratamiento por pilares.' },

   { nombre: 'Síndrome coronario agudo', especialidad: 'Cardiología', resumen: 'ECG, biomarcadores, antiagregación y manejo inicial.' },

   { nombre: 'Dislipidemias y riesgo cardiovascular', especialidad: 'Cardiología', resumen: 'Estratificación del riesgo, metas de LDL y tratamiento con estatinas.' },

   // ENDOCRINOLOGÍA

   { nombre: 'Diabetes mellitus tipo 2', especialidad: 'Endocrinología', resumen: 'Criterios diagnósticos, metas de HbA1c y tratamiento.' },

   { nombre: 'Cetoacidosis diabética', especialidad: 'Endocrinología', resumen: 'Diagnóstico, brecha aniónica, hidratación, potasio e insulina.' },

   { nombre: 'Estado hiperosmolar hiperglucémico', especialidad: 'Endocrinología', resumen: 'Osmolaridad, deshidratación, alteraciones neurológicas y tratamiento.' },

   { nombre: 'Cetoacidosis y estado hiperosmolar mixtos', especialidad: 'Endocrinología', resumen: 'Reconocimiento y tratamiento de crisis hiperglucémicas mixtas.' },

   { nombre: 'Hipotiroidismo e hipertiroidismo', especialidad: 'Endocrinología', resumen: 'Interpretación de TSH y T4 libre y manejo inicial.' },

   // NEFROLOGÍA

   { nombre: 'Lesión renal aguda', especialidad: 'Nefrología', resumen: 'Criterios KDIGO, etiologías y evaluación inicial.' },

   { nombre: 'Enfermedad renal crónica', especialidad: 'Nefrología', resumen: 'Estadificación por TFGe y albuminuria, complicaciones y referencia.' },

   { nombre: 'Hiponatremia e hipernatremia', especialidad: 'Nefrología', resumen: 'Diagnóstico etiológico y corrección segura del sodio.' },

   { nombre: 'Hipopotasemia e hiperpotasemia', especialidad: 'Nefrología', resumen: 'Cambios en ECG, reposición y tratamiento urgente.' },

   { nombre: 'Trastornos ácido-base y gasometría', especialidad: 'Nefrología', resumen: 'Acidosis, alcalosis, compensaciones y trastornos mixtos.' },

   // NEUMOLOGÍA

   { nombre: 'Neumonía adquirida en la comunidad', especialidad: 'Neumología', resumen: 'CURB-65, PSI, diagnóstico y selección de antibióticos.' },

   { nombre: 'EPOC', especialidad: 'Neumología', resumen: 'Clasificación, exacerbaciones, broncodilatadores y oxigenoterapia.' },

   { nombre: 'Asma', especialidad: 'Neumología', resumen: 'Control, gravedad, crisis asmática y tratamiento escalonado.' },

   // INFECTOLOGÍA

   { nombre: 'Infección de vías urinarias', especialidad: 'Infectología', resumen: 'Cistitis, pielonefritis, urocultivo y tratamiento.' },

   { nombre: 'Dengue', especialidad: 'Infectología', resumen: 'Signos de alarma, clasificación y manejo de líquidos.' },

   { nombre: 'VIH e infecciones oportunistas', especialidad: 'Infectología', resumen: 'Evaluación inicial, CD4, carga viral y profilaxis indicada.' },

   { nombre: 'Fiebre de origen desconocido', especialidad: 'Infectología', resumen: 'Definición, diagnóstico diferencial y abordaje sistemático.' },

   // GASTROENTEROLOGÍA

   { nombre: 'Hemorragia digestiva alta y baja', especialidad: 'Gastroenterología', resumen: 'Estabilización, Glasgow-Blatchford, Rockall y diagnóstico.' },

   { nombre: 'Cirrosis hepática y sus complicaciones', especialidad: 'Gastroenterología', resumen: 'Ascitis, peritonitis bacteriana espontánea y encefalopatía.' },

   { nombre: 'Pancreatitis aguda', especialidad: 'Gastroenterología', resumen: 'Criterios de Atlanta, BISAP, hidratación y complicaciones.' },

   // CIRUGÍA GENERAL

   { nombre: 'Apendicitis aguda', especialidad: 'Cirugía General', resumen: 'Alvarado, AIR, imagen y tratamiento quirúrgico.' },

   { nombre: 'Colecistitis y colangitis aguda', especialidad: 'Cirugía General', resumen: 'Criterios de Tokio, antibióticos y control del foco.' },

   { nombre: 'Obstrucción intestinal', especialidad: 'Cirugía General', resumen: 'Etiologías, hallazgos radiológicos y criterios quirúrgicos.' },

   { nombre: 'Hernias de la pared abdominal', especialidad: 'Cirugía General', resumen: 'Hernias inguinales, umbilicales y epigástricas; complicaciones.' },

   { nombre: 'Enfermedad hemorroidal y fisura anal', especialidad: 'Cirugía General', resumen: 'Diagnóstico diferencial y manejo inicial.' },

   { nombre: 'Absceso perianal', especialidad: 'Cirugía General', resumen: 'Evaluación, drenaje y criterios de referencia.' },

   { nombre: 'Manejo perioperatorio', especialidad: 'Cirugía General', resumen: 'ASA, líquidos, profilaxis antibiótica y tromboembólica.' },

   // PEDIATRÍA

   { nombre: 'Reanimación neonatal', especialidad: 'Pediatría', resumen: 'Pasos iniciales, ventilación y minuto de oro.' },

   { nombre: 'Ictericia neonatal', especialidad: 'Pediatría', resumen: 'Evaluación por edad en horas y criterios de tratamiento.' },

   { nombre: 'Crecimiento y neurodesarrollo', especialidad: 'Pediatría', resumen: 'Percentiles, hitos del desarrollo y señales de alarma.' },

   { nombre: 'Vacunación infantil', especialidad: 'Pediatría', resumen: 'Esquema de vacunación y oportunidades de recuperación.' },

   { nombre: 'Infecciones respiratorias pediátricas', especialidad: 'Pediatría', resumen: 'Faringoamigdalitis, otitis, crup y bronquiolitis.' },

   { nombre: 'Enfermedad diarreica y deshidratación', especialidad: 'Pediatría', resumen: 'Planes A, B y C y evaluación de gravedad.' },

   { nombre: 'Exantemas de la infancia', especialidad: 'Pediatría', resumen: 'Diagnóstico diferencial de enfermedades exantemáticas.' },

   { nombre: 'Convulsiones febriles y estatus epiléptico', especialidad: 'Pediatría', resumen: 'Clasificación, estabilización y tratamiento inicial.' },

   { nombre: 'Sepsis neonatal y pediátrica', especialidad: 'Pediatría', resumen: 'Reconocimiento temprano, cultivos y manejo inicial.' },

   // GINECOLOGÍA Y OBSTETRICIA

   { nombre: 'Control prenatal', especialidad: 'Ginecología y Obstetricia', resumen: 'Estudios por trimestre, suplementación y tamizajes.' },

   { nombre: 'Preeclampsia, eclampsia y síndrome HELLP', especialidad: 'Ginecología y Obstetricia', resumen: 'Criterios de severidad, sulfato de magnesio y resolución.' },

   { nombre: 'Hemorragia obstétrica', especialidad: 'Ginecología y Obstetricia', resumen: 'Hemorragia anteparto y posparto, causas y uterotónicos.' },

   { nombre: 'Aborto, embarazo ectópico y mola', especialidad: 'Ginecología y Obstetricia', resumen: 'Diagnóstico, ultrasonido y manejo inicial.' },

   { nombre: 'Trabajo de parto y monitoreo fetal', especialidad: 'Ginecología y Obstetricia', resumen: 'Fases del parto, progresión y evaluación fetal.' },

   { nombre: 'Vaginitis y flujo vaginal', especialidad: 'Ginecología y Obstetricia', resumen: 'Candidiasis, vaginosis y tricomoniasis.' },

   { nombre: 'Sangrado uterino anormal', especialidad: 'Ginecología y Obstetricia', resumen: 'Clasificación PALM-COEIN y evaluación inicial.' },

   { nombre: 'Anticoncepción', especialidad: 'Ginecología y Obstetricia', resumen: 'Métodos anticonceptivos y criterios de elegibilidad.' },

   // URGENCIAS

   { nombre: 'Soporte vital avanzado (ACLS)', especialidad: 'Urgencias', resumen: 'Paro cardíaco, ritmos desfibrilables y arritmias.' },

   { nombre: 'Sepsis y choque', especialidad: 'Urgencias', resumen: 'Sepsis-3, SOFA, reanimación y tipos de choque.' },

   { nombre: 'Trauma y abordaje ATLS', especialidad: 'Urgencias', resumen: 'ABCDE, Glasgow y evaluación primaria del trauma.' },

   { nombre: 'Toxicología y antídotos', especialidad: 'Urgencias', resumen: 'Toxidromes, estabilización y antídotos específicos.' },

   // TRAUMATOLOGÍA Y ORTOPEDIA

   { nombre: 'Esguince de tobillo', especialidad: 'Traumatología y Ortopedia', resumen: 'Reglas de Ottawa, exploración y tratamiento.' },

   { nombre: 'Fracturas frecuentes', especialidad: 'Traumatología y Ortopedia', resumen: 'Radio distal, clavícula y cadera; evaluación radiológica.' },

   { nombre: 'Artritis séptica, gota y osteoartritis', especialidad: 'Traumatología y Ortopedia', resumen: 'Diagnóstico diferencial del dolor articular.' },

   { nombre: 'Lumbalgia y radiculopatía', especialidad: 'Traumatología y Ortopedia', resumen: 'Banderas rojas, exploración y manejo conservador.' },

   { nombre: 'Gonartrosis y coxartrosis', especialidad: 'Traumatología y Ortopedia', resumen: 'Clasificación radiológica y tratamiento inicial.' },

   { nombre: 'Hombro doloroso', especialidad: 'Traumatología y Ortopedia', resumen: 'Maniobras de Neer, Hawkins y Jobe.' },

   // DERMATOLOGÍA

   { nombre: 'Lesiones elementales de la piel', especialidad: 'Dermatología', resumen: 'Lesiones primarias y secundarias y descripción morfológica.' },

   { nombre: 'Dermatitis por contacto y eccema', especialidad: 'Dermatología', resumen: 'Diagnóstico, desencadenantes y tratamiento.' },

   { nombre: 'Dermatofitosis y escabiosis', especialidad: 'Dermatología', resumen: 'Reconocimiento clínico y tratamiento.' },

   // MEDICINA FAMILIAR Y PREVENTIVA

   { nombre: 'Diabetes tipo 2 en atención primaria', especialidad: 'Medicina Familiar', resumen: 'Metas individualizadas, tratamiento y detección de complicaciones.' },

   { nombre: 'Hipertensión en atención primaria', especialidad: 'Medicina Familiar', resumen: 'AMPA, MAPA, ajuste terapéutico y daño a órgano blanco.' },

   { nombre: 'Hiperuricemia y gota', especialidad: 'Medicina Familiar', resumen: 'Tratamiento de crisis y prevención de recurrencias.' },

   { nombre: 'Tamizaje de cáncer cervicouterino', especialidad: 'Medicina Preventiva', resumen: 'Citología, VPH, periodicidad y seguimiento.' },

   { nombre: 'Tamizaje de cáncer de mama', especialidad: 'Medicina Preventiva', resumen: 'Exploración clínica, mastografía y factores de riesgo.' },

   { nombre: 'Tamizaje de cáncer de próstata', especialidad: 'Medicina Preventiva', resumen: 'Decisión informada y evaluación según riesgo.' },

   { nombre: 'Tamizaje de cáncer colorrectal', especialidad: 'Medicina Preventiva', resumen: 'Pruebas de heces, colonoscopia y seguimiento.' },

   { nombre: 'Valoración integral del adulto mayor', especialidad: 'Medicina Familiar', resumen: 'Fragilidad, caídas, cognición y polifarmacia.' },

   { nombre: 'Depresión y PHQ-9', especialidad: 'Medicina Familiar', resumen: 'Tamizaje, evaluación clínica y tratamiento inicial.' },

   { nombre: 'Ansiedad y crisis de pánico', especialidad: 'Medicina Familiar', resumen: 'GAD-7, manejo agudo y tratamiento de mantenimiento.' },

   { nombre: 'Insomnio', especialidad: 'Medicina Familiar', resumen: 'Higiene del sueño y abordaje no farmacológico.' },

   { nombre: 'Faringoamigdalitis y escala de Centor', especialidad: 'Medicina Familiar', resumen: 'Diferenciación viral y estreptocócica y uso racional de antibióticos.' },

   { nombre: 'Rinosinusitis aguda', especialidad: 'Medicina Familiar', resumen: 'Criterios clínicos de etiología viral o bacteriana.' },

   { nombre: 'Gastroenteritis aguda', especialidad: 'Medicina Familiar', resumen: 'Hidratación, tratamiento sintomático y criterios de alarma.' },

   { nombre: 'Micosis superficiales y onicomicosis', especialidad: 'Medicina Familiar', resumen: 'Tratamientos tópicos y sistémicos y precauciones.' },

]

// Los filtros se generan automáticamente a partir de los temas.

const especialidades = [

   'Todas',

   ...new Set(temas.map((tema) => tema.especialidad)),

]

type SeccionFicha = { titulo: string; texto?: string; puntos?: string[] }
type FuenteFicha = { titulo: string; url: string; nota: string }
type FichaClinica = { actualizacion: string; alcance: string; secciones: SeccionFicha[]; fuentes: FuenteFicha[] }

// Fichas iniciales elaboradas con fuentes clínicas identificables. Las dosis son orientativas
// para adultos y deben contrastarse con el protocolo local y la situación clínica individual.
const fichasClinicas: Record<string, FichaClinica> = {
  'Cetoacidosis diabética': {
    actualizacion: 'Consenso internacional 2024',
    alcance: 'Adultos. Emergencia hospitalaria; no sustituye protocolos institucionales.',
    secciones: [
      { titulo: 'Definición y fisiopatología', texto: 'Emergencia metabólica por déficit absoluto o relativo de insulina y aumento de hormonas contrarreguladoras. Aumentan la producción hepática de glucosa y la lipólisis; el hígado convierte ácidos grasos en cuerpos cetónicos, causando acidosis con brecha aniónica. La diuresis osmótica ocasiona pérdida de agua y electrolitos. Puede ocurrir en diabetes tipo 1 o tipo 2.' },
      { titulo: 'Desencadenantes que deben buscarse', puntos: ['Infección (urinaria, pulmonar, piel y tejidos blandos, entre otras).', 'Omisión, interrupción o dosis insuficiente de insulina; problemas con bomba o acceso a medicamentos.', 'Diabetes de nuevo diagnóstico, infarto, evento vascular, pancreatitis, cirugía o enfermedad aguda.', 'Embarazo y medicamentos asociados, especialmente inhibidores SGLT2; estos pueden asociarse a CAD con glucosa no muy elevada.'] },
      { titulo: 'Criterios diagnósticos en adultos: deben cumplirse los tres componentes', puntos: ['Diabetes/hiperglucemia: antecedente de diabetes o glucosa plasmática ≥200 mg/dL.', 'Cetosis: beta-hidroxibutirato sanguíneo ≥3.0 mmol/L; si no está disponible, cetonas urinarias ≥2+.', 'Acidosis metabólica: pH venoso <7.3 y/o bicarbonato <18 mmol/L.', 'Preferir beta-hidroxibutirato en sangre para diagnóstico y seguimiento; las cetonas urinarias pueden retrasarse respecto a la evolución.'] },
      { titulo: 'Evaluación inicial', puntos: ['ABCDE, estado mental, signos vitales, perfusión, hidratación, diuresis y peso estimado.', 'Glucosa, electrolitos, bicarbonato, urea/creatinina, gasometría venosa y beta-hidroxibutirato; calcular brecha aniónica si ayuda al diagnóstico diferencial.', 'ECG y potasio antes de iniciar insulina; solicitar estudios dirigidos a la causa precipitante (cultivos, imagen, troponina, etc.) según clínica.', 'Valorar embarazo cuando corresponda y revisar uso de SGLT2, insulina, ingesta, vómitos y comorbilidades.'] },
      { titulo: 'Gravedad y sitio de atención', texto: 'La gravedad se determina por el grado de cetosis/acidosis, estado mental, estabilidad hemodinámica y comorbilidades. Alteración importante del estado mental, choque, enfermedad crítica o acidosis grave requieren atención de alta vigilancia/UCI según recursos y protocolo. No retrasar estabilización por completar estudios no esenciales.' },
      { titulo: 'Tratamiento: secuencia práctica', puntos: ['1) Líquidos: en adultos sin compromiso cardiaco o renal, solución salina isotónica o cristaloide balanceado, generalmente 500–1,000 mL/h durante las primeras 2–4 h; ajustar a presión arterial, sodio, diuresis, edad, insuficiencia cardiaca/renal y balance.', '2) Potasio: medirlo y corregirlo de forma seriada. Si K <3.5 mmol/L, reponer potasio y retrasar insulina hasta que sea >3.5 mmol/L, por riesgo de arritmia y debilidad respiratoria. Si K está bajo-normal, suele requerirse reposición en líquidos para mantenerlo aproximadamente entre 4–5 mmol/L, individualizando.', '3) Insulina: cuando el potasio sea seguro, protocolo habitual en CAD adulta: insulina regular IV 0.1 U/kg/h; los bolos no son necesarios si se inicia la infusión apropiada. La dosis y vía requieren protocolo hospitalario.', '4) Dextrosa: al bajar la glucosa por debajo de ~250 mg/dL, añadir dextrosa a los líquidos y ajustar la insulina para poder continuar suprimiendo cetogénesis hasta resolver la CAD.', '5) Bicarbonato: no se recomienda de rutina; considerar solo en acidemia extrema (consenso: pH <7.0) con valoración experta y protocolo.', '6) Tratar la causa desencadenante y prevenir tromboembolismo cuando esté indicado por riesgo y protocolo.'] },
      { titulo: 'Monitorización durante tratamiento', puntos: ['Glucosa capilar cada 1–2 h.', 'Electrolitos, creatinina, fosfato cuando esté indicado, pH venoso y beta-hidroxibutirato aproximadamente cada 4 h, ajustando a gravedad y protocolo.', 'Balance hídrico, diuresis, signos vitales, estado neurológico, ECG si hay alteraciones del potasio y vigilancia de sobrecarga de volumen.', 'Vigilar hipoglucemia, hipopotasemia, acidosis persistente y deterioro renal.'] },
      { titulo: 'Resolución y transición', puntos: ['La resolución se valora por beta-hidroxibutirato <0.6 mmol/L y pH venoso ≥7.3 o bicarbonato ≥18 mmol/L; idealmente glucosa <200 mg/dL.', 'No usar la brecha aniónica como único criterio de resolución si se dispone de beta-hidroxibutirato, porque los líquidos pueden producir acidosis hiperclorémica.', 'Administrar insulina subcutánea basal con solapamiento adecuado antes de suspender la infusión IV, según esquema y protocolo local.', 'Antes del alta: identificar causa, revisar técnica/adherencia y acceso a insulina, proporcionar educación sobre días de enfermedad y plan de seguimiento.'] },
      { titulo: 'Errores clínicos que conviene evitar', puntos: ['Iniciar insulina sin conocer/corregir hipopotasemia importante.', 'Suspender insulina solo porque la glucosa se normalizó, sin resolver la cetosis/acidosis.', 'Descartar CAD por glucosa <200 mg/dL, en especial con SGLT2 o embarazo.', 'Administrar líquidos sin ajustar en personas mayores o con insuficiencia cardiaca/renal.', 'No investigar el desencadenante o no solapar insulina basal al hacer la transición.'] },
    ],
    fuentes: [
      { titulo: 'Consenso internacional sobre crisis hiperglucémicas en adultos (ADA/EASD/AACE/JBDS/DTS, 2024)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/', nota: 'Fuente principal para criterios, líquidos, potasio, insulina y resolución.' },
      { titulo: 'Publicación del consenso en Diabetes Care', url: 'https://doi.org/10.2337/dci24-0032', nota: 'Versión publicada en la revista de la ADA.' },
    ],
  },
  'Estado hiperosmolar hiperglucémico': {
    actualizacion: 'Consenso internacional 2024', alcance: 'Adultos. Emergencia hospitalaria.',
    secciones: [
      { titulo: 'Definición y fisiopatología', texto: 'Emergencia caracterizada por hiperglucemia intensa, hiperosmolalidad y deshidratación marcada, sin cetosis/acidosis significativas en su forma pura. Suele aparecer en diabetes tipo 2, con evolución de días a semanas. La mortalidad es mayor que en CAD, por lo que requiere reconocer comorbilidades y el desencadenante con rapidez.' },
      { titulo: 'Criterios diagnósticos: los cuatro componentes', puntos: ['Glucosa plasmática ≥600 mg/dL.', 'Hiperosmolalidad: osmolalidad efectiva >300 mOsm/kg o total >320 mOsm/kg.', 'Ausencia de cetosis significativa: beta-hidroxibutirato <3 mmol/L o cetonas urinarias <2+.', 'Ausencia de acidosis significativa: pH ≥7.3 y bicarbonato ≥15 mmol/L.', 'Calcular osmolalidad efectiva como 2 × Na medido + glucosa/18, si glucosa y sodio están en mg/dL; osmolalidad total añade BUN/2.8. Confirmar unidades y fórmula del laboratorio.'] },
      { titulo: 'Presentación clínica y causas', puntos: ['Poliuria, polidipsia, debilidad, deshidratación intensa e hipotensión.', 'Confusión, letargo, convulsiones o coma pueden aparecer con hiperosmolalidad marcada.', 'Buscar infección, suspensión de tratamiento, acceso limitado al agua, enfermedad cardiovascular/neurológica, fármacos y diabetes no diagnosticada.'] },
      { titulo: 'Estudios iniciales', puntos: ['Glucosa, sodio, potasio, bicarbonato, urea/creatinina, gasometría venosa, cetonas/beta-hidroxibutirato y osmolalidad.', 'ECG, balance hídrico y búsqueda dirigida de infección, isquemia u otra causa precipitante.', 'Evaluar función renal, estado neurológico y riesgo de sobrecarga por cardiopatía o nefropatía.'] },
      { titulo: 'Tratamiento y metas de seguridad', puntos: ['Líquidos IV son prioritarios. En adultos sin compromiso cardiaco/renal, suele iniciarse cristaloide isotónico o balanceado a 500–1,000 mL/h durante 2–4 h, ajustando con frecuencia al estado hemodinámico, sodio y balance.', 'Evitar descensos demasiado rápidos: la glucosa no debería caer habitualmente más de 90–120 mg/dL/h; el sodio no más de 10 mmol/L en 24 h y la osmolalidad debe disminuir gradualmente (aprox. 3–8 mOsm/kg/h).', 'Insulina IV según protocolo y perfil de cetosis: en HHS sin acidosis/cetosis significativa suele usarse 0.05 U/kg/h; si hay cetosis/acidosis compatibles con crisis mixta, tratar como CAD con 0.1 U/kg/h.', 'Controlar y reponer potasio de forma seriada; si está <3.5 mmol/L, corregir antes de insulina.', 'Añadir dextrosa cuando la glucosa baje al umbral establecido por protocolo para continuar corrigiendo hiperosmolalidad sin hipoglucemia.', 'Tratar el desencadenante y valorar profilaxis tromboembólica según riesgo y protocolo.'] },
      { titulo: 'Monitorización y resolución', puntos: ['Glucosa cada 1–2 h; electrolitos, función renal y osmolalidad aproximadamente cada 4 h o con mayor frecuencia si la gravedad lo exige.', 'Vigilancia neurológica, hemodinámica, diuresis y balance estricto.', 'La resolución requiere mejoría del estado cognitivo y de la hiperosmolalidad, corrección de hiperglucemia y diuresis adecuada; aplicar los criterios completos del consenso/protocolo, no una cifra aislada.'] },
      { titulo: 'Puntos de seguridad', puntos: ['La corrección debe ser gradual: cambios rápidos de osmolalidad pueden causar daño neurológico.', 'En personas mayores, insuficiencia cardiaca o renal, usar bolos menores y reevaluación frecuente.', 'Una proporción de pacientes presenta solapamiento CAD/HHS; medir cetonas y pH evita clasificar mal la crisis.'] },
    ],
    fuentes: [{ titulo: 'Consenso internacional sobre crisis hiperglucémicas en adultos (2024)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/', nota: 'Criterios, límites de corrección y tratamiento de HHS.' }],
  },
  'Cetoacidosis y estado hiperosmolar mixtos': {
    actualizacion: 'Consenso internacional 2024', alcance: 'Adultos. Emergencia hospitalaria de alto riesgo.',
    secciones: [
      { titulo: 'Qué significa una crisis mixta', texto: 'Existe hiperglucemia e hiperosmolalidad importantes junto con cetosis y acidosis compatibles con CAD. No debe tratarse como HHS puro si hay beta-hidroxibutirato ≥3 mmol/L o acidosis metabólica significativa.' },
      { titulo: 'Evaluación diagnóstica', puntos: ['Aplicar criterios de hiperglucemia/hiperosmolalidad del HHS y medir beta-hidroxibutirato, pH venoso y bicarbonato.', 'Calcular osmolalidad y valorar estado mental, perfusión, función renal, potasio y balance hídrico.', 'Investigar desencadenante, con especial atención a infección, omisión de insulina, isquemia y uso de SGLT2.'] },
      { titulo: 'Tratamiento inicial', puntos: ['Atención hospitalaria con vigilancia estrecha; considerar UCI según estado mental, choque, gravedad de acidosis y comorbilidades.', 'Iniciar líquidos IV con cristaloide isotónico/balanceado, ajustados de manera individual; en HHS la corrección de osmolalidad debe ser gradual.', 'Si cumple criterios de CAD junto con hiperosmolalidad, el consenso recomienda esquema de insulina de CAD (habitualmente 0.1 U/kg/h IV en adultos) una vez que el potasio sea seguro.', 'Si K <3.5 mmol/L, reponer potasio y retrasar insulina hasta >3.5 mmol/L.', 'Añadir dextrosa cuando la glucosa descienda para mantener insulina hasta resolver cetosis/acidosis; evitar caídas rápidas de osmolalidad.', 'Tratar el factor precipitante y vigilar tromboembolismo, lesión renal, alteraciones del potasio, hipoglucemia y sobrecarga de volumen.'] },
      { titulo: 'Monitorización', puntos: ['Glucosa cada 1–2 h.', 'Electrolitos, creatinina, gasometría venosa, beta-hidroxibutirato y osmolalidad seriados, aproximadamente cada 4 h o más frecuente según gravedad.', 'Vigilancia neurológica y hemodinámica; registrar ingresos/egresos y diuresis.'] },
      { titulo: 'Resolución y transición', texto: 'Confirmar resolución de cetosis/acidosis y mejoría segura de hiperosmolalidad/estado mental. Realizar transición a insulina subcutánea con solapamiento adecuado, educación sobre prevención de recurrencias y seguimiento.' },
    ],
    fuentes: [{ titulo: 'Consenso internacional sobre crisis hiperglucémicas en adultos (2024)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/', nota: 'Incluye diagnóstico y manejo de cuadros con solapamiento CAD/HHS.' }],
  },
  'Diabetes mellitus tipo 2': {
    actualizacion: 'ADA Standards of Care 2026; contrastar con GPC mexicana aplicable', alcance: 'Adultos no embarazados; individualizar por edad, comorbilidades, fragilidad y recursos.',
    secciones: [
      { titulo: 'Diagnóstico', puntos: ['HbA1c ≥6.5% con método estandarizado; glucosa plasmática en ayuno ≥126 mg/dL; glucosa a las 2 h ≥200 mg/dL tras 75 g de glucosa; o glucosa al azar ≥200 mg/dL con síntomas clásicos/crisis hiperglucémica.', 'Si no hay hiperglucemia inequívoca, confirmar con una segunda prueba anormal, repitiendo la misma prueba o usando otra prueba diagnóstica.', 'Considerar interferencias en HbA1c (anemia, hemoglobinopatías, embarazo, transfusión, enfermedad renal avanzada) y usar glucosa plasmática cuando corresponda.'] },
      { titulo: 'Evaluación integral al diagnóstico', puntos: ['Historia, exploración, presión arterial, peso/IMC, hábitos, medicamentos, salud mental, barreras económicas y objetivos de la persona.', 'HbA1c, perfil lipídico, creatinina/TFGe, cociente albúmina/creatinina urinaria, pruebas hepáticas según contexto y revisión de vacunas.', 'Evaluar retina, pies, neuropatía, riesgo cardiovascular, enfermedad renal, insuficiencia cardiaca y enfermedad aterosclerótica.', 'Clasificar el tipo de diabetes si hay duda; pérdida de peso, cetosis, inicio abrupto o fenotipo atípico pueden requerir evaluación de diabetes tipo 1/LADA u otras causas.'] },
      { titulo: 'Metas y seguimiento', puntos: ['Una meta de HbA1c cercana a <7% es apropiada para muchos adultos, pero debe individualizarse según riesgo de hipoglucemia, comorbilidad, expectativa de vida y preferencias.', 'Revisar HbA1c aproximadamente cada 3 meses si no se alcanza la meta o cambia el tratamiento; con estabilidad y meta alcanzada, por lo general cada 6 meses.', 'Evitar inercia terapéutica: revisar adherencia, tolerancia, acceso, técnica y resultados en cada visita.'] },
      { titulo: 'Tratamiento no farmacológico', puntos: ['Plan alimentario individualizado, actividad física aeróbica y de fuerza adaptada, sueño, reducción de sedentarismo y apoyo conductual.', 'Pérdida ponderal sostenida cuando existe exceso de peso; incluso una reducción moderada puede mejorar glucemia y riesgo cardiometabólico.', 'Educación para automonitoreo cuando esté indicado, cuidado de pies, días de enfermedad y reconocimiento/tratamiento de hipoglucemia.'] },
      { titulo: 'Tratamiento farmacológico: elegir por perfil clínico', puntos: ['Metformina puede ser opción frecuente si es apropiada y tolerada, pero no es obligatoriamente el primer fármaco en todas las personas.', 'Con enfermedad cardiovascular aterosclerótica, insuficiencia cardiaca o enfermedad renal crónica, priorizar un inhibidor SGLT2 y/o agonista GLP-1 con beneficio demostrado, según comorbilidad, función renal, indicación, tolerancia, costo y disponibilidad.', 'Insulina debe considerarse si hay síntomas catabólicos, pérdida de peso, cetosis, hiperglucemia marcada (por ejemplo HbA1c >10% o glucosa ≥300 mg/dL) o sospecha de déficit importante de insulina; individualizar.', 'Revisar función renal, riesgo de hipoglucemia, interacciones, embarazo potencial y contraindicaciones antes de prescribir. La elección y las dosis requieren valoración clínica.'] },
      { titulo: 'Prevención y complicaciones', puntos: ['Control integral de presión arterial y lípidos; cesación tabáquica y valoración de riesgo cardiovascular.', 'Tamizaje periódico de enfermedad renal, retinopatía, neuropatía y enfermedad del pie; revisar vacunas y salud bucodental.', 'Derivar o intensificar atención ante hiperglucemia sintomática, cetosis, hipoglucemia grave, úlcera/infección de pie, deterioro renal rápido o sospecha de complicación aguda.'] },
    ],
    fuentes: [
      { titulo: 'ADA Standards of Care in Diabetes—2026', url: 'https://diabetesjournals.org/care/issue/49/Supplement_1', nota: 'Recomendaciones anuales sobre diagnóstico, metas, tratamiento y comorbilidades.' },
      { titulo: 'CENETEC: GPC Diagnóstico y tratamiento de DM2 en la persona adulta mayor (2021; actualización parcial)', url: 'https://www.cenetec-difusion.com/CMGPC/GPC-IMSS-657-21/ER.pdf', nota: 'Aplicable específicamente a personas adultas mayores; no sustituye una GPC general para todos los adultos.' },
    ],
  },
  'Diabetes tipo 2 en atención primaria': {
    actualizacion: 'ADA Standards of Care 2026; enfoque de atención primaria', alcance: 'Adultos; individualizar metas y tratamiento.',
    secciones: [
      { titulo: 'Objetivos de atención primaria', puntos: ['Confirmar diagnóstico y establecer línea basal de HbA1c, presión arterial, peso, lípidos, TFGe y albuminuria.', 'Evaluar riesgo cardiovascular/renal, retinopatía, neuropatía, pies, tabaquismo, salud mental, adherencia y barreras de acceso.', 'Definir metas compartidas, plan de seguimiento y criterios de referencia.'] },
      { titulo: 'Seguimiento práctico', puntos: ['HbA1c cada 3 meses si se ajusta tratamiento o no se alcanza meta; cada 6 meses si está estable y controlada.', 'Presión arterial y peso en consultas; perfil lipídico según riesgo/tratamiento; TFGe y albuminuria al menos anual, con mayor frecuencia si hay ERC.', 'Explorar pies y revisar autocuidado; asegurar evaluación oftalmológica conforme a riesgo y evolución.', 'Revisar hipoglucemias, efectos adversos, técnica, adherencia, costo y disponibilidad de medicamentos.'] },
      { titulo: 'Cuándo intensificar o referir', puntos: ['Hiperglucemia persistente a pesar de tratamiento optimizado, sospecha de diabetes tipo 1/LADA o diagnóstico incierto.', 'Enfermedad renal, insuficiencia cardiaca o enfermedad cardiovascular que requiera selección terapéutica dirigida.', 'Hipoglucemia grave/recurrente, embarazo, complicaciones de pie, retinopatía avanzada o deterioro clínico acelerado.', 'Urgencias ante vómitos persistentes, deshidratación, alteración del estado mental, respiración profunda, cetonas o sospecha de crisis hiperglucémica.'] },
    ],
    fuentes: [{ titulo: 'ADA Standards of Care in Diabetes—2026', url: 'https://diabetesjournals.org/care/issue/49/Supplement_1', nota: 'Fuente internacional para seguimiento, tratamiento y reducción de riesgo.' }],
  },
}

function ContenidoFicha({ nombre }: { nombre: string }) {
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

   const [favoritos, setFavoritos] = useState<string[]>(() => {
     try { return JSON.parse(localStorage.getItem('manual-medico-favoritos') || '[]') as string[] } catch { return [] }
   })
   const [recientes, setRecientes] = useState<string[]>(() => {
     try { return JSON.parse(localStorage.getItem('manual-medico-recientes') || '[]') as string[] } catch { return [] }
   })
   useEffect(() => { try { localStorage.setItem('manual-medico-favoritos', JSON.stringify(favoritos)) } catch { /* opcional */ } }, [favoritos])
   useEffect(() => { try { localStorage.setItem('manual-medico-recientes', JSON.stringify(recientes)) } catch { /* opcional */ } }, [recientes])
   const abrirFicha = (tema: (typeof temas)[number]) => {
     setSeleccionado(tema)
     setRecientes((actual) => [tema.nombre, ...actual.filter((nombre) => nombre !== tema.nombre)].slice(0, 5))
   }
   const alternarFavorito = (nombre: string) => setFavoritos((actual) => actual.includes(nombre) ? actual.filter((item) => item !== nombre) : [...actual, nombre])
   const abrirPorNombre = (nombre: string) => {
     const tema = temas.find((item) => item.nombre === nombre)
     if (tema) abrirFicha(tema)
   }

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

       <section className="dashboard shell" aria-label="Panel de inicio">
         <div className="dashboard-titulo"><div><span className="sobretitulo">TU PANEL DE ESTUDIO</span><h2>Tu biblioteca, de un vistazo</h2><p>Retoma tus consultas y guarda los temas que más utilizas.</p></div><span className="dashboard-distintivo">Panel interactivo</span></div>
         <div className="dashboard-metricas">
           <div className="metrica"><span>Temas disponibles</span><strong>{temas.length}</strong><small>Catálogo de consulta</small></div>
           <div className="metrica"><span>Especialidades</span><strong>{especialidades.length - 1}</strong><small>Áreas clínicas</small></div>
           <div className="metrica"><span>Fichas con contenido</span><strong>{Object.keys(fichasClinicas).length}</strong><small>Las demás están en desarrollo</small></div>
           <div className="metrica"><span>Mis favoritos</span><strong>{favoritos.length}</strong><small>Guardados en este navegador</small></div>
         </div>
         <div className="dashboard-paneles">
           <div className="dashboard-panel"><div className="dashboard-panel-cabecera"><h3>★ Mis favoritos</h3><span>{favoritos.length} guardados</span></div>
             {favoritos.length ? <div className="dashboard-enlaces">{favoritos.map((nombre) => <button key={nombre} type="button" onClick={() => abrirPorNombre(nombre)}>{nombre}<span>↗</span></button>)}</div> : <p className="dashboard-ayuda">Guarda una ficha con la estrella de su tarjeta para acceder rápidamente.</p>}
           </div>
           <div className="dashboard-panel"><div className="dashboard-panel-cabecera"><h3>↗ Consultas recientes</h3><span>Últimas 5</span></div>
             {recientes.length ? <div className="dashboard-enlaces">{recientes.map((nombre) => <button key={nombre} type="button" onClick={() => abrirPorNombre(nombre)}>{nombre}<span>↗</span></button>)}</div> : <p className="dashboard-ayuda">Las fichas que abras aparecerán aquí automáticamente.</p>}
           </div>
         </div>
       </section>

       <section className="seccion shell seccion-especialidades"><div className="titulo-seccion"><div><span className="sobretitulo">NAVEGACIÓN</span><h2>Explora por especialidad</h2><p>Selecciona un área para encontrar los temas relacionados.</p></div></div>
         <div className="filtros">{especialidades.map((item, indice) => <button key={item} className={`filtro ${especialidad === item ? 'activo' : ''}`} onClick={() => setEspecialidad(item)} aria-pressed={especialidad === item}><span className="filtro-icono">{indice === 0 ? '▦' : '✳'}</span>{item}</button>)}</div>
       </section>

       <section className="seccion shell biblioteca"><div className="titulo-seccion titulo-biblioteca"><div><span className="sobretitulo">CONTENIDO CLÍNICO</span><h2>Biblioteca médica</h2><p>Abre una ficha para consultar el contenido disponible y sus referencias.</p></div><span className="contador"><strong>{resultados.length}</strong> {resultados.length === 1 ? 'tema' : 'temas'}</span></div>
         <div className="lista-temas">{resultados.map((tema, indice) => <div className="tarjeta-contenedor" key={tema.nombre}><button className="tarjeta-tema" onClick={() => abrirFicha(tema)}><span className="icono-tema" aria-hidden="true"><span>{String(indice + 1).padStart(2, '0')}</span><b>↗</b></span><span className="contenido-tema"><span className="categoria">{tema.especialidad}</span><strong>{tema.nombre}</strong><span className="resumen">{tema.resumen}</span></span><span className="flecha" aria-hidden="true">↗</span></button><button type="button" className={`favorito-boton ${favoritos.includes(tema.nombre) ? 'es-favorito' : ''}`} aria-label={`${favoritos.includes(tema.nombre) ? 'Quitar de' : 'Agregar a'} favoritos: ${tema.nombre}`} aria-pressed={favoritos.includes(tema.nombre)} title={favoritos.includes(tema.nombre) ? 'Quitar de favoritos' : 'Agregar a favoritos'} onClick={() => alternarFavorito(tema.nombre)}>{favoritos.includes(tema.nombre) ? '★' : '☆'}</button></div>)}
           {resultados.length === 0 && <div className="vacio"><span>⌕</span><strong>No encontramos resultados</strong><p>Prueba con otra palabra o selecciona “Todas” las especialidades.</p><button type="button" onClick={() => { setBusqueda(''); setEspecialidad('Todas') }}>Limpiar filtros</button></div>}
         </div>
       </section>

       <footer className="pie shell"><div className="pie-marca"><span className="simbolo simbolo-pequeno">+</span><div><strong>Manual Médico</strong><span>Una herramienta para aprender y consultar.</span></div></div><div className="pie-nota"><p>Material de apoyo para estudio. Verifica siempre la guía vigente y el protocolo institucional.</p><span>© MANUAL MÉDICO · VERSIÓN INICIAL</span></div></footer>

       {seleccionado && <div className="fondo-modal" onClick={() => setSeleccionado(null)}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="titulo-modal" onClick={(e) => e.stopPropagation()}><div className="modal-cabecera"><span className="sobretitulo">{seleccionado.especialidad}</span><button className="cerrar" type="button" onClick={() => setSeleccionado(null)} aria-label="Cerrar ficha">×</button></div><div className="modal-intro"><span className="modal-etiqueta">FICHA CLÍNICA</span><h2 id="titulo-modal">{seleccionado.nombre}</h2><p>{seleccionado.resumen}</p></div><div className="modal-contenido"><ContenidoFicha nombre={seleccionado.nombre} /></div><div className="modal-pie"><span>Consulta siempre la versión vigente de las guías.</span><button className="boton-principal" type="button" onClick={() => setSeleccionado(null)}>Volver al manual <span>→</span></button></div></section></div>}
     </main>
   )
}

export default App
