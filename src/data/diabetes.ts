import type { FichaClinica, FuenteFicha, SeccionFicha } from './types.ts'

const fuentesDiabetes: FuenteFicha[] = [
  { titulo: 'ADA 2026. Diagnóstico y clasificación (sección 2)', url: 'https://doi.org/10.2337/dc26-S002', nota: 'Pruebas diagnósticas, confirmación, tamizaje y clasificación etiológica.' },
  { titulo: 'ADA 2026. Evaluación integral (sección 4)', url: 'https://doi.org/10.2337/dc26-S004', nota: 'Evaluación inicial y comorbilidades; no equivale a una receta universal.' },
  { titulo: 'ADA 2026. Conductas de salud y educación (sección 5)', url: 'https://doi.org/10.2337/dc26-S005', nota: 'Educación para autocuidado, nutrición, actividad y salud psicosocial.' },
  { titulo: 'ADA 2026. Metas, hipoglucemia y crisis (sección 6)', url: 'https://doi.org/10.2337/dc26-S006', nota: 'Metas individualizadas, evaluación de HbA1c y prevención de hipoglucemia.' },
  { titulo: 'ADA 2026. Tratamiento farmacológico (sección 9)', url: 'https://doi.org/10.2337/dc26-S009', nota: 'Selección por comorbilidad, tratamiento combinado e inicio y titulación de insulina.' },
  { titulo: 'ADA 2026. Riesgo cardiovascular (sección 10)', url: 'https://doi.org/10.2337/dc26-S010', nota: 'Presión, lípidos, antiagregación y protección cardiovascular.' },
  { titulo: 'ADA 2026. Enfermedad renal (sección 11)', url: 'https://doi.org/10.2337/dc26-S011', nota: 'TFGe, albuminuria y nefroprotección.' },
  { titulo: 'ADA 2026. Retina, neuropatía y pie (sección 12)', url: 'https://doi.org/10.2337/dc26-S012', nota: 'Tamizaje desde el diagnóstico y periodicidad según riesgo.' },
  { titulo: 'IMSS/CENETEC. GPC-IMSS-718-18 (2018)', url: 'https://www.imss.gob.mx/sites/all/statics/guiasclinicas/718GER.pdf', nota: 'Diagnóstico y tratamiento farmacológico de DM2 en primer nivel. Se identifica su antigüedad; para novedades se contrasta con ADA 2026 y fichas técnicas.' },
  { titulo: 'CENETEC. GPC-IMSS-657-21 (2021)', url: 'https://www.cenetec-difusion.com/CMGPC/GPC-IMSS-657-21/ER.pdf', nota: 'Guía específica de la persona adulta mayor; aplicar según fragilidad y funcionalidad.' },
  { titulo: 'NIDDK. Diabetes tipo 2', url: 'https://www.niddk.nih.gov/health-information/diabetes/overview/what-is-diabetes/type-2-diabetes', nota: 'Bases fisiopatológicas, síntomas y factores de riesgo. NIH.' },
  { titulo: 'IDF Diabetes Atlas, 11.ª edición (2025)', url: 'https://diabetesatlas.org/media/uploads/sites/3/2025/04/IDF_Atlas_11th_Edition_2025-1.pdf', nota: 'Estimaciones mundiales para 2024; población de 20–79 años, todos los tipos de diabetes.' },
]

const fuentesDosis: FuenteFicha[] = [
  { titulo: 'DailyMed. Metformina: liberación inmediata y prolongada', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=53ba7031-be87-47a5-ade7-494c6c489cc6', nota: 'Posología, función renal, acidosis láctica y contraste yodado. Verificar presentación autorizada en México.' },
  { titulo: 'DailyMed. Empagliflozina', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=59ed43d9-b4e0-72a2-e063-6394a90a327d&type=display', nota: 'Dosis, indicación cardiorrenal frente a efecto glucémico, depleción de volumen y suspensión preoperatoria.' },
  { titulo: 'DailyMed. Semaglutida subcutánea para DM2', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=adec4fd2-6858-4c99-91d4-531f5f2a2d79', nota: 'Escalamiento semanal, contraindicaciones y precauciones; no intercambiar con dosis de otras presentaciones.' },
  { titulo: 'DailyMed. Tirzepatida', url: 'https://dailymed.nlm.nih.gov/dailymed/fda/fdaDrugXsl.cfm?setid=d2d7da5d-ad07-4228-955f-cf7e355c8cc0&type=display', nota: 'Inicio y aumentos de dosis, efectos digestivos y anticoncepción oral.' },
  { titulo: 'DailyMed. Sitagliptina', url: 'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=62c4f58b-2b28-4825-aeb6-213ab9b7a026', nota: 'Dosis de 100, 50 o 25 mg según TFGe; no combinar con agonistas GLP-1.' },
]

const medicamentos: SeccionFicha = {
  titulo: 'Dosis de fármacos frecuentes y ajustes de seguridad',
  texto: 'Esquemas de estudio para adultos no embarazados. VO: vía oral; SC: subcutánea. TFGe expresada en mL/min/1.73 m². Revisar presentación, disponibilidad y ficha técnica local antes de indicar.',
  puntos: [
    'Metformina: liberación prolongada, iniciar 500 mg VO con la cena y aumentar 500 mg por semana según tolerancia hasta 2,000 mg/día. Liberación inmediata: la ficha técnica permite iniciar 500 mg cada 12 h con alimentos; una titulación más lenta ayuda si hay intolerancia digestiva. No triturar la formulación prolongada.',
    'Metformina y riñón: no iniciar con TFGe 30–44 según ficha técnica; si ya se utiliza, reconsiderar beneficio/riesgo y reducir según guía y vigilancia. Contraindicada con TFGe <30. Suspender temporalmente ante deshidratación, hipoxia, sepsis grave o lesión renal aguda. Evaluar vitamina B12 ante anemia/neuropatía y durante uso prolongado.',
    'Empagliflozina: 10 mg VO cada 24 h; puede aumentarse a 25 mg si hace falta efecto glucémico y se tolera. El beneficio cardiorrenal no depende del aumento. No se recomienda para control glucémico con TFGe <30; la indicación cardiorrenal admite umbrales diferentes. Evaluar volumen, micosis genital, hipotensión y riesgo de cetoacidosis euglucémica; suspender al menos 3 días antes de cirugía programada o ayuno prolongado.',
    'Semaglutida SC para DM2: 0.25 mg una vez por semana durante 4 semanas, después 0.5 mg/semana; si hace falta, tras ≥4 semanas en cada nivel aumentar a 1 mg y luego a 2 mg/semana. Los 0.25 mg son de inicio, no mantenimiento. Náusea/vómito, enfermedad biliar y deshidratación requieren vigilancia; evitar con carcinoma medular tiroideo personal/familiar o MEN2. Valorar gastroparesia y retinopatía. Suspender ≥2 meses antes de embarazo planeado.',
    'Tirzepatida: 2.5 mg SC semanal durante 4 semanas y luego 5 mg semanal; aumentos de 2.5 mg separados por ≥4 semanas, máximo 15 mg/semana en adultos. Comparte precauciones digestivas y de carcinoma medular/MEN2. Si se usa anticonceptivo oral, añadir barrera o cambiar a método no oral durante 4 semanas tras inicio y cada escalamiento.',
    'Sitagliptina: 100 mg VO cada 24 h si TFGe ≥45; 50 mg/día con TFGe 30–44; 25 mg/día con TFGe <30 o diálisis. Menor eficacia sobre peso y sin el beneficio cardiorrenal demostrado de las clases anteriores. No combinar un inhibidor DPP-4 con GLP-1 ni con tirzepatida.',
    'Sulfonilureas pueden ser accesibles, pero aumentan hipoglucemia y peso. Evitar glibenclamida en personas mayores o con deterioro renal; ajustar la elección a comidas, función renal y capacidad de monitoreo. Pioglitazona causa edema/aumento de peso: evitar en insuficiencia cardiaca sintomática. No todas las alternativas son intercambiables.',
  ],
}

const insulina: SeccionFicha = {
  titulo: 'Insulinización y titulación en el paciente ambulatorio estable',
  puntos: [
    'Considerar insulina si hay catabolismo, pérdida ponderal, síntomas importantes, HbA1c >10%, glucosa ≥300 mg/dL o posible déficit de insulina. Con cetosis, vómitos, deshidratación o alteración mental, valorar una crisis hospitalaria antes de usar un esquema ambulatorio.',
    'Si no hay hiperglucemia grave ni crisis, suele preferirse una terapia basada en GLP-1 antes de insulina como primer inyectable, según comorbilidades, tolerancia y acceso. Si se requiere insulina, enseñar técnica, conservación, rotación, automonitoreo y manejo de hipoglucemia.',
    'Basal: comenzar con 10 unidades SC al día o 0.1–0.2 unidades/kg/día. Titular, por ejemplo, +2 unidades cada 3 días hasta glucosa de ayuno individualizada, usando varias mediciones y sin hipoglucemia. Si ocurre hipoglucemia sin causa corregible, reducir aproximadamente 10–20% y reevaluar. El tipo de basal, su horario y el riesgo nocturno cambian entre NPH y análogos.',
    'Si ayuno ya está en meta y HbA1c sigue elevada, revisar hiperglucemia posprandial y sobrebasalización; no aumentar basal indefinidamente. Considerar GLP-1 o insulina prandial. Un inicio orientativo es 4 unidades o 10% de la basal antes de la comida principal, con titulación y educación supervisadas.',
    'Al iniciar o intensificar insulina, reducir o suspender sulfonilurea cuando sea apropiado para evitar hipoglucemia. Mantener medicamentos con beneficio cardiorrenal si no existe contraindicación. No usar únicamente escalas correctivas sin un plan basal cuando se necesita cobertura sostenida.',
  ],
}

export const fichasDiabetes = {
  'Diabetes mellitus tipo 2': {
    actualizacion: 'Fuentes revisadas el 18 de octubre de 2026: ADA 2026; GPC IMSS 2018/2021 y fichas técnicas.',
    alcance: 'Adultos no embarazados. Abordaje clínico integral; ajustar por función renal/hepática, fragilidad, comorbilidades y acceso.',
    secciones: [
      { titulo: 'Definición y epidemiología', puntos: [
        'Enfermedad metabólica heterogénea con hiperglucemia crónica por resistencia a la insulina y pérdida progresiva de secreción de células beta, sin que la autoinmunidad sea su mecanismo habitual. Puede coexistir con obesidad visceral, hipertensión, dislipidemia y enfermedad hepática esteatósica metabólica.',
        'Es la forma predominante de diabetes y puede permanecer asintomática durante años. El IDF Atlas 2025 estima 589 millones de adultos de 20–79 años con diabetes en 2024; esa cifra incluye todos los tipos y no debe etiquetarse como prevalencia exclusiva de DM2. La población y el método de cada encuesta condicionan las comparaciones.',
      ] },
      { titulo: 'Fisiopatología', puntos: [
        'La resistencia muscular reduce captación de glucosa; la hepática permite gluconeogénesis inapropiada. El tejido adiposo visceral libera ácidos grasos y mediadores inflamatorios. La hiperinsulinemia inicial deja de compensar cuando progresa la disfunción beta.',
        'La secreción inadecuada de glucagón, menor efecto incretina y mayor reabsorción renal de glucosa sostienen la hiperglucemia. Glucotoxicidad y lipotoxicidad perpetúan el deterioro. El daño microvascular se relaciona con exposición glucémica acumulada; el riesgo macrovascular también depende de presión, lípidos, tabaco y riñón.',
      ] },
      { titulo: 'Factores de riesgo y búsqueda dirigida', puntos: [
        'Sobrepeso/obesidad, adiposidad central, sedentarismo, familiar de primer grado, edad, antecedente de diabetes gestacional, síndrome de ovario poliquístico, hipertensión, dislipidemia, enfermedad cardiovascular y acantosis nigricans.',
        'Evaluar hiperglucemia asociada a glucocorticoides, antipsicóticos u otros medicamentos. No excluir DM2 por IMC normal ni asumir DM2 solo por obesidad. El tamizaje también depende de edad y antecedentes, detallados en la ficha de atención primaria.',
      ] },
      { titulo: 'Manifestaciones clínicas', puntos: [
        'Frecuentemente asintomática. Poliuria, polidipsia, nocturia, visión borrosa, fatiga, pérdida de peso, candidiasis recurrente, infecciones cutáneas o mala cicatrización pueden motivar el diagnóstico.',
        'Buscar neuropatía distal, enfermedad arterial periférica, retinopatía o albuminuria desde el diagnóstico. Vómitos, dolor abdominal, respiración profunda, letargo o deshidratación sugieren crisis y exigen medir cetonas/electrolitos y atención urgente.',
      ] },
      { titulo: 'Diagnóstico y confirmación', puntos: [
        'Cualquiera de los siguientes: HbA1c ≥6.5% con método estandarizado; glucosa plasmática de ayuno ≥126 mg/dL tras ≥8 h sin calorías; glucosa plasmática a las 2 h ≥200 mg/dL en carga oral de 75 g; o glucosa al azar ≥200 mg/dL acompañada de síntomas clásicos o crisis hiperglucémica.',
        'Sin síntomas/hiperglucemia inequívoca, se necesitan dos resultados anormales: misma prueba en otra muestra o dos pruebas diferentes, incluso en la misma toma. Si discrepan, repetir la que supera el umbral y analizar interferencias. Resultados limítrofes requieren reevaluación, habitualmente en 3–6 meses.',
        'No confirmar con glucómetro doméstico o monitor continuo. HbA1c puede ser inexacta con hemólisis, transfusión, algunas hemoglobinopatías, anemia significativa, embarazo o alteraciones del recambio eritrocitario; usar criterios de glucosa plasmática cuando corresponda.',
      ] },
      { titulo: 'Diagnósticos diferenciales y clasificación etiológica', puntos: [
        'Diabetes tipo 1/LADA: inicio rápido, catabolismo, cetosis, historia autoinmune o rápida necesidad de insulina. Solicitar anticuerpos de islote según contexto y péptido C en situación interpretable; no retrasar insulina esperando resultados si hay insulinopenia.',
        'Diabetes pancreática por pancreatitis, cirugía o neoplasia; diabetes monogénica si inicio temprano/patrón familiar sugerente; hiperglucemia por estrés o medicamentos; endocrinopatías como Cushing/acromegalia. Evitar clasificar una hiperglucemia hospitalaria aislada como DM2 definitiva sin seguimiento.',
      ] },
      { titulo: 'Evaluación integral al diagnóstico', puntos: [
        'Historia de duración/síntomas, tratamientos, hipoglucemia, tabaquismo, alcohol, alimentación, actividad, sueño, salud mental, seguridad alimentaria y costo. Explorar presión con técnica correcta, peso/IMC, cintura, hidratación, sitios de inyección, pulsos, piel y pies.',
        'HbA1c, creatinina/TFGe, cociente albúmina/creatinina urinaria, lípidos y pruebas hepáticas según contexto. Evaluación oftalmológica desde el diagnóstico, neuropatía y examen completo de pies. Revisar enfermedad cardiovascular, insuficiencia cardiaca, ERC, vacunas, salud bucodental y planes reproductivos.',
      ] },
      { titulo: 'Metas individualizadas y monitorización', puntos: [
        'Para muchos adultos: HbA1c <7%, glucosa preprandial 80–130 mg/dL y pico posprandial <180 mg/dL, medido 1–2 h tras comenzar a comer. Menos estrictas con fragilidad, comorbilidad o alto riesgo de hipoglucemia; metas más bajas solo si se alcanzan con seguridad y carga aceptable.',
        'Si se usa monitor continuo: tiempo entre 70–180 mg/dL >70%, tiempo <70 <4% y <54 <1% para muchos adultos. En personas mayores/vulnerables priorizar minimizar hipoglucemia. Las metas de monitor continuo no son criterios diagnósticos.',
        'HbA1c aproximadamente cada 3 meses si cambia tratamiento o no se alcanza meta; cada 6 meses si estable. Automonitoreo estructurado al usar insulina, sulfonilureas, presentar síntomas o ajustar tratamiento. Valorar monitor continuo cuando ayude a seguridad y decisiones.',
      ] },
      { titulo: 'Tratamiento no farmacológico y educación', puntos: [
        'Plan alimentario individualizado con verduras, fibra, leguminosas, granos integrales y fuentes de proteína adecuadas; reducir bebidas azucaradas, ultraprocesados y exceso energético. No existe una proporción única de macronutrientes para todos. Ofrecer educación y apoyo para autocuidado desde el diagnóstico.',
        'Actividad aeróbica ≥150 min/semana en ≥3 días, sin más de 2 días consecutivos inactivos, y fuerza 2–3 días/semana si es seguro. Adaptar en cardiopatía, neuropatía, retinopatía y pie de riesgo. Interrumpir tiempo sentado y revisar calzado.',
        'Con exceso de peso, acordar una pérdida inicial de al menos 5–7% y valorar objetivos mayores si son factibles; preservar músculo. Tratar tabaquismo, sueño y malestar por diabetes. Considerar tratamiento de obesidad o cirugía metabólica en personas elegibles mediante evaluación multidisciplinaria.',
      ] },
      { titulo: 'Tratamiento farmacológico: selección por perfil clínico', puntos: [
        'Elegir por eficacia, enfermedad cardiovascular, insuficiencia cardiaca, ERC, peso, hipoglucemia, preferencias y acceso. Metformina sigue siendo una opción útil si es apropiada; no es requisito previo para indicar un medicamento con beneficio cardiorrenal demostrado.',
        'Enfermedad aterosclerótica o alto riesgo: GLP-1 y/o SGLT2 con evidencia específica. Insuficiencia cardiaca: priorizar SGLT2 con beneficio. ERC: seleccionar SGLT2 o GLP-1 con beneficio, verificando TFGe e indicación; el efecto glucémico de SGLT2 disminuye con TFGe baja aunque persista protección orgánica.',
        'Si HbA1c está aproximadamente ≥1.5 puntos porcentuales sobre la meta, considerar combinación desde el inicio. Revisar en 3 meses y ajustar sin inercia. Al añadir tratamientos potentes reducir fármacos que causan hipoglucemia cuando corresponda; no duplicar mecanismos sin beneficio.',
      ] },
      medicamentos,
      insulina,
      { titulo: 'Complicaciones, prevención y seguimiento', puntos: [
        'Microvasculares: retinopatía, enfermedad renal y neuropatía periférica/autonómica. Macrovasculares: cardiopatía isquémica, ictus y enfermedad arterial periférica. También pie ulcerado, infecciones, disfunción sexual, hipoglucemia y crisis hiperglucémicas.',
        'TFGe y albuminuria al menos anuales; confirmar albuminuria persistente por variabilidad y causas transitorias. Retina al diagnóstico y luego según hallazgos; puede espaciarse a 1–2 años tras exámenes normales y buen control. Pies completos al menos anuales, y en cada visita si hay pérdida de sensibilidad, úlcera o amputación previa.',
        'Tratar presión y lípidos según riesgo; estatina al menos moderada habitualmente entre 40–75 años, mayor intensidad con riesgo elevado. IECA/ARA-II si hipertensión con albuminuria; no combinarlos. Aspirina en prevención secundaria; primaria solo tras balance individual de beneficio/hemorragia.',
      ] },
      { titulo: 'Hipoglucemia, días de enfermedad y referencia', puntos: [
        'Glucosa <70 mg/dL exige actuar; <54 es clínicamente significativa. Si consciente y deglute: 15 g de glucosa/carbohidrato rápido y repetir medición en 15 min; repetir si sigue baja. Si no puede deglutir o requiere ayuda, activar atención urgente y usar glucagón disponible; no dar alimentos por boca.',
        'Durante enfermedad: controlar glucosa con mayor frecuencia, mantener hidratación y valorar cetonas. No suspender basal en una persona insulinodependiente sin un plan médico. Interrumpir temporalmente SGLT2 ante enfermedad aguda/ayuno y metformina ante deshidratación o lesión renal; acordar cuándo reiniciar.',
        'Urgencias: sospecha de CAD/EHH, hipoglucemia grave, pie con isquemia/infección profunda, pérdida visual aguda o síntomas cardiovasculares. Referencia programada: diagnóstico dudoso, embarazo, mal control persistente, hipoglucemias recurrentes, TFGe <30, deterioro renal rápido o complicaciones avanzadas.',
      ] },
    ],
    fuentes: [...fuentesDiabetes, ...fuentesDosis],
  },
  'Diabetes tipo 2 en atención primaria': {
    actualizacion: 'Revisión del 18 de octubre de 2026. ADA 2026 y GPC mexicanas 2018/2021, con sus poblaciones y fechas explícitas.',
    alcance: 'Consulta longitudinal de adultos no embarazados en primer nivel. Coordinar enfermería, nutrición, trabajo social y referencia oportuna.',
    secciones: [
      { titulo: 'Definición, relevancia y fisiopatología', puntos: [
        'La DM2 combina resistencia a la insulina con deterioro progresivo de secreción beta. Su evolución silenciosa explica que se diagnostique al estudiar hipertensión, obesidad, infecciones o una complicación. La atención primaria integra detección, control y prevención cardiovascular/renal durante años.',
        'El riesgo crece con adiposidad central, inactividad, antecedentes familiares, diabetes gestacional, ovario poliquístico y edad. La presencia de enfermedad renal, aterosclerosis o insuficiencia cardiaca modifica la elección farmacológica desde la primera consulta, incluso con HbA1c cercana a la meta.',
      ] },
      { titulo: 'Detección y factores de riesgo', puntos: [
        'ADA propone iniciar tamizaje a los 35 años en adultos sin otros criterios, y antes si hay sobrepeso/obesidad y al menos un factor de riesgo. Si normal, repetir al menos cada 3 años; antes si aumenta riesgo. En prediabetes, evaluar cada año. Ante diabetes gestacional previa, tamizaje de por vida cada 1–3 años.',
        'Puede utilizarse glucosa de ayuno, HbA1c estandarizada o carga oral. Prediabetes según ADA: ayuno 100–125 mg/dL, HbA1c 5.7–6.4% o glucosa a las 2 h 140–199 mg/dL. No confundir estos rangos con diabetes confirmada ni con los umbrales de todas las organizaciones.',
      ] },
      { titulo: 'Manifestaciones clínicas y confirmación diagnóstica', puntos: [
        'Buscar poliuria, polidipsia, visión borrosa, pérdida ponderal, fatiga y candidiasis; muchos pacientes no tienen síntomas. Explorar acantosis, presión, cintura y pies. Catabolismo o cetosis pueden indicar diabetes autoinmune aunque exista obesidad.',
        'Diabetes: HbA1c ≥6.5%, ayuno ≥126 mg/dL, 2 h tras 75 g ≥200 mg/dL, o azar ≥200 mg/dL con síntomas clásicos/crisis. Si no hay hiperglucemia inequívoca, confirmar con un segundo resultado anormal. La glucemia capilar orienta urgencia, pero no sustituye confirmación de laboratorio en un paciente estable.',
        'Considerar diabetes tipo 1/LADA, pancreática, monogénica, inducida por medicamentos e hiperglucemia transitoria de estrés. Usar glucosa plasmática si HbA1c es poco fiable por transfusión, hemólisis o recambio eritrocitario alterado. No esperar estudios etiológicos si necesita insulina urgente.',
      ] },
      { titulo: 'Primera consulta: evaluación integral y línea basal', puntos: [
        'Reconstruir síntomas, duración, medicamentos reales y dosis, alergias, hipoglucemias, acceso a alimentos/medicamentos, escolaridad, horarios, actividad, sueño, tabaco, alcohol y apoyo familiar. Explorar malestar por diabetes, depresión y barreras de autocuidado sin atribuir todo a falta de adherencia.',
        'Registrar peso/IMC, presión con técnica apropiada y estado de pies: piel, deformidades, pulsos y sensibilidad con monofilamento de 10 g más otra prueba neurológica. Revisar lugares de inyección y técnica. Preguntar por angina, disnea, claudicación, visión y síntomas autonómicos.',
        'Solicitar HbA1c, creatinina/TFGe, cociente albúmina/creatinina urinaria y perfil lipídico; función hepática según contexto. Gestionar evaluación de retina, vacunas, salud dental y consejería reproductiva. No solicitar insulina sérica o péptido C como control rutinario de DM2 típica.',
      ] },
      { titulo: 'Plan compartido y educación desde el diagnóstico', puntos: [
        'Acordar meta glucémica, de presión, peso y actividad, con uno o dos cambios realizables y fecha de revisión. Para muchos adultos, HbA1c <7%, ayuno 80–130 y posprandial <180 mg/dL. Con fragilidad, deterioro cognitivo o hipoglucemia, simplificar y aceptar metas menos estrictas.',
        'Enseñar un plan alimentario ajustado a cultura y presupuesto, reducir bebidas azucaradas y apoyar actividad progresiva. Mostrar cómo leer glucómetro, registrar valores y actuar ante síntomas; comprobar aprendizaje mediante demostración. En insulinoterapia revisar almacenamiento, agujas, rotación y eliminación segura.',
        'La pérdida ponderal ayuda si hay exceso de peso, pero evitar restricciones que causen desnutrición o pérdida muscular. Ofrecer educación estructurada al diagnóstico, si no se alcanzan metas, al aparecer complicaciones y durante transiciones de atención.',
      ] },
      { titulo: 'Algoritmo de inicio e intensificación', puntos: [
        '1. Descartar urgencia, embarazo e insulinopenia. 2. Identificar enfermedad aterosclerótica, insuficiencia cardiaca y ERC. 3. Elegir fármacos por beneficio orgánico y necesidades de glucosa/peso. 4. Verificar TFGe, tolerancia, costo y disponibilidad. 5. Definir monitoreo y fecha de ajuste.',
        'Sin comorbilidad que priorice otra clase, metformina es una opción inicial habitual. Si hay enfermedad cardiorrenal, introducir un SGLT2 y/o GLP-1 con beneficio específico, independientemente del uso previo de metformina. Si está muy por encima de meta, considerar combinación inicial.',
        'Tras aproximadamente 3 meses, revisar HbA1c, uso real, efectos adversos, acceso y objetivos antes de intensificar. No mantener durante años un esquema ineficaz ni aumentar sulfonilurea si produce hipoglucemia. Con síntomas catabólicos, HbA1c >10% o glucosa ≥300, valorar insulina y descartar crisis.',
      ] },
      medicamentos,
      insulina,
      { titulo: 'Qué revisar en cada consulta', puntos: [
        'Síntomas, hipoglucemia, glucemias que permitan decidir, medicamentos/dosis reales, técnica, peso, presión, efectos adversos, nutrición, actividad y nuevas barreras. Revisar pies si hay riesgo alto, molestias o lesiones. Registrar plan y fecha de siguiente cita.',
        'Tras inicio o ajuste importante, contacto en semanas para tolerancia, titulación y seguridad; no esperar 3 meses si hay hiperglucemia sintomática. HbA1c a los 3 meses cuando cambia tratamiento/no hay meta y cada 6 meses si estable. El intervalo se acorta por insulina, riñón, fragilidad o complicaciones.',
      ] },
      { titulo: 'Calendario de detección de complicaciones', puntos: [
        'Riñón: TFGe y albuminuria al diagnóstico y al menos anual; en ERC, 1–4 veces/año según etapa/riesgo. Albuminuria ≥30 mg/g requiere confirmar persistencia, habitualmente dos de tres muestras anormales en 3–6 meses. Fiebre, ejercicio intenso, infección urinaria y menstruación pueden elevarla transitoriamente.',
        'Retina: examen al diagnóstico; anual si hay retinopatía y más frecuente si progresa. Puede considerarse cada 1–2 años si exámenes previos normales y buen control. Una fotografía de tamizaje requiere un circuito de lectura y referencia; no sustituye atención por síntomas visuales.',
        'Pies: exploración completa al menos anual, más frecuente según neuropatía, deformidad, enfermedad vascular, úlcera/amputación previa. Educar inspección diaria, no caminar descalzo y consultar por heridas. No esperar dolor en un pie insensible.',
        'Lípidos según tratamiento/riesgo; tras iniciar/cambiar estatina, reevaluar respuesta. Revisar salud mental, vacunas y bucodental periódicamente. B12 si anemia o neuropatía en uso prolongado de metformina. No atribuir automáticamente toda neuropatía a diabetes.',
      ] },
      { titulo: 'Reducción de riesgo y prevención', puntos: [
        'Control de presión individualizado; IECA/ARA-II si hipertensión con albuminuria y vigilancia de potasio/creatinina. No combinarlos. Estatinas según edad y riesgo: generalmente al menos intensidad moderada entre 40–75 años; mayor intensidad si alto riesgo o enfermedad aterosclerótica.',
        'Evitar tabaco y apoyar cesación; revisar vacunación vigente. Aspirina no es automática por tener diabetes: indicada en prevención secundaria y solo seleccionada en primaria tras discutir sangrado. La reducción de riesgo depende del conjunto, no únicamente de HbA1c.',
      ] },
      { titulo: 'Hipoglucemia y plan escrito para días de enfermedad', puntos: [
        'Si glucosa <70 y puede deglutir: 15 g de glucosa rápida, nueva medición a los 15 min y repetir si persiste. No dar líquidos/alimentos si hay disminución de conciencia; activar urgencias y usar glucagón si disponible. Revisar causa y disminuir el tratamiento de riesgo después del episodio.',
        'En fiebre, vómitos o diarrea: líquidos, glucosa frecuente y cetonas si insulinoterapia/riesgo. Suspender SGLT2 durante enfermedad aguda/ayuno y metformina con deshidratación o deterioro renal. El plan debe especificar reinicio; no retirar basal en una persona dependiente de insulina sin supervisión.',
        'Acudir el mismo día ante vómitos persistentes, imposibilidad para hidratarse, cetonas, respiración profunda, confusión, dolor torácico o déficit neurológico. No usar solo la cifra de glucosa para descartar una CAD por SGLT2.',
      ] },
      { titulo: 'Referencia y continuidad entre niveles', puntos: [
        'Inmediata: crisis hiperglucémica, hipoglucemia grave, infección/isquemia de pie, pérdida visual aguda o sospecha de evento cardiovascular. Prioritaria: embarazo, diagnóstico incierto, probable autoinmunidad, hipoglucemias recurrentes o complicación rápidamente progresiva.',
        'Nefrología con TFGe <30, descenso acelerado, albuminuria progresiva o etiología atípica; oftalmología según tamizaje/hallazgos; equipo de pie para úlcera y alto riesgo; endocrinología si requiere manejo complejo. Enviar evolución, tratamientos, HbA1c, función renal, albuminuria y motivo concreto.',
        'Tras hospitalización, reconciliar medicamentos, confirmar acceso y programar contacto temprano. Verificar que el paciente comprende cambios, monitoreo y alarmas; una referencia no cancela la responsabilidad de seguimiento de atención primaria.',
      ] },
    ],
    fuentes: [...fuentesDiabetes, ...fuentesDosis, { titulo: 'ADA 2026. Personas mayores (sección 13)', url: 'https://doi.org/10.2337/dc26-S013', nota: 'Fragilidad, simplificación y desintensificación para disminuir hipoglucemia.' }],
  },
} satisfies Record<string, FichaClinica>
