/** Canon editorial del expediente #002. */
import type { CaseDefinition } from './definition.ts';

export const case002: CaseDefinition = {
  "id": "c002",
  "slug": "la-senal-bajo-el-hielo",
  "fileCode": "#002",
  "title": "La señal bajo el hielo",
  "subtitle": "Desaparición en la estación Boreal-7",
  "place": "Plataforma de Nansen, círculo polar",
  "dateLabel": "Noche del 14 de diciembre de 1987",
  "victimName": "Dr. Elías Roldán",
  "briefing": "Durante la noche polar, el glaciólogo Elías Roldán abandonó el módulo central de Boreal-7 para atender una llamada de auxilio de una baliza. Casi una hora después no ha regresado, la radio principal está saboteada y una tormenta amenaza la estación. Cuatro miembros de la expedición permanecen aislados. Encontrarlo es solo la primera parte del caso.",
  "coverPublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/portada",
  "entryNodeId": "c002-n-intro",
  "suspects": [
    {
      "id": "c002-s-nora",
      "name": "Nora Vidal",
      "role": "Operadora de radio",
      "portraitPublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/sospechosos/nora-vidal",
      "description": "Treinta y ocho años. Pelo negro corto, jersey azul marino y auriculares siempre al cuello. Registra cada palabra con una letra minúscula y regular.",
      "relation": "Responsable exclusiva de las comunicaciones y de las claves de la estación.",
      "facts": [
        {
          "id": "c002-f-nora-turno",
          "kind": "alibi",
          "headline": "Afirma no haber abandonado la radio",
          "detail": "Dice que permaneció ante el transmisor entre las 20:45 y las 22:00. Tomás oyó su boletín de las 21:30 por el altavoz del comedor, pero no la vio."
        },
        {
          "id": "c002-f-nora-informe",
          "kind": "motive",
          "headline": "Conocía el hallazgo de Elías",
          "detail": "Admite haber cifrado el telegrama sobre la veta mineral y saber que Elías enviaría las coordenadas al Instituto a la mañana siguiente."
        },
        {
          "id": "c002-f-nora-cinta",
          "kind": "contradiction",
          "headline": "El boletín fue una grabación",
          "detail": "La cinta contiene el boletín de las 21:30 y el clic del temporizador. La voz no demuestra que Nora estuviera en la radio."
        },
        {
          "id": "c002-f-nora-acceso",
          "kind": "contradiction",
          "headline": "Su tarjeta abrió el túnel",
          "detail": "El registro mecánico conserva las perforaciones 21:17 y 21:36 junto al código de Nora. Su tarjeta recorrió el túnel mientras ella afirmaba no haber dejado la radio."
        },
        {
          "id": "c002-f-nora-cristal",
          "kind": "contradiction",
          "headline": "Ocultó el cristal del transmisor",
          "detail": "El cristal de frecuencia aparece en el estuche de auriculares de Nora, envuelto en el mismo paño rojo que dejó fibras en el panel."
        },
        {
          "id": "c002-f-nora-oferta",
          "kind": "motive",
          "headline": "Recibió una oferta por las coordenadas",
          "detail": "Una hoja de télex recuperada ofrece una transferencia a cambio de retrasar el informe oficial y enviar la posición exacta por un canal privado."
        }
      ]
    },
    {
      "id": "c002-s-tomas",
      "name": "Tomás Echevarría",
      "role": "Jefe de estación",
      "portraitPublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/sospechosos/tomas-echevarria",
      "description": "Cincuenta y seis años. Barba gris recortada, jersey de lana color óxido y una autoridad que se resquebraja cuando se habla de inspecciones.",
      "relation": "Dirige Boreal-7 y responde por la seguridad de la campaña.",
      "facts": [
        {
          "id": "c002-f-tomas-alibi",
          "kind": "alibi",
          "headline": "Estaba revisando los pluviómetros",
          "detail": "Liv lo vio en el corredor norte a las 21:05 y Samuel en el comedor a las 21:25. Entre ambos momentos estuvo solo."
        },
        {
          "id": "c002-f-tomas-seguridad",
          "kind": "contradiction",
          "headline": "Falseó una inspección de seguridad",
          "detail": "Firmó como revisado el refugio sísmico aunque el calefactor llevaba semanas averiado. Temía que cerrasen la estación."
        },
        {
          "id": "c002-f-tomas-discusion",
          "kind": "motive",
          "headline": "Discutió con Elías",
          "detail": "Elías iba a adjuntar las deficiencias de seguridad a su informe. Tomás reconoce que intentó disuadirlo."
        },
        {
          "id": "c002-f-tomas-llaves",
          "kind": "background",
          "headline": "Custodia las llaves de emergencia",
          "detail": "El armario conserva todas las llaves numeradas. La puerta del refugio también puede abrirse con tarjeta desde el túnel."
        }
      ]
    },
    {
      "id": "c002-s-liv",
      "name": "Liv Halvorsen",
      "role": "Mecánica",
      "portraitPublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/sospechosos/liv-halvorsen",
      "description": "Treinta y cuatro años. Pelo rubio trenzado, mono de trabajo verde y manos marcadas por el frío y la grasa.",
      "relation": "Mantiene generadores, vehículos, balizas y cerraduras.",
      "facts": [
        {
          "id": "c002-f-liv-alibi",
          "kind": "alibi",
          "headline": "Trabajaba en el generador auxiliar",
          "detail": "El contador de servicio registra carga continua entre las 20:58 y las 21:36. Samuel la vio entrar y salir del cuarto de máquinas."
        },
        {
          "id": "c002-f-liv-combustible",
          "kind": "contradiction",
          "headline": "Faltan cuarenta litros de combustible",
          "detail": "Reconoce haberlos cambiado por medicinas con una tripulación pesquera durante la última escala."
        },
        {
          "id": "c002-f-liv-baliza",
          "kind": "testimony",
          "headline": "La baliza 3 estaba desmontada",
          "detail": "Liv retiró su batería por corrosión cuatro días antes. Ninguna llamada real podía proceder de esa baliza."
        },
        {
          "id": "c002-f-liv-parka",
          "kind": "background",
          "headline": "Reparó una parka con hilo rojo",
          "detail": "La parka de servicio usada por Nora tiene un remiendo reciente con hilo rojo industrial, distinto de las fibras halladas en la radio."
        }
      ]
    },
    {
      "id": "c002-s-samuel",
      "name": "Samuel Okoro",
      "role": "Médico de campaña",
      "portraitPublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/sospechosos/samuel-okoro",
      "description": "Cuarenta y dos años. Rostro sereno, gafas rectangulares y chaqueta polar color arena sobre el uniforme médico.",
      "relation": "Supervisa la salud del equipo y había retirado a Elías de las salidas exteriores.",
      "facts": [
        {
          "id": "c002-f-samuel-alibi",
          "kind": "alibi",
          "headline": "Atendía a Liv en la enfermería",
          "detail": "Liv sufrió una quemadura leve a las 21:38. El registro clínico y el vendaje sitúan a ambos juntos desde entonces."
        },
        {
          "id": "c002-f-samuel-disputa",
          "kind": "motive",
          "headline": "Prohibió salir a Elías",
          "detail": "Discutieron porque Samuel consideraba peligrosa su arritmia. Elías amenazó con ocultar síntomas para terminar el estudio."
        },
        {
          "id": "c002-f-samuel-ampolla",
          "kind": "contradiction",
          "headline": "Falta una ampolla de sedante",
          "detail": "La usó dos noches antes para tratar a Tomás tras una crisis de ansiedad y olvidó anotarlo hasta esta noche."
        },
        {
          "id": "c002-f-samuel-bateria",
          "kind": "testimony",
          "headline": "Elías salió con una batería agotada",
          "detail": "Al rescatarlo, su radio llevaba una batería marcada como descartada por el taller. No recibió el aviso de regreso."
        }
      ]
    }
  ],
  "clues": [
    {
      "id": "c002-cl-registro-radio",
      "name": "Registro de radio",
      "kind": "essential",
      "foundAt": "Sobre la consola de comunicaciones",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/registro-radio",
      "states": [
        {
          "key": "found",
          "label": "Registro de radio",
          "description": "A las 21:12 consta una llamada de socorro de la baliza 3 y a las 21:30 un boletín firmado por Nora."
        },
        {
          "key": "analyzed",
          "label": "Registro — tiempos contrastados",
          "description": "La baliza 3 no tenía batería. La línea de las 21:12 fue añadida con una cinta distinta y sin el calco de presión de las páginas inferiores."
        }
      ]
    },
    {
      "id": "c002-cl-cinta-boletin",
      "name": "Cinta del boletín",
      "kind": "essential",
      "foundAt": "En el magnetófono de la radio",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/cinta-boletin",
      "states": [
        {
          "key": "found",
          "label": "Cinta del boletín",
          "description": "Casete de treinta minutos colocado en el magnetófono auxiliar."
        },
        {
          "key": "analyzed",
          "label": "Cinta — boletín reproducido",
          "description": "Contiene la voz de Nora dando el parte de las 21:30. Al final se oye el clic del temporizador automático; fue grabado antes."
        }
      ]
    },
    {
      "id": "c002-cl-cristal",
      "name": "Oscilador maestro",
      "kind": "essential",
      "foundAt": "En el estuche de auriculares de Nora",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/cristal",
      "states": [
        {
          "key": "found",
          "label": "Oscilador maestro",
          "description": "Pieza de cuarzo numerada que genera la frecuencia de referencia sin la que el transmisor no puede modular ningún canal."
        },
        {
          "key": "analyzed",
          "label": "Oscilador — procedencia contrastada",
          "description": "El número de serie pertenece al transmisor principal. Estaba envuelto en un paño rojo con polvo del interior del panel. Puede reinstalarse sin dejar una avería permanente."
        }
      ]
    },
    {
      "id": "c002-cl-mensaje-telex",
      "name": "Hoja de télex incompleta",
      "kind": "essential",
      "foundAt": "En la papelera de la radio",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/mensaje-telex",
      "states": [
        {
          "key": "found",
          "label": "Hoja de télex incompleta",
          "description": "Fragmentos de papel térmico con grupos de cifras y una línea cortada."
        },
        {
          "key": "analyzed",
          "label": "Télex — mensaje reconstruido",
          "description": "Ofrece dinero por las coordenadas de la veta y exige retrasar el informe oficial cuarenta y ocho horas. La respuesta debía enviarse por el canal privado de Nora."
        }
      ]
    },
    {
      "id": "c002-cl-tarjeta",
      "name": "Registro de tarjetas",
      "kind": "essential",
      "foundAt": "En el lector mecánico del túnel",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/tarjeta",
      "states": [
        {
          "key": "found",
          "label": "Registro de tarjetas",
          "description": "Tira perforada con las aperturas de las puertas interiores."
        },
        {
          "key": "analyzed",
          "label": "Registro — acceso identificado",
          "description": "La tarjeta E-02 entró a las 21:14. La N-04 de Nora la siguió a las 21:17 y no regresó al módulo central hasta las 21:36."
        }
      ]
    },
    {
      "id": "c002-cl-mapa",
      "name": "Mapa sísmico de Elías",
      "kind": "essential",
      "foundAt": "En el laboratorio de hielo",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/mapa",
      "states": [
        {
          "key": "found",
          "label": "Mapa sísmico",
          "description": "Plano de túneles con una veta marcada bajo el refugio antiguo."
        },
        {
          "key": "analyzed",
          "label": "Mapa — anotaciones interpretadas",
          "description": "Elías señaló el refugio S-2 y escribió: «eco metálico bajo la veta; revisar antes del informe». Es el destino mencionado en el falso aviso."
        }
      ]
    },
    {
      "id": "c002-cl-bateria",
      "name": "Batería de radio agotada",
      "kind": "secondary",
      "foundAt": "En la radio portátil de Elías",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/bateria",
      "states": [
        {
          "key": "found",
          "label": "Batería agotada",
          "description": "Batería marcada con una franja blanca de descarte."
        },
        {
          "key": "analyzed",
          "label": "Batería — lote del taller",
          "description": "La pieza procedía de la caja de reciclaje del taller. Fue intercambiada por la batería cargada que Liv entregó a Elías esa tarde."
        }
      ]
    },
    {
      "id": "c002-cl-fibras",
      "name": "Fibras rojas",
      "kind": "secondary",
      "foundAt": "En el panel del transmisor",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/fibras",
      "states": [
        {
          "key": "found",
          "label": "Fibras rojas",
          "description": "Dos fibras de lana roja atrapadas en el cierre del panel."
        },
        {
          "key": "analyzed",
          "label": "Fibras — paño de mantenimiento",
          "description": "Coinciden con el paño rojo que Nora usa para limpiar conectores, no con el hilo sintético empleado para reparar las parkas."
        }
      ]
    },
    {
      "id": "c002-cl-huellas-nieve",
      "name": "Huellas junto al túnel",
      "kind": "secondary",
      "foundAt": "En la galería de acceso",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/huellas-nieve",
      "states": [
        {
          "key": "found",
          "label": "Huellas sobre nieve prensada",
          "description": "Un rastro va del módulo de radio al túnel y vuelve. El viento ha borrado parte del dibujo."
        },
        {
          "key": "analyzed",
          "label": "Huellas — recorrido acotado",
          "description": "La longitud del paso y la talla son compatibles con Nora y Tomás. No hay un segundo rastro procedente del exterior."
        }
      ]
    },
    {
      "id": "c002-cl-informe-mineral",
      "name": "Informe mineralógico",
      "kind": "essential",
      "foundAt": "En el laboratorio de hielo",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/informe-mineral",
      "states": [
        {
          "key": "found",
          "label": "Informe mineralógico",
          "description": "Resultados que confirman una veta de tierras raras bajo la plataforma."
        },
        {
          "key": "analyzed",
          "label": "Informe — envío previsto",
          "description": "Elías había programado enviar las coordenadas al Instituto a las 08:00. Nora preparó el cifrado y conocía el valor del hallazgo."
        }
      ]
    },
    {
      "id": "c002-cl-combustible",
      "name": "Libro de combustible",
      "kind": "red_herring",
      "foundAt": "En el taller",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/combustible",
      "states": [
        {
          "key": "found",
          "label": "Libro de combustible",
          "description": "Faltan cuarenta litros de gasóleo respecto al depósito."
        },
        {
          "key": "analyzed",
          "label": "Combustible — salida explicada",
          "description": "Liv admite un trueque irregular con un pesquero. La fecha y el nivel del depósito lo sitúan tres semanas antes."
        }
      ]
    },
    {
      "id": "c002-cl-ampolla",
      "name": "Ampolla de sedante",
      "kind": "red_herring",
      "foundAt": "En la enfermería",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/ampolla",
      "states": [
        {
          "key": "found",
          "label": "Ampolla de sedante ausente",
          "description": "El inventario médico tiene una unidad menos que el armario."
        },
        {
          "key": "analyzed",
          "label": "Sedante — uso anterior",
          "description": "Samuel muestra el parte tardío y Tomás confirma que recibió la dosis dos noches antes. Elías no presenta signos de sedación."
        }
      ]
    },
    {
      "id": "c002-cl-informe-seguridad",
      "name": "Informe de seguridad",
      "kind": "red_herring",
      "foundAt": "En el despacho del jefe",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/informe-seguridad",
      "states": [
        {
          "key": "found",
          "label": "Informe de seguridad",
          "description": "Tomás firmó como revisado el refugio S-2."
        },
        {
          "key": "analyzed",
          "label": "Informe — inspección falseada",
          "description": "El calefactor del refugio lleva semanas averiado. Tomás ocultó la negligencia para evitar el cierre de Boreal-7."
        }
      ]
    },
    {
      "id": "c002-cl-nota-refugio",
      "name": "Nota de Elías",
      "kind": "essential",
      "foundAt": "En el refugio sísmico S-2",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/pruebas/nota-refugio",
      "states": [
        {
          "key": "found",
          "label": "Nota escrita en el refugio",
          "description": "Elías anotó la hora de encierro y describió una parka de servicio. La clave «Aurora sin sombra» la había leído antes en el aviso escrito; quien cerró la puerta no habló."
        },
        {
          "key": "analyzed",
          "label": "Nota — testimonio contrastado",
          "description": "El registro de acceso, la cinta y el télex confirman los tres detalles anotados por Elías antes del rescate."
        }
      ]
    }
  ],
  "nodes": [
    {
      "id": "c002-n-intro",
      "kind": "intro",
      "title": "Boreal-7, veintidós diez",
      "location": "Módulo central",
      "body": "A las 22:00 se activó la alarma automática del temporizador de retorno de Elías. Diez minutos después sigue sonando. Al otro lado de los ojos de buey, la noche polar borra la diferencia entre cielo y hielo.\n\nEl doctor Elías Roldán entró a las 21:14 en la galería interior para atender una supuesta llamada de la baliza 3. No ha regresado. Su traje de emergencia sigue en la estación y el transmisor principal ha dejado de funcionar.\n\nCuatro personas permanecen en Boreal-7. El avión de relevo no llegará hasta dentro de doce días. Con el frío aumentando en los túneles, encontrar a Elías es más urgente que averiguar quién miente.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/exterior",
      "effects": []
    },
    {
      "id": "c002-n-radio",
      "kind": "scene",
      "title": "La sala de radio",
      "location": "Módulo de comunicaciones",
      "body": "Dos lámparas verdes iluminan una consola analógica, un télex y un magnetófono auxiliar. El transmisor principal recibe energía, pero no emite.\n\nEn el libro de guardia aparece una llamada de la baliza 3 a las 21:12. Dieciocho minutos después, la firma de Nora certifica el boletín meteorológico habitual.\n\nEn la papelera hay tiras de papel térmico rotas. Bajo el escritorio, una cinta de casete todavía ocupa el magnetófono.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/radio",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-registro-radio"
        },
        {
          "effect": "discover_clue",
          "target": "c002-cl-cinta-boletin"
        },
        {
          "effect": "discover_clue",
          "target": "c002-cl-mensaje-telex"
        }
      ]
    },
    {
      "id": "c002-n-laboratorio",
      "kind": "scene",
      "title": "El laboratorio de hielo",
      "location": "Módulo científico",
      "body": "Los testigos de hielo azulean bajo los fluorescentes. En la mesa de Elías hay un mapa sísmico cubierto con papel vegetal y un informe mineralógico sin enviar.\n\nUna línea roja sigue una veta bajo el antiguo refugio S-2. En el margen, Elías escribió que debía revisar un eco metálico antes de transmitir las coordenadas.\n\nSu taza conserva café frío. No parece una salida planeada.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/laboratorio",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-mapa"
        },
        {
          "effect": "discover_clue",
          "target": "c002-cl-informe-mineral"
        }
      ]
    },
    {
      "id": "c002-n-taller",
      "kind": "scene",
      "title": "El taller mecánico",
      "location": "Módulo de máquinas",
      "body": "El taller huele a gasóleo y metal caliente. Una caja marcada «baterías descartadas» está abierta; queda un hueco rectangular en la espuma.\n\nEl libro de combustible no coincide con el nivel del depósito: faltan cuarenta litros. Junto al banco hay hilo rojo sintético y agujas gruesas para reparar parkas.\n\nEl generador auxiliar trabaja con un zumbido estable.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/taller",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-combustible"
        }
      ]
    },
    {
      "id": "c002-n-tunel",
      "kind": "scene",
      "title": "La galería de acceso",
      "location": "Galería presurizada",
      "body": "Una esclusa interior conduce al túnel excavado en el hielo. El lector de tarjetas imprime cada apertura sobre una tira perforada.\n\nSobre la nieve prensada se distinguen dos rastros: unas botas grandes avanzan hacia S-2 sin regreso visible; tres minutos detrás, una pisada menor va desde el módulo de radio hacia la galería y vuelve. No hay huellas que lleguen desde la compuerta exterior.\n\nLas juntas exteriores conservan una costra continua de hielo. Nadie ha abierto esa compuerta desde antes de la tormenta.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/tunel",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-tarjeta"
        },
        {
          "effect": "discover_clue",
          "target": "c002-cl-huellas-nieve"
        },
        {
          "effect": "set_flag",
          "target": "sin_intruso",
          "value": "1"
        }
      ]
    },
    {
      "id": "c002-n-camarote",
      "kind": "scene",
      "title": "El camarote de Elías",
      "location": "Módulo dormitorio",
      "body": "La litera está sin deshacer. En un cuaderno de campo, Elías anotó la clave verbal usada para autenticar avisos exteriores: «Aurora sin sombra».\n\nSolo él, Tomás y la operadora de radio debían conocerla. La frase aparece junto a una advertencia: no salir solo por su arritmia.\n\nEn el armario falta una parka ligera. El traje de emergencia permanece colgado.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/camarote",
      "effects": []
    },
    {
      "id": "c002-n-enfermeria",
      "kind": "scene",
      "title": "La enfermería",
      "location": "Módulo médico",
      "body": "El armario de fármacos tiene una casilla vacía: falta una ampolla de sedante. Samuel ha dejado el inventario abierto, con una corrección reciente.\n\nLa ficha de Elías menciona una arritmia y la prohibición expresa de realizar salidas sin acompañante.\n\nSobre la camilla hay material preparado para tratar hipotermia.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/enfermeria",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-ampolla"
        }
      ]
    },
    {
      "id": "c002-n-despacho",
      "kind": "scene",
      "title": "El despacho del jefe",
      "location": "Módulo central",
      "body": "Un mapa de evacuación ocupa media pared. El refugio S-2 figura como operativo, firmado por Tomás hace seis días.\n\nEn el cajón hay una orden de inspección: si el refugio o la radio fallaban, Boreal-7 sería clausurada al final de la campaña.\n\nEl armario de emergencia conserva todas las llaves numeradas.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/despacho",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-informe-seguridad"
        }
      ]
    },
    {
      "id": "c002-n-nora",
      "kind": "interrogation",
      "title": "Nora Vidal",
      "location": "Sala de radio",
      "body": "Nora mantiene los auriculares alrededor del cuello aunque el transmisor está mudo.\n\n—Elías recibió la llamada de la baliza 3. Yo le dije que esperase, pero salió. No abandoné esta silla. A las nueve y media di el boletín; Tomás lo oyó.\n\n—¿Quién conocía el contenido de su informe?\n\n—Yo lo cifré. Era rutina.\n\nDice que su tarjeta N-04 permanece en el bolsillo desde la cena.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/nora",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c002-f-nora-turno"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-nora-informe"
        }
      ]
    },
    {
      "id": "c002-n-tomas",
      "kind": "interrogation",
      "title": "Tomás Echevarría",
      "location": "Comedor",
      "body": "Tomás aprieta una taza entre ambas manos.\n\n—Revisaba los pluviómetros interiores. Vi a Liv hacia las nueve y cinco. A las nueve y veinticinco ya estaba aquí con Samuel. Oímos el boletín de Nora por el altavoz.\n\nAdmite haber discutido con Elías.\n\n—Quería incluir cada avería en su informe. Un despacho en Madrid puede cerrar una estación por una bombilla fundida.\n\nInsiste en que el refugio S-2 es seguro.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/tomas",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c002-f-tomas-alibi"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-tomas-discusion"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-tomas-llaves"
        }
      ]
    },
    {
      "id": "c002-n-liv",
      "kind": "interrogation",
      "title": "Liv Halvorsen",
      "location": "Taller",
      "body": "Liv sostiene la mano izquierda bajo agua fría.\n\n—Estuve con el auxiliar desde antes de las nueve hasta que me quemé. Samuel me vendó a las nueve y treinta y ocho.\n\nConfirma que desmontó la baliza 3 cuatro días atrás.\n\n—No tenía batería ni transmisor. Lo anoté en la pizarra. Si alguien oyó esa baliza, oyó una mentira.\n\nCuando se menciona el combustible, mira hacia el depósito.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/liv",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c002-f-liv-alibi"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-liv-baliza"
        }
      ]
    },
    {
      "id": "c002-n-samuel",
      "kind": "interrogation",
      "title": "Samuel Okoro",
      "location": "Enfermería",
      "body": "Samuel prepara mantas térmicas mientras responde.\n\n—Vi a Tomás en el comedor a las nueve y veinticinco. A las nueve y treinta y ocho Liv llegó con una quemadura; desde entonces estuvimos juntos.\n\nReconoce su disputa con Elías por la arritmia.\n\n—Salir solo podía matarlo. Eso no significa que quisiera encerrarlo.\n\nAl preguntarle por la ampolla ausente, tarda en contestar.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/samuel",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c002-f-samuel-alibi"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-samuel-disputa"
        }
      ]
    },
    {
      "id": "c002-n-registro",
      "kind": "analysis",
      "title": "Contrastar el registro de radio",
      "location": "Sala de radio",
      "body": "Las páginas del libro son autocopiativas. La llamada de las 21:12 solo aparece en la hoja superior: fue escrita cuando ya no había presión sobre las copias.\n\nLiv confirma que la baliza 3 llevaba cuatro días sin batería. La anotación de socorro no registra una comunicación recibida; fabrica una razón para que Elías saliera.\n\nLa tinta coincide con el bolígrafo sujeto a la consola, compartido por el turno.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/radio",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-registro-radio",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c002-n-cinta",
      "kind": "analysis",
      "title": "Escuchar la cinta del boletín",
      "location": "Sala de radio",
      "body": "La voz de Nora da temperaturas, presión y viento. A las 21:30 exactas comienza el boletín que Tomás oyó desde el comedor.\n\nDespués de la despedida no hay movimiento de silla ni respiración. Se oye un clic eléctrico y el magnetófono se detiene. El temporizador de la consola puede iniciar una cinta a una hora programada.\n\nEl boletín prueba que sonó su voz. No que Nora estuviera ante el micrófono.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/radio",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-cinta-boletin",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-nora-cinta"
        }
      ]
    },
    {
      "id": "c002-n-transmisor",
      "kind": "analysis",
      "title": "Abrir el transmisor principal",
      "location": "Sala de radio",
      "body": "Liv corta la corriente y abre el panel. Falta el oscilador maestro de cuarzo: sin esa referencia, el equipo recibe energía pero no puede modular ninguna frecuencia.\n\nEn el cierre quedan dos fibras de lana roja y polvo gris reciente. La pieza se retiró con la herramienta adecuada, sin romper nada y puede reinstalarse en minutos.\n\nEl sabotaje impide pedir ayuda y bloquea el envío automático del informe. Quien lo hizo podía restaurar después el equipo, borrar el envío programado y presentar el fallo como una avería térmica.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/radio",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-fibras"
        }
      ]
    },
    {
      "id": "c002-n-telex",
      "kind": "analysis",
      "title": "Reconstruir la hoja de télex",
      "location": "Laboratorio",
      "body": "Los fragmentos encajan sobre una placa transparente. Los grupos numéricos usan la clave comercial guardada en el archivador de comunicaciones.\n\nEl mensaje ofrece una transferencia por las coordenadas de la veta y exige demorar cuarenta y ocho horas el informe oficial. La respuesta debía salir por el canal privado asignado a Nora.\n\nUna esquina arrancada conserva su inicial de recepción.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/laboratorio",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-mensaje-telex",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-nora-oferta"
        }
      ]
    },
    {
      "id": "c002-n-mapa",
      "kind": "analysis",
      "title": "Interpretar el mapa sísmico",
      "location": "Laboratorio",
      "body": "Las marcas de Elías convergen bajo el refugio S-2. Allí detectó una veta de tierras raras y un eco metálico que quería revisar antes de enviar el informe.\n\nLa supuesta llamada de la baliza mencionaba precisamente ese eco. Quien redactó el aviso había leído el mapa o conocía el trabajo de Elías.\n\nLa ruta interior hasta S-2 puede recorrerse sin abrir la compuerta exterior.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/laboratorio",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-mapa",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c002-n-informe",
      "kind": "analysis",
      "title": "Comprobar el envío de Elías",
      "location": "Laboratorio",
      "body": "El terminal científico conserva la cola de trabajos. El informe mineralógico debía cifrarse a las 07:30 y enviarse al Instituto a las 08:00.\n\nNora había preparado la plantilla de cifrado esa tarde. Tomás conocía las deficiencias anexas, pero las coordenadas completas solo aparecen en la copia que pasó por comunicaciones.\n\nElías no pensaba vender el hallazgo ni retrasarlo.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/laboratorio",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-informe-mineral",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c002-n-tarjeta",
      "kind": "analysis",
      "title": "Leer el registro de tarjetas",
      "location": "Galería presurizada",
      "body": "La tira perforada asigna un patrón a cada tarjeta. A las 21:14 aparece E-02, la de Elías. A las 21:17, N-04 abre la misma puerta. N-04 no regresa hacia el módulo de radio hasta las 21:36.\n\nA las 21:30, cuando sonó el boletín grabado, la tarjeta de Nora seguía en el túnel. Tomás conserva la suya y la llave maestra no produce registro.\n\nLas perforaciones están impresas bajo una capa intacta de cinta protectora: no se añadieron después.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/tunel",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-tarjeta",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-nora-acceso"
        }
      ]
    },
    {
      "id": "c002-n-fibras",
      "kind": "analysis",
      "title": "Comparar las fibras rojas",
      "location": "Taller",
      "body": "El hilo de las parkas es sintético, liso y brillante. Las fibras del transmisor son lana teñida y retienen el mismo polvo gris del panel.\n\nEl paño rojo que Nora usa para limpiar conectores es de la misma lana. La coincidencia justifica registrar el estuche de sus auriculares; Nora acepta en presencia de Tomás y Liv.\n\nLa parka reparada queda descartada como origen de las fibras.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/taller",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-fibras",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-liv-parka"
        }
      ]
    },
    {
      "id": "c002-n-estuche",
      "kind": "analysis",
      "title": "Registrar el estuche de Nora",
      "location": "Sala de radio",
      "body": "Tomás abre el registro de pertenencias y Liv presencia la diligencia. Bajo los auriculares hay un paño rojo cuidadosamente doblado.\n\nDentro aparece el oscilador maestro del transmisor, con su número de serie intacto y polvo gris adherido al zócalo. Puede reinstalarse en pocos minutos: no era una destrucción, sino un silencio temporal.\n\nNora deja de afirmar que nadie abrió el panel, pero no explica por qué guardaba la pieza que mantenía incomunicada la estación.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/radio",
      "effects": [
        { "effect": "discover_clue", "target": "c002-cl-cristal" },
        { "effect": "advance_clue", "target": "c002-cl-cristal", "value": "analyzed" },
        { "effect": "reveal_fact", "target": "c002-f-nora-cristal" }
      ]
    },
    {
      "id": "c002-n-huellas",
      "kind": "analysis",
      "title": "Medir las huellas de la galería",
      "location": "Galería presurizada",
      "body": "El rastro de botas grandes coincide con el calzado de Elías y termina en dirección a S-2. La segunda línea, de ida y vuelta, permite descartar por talla a Liv y Samuel; es compatible con Nora o Tomás.\n\nNo existe un tercer rastro desde la compuerta exterior. Sus juntas conservan hielo continuo y el sensor confirma que no se abrió durante siete horas.\n\nQuien siguió a Elías salió del interior de Boreal-7.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/tunel",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-huellas-nieve",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c002-n-combustible",
      "kind": "analysis",
      "title": "Cuadrar el combustible",
      "location": "Taller",
      "body": "Los cuarenta litros faltantes salieron tres semanas antes. Liv admite que los cambió por antibióticos con un pesquero que no podía atracar oficialmente.\n\nEl manifiesto del barco y la curva del depósito coinciden. Fue una infracción grave, pero no explica la llamada falsa ni el sabotaje de esta noche.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/taller",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-combustible",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-liv-combustible"
        }
      ]
    },
    {
      "id": "c002-n-sedante",
      "kind": "analysis",
      "title": "Revisar el sedante ausente",
      "location": "Enfermería",
      "body": "Samuel recupera un parte sin archivar: administró la ampolla a Tomás dos noches antes, durante una crisis de ansiedad. Tomás confirma el tratamiento y la hora.\n\nNo hay jeringas usadas esta noche ni indicios de sedación en las pertenencias de Elías. La omisión explica el inventario, no la desaparición.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/enfermeria",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-ampolla",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-samuel-ampolla"
        }
      ]
    },
    {
      "id": "c002-n-seguridad",
      "kind": "analysis",
      "title": "Inspeccionar el informe de seguridad",
      "location": "Despacho del jefe",
      "body": "El sello de revisión es reciente, pero el refugio S-2 no recibió piezas de recambio. Liv confirma que su calefactor está averiado desde octubre.\n\nTomás admite haber firmado una inspección que no realizó. Si el informe de Elías llegaba con ese anexo, la estación podía cerrar.\n\nSu mentira proporciona un motivo para ocultar información, aunque no lo sitúa en la radio ni en el túnel a las 21:17.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/despacho",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-informe-seguridad",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-tomas-seguridad"
        }
      ]
    },
    {
      "id": "c002-n-bateria",
      "kind": "analysis",
      "title": "Rastrear la batería descartada",
      "location": "Taller",
      "body": "Liv comprueba el número de lote de la batería encontrada en la caja vacía. Es una unidad descartada: mantiene la luz de encendido, pero no puede transmitir.\n\nElías recibió esa tarde otra batería cargada. Alguien la cambió antes de su salida, sabiendo que una prueba superficial parecería correcta.\n\nLa caja de reciclaje está en el taller abierto; cualquiera del equipo podía acceder.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/taller",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-bateria",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c002-f-samuel-bateria"
        }
      ]
    },
    {
      "id": "c002-n-rescate",
      "kind": "scene",
      "title": "El refugio S-2",
      "location": "Túnel bajo el hielo",
      "body": "Tomás entrega la llave maestra del armario de emergencia y con ella abre la última esclusa. Detrás, el refugio S-2 está casi a oscuras. Elías golpea el metal desde dentro con una llave inglesa.\n\nTiene principio de hipotermia, pero está consciente. El falso aviso escrito citaba «Aurora sin sombra»; después, alguien con una parka de servicio cerró la puerta sin hablar. Su radio parecía encendida y nunca recibió respuesta.\n\nCon la débil lámpara de emergencia, inmediatamente después del encierro, Elías dejó una nota breve con la hora: 21:19. No vio el rostro bajo la capucha. Samuel inicia el recalentamiento mientras usted conserva la batería y la nota.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/refugio",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c002-cl-bateria"
        },
        {
          "effect": "discover_clue",
          "target": "c002-cl-nota-refugio"
        },
        {
          "effect": "set_flag",
          "target": "victima_rescatada",
          "value": "1"
        }
      ]
    },
    {
      "id": "c002-n-nota",
      "kind": "analysis",
      "title": "Contrastar la nota de Elías",
      "location": "Enfermería",
      "body": "La nota fue escrita con el lápiz de campo de Elías a la luz de emergencia, antes de que el refugio se enfriara. Fija la hora aproximada del encierro y describe una parka de servicio; también copia la clave que había leído en el falso aviso.\n\nEl registro sitúa la tarjeta N-04 fuera entre las 21:17 y las 21:36. La cinta cubre la ausencia de Nora a las 21:30. El télex explica por qué necesitaba retrasar el informe y el oscilador oculto por qué nadie podía pedir ayuda.\n\nElías no identifica un rostro ni oyó hablar a quien cerró la puerta. Las pruebas independientes permiten reconstruir el recorrido.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/enfermeria",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c002-cl-nota-refugio",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c002-n-reconstruccion",
      "kind": "analysis",
      "title": "Reconstruir la desaparición",
      "location": "Sala de mapas",
      "body": "A las 21:12 alguien añadió una llamada imposible al registro. Elías entró en la galería con una batería agotada, atraído hacia S-2 por una frase reservada a comunicaciones.\n\nLa tarjeta de Nora lo siguió tres minutos después y no regresó hasta las 21:36. Mientras su voz sonaba automáticamente a las 21:30, ella seguía en el túnel y el transmisor permanecía inutilizado.\n\nLos secretos de Tomás, Liv y Samuel explican sus mentiras. Ninguno enlaza la llamada, el acceso, el falso turno, el oscilador oculto y el beneficio económico como lo hacen las pruebas contra Nora.",
      "imagePublicId": "archivos-de-medianoche/la-senal-bajo-el-hielo/escenas/mapas",
      "effects": []
    }
  ],
  "options": [
    {
      "id": "c002-o-intro-radio",
      "to": "c002-n-radio",
      "label": "Entrar en la sala de radio",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-laboratorio",
      "to": "c002-n-laboratorio",
      "label": "Examinar el laboratorio de hielo",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-taller",
      "to": "c002-n-taller",
      "label": "Registrar el taller",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-tunel",
      "to": "c002-n-tunel",
      "label": "Inspeccionar la galería de acceso",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-camarote",
      "to": "c002-n-camarote",
      "label": "Revisar el camarote de Elías",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-enfermeria",
      "to": "c002-n-enfermeria",
      "label": "Examinar la enfermería",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-despacho",
      "to": "c002-n-despacho",
      "label": "Entrar en el despacho del jefe",
      "line": "La estación",
      "requires": []
    },
    {
      "id": "c002-o-nora",
      "to": "c002-n-nora",
      "label": "Interrogar a Nora Vidal",
      "line": "El equipo",
      "requires": []
    },
    {
      "id": "c002-o-tomas",
      "to": "c002-n-tomas",
      "label": "Interrogar a Tomás Echevarría",
      "line": "El equipo",
      "requires": []
    },
    {
      "id": "c002-o-liv",
      "to": "c002-n-liv",
      "label": "Interrogar a Liv Halvorsen",
      "line": "El equipo",
      "requires": []
    },
    {
      "id": "c002-o-samuel",
      "to": "c002-n-samuel",
      "label": "Interrogar a Samuel Okoro",
      "line": "El equipo",
      "requires": []
    },
    {
      "id": "c002-o-registro",
      "to": "c002-n-registro",
      "label": "Contrastar el registro con la baliza",
      "line": "Comunicaciones",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-registro-radio"
        },
        {
          "requirement": "fact",
          "target": "c002-f-liv-baliza"
        }
      ]
    },
    {
      "id": "c002-o-cinta",
      "to": "c002-n-cinta",
      "label": "Escuchar la cinta del boletín",
      "line": "Comunicaciones",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-cinta-boletin"
        },
        {
          "requirement": "fact",
          "target": "c002-f-nora-turno"
        }
      ]
    },
    {
      "id": "c002-o-transmisor",
      "to": "c002-n-transmisor",
      "label": "Abrir el transmisor averiado",
      "line": "Comunicaciones",
      "requires": [
        {
          "requirement": "node",
          "target": "c002-n-radio"
        }
      ]
    },
    {
      "id": "c002-o-telex",
      "to": "c002-n-telex",
      "label": "Reconstruir la hoja de télex",
      "line": "Comunicaciones",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-mensaje-telex"
        },
        {
          "requirement": "clue",
          "target": "c002-cl-informe-mineral"
        }
      ]
    },
    {
      "id": "c002-o-mapa",
      "to": "c002-n-mapa",
      "label": "Interpretar el mapa sísmico",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-mapa"
        }
      ]
    },
    {
      "id": "c002-o-informe",
      "to": "c002-n-informe",
      "label": "Comprobar el envío programado",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-informe-mineral"
        },
        {
          "requirement": "fact",
          "target": "c002-f-nora-informe"
        }
      ]
    },
    {
      "id": "c002-o-tarjeta",
      "to": "c002-n-tarjeta",
      "label": "Leer la tira de accesos",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-tarjeta"
        }
      ]
    },
    {
      "id": "c002-o-fibras",
      "to": "c002-n-fibras",
      "label": "Comparar las fibras del transmisor",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-fibras"
        }
      ]
    },
    {
      "id": "c002-o-huellas",
      "to": "c002-n-huellas",
      "label": "Medir las huellas de la galería",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-huellas-nieve"
        }
      ]
    },
    {
      "id": "c002-o-estuche",
      "to": "c002-n-estuche",
      "label": "Registrar el estuche de auriculares de Nora",
      "line": "Peritajes",
      "requires": [
        { "requirement": "clue_state", "target": "c002-cl-fibras", "value": "analyzed" },
        { "requirement": "fact", "target": "c002-f-nora-turno" }
      ]
    },
    {
      "id": "c002-o-combustible",
      "to": "c002-n-combustible",
      "label": "Cuadrar el combustible desaparecido",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-combustible"
        }
      ]
    },
    {
      "id": "c002-o-sedante",
      "to": "c002-n-sedante",
      "label": "Revisar el sedante ausente",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-ampolla"
        },
        {
          "requirement": "fact",
          "target": "c002-f-samuel-alibi"
        }
      ]
    },
    {
      "id": "c002-o-seguridad",
      "to": "c002-n-seguridad",
      "label": "Comprobar la inspección del refugio",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-informe-seguridad"
        },
        {
          "requirement": "fact",
          "target": "c002-f-tomas-llaves"
        }
      ]
    },
    {
      "id": "c002-o-rescate",
      "to": "c002-n-rescate",
      "label": "Seguir el túnel hasta el refugio S-2",
      "line": "Operación de rescate",
      "requires": [
        {
          "requirement": "node",
          "target": "c002-n-mapa"
        }
      ]
    },
    {
      "id": "c002-o-bateria",
      "to": "c002-n-bateria",
      "label": "Examinar la batería de la radio de Elías",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "node",
          "target": "c002-n-rescate"
        }
      ]
    },
    {
      "id": "c002-o-nota",
      "to": "c002-n-nota",
      "label": "Contrastar la nota escrita en el refugio",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "clue",
          "target": "c002-cl-nota-refugio"
        },
        {
          "requirement": "node",
          "target": "c002-n-cinta"
        },
        {
          "requirement": "node",
          "target": "c002-n-telex"
        }
      ]
    },
    {
      "id": "c002-o-reconstruccion",
      "to": "c002-n-reconstruccion",
      "label": "Ordenar la cronología sobre el mapa",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "node",
          "target": "c002-n-registro"
        },
        {
          "requirement": "node",
          "target": "c002-n-tarjeta"
        },
        {
          "requirement": "node",
          "target": "c002-n-estuche"
        },
        {
          "requirement": "node",
          "target": "c002-n-nota"
        }
      ]
    }
  ],
  "motives": [
    {
      "id": "c002-mo-coordenadas",
      "label": "Vender en secreto las coordenadas del yacimiento"
    },
    {
      "id": "c002-mo-cierre",
      "label": "Evitar el cierre de Boreal-7 por fallos de seguridad"
    },
    {
      "id": "c002-mo-combustible",
      "label": "Ocultar el desvío de combustible"
    },
    {
      "id": "c002-mo-medico",
      "label": "Impedir que se conociera una negligencia médica"
    },
    {
      "id": "c002-mo-personal",
      "label": "Vengarse de Elías por una disputa personal"
    }
  ],
  "methods": [
    {
      "id": "c002-me-refugio",
      "label": "Fabricó un aviso, lo encerró en el refugio y saboteó las comunicaciones"
    },
    {
      "id": "c002-me-exterior",
      "label": "Lo abandonó fuera de la estación después de una discusión"
    },
    {
      "id": "c002-me-sedante",
      "label": "Lo sedó y lo ocultó en el módulo médico"
    },
    {
      "id": "c002-me-accidente",
      "label": "Provocó un accidente en la baliza 3"
    },
    {
      "id": "c002-me-fuga",
      "label": "Elías fingió su desaparición y huyó con el informe"
    }
  ],
  "solution": {
    "culprit": "c002-s-nora",
    "motive": "c002-mo-coordenadas",
    "method": "c002-me-refugio",
    "evidence": [
      "c002-cl-registro-radio",
      "c002-cl-cinta-boletin",
      "c002-cl-cristal",
      "c002-cl-mensaje-telex",
      "c002-cl-tarjeta",
      "c002-cl-mapa",
      "c002-cl-bateria",
      "c002-cl-fibras",
      "c002-cl-huellas-nieve",
      "c002-cl-informe-mineral",
      "c002-cl-nota-refugio"
    ],
    "evidenceGroups": [
      {
        "label": "Aviso fabricado",
        "alternatives": [
          {
            "clueId": "c002-cl-registro-radio",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c002-cl-nota-refugio",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Presencia en el túnel",
        "alternatives": [
          {
            "clueId": "c002-cl-tarjeta",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Sabotaje y falsa coartada",
        "alternatives": [
          {
            "clueId": "c002-cl-cinta-boletin",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c002-cl-cristal",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c002-cl-fibras",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Motivo económico",
        "alternatives": [
          {
            "clueId": "c002-cl-mensaje-telex",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c002-cl-informe-mineral",
            "stateKey": "analyzed"
          }
        ]
      }
    ],
    "accusationRequirements": [
      { "requirement": "flag", "target": "victima_rescatada", "value": "1" }
    ],
    "explanation": "Nora Vidal conocía las coordenadas de la veta porque preparaba el cifrado del informe de Elías. Un télex dirigido a su canal privado le ofrecía dinero por retrasar el envío y facilitar la posición exacta.\n\nAñadió al registro una llamada imposible de la baliza 3 y empleó la clave «Aurora sin sombra» para que Elías creyera que el aviso era auténtico. Antes de que saliera, sustituyó la batería cargada de su radio por una unidad descartada. Elías entró al túnel con su tarjeta a las 21:14; la tarjeta N-04 de Nora lo siguió tres minutos después.\n\nNora cerró el refugio S-2 desde fuera y no regresó al módulo central hasta las 21:36. A las 21:30 un temporizador reprodujo el boletín que había grabado, creando la impresión de que seguía en la radio mientras aún estaba en el túnel. Antes de salir había retirado el oscilador maestro para impedir llamadas de auxilio y bloquear el envío automático del informe. Pensaba reinstalarlo tras borrar el envío, atribuir el silencio a una avería térmica y usar más tarde su canal privado. El oscilador apareció dentro de su estuche, envuelto en el paño cuyas fibras quedaron en el panel.\n\nLa tormenta debía mantener a Elías aislado hasta que Nora pudiera vender las coordenadas y presentar la desaparición como un accidente. El registro de puertas y el hielo intacto de la compuerta descartan a un intruso. Elías fue rescatado con hipotermia, pero consciente.\n\nTomás falseó una inspección, Liv desvió combustible y Samuel omitió un sedante. Sus secretos explican sus mentiras, pero ninguno reúne el aviso falso, el acceso al túnel, la coartada grabada, el sabotaje y el beneficio económico.",
    "epitaph": "Bajo el hielo no había una voz pidiendo ayuda. Había alguien procurando que nadie pudiera pedirla."
  }
};
