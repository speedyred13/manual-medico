import type { FichaClinica } from './types.ts'

// Cetoacidosis se conserva íntegra; EHH y solapamiento se amplían.
export const fichasExistentes = {
  "Cetoacidosis diabética": {
    "actualizacion": "Consenso internacional 2024",
    "alcance": "Adultos. Emergencia hospitalaria; no sustituye protocolos institucionales.",
    "secciones": [
      {
        "titulo": "Definición y fisiopatología",
        "texto": "Emergencia metabólica por déficit absoluto o relativo de insulina y aumento de hormonas contrarreguladoras. Aumentan la producción hepática de glucosa y la lipólisis; el hígado convierte ácidos grasos en cuerpos cetónicos, causando acidosis con brecha aniónica. La diuresis osmótica ocasiona pérdida de agua y electrolitos. Puede ocurrir en diabetes tipo 1 o tipo 2."
      },
      {
        "titulo": "Desencadenantes que deben buscarse",
        "puntos": [
          "Infección (urinaria, pulmonar, piel y tejidos blandos, entre otras).",
          "Omisión, interrupción o dosis insuficiente de insulina; problemas con bomba o acceso a medicamentos.",
          "Diabetes de nuevo diagnóstico, infarto, evento vascular, pancreatitis, cirugía o enfermedad aguda.",
          "Embarazo y medicamentos asociados, especialmente inhibidores SGLT2; estos pueden asociarse a CAD con glucosa no muy elevada."
        ]
      },
      {
        "titulo": "Criterios diagnósticos en adultos: deben cumplirse los tres componentes",
        "puntos": [
          "Diabetes/hiperglucemia: antecedente de diabetes o glucosa plasmática ≥200 mg/dL.",
          "Cetosis: beta-hidroxibutirato sanguíneo ≥3.0 mmol/L; si no está disponible, cetonas urinarias ≥2+.",
          "Acidosis metabólica: pH venoso <7.3 y/o bicarbonato <18 mmol/L.",
          "Preferir beta-hidroxibutirato en sangre para diagnóstico y seguimiento; las cetonas urinarias pueden retrasarse respecto a la evolución."
        ]
      },
      {
        "titulo": "Evaluación inicial",
        "puntos": [
          "ABCDE, estado mental, signos vitales, perfusión, hidratación, diuresis y peso estimado.",
          "Glucosa, electrolitos, bicarbonato, urea/creatinina, gasometría venosa y beta-hidroxibutirato; calcular brecha aniónica si ayuda al diagnóstico diferencial.",
          "ECG y potasio antes de iniciar insulina; solicitar estudios dirigidos a la causa precipitante (cultivos, imagen, troponina, etc.) según clínica.",
          "Valorar embarazo cuando corresponda y revisar uso de SGLT2, insulina, ingesta, vómitos y comorbilidades."
        ]
      },
      {
        "titulo": "Gravedad y sitio de atención",
        "texto": "La gravedad se determina por el grado de cetosis/acidosis, estado mental, estabilidad hemodinámica y comorbilidades. Alteración importante del estado mental, choque, enfermedad crítica o acidosis grave requieren atención de alta vigilancia/UCI según recursos y protocolo. No retrasar estabilización por completar estudios no esenciales."
      },
      {
        "titulo": "Tratamiento: secuencia práctica",
        "puntos": [
          "1) Líquidos: en adultos sin compromiso cardiaco o renal, solución salina isotónica o cristaloide balanceado, generalmente 500–1,000 mL/h durante las primeras 2–4 h; ajustar a presión arterial, sodio, diuresis, edad, insuficiencia cardiaca/renal y balance.",
          "2) Potasio: medirlo y corregirlo de forma seriada. Si K <3.5 mmol/L, reponer potasio y retrasar insulina hasta que sea >3.5 mmol/L, por riesgo de arritmia y debilidad respiratoria. Si K está bajo-normal, suele requerirse reposición en líquidos para mantenerlo aproximadamente entre 4–5 mmol/L, individualizando.",
          "3) Insulina: cuando el potasio sea seguro, protocolo habitual en CAD adulta: insulina regular IV 0.1 U/kg/h; los bolos no son necesarios si se inicia la infusión apropiada. La dosis y vía requieren protocolo hospitalario.",
          "4) Dextrosa: al bajar la glucosa por debajo de ~250 mg/dL, añadir dextrosa a los líquidos y ajustar la insulina para poder continuar suprimiendo cetogénesis hasta resolver la CAD.",
          "5) Bicarbonato: no se recomienda de rutina; considerar solo en acidemia extrema (consenso: pH <7.0) con valoración experta y protocolo.",
          "6) Tratar la causa desencadenante y prevenir tromboembolismo cuando esté indicado por riesgo y protocolo."
        ]
      },
      {
        "titulo": "Monitorización durante tratamiento",
        "puntos": [
          "Glucosa capilar cada 1–2 h.",
          "Electrolitos, creatinina, fosfato cuando esté indicado, pH venoso y beta-hidroxibutirato aproximadamente cada 4 h, ajustando a gravedad y protocolo.",
          "Balance hídrico, diuresis, signos vitales, estado neurológico, ECG si hay alteraciones del potasio y vigilancia de sobrecarga de volumen.",
          "Vigilar hipoglucemia, hipopotasemia, acidosis persistente y deterioro renal."
        ]
      },
      {
        "titulo": "Resolución y transición",
        "puntos": [
          "La resolución se valora por beta-hidroxibutirato <0.6 mmol/L y pH venoso ≥7.3 o bicarbonato ≥18 mmol/L; idealmente glucosa <200 mg/dL.",
          "No usar la brecha aniónica como único criterio de resolución si se dispone de beta-hidroxibutirato, porque los líquidos pueden producir acidosis hiperclorémica.",
          "Administrar insulina subcutánea basal con solapamiento adecuado antes de suspender la infusión IV, según esquema y protocolo local.",
          "Antes del alta: identificar causa, revisar técnica/adherencia y acceso a insulina, proporcionar educación sobre días de enfermedad y plan de seguimiento."
        ]
      },
      {
        "titulo": "Errores clínicos que conviene evitar",
        "puntos": [
          "Iniciar insulina sin conocer/corregir hipopotasemia importante.",
          "Suspender insulina solo porque la glucosa se normalizó, sin resolver la cetosis/acidosis.",
          "Descartar CAD por glucosa <200 mg/dL, en especial con SGLT2 o embarazo.",
          "Administrar líquidos sin ajustar en personas mayores o con insuficiencia cardiaca/renal.",
          "No investigar el desencadenante o no solapar insulina basal al hacer la transición."
        ]
      }
    ],
    "fuentes": [
      {
        "titulo": "Consenso internacional sobre crisis hiperglucémicas en adultos (ADA/EASD/AACE/JBDS/DTS, 2024)",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/",
        "nota": "Fuente principal para criterios, líquidos, potasio, insulina y resolución."
      },
      {
        "titulo": "Publicación del consenso en Diabetes Care",
        "url": "https://doi.org/10.2337/dci24-0032",
        "nota": "Versión publicada en la revista de la ADA."
      }
    ]
  },
  "Estado hiperosmolar hiperglucémico": {
    "actualizacion": "Consenso internacional 2024",
    "alcance": "Adultos. Emergencia hospitalaria.",
    "secciones": [
      {
        "titulo": "Definición y fisiopatología",
        "texto": "Emergencia caracterizada por hiperglucemia intensa, hiperosmolalidad y deshidratación marcada, sin cetosis/acidosis significativas en su forma pura. Suele aparecer en diabetes tipo 2, con evolución de días a semanas. La mortalidad es mayor que en CAD, por lo que requiere reconocer comorbilidades y el desencadenante con rapidez."
      },
      {
        "titulo": "Criterios diagnósticos: los cuatro componentes",
        "puntos": [
          "Glucosa plasmática ≥600 mg/dL.",
          "Hiperosmolalidad: osmolalidad efectiva >300 mOsm/kg o total >320 mOsm/kg.",
          "Ausencia de cetosis significativa: beta-hidroxibutirato <3 mmol/L o cetonas urinarias <2+.",
          "Ausencia de acidosis significativa: pH ≥7.3 y bicarbonato ≥15 mmol/L.",
          "Calcular osmolalidad efectiva = 2 × Na medido (mmol/L) + glucosa (mg/dL)/18. La total añade BUN (mg/dL)/2.8; no sustituir BUN por urea sin convertir. Confirmar unidades del laboratorio."
        ]
      },
      {
        "titulo": "Presentación clínica y causas",
        "puntos": [
          "Poliuria, polidipsia, debilidad, deshidratación intensa e hipotensión.",
          "Confusión, letargo, convulsiones o coma pueden aparecer con hiperosmolalidad marcada.",
          "Buscar infección, suspensión de tratamiento, acceso limitado al agua, enfermedad cardiovascular/neurológica, fármacos y diabetes no diagnosticada."
        ]
      },
      {
        "titulo": "Estudios iniciales",
        "puntos": [
          "Glucosa, sodio, potasio, bicarbonato, urea/creatinina, gasometría venosa, cetonas/beta-hidroxibutirato y osmolalidad.",
          "ECG, balance hídrico y búsqueda dirigida de infección, isquemia u otra causa precipitante.",
          "Evaluar función renal, estado neurológico y riesgo de sobrecarga por cardiopatía o nefropatía."
        ]
      },
      {
        "titulo": "Tratamiento y metas de seguridad",
        "puntos": [
          "Líquidos IV son prioritarios. En adultos sin compromiso cardiaco/renal, suele iniciarse cristaloide isotónico o balanceado a 500–1,000 mL/h durante 2–4 h, ajustando con frecuencia al estado hemodinámico, sodio y balance.",
          "Evitar descensos demasiado rápidos: la glucosa no debería caer habitualmente más de 90–120 mg/dL/h; el sodio no más de 10 mmol/L en 24 h y la osmolalidad debe disminuir gradualmente (aprox. 3–8 mOsm/kg/h).",
          "Insulina IV según protocolo y perfil de cetosis: en HHS sin acidosis/cetosis significativa suele usarse 0.05 U/kg/h; si hay cetosis/acidosis compatibles con crisis mixta, tratar como CAD con 0.1 U/kg/h.",
          "Controlar y reponer potasio de forma seriada; si está <3.5 mmol/L, corregir antes de insulina.",
          "Añadir dextrosa cuando la glucosa baje al umbral establecido por protocolo para continuar corrigiendo hiperosmolalidad sin hipoglucemia.",
          "Tratar el desencadenante y valorar profilaxis tromboembólica según riesgo y protocolo."
        ]
      },
      {
        "titulo": "Monitorización y resolución",
        "puntos": [
          "Glucosa cada 1–2 h; electrolitos, función renal y osmolalidad aproximadamente cada 4 h o con mayor frecuencia si la gravedad lo exige.",
          "Vigilancia neurológica, hemodinámica, diuresis y balance estricto.",
          "La resolución requiere mejoría del estado cognitivo y de la hiperosmolalidad, corrección de hiperglucemia y diuresis adecuada; aplicar los criterios completos del consenso/protocolo, no una cifra aislada."
        ]
      },
      {
        "titulo": "Puntos de seguridad",
        "puntos": [
          "La corrección debe ser gradual: cambios rápidos de osmolalidad pueden causar daño neurológico.",
          "En personas mayores, insuficiencia cardiaca o renal, usar bolos menores y reevaluación frecuente.",
          "Una proporción de pacientes presenta solapamiento CAD/HHS; medir cetonas y pH evita clasificar mal la crisis."
        ]
      },
      {
        "titulo": "Epidemiología, riesgo y diagnóstico diferencial",
        "puntos": [
          "Aparece con frecuencia en mayores con DM2, infección, acceso limitado al agua o deterioro cognitivo; puede ser primera manifestación de diabetes. Evolución más lenta y comorbilidad contribuyen a mayor riesgo que CAD aislada.",
          "Diferenciar de CAD/solapamiento, hipernatremia por otras causas, sepsis, ictus e intoxicaciones. Déficit neurológico puede reflejar hiperosmolalidad o una lesión cerebral concomitante; no atribuirlo automáticamente a glucosa."
        ]
      },
      {
        "titulo": "Criterios prácticos de resolución y transición",
        "puntos": [
          "El consenso considera mejoría cognitiva, osmolalidad <300 mOsm/kg, diuresis >0.5 mL/kg/h y glucosa <250 mg/dL, interpretadas en conjunto con hidratación y estabilidad. No cerrar tratamiento al bajar solo glucosa.",
          "Transición a esquema SC con solapamiento de basal 1–2 h antes de suspender infusión según protocolo. Ajustar dosis por tratamiento previo, nutrición, riñón y riesgo de hipoglucemia."
        ]
      },
      {
        "titulo": "Complicaciones y prevención de recurrencia",
        "puntos": [
          "Vigilar trombosis, LRA, rabdomiólisis, hipopotasemia, hipoglucemia, sobrecarga y lesión neurológica por cambios osmóticos. Profilaxis antitrombótica según riesgo/contraindicaciones.",
          "Alta con acceso a líquidos/medicamentos, educación de enfermedad, apoyo del cuidador si procede y seguimiento temprano. Revisar barreras que causaron deshidratación o suspensión de tratamiento."
        ]
      }
    ],
    "fuentes": [
      {
        "titulo": "Consenso internacional sobre crisis hiperglucémicas en adultos (2024)",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/",
        "nota": "Criterios, límites de corrección y tratamiento de HHS."
      }
    ]
  },
  "Cetoacidosis y estado hiperosmolar mixtos": {
    "actualizacion": "Consenso internacional 2024",
    "alcance": "Adultos. Emergencia hospitalaria de alto riesgo.",
    "secciones": [
      {
        "titulo": "Qué significa una crisis mixta",
        "texto": "Existe hiperglucemia e hiperosmolalidad importantes junto con cetosis y acidosis compatibles con CAD. No debe tratarse como HHS puro si hay beta-hidroxibutirato ≥3 mmol/L o acidosis metabólica significativa."
      },
      {
        "titulo": "Evaluación diagnóstica",
        "puntos": [
          "Aplicar criterios de hiperglucemia/hiperosmolalidad del HHS y medir beta-hidroxibutirato, pH venoso y bicarbonato.",
          "Calcular osmolalidad y valorar estado mental, perfusión, función renal, potasio y balance hídrico.",
          "Investigar desencadenante, con especial atención a infección, omisión de insulina, isquemia y uso de SGLT2."
        ]
      },
      {
        "titulo": "Tratamiento inicial",
        "puntos": [
          "Atención hospitalaria con vigilancia estrecha; considerar UCI según estado mental, choque, gravedad de acidosis y comorbilidades.",
          "Iniciar líquidos IV con cristaloide isotónico/balanceado, ajustados de manera individual; en HHS la corrección de osmolalidad debe ser gradual.",
          "Si cumple criterios de CAD junto con hiperosmolalidad, el consenso recomienda esquema de insulina de CAD (habitualmente 0.1 U/kg/h IV en adultos) una vez que el potasio sea seguro.",
          "Si K <3.5 mmol/L, reponer potasio y retrasar insulina hasta >3.5 mmol/L.",
          "Añadir dextrosa cuando la glucosa descienda para mantener insulina hasta resolver cetosis/acidosis; evitar caídas rápidas de osmolalidad.",
          "Tratar el factor precipitante y vigilar tromboembolismo, lesión renal, alteraciones del potasio, hipoglucemia y sobrecarga de volumen."
        ]
      },
      {
        "titulo": "Monitorización",
        "puntos": [
          "Glucosa cada 1–2 h.",
          "Electrolitos, creatinina, gasometría venosa, beta-hidroxibutirato y osmolalidad seriados, aproximadamente cada 4 h o más frecuente según gravedad.",
          "Vigilancia neurológica y hemodinámica; registrar ingresos/egresos y diuresis."
        ]
      },
      {
        "titulo": "Resolución y transición",
        "texto": "Confirmar resolución de cetosis/acidosis y mejoría segura de hiperosmolalidad/estado mental. Realizar transición a insulina subcutánea con solapamiento adecuado, educación sobre prevención de recurrencias y seguimiento."
      },
      {
        "titulo": "Fisiopatología, epidemiología y factores de riesgo",
        "puntos": [
          "Combina déficit de insulina con cetogénesis y pérdidas intensas de agua por diuresis osmótica. Los perfiles CAD/EHH forman un espectro; el solapamiento se asocia a mayor complejidad y riesgo, con heterogeneidad entre cohortes.",
          "Infección, omisión de insulina, diabetes no reconocida, enfermedad cardiovascular y deshidratación favorecen presentación. SGLT2 puede modificar glucosa: una cifra relativamente menor no excluye componente cetósico."
        ]
      },
      {
        "titulo": "Manifestaciones clínicas y diagnóstico diferencial",
        "puntos": [
          "Poliuria, polidipsia, pérdida ponderal y deshidratación pueden preceder dolor abdominal, vómitos, respiración profunda, confusión o coma. Valorar perfusión, respiración, diuresis y focalidad.",
          "Confirmar componentes con cetonas y gases; acidosis también puede deberse a lactato, LRA, diarrea o tóxicos. No llamar cetósica a toda acidosis en un EHH sin estudiar mecanismo; pueden coexistir procesos."
        ]
      },
      {
        "titulo": "Dosis, electrolitos y límites de corrección",
        "puntos": [
          "En adulto sin contraindicación, cristaloide isotónico/balanceado 500–1,000 mL/h durante primeras 2–4 h, ajustado continuamente. Mayores o insuficiencia cardiaca/renal requieren bolos menores y reevaluación; no trasladar este ritmo a pediatría.",
          "La insulina de CAD, 0.1 unidades/kg/h IV, se inicia con potasio seguro. Al caer glucosa <250 mg/dL, añadir dextrosa y ajustar infusión para continuar resolviendo cetosis. No suspenderla solo por euglucemia.",
          "Buscar descenso gradual de osmolalidad de 3–8 mOsm/kg/h, sin superar 8, y evitar descenso de sodio >10 mmol/L/24 h; la velocidad de glucosa también se limita por componente hiperosmolar. Reponer K y magnesio según mediciones/función renal, con bombas y protocolo."
        ]
      },
      {
        "titulo": "Complicaciones y plan posterior",
        "puntos": [
          "Hipoglucemia, hipopotasemia, LRA, trombosis, sobrecarga y complicación neurológica requieren vigilancia. El objetivo integra resolución de beta-hidroxibutirato/acidosis y recuperación de osmolalidad/cognición, no un solo parámetro.",
          "Antes del alta documentar causa y esquema, educar sobre cetonas y días de enfermedad y asegurar insumos. Revisión temprana, habitualmente en semanas y antes si riesgo, para ajustar y prevenir recurrencia."
        ]
      }
    ],
    "fuentes": [
      {
        "titulo": "Consenso internacional sobre crisis hiperglucémicas en adultos (2024)",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11343900/",
        "nota": "Incluye diagnóstico y manejo de cuadros con solapamiento CAD/HHS."
      }
    ]
  }
} satisfies Record<string, FichaClinica>
