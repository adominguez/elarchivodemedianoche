/** Canon editorial del expediente #001. Ver docs/EXPEDIENTE-001.md. */
import type { CaseDefinition } from './definition.ts';

export const case001: CaseDefinition = {
  "id": "c001",
  "slug": "la-ultima-campanada",
  "fileCode": "#001",
  "title": "La última campanada",
  "subtitle": "Muerte en Villa Bruma",
  "place": "Villa Bruma, costa norte",
  "dateLabel": "Noche del 3 de noviembre de 1972",
  "victimName": "Esteban Miralles",
  "briefing": "Esteban Miralles apareció muerto en el salón de Villa Bruma durante la tormenta. Vera, Damián y Abel aseguran haber oído su voz mientras daban las once, cuando los tres estaban juntos en la cocina. La doctora llegó veinte minutos después. El puente de la carretera de la costa está cortado; la carretera alta sigue abierta. Una hora parece poner a todos a salvo. Su trabajo es comprobarla.",
  "coverPublicId": "archivos-de-medianoche/la-ultima-campanada/portada",
  "entryNodeId": "c001-n-intro",
  "suspects": [
    {
      "id": "c001-s-abel",
      "name": "Abel Varela",
      "role": "Administrador",
      "relation": "Once años llevando las cuentas de Villa Bruma.",
      "description": "Metódico, cortés, incapaz de levantar la voz. Conoce el valor de cada teja de la casa y el nombre de cada acreedor.",
      "portraitPublicId": "archivos-de-medianoche/la-ultima-campanada/sospechosos/abel-varela",
      "facts": [
        {
          "id": "c001-f-abel-alibi",
          "kind": "alibi",
          "headline": "Dice haber pasado la noche en el pabellón",
          "detail": "Dice haber estado solo en el pabellón desde las 21:30 hasta poco antes de las 23:00. Vera y Damián lo sitúan en la cocina durante las campanadas; el tramo anterior carece de testigos."
        },
        {
          "id": "c001-f-abel-motive",
          "kind": "motive",
          "headline": "Se opuso a la auditoría",
          "detail": "Confrontado con la carta y los justificantes, reconoce su oposición a la auditoría. Los recibos de entregas a su nombre no tienen asiento en el libro."
        },
        {
          "id": "c001-f-abel-cuentas",
          "kind": "contradiction",
          "headline": "No explica los 37.400",
          "detail": "Ante el libro de cuentas habla de «desfases temporales». Cuando se le menciona la cifra del secante, deja de hablar y pide un vaso de agua."
        },
        {
          "id": "c001-f-abel-cita",
          "kind": "contradiction",
          "headline": "Tenía una cita en el despacho a las nueve y media",
          "detail": "Admite la visita al despacho a las 21:30 y cambia su salida hacia el pabellón a las 21:45. La cita queda reconocida; el tiempo posterior sigue sin testigos."
        },
        {
          "id": "c001-f-abel-calzado",
          "kind": "contradiction",
          "headline": "Barro del invernadero en sus botas",
          "detail": "Las botas de Abel coinciden en dibujo y muesca del talón con las huellas del pasillo. Tienen tierra de macetero; falta fechar el recorrido."
        },
        {
          "id": "c001-f-abel-boton",
          "kind": "contradiction",
          "headline": "Reconoce el botón y una discusión",
          "detail": "El botón hallado en la salpicadura pertenece a su puño. Abel admite el forcejeo de las 21:30 y retira la explicación de la leña; afirma que dejó vivo a Esteban."
        },
        {
          "id": "c001-f-abel-recorrido",
          "kind": "testimony",
          "headline": "Entró por el lado del salón",
          "detail": "Vera y Damián coinciden en la entrada de Abel justo antes de las once. La prueba permite iniciar el disco y llegar a la cocina en dieciocho segundos."
        },
        {
          "id": "c001-f-abel-pabellon",
          "kind": "contradiction",
          "headline": "No hay señales de reparación",
          "detail": "Precintos y polvo intactos en el generador y las herramientas. No confirma su relato de trabajo, aunque tampoco excluye que estuviera allí."
        }
      ]
    },
    {
      "id": "c001-s-vera",
      "name": "Vera Solís",
      "role": "Ama de llaves",
      "relation": "Treinta años en la casa. Guarda todas las llaves.",
      "description": "Habla poco y observa mucho. Sirve el café antes de que nadie lo pida y sabe qué puertas chirrían de madrugada.",
      "portraitPublicId": "archivos-de-medianoche/la-ultima-campanada/sospechosos/vera-solis",
      "facts": [
        {
          "id": "c001-f-vera-testimonio",
          "kind": "testimony",
          "headline": "Le oyó hablar a las once",
          "detail": "«Le oí en el salón cuando el reloj daba la última campanada. Hablaba solo, o discutía. Después se oyó caer algo y ya no dijo nada más.»"
        },
        {
          "id": "c001-f-vera-alibi",
          "kind": "alibi",
          "headline": "Dice que estaba en la cocina",
          "detail": "Dice estar en la cocina desde la cena. Damián confirma su presencia desde las 22:30; antes no hay un testigo continuo."
        },
        {
          "id": "c001-f-vera-llave",
          "kind": "contradiction",
          "headline": "Ocultó la desaparición de una llave",
          "detail": "Reconoce que faltaba la llave del armario de cuentas desde el martes. Calló por miedo a un registro."
        },
        {
          "id": "c001-f-vera-chantaje",
          "kind": "background",
          "headline": "Alguien le exigía dinero",
          "detail": "Entrega cartas que exigen dinero por algo de 1961. El remitente sigue sin identificar; una letra distinta no basta para descartar a Esteban como instigador."
        }
      ]
    },
    {
      "id": "c001-s-damian",
      "name": "Damián Otero",
      "role": "Sobrino y heredero",
      "relation": "Único pariente vivo de la víctima.",
      "description": "Llegó el viernes sin avisar y con una sola maleta. Fuma en cuanto nadie le mira y se sobresalta con los truenos.",
      "portraitPublicId": "archivos-de-medianoche/la-ultima-campanada/sospechosos/damian-otero",
      "facts": [
        {
          "id": "c001-f-damian-alibi",
          "kind": "alibi",
          "headline": "Dice haber estado en su cuarto hasta las diez y media",
          "detail": "Afirma no haber salido del cuarto entre la cena y las 22:30. Después estuvo con Vera en la cocina; ambos vieron entrar a Abel justo antes de las once."
        },
        {
          "id": "c001-f-damian-motive",
          "kind": "motive",
          "headline": "Hereda Villa Bruma",
          "detail": "El testamento no se ha tocado en doce años. La finca, la casa y lo que quede de las cuentas pasan a su nombre."
        },
        {
          "id": "c001-f-damian-invernadero",
          "kind": "contradiction",
          "headline": "Estuvo en el invernadero esa noche",
          "detail": "Confrontado con las colillas, reconoce que salió a fumar «un rato, quizá a las diez». Dice que no vio a nadie, pero que la luz del despacho estaba encendida."
        },
        {
          "id": "c001-f-damian-deuda",
          "kind": "motive",
          "headline": "Debe dinero a gente impaciente",
          "detail": "Un pagaré de once mil, vencido en septiembre. Vino a Villa Bruma a pedir, no a visitar."
        }
      ]
    },
    {
      "id": "c001-s-irene",
      "name": "Irene Lasa",
      "role": "Médica",
      "relation": "Amiga de la víctima desde la universidad. Certificó la muerte.",
      "description": "Serena hasta resultar fría. Fue la única que se atrevió a mover el cuerpo y la única que anotó la hora en un papel.",
      "portraitPublicId": "archivos-de-medianoche/la-ultima-campanada/sospechosos/irene-lasa",
      "facts": [
        {
          "id": "c001-f-irene-informe",
          "kind": "testimony",
          "headline": "Sitúa la muerte antes de las diez",
          "detail": "Estimación provisional entre las 21:00 y las 22:00, pendiente de contraste. No ofrece una hora exacta ni trata lo oído como prueba de que Esteban estuviera vivo."
        },
        {
          "id": "c001-f-irene-alibi",
          "kind": "alibi",
          "headline": "Llegó a la casa a las once y veinte",
          "detail": "Dice que salió del dispensario de San Román después de las 23:00 y llegó a las 23:20 por la carretera alta. Falta comprobarlo con la comadrona."
        },
        {
          "id": "c001-f-irene-verano",
          "kind": "background",
          "headline": "Discutió con Esteban en agosto",
          "detail": "Por un préstamo antiguo que él no terminaba de devolver. «Discutir con Esteban era la forma normal de hablar con Esteban.»"
        },
        {
          "id": "c001-f-irene-confirmada",
          "kind": "alibi",
          "headline": "Coartada contrastada con el dispensario",
          "detail": "La comadrona y el registro sitúan a Irene en San Román de 20:45 a 23:05. Vera llamó a las 23:03; la llegada a Villa Bruma fue a las 23:20."
        }
      ]
    }
  ],
  "clues": [
    {
      "id": "c001-cl-reloj",
      "name": "Reloj de pulsera detenido",
      "kind": "essential",
      "foundAt": "En la muñeca del cuerpo",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/reloj",
      "states": [
        {
          "key": "found",
          "label": "Reloj de pulsera detenido",
          "description": "Parado a las once en punto. Es la hora que repite todo el mundo en esta casa."
        },
        {
          "key": "analyzed",
          "label": "Reloj de pulsera — examinado",
          "description": "Con la corona extraída el reloj se detiene; al presionarla vuelve a funcionar. Las once de la esfera no establecen por sí solas la hora de la muerte."
        }
      ]
    },
    {
      "id": "c001-cl-gramofono",
      "name": "Gramófono del salón",
      "kind": "secondary",
      "foundAt": "Junto al ventanal del salón",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/gramofono",
      "states": [
        {
          "key": "found",
          "label": "Gramófono del salón",
          "description": "Gramófono de caja de caoba y bocina interior. Tapa abierta, aguja en el surco final. Tiene cuerda y una palanca de arranque manual."
        }
      ]
    },
    {
      "id": "c001-cl-disco",
      "name": "Disco de gramófono",
      "kind": "essential",
      "foundAt": "En el plato del gramófono",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/disco",
      "states": [
        {
          "key": "found",
          "label": "Disco de gramófono",
          "description": "Disco doméstico sin etiqueta. Su funda lleva la anotación «Dictado — octubre». Todavía no se ha escuchado."
        },
        {
          "key": "analyzed",
          "label": "Disco de gramófono — escuchado",
          "description": "Dos minutos de la voz de Esteban dictando una carta. Al fondo, una campanada. Y al final, un golpe seco contra la madera."
        },
        {
          "key": "verified",
          "label": "Disco — reproducción y recorrido comprobados",
          "description": "Vera reconoce la secuencia. Dura dos minutos; se puede iniciarlo manualmente y llegar a la cocina en dieciocho segundos. Los testigos sitúan a Abel entrando por ese lado antes de las once."
        }
      ]
    },
    {
      "id": "c001-cl-atizador",
      "name": "Atizador de latón",
      "kind": "essential",
      "foundAt": "En el despacho, colgado en su sitio",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/atizador",
      "states": [
        {
          "key": "found",
          "label": "Atizador de latón",
          "description": "Atizador de latón colgado junto a la chimenea apagada del despacho. El metal tiene un brillo reciente."
        },
        {
          "key": "analyzed",
          "label": "Atizador — analizado",
          "description": "Restos pardos y cabello gris bajo el mango. Su extremo es compatible con la herida, según Irene. Junto al escritorio hay sangre y un botón dentro de una salpicadura."
        }
      ]
    },
    {
      "id": "c001-cl-carta-auditoria",
      "name": "Carta de la auditoría",
      "kind": "essential",
      "foundAt": "En el escritorio del despacho",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/carta-auditoria",
      "states": [
        {
          "key": "found",
          "label": "Carta de la auditoría",
          "description": "Carta recibida esta semana: el auditor confirma que llegará el jueves siguiente y solicita el libro y todos los recibos originales."
        },
        {
          "key": "analyzed",
          "label": "Auditoría — documentos contrastados",
          "description": "El auditor exige los recibos y el libro. Tres recibos firmados por Abel suman 37.400 pesetas sin ingreso en las copias de los asientos."
        }
      ]
    },
    {
      "id": "c001-cl-libro",
      "name": "Libro de cuentas",
      "kind": "essential",
      "foundAt": "En el cajón del despacho",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/libro-cuentas",
      "states": [
        {
          "key": "found",
          "label": "Libro de cuentas",
          "description": "Faltan cuatro páginas, arrancadas de raíz y sin disimulo."
        },
        {
          "key": "analyzed",
          "label": "Libro de cuentas — contrastado",
          "description": "Tres recibos a nombre de Abel suman 37.400 pesetas. Las copias de los asientos no registran esos ingresos; los originales del trimestre fueron arrancados del libro."
        }
      ]
    },
    {
      "id": "c001-cl-cuaderno",
      "name": "Cuaderno de Esteban",
      "kind": "essential",
      "foundAt": "En la mesilla de su habitación",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/cuaderno",
      "states": [
        {
          "key": "found",
          "label": "Cuaderno de Esteban",
          "description": "Letra apretada, sin adjetivos. La última anotación del día 3 dice: «A. V. — 21:30 — despacho»."
        },
        {
          "key": "analyzed",
          "label": "Cita — presencia contrastada",
          "description": "Abel admite una discusión a las 21:30. Reconoce como suyo el botón encontrado dentro de una salpicadura junto al escritorio; antes dijo haberlo perdido cargando leña."
        }
      ]
    },
    {
      "id": "c001-cl-informe",
      "name": "Informe de la doctora Lasa",
      "kind": "essential",
      "foundAt": "Redactado en el office, sobre papel de carta",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/informe",
      "states": [
        {
          "key": "found",
          "label": "Informe de la doctora Lasa",
          "description": "Examen provisional realizado a las 23:20. La doctora propone un intervalo de 21:00 a 22:00 y pide contrastarlo; no fija una hora exacta."
        },
        {
          "key": "analyzed",
          "label": "Informe — escena contrastada",
          "description": "Irene compara la herida con el atizador y los rastros del despacho. La localización de la sangre apoya una agresión allí y un traslado posterior; la hora sigue siendo aproximada."
        }
      ]
    },
    {
      "id": "c001-cl-llave",
      "name": "Llave del armario de cuentas",
      "kind": "secondary",
      "foundAt": "Bajo un banco del invernadero",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/llave",
      "states": [
        {
          "key": "found",
          "label": "Llave con el número 4",
          "description": "Llave antigua con un 4 grabado, encontrada bajo el banco del invernadero. Falta comprobar qué abre."
        },
        {
          "key": "analyzed",
          "label": "Llave — cerradura comprobada",
          "description": "Abre el armario de cuentas del despacho. Vera dice que faltaba desde el martes. No hay una prueba que identifique a quien la dejó en el invernadero."
        }
      ]
    },
    {
      "id": "c001-cl-huellas",
      "name": "Huellas de barro",
      "kind": "secondary",
      "foundAt": "En el pasillo de servicio",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/huellas",
      "states": [
        {
          "key": "found",
          "label": "Huellas de barro",
          "description": "Huellas de suela ancha entre la puerta del invernadero y la escalera de servicio. No permiten fijar una hora solo por su aspecto."
        },
        {
          "key": "analyzed",
          "label": "Huellas — calzado contrastado",
          "description": "El dibujo y la muesca del talón derecho coinciden con las botas de Abel. La huella no fija la hora ni identifica por sí sola a quien las llevaba."
        }
      ]
    },
    {
      "id": "c001-cl-colillas",
      "name": "Colillas en el invernadero",
      "kind": "secondary",
      "foundAt": "Bajo la palmera del invernadero",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/colillas",
      "states": [
        {
          "key": "found",
          "label": "Colillas en el invernadero",
          "description": "Cinco, de tabaco rubio, apagadas contra la maceta. En esta casa sólo fuma uno."
        }
      ]
    },
    {
      "id": "c001-cl-copa",
      "name": "Copa con carmín",
      "kind": "red_herring",
      "foundAt": "Sobre el piano del salón",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/copa",
      "states": [
        {
          "key": "found",
          "label": "Copa con carmín",
          "description": "Copa de coñac con una marca de carmín sobre el piano. Por sí sola no identifica a quien bebió ni cuándo."
        }
      ]
    },
    {
      "id": "c001-cl-cartas",
      "name": "Cartas atadas con cordel",
      "kind": "red_herring",
      "foundAt": "Escondidas tras los maceteros del invernadero",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/cartas",
      "states": [
        {
          "key": "found",
          "label": "Cartas atadas con cordel",
          "description": "Nueve cartas sin firma, todas con la misma exigencia y cantidades cada vez mayores. Ninguna menciona a Esteban."
        }
      ]
    },
    {
      "id": "c001-cl-pagare",
      "name": "Pagaré vencido",
      "kind": "red_herring",
      "foundAt": "En el forro de la maleta de Damián",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/pruebas/pagare",
      "states": [
        {
          "key": "found",
          "label": "Pagaré vencido",
          "description": "Pagaré de once mil pesetas vencido en septiembre, a nombre de Damián. Él reconoce que vino a pedir dinero a su tío."
        }
      ]
    }
  ],
  "nodes": [
    {
      "id": "c001-n-intro",
      "kind": "intro",
      "title": "Villa Bruma, once y media",
      "location": "Vestíbulo",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/vestibulo",
      "imageCaption": "El vestíbulo de Villa Bruma, con el agua entrando por debajo de la puerta.",
      "body": "La casa huele a leña mojada y a lámpara de petróleo. Ha llegado por la carretera alta, siguiendo el mismo rodeo que tomó la doctora. El puente de la costa está cortado, pero Villa Bruma no es una isla.\n\nVera Solís le espera en el vestíbulo con las manos cruzadas sobre el delantal. Detrás de ella, la puerta del salón está entornada.\n\n—Le oímos a las once —dice—. Estábamos los tres en la cocina. Y cuando entramos, ya no había nada que hacer.\n\nEl reloj de la torre da la media. Todavía conserva en el abrigo la lluvia del camino."
    },
    {
      "id": "c001-n-cuerpo",
      "kind": "scene",
      "title": "El cuerpo",
      "location": "Salón",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/cuerpo",
      "imageCaption": "Esteban Miralles, junto a la alfombra del salón.",
      "body": "Esteban Miralles, un hombre de cabello gris y chaqueta de lana azul oscuro, yace boca arriba junto a la alfombra roja del salón. Tiene una herida en el lado derecho de la cabeza. No ve un objeto próximo que explique una caída.\n\nHay poca sangre sobre la alfombra. Usted anota la posición antes de tocar nada.\n\nEn la muñeca izquierda lleva un reloj detenido a las once. Esa esfera coincide con la hora que mencionan los tres testigos, pero todavía no sabe por qué se paró.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-reloj"
        }
      ]
    },
    {
      "id": "c001-n-salon",
      "kind": "scene",
      "title": "El salón",
      "location": "Salón",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/salon",
      "imageCaption": "El gramófono, junto al ventanal.",
      "body": "El salón tiene las paredes revestidas de roble oscuro y una alfombra persa roja. El piano queda a la izquierda; junto al ventanal de la derecha hay un gramófono de caja de caoba, con bocina interior.\n\nLa tapa está abierta y la aguja descansa al final de un disco sin etiqueta. Sobre el piano, una copa de coñac con carmín. La puerta del vestíbulo queda a pocos pasos de la mesa del gramófono.\n\nNo ve muebles volcados ni señales claras de lucha. Desde aquí se oye el reloj de la torre.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-gramofono"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-copa"
        }
      ]
    },
    {
      "id": "c001-n-despacho",
      "kind": "scene",
      "title": "El despacho",
      "location": "Primera planta",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/despacho",
      "imageCaption": "El despacho de Esteban, con la lámpara todavía encendida.",
      "body": "La lámpara del escritorio sigue encendida, aunque nadie recuerda haberla dejado así. La chimenea está apagada y el atizador cuelga de su gancho, sin una sola mancha de hollín.\n\nSobre el escritorio, una carta abierta: un auditor de la capital confirma su visita para el jueves siguiente. En el cajón, el libro de cuentas de la finca, con cuatro páginas arrancadas.\n\nBajo el borde de la alfombra, una mancha oscura que ha calado la madera y que nadie ha llegado a fregar del todo.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-atizador"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-carta-auditoria"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-libro"
        }
      ]
    },
    {
      "id": "c001-n-invernadero",
      "kind": "scene",
      "title": "El invernadero",
      "location": "Ala este",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/invernadero",
      "imageCaption": "El invernadero, con los cristales temblando por el viento.",
      "body": "El invernadero está a diez grados menos que el resto de la casa y huele a tierra removida. Los cristales tiemblan con cada racha.\n\nBajo el banco de las macetas, medio hundida en el mantillo, hay una llave larga con el número 4 grabado en el ojo. Junto a la palmera, cinco colillas de tabaco rubio apagadas contra el barro.\n\nAlguien ha estado aquí esta noche, y no ha venido a regar.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-llave"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-colillas"
        }
      ]
    },
    {
      "id": "c001-n-pasillo",
      "kind": "scene",
      "title": "El pasillo de servicio",
      "location": "Planta baja",
      "body": "El pasillo de servicio comunica la cocina con la escalera trasera y con la puerta del invernadero. Aquí la casa deja de fingir: el suelo es de baldosa y no lo cubre ninguna alfombra.\n\nSobre la baldosa hay huellas de barro. Van hacia la escalera y vuelven, y nadie las ha pisado encima. Son de suela ancha y de un número grande.\n\nDesde el fondo llega, todavía, el zumbido de la radio de la cocina.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-huellas"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/pasillo"
    },
    {
      "id": "c001-n-habitacion",
      "kind": "scene",
      "title": "La habitación de Esteban",
      "location": "Primera planta",
      "body": "La cama está hecha. Esteban no llegó a acostarse.\n\nEn la mesilla, bajo un vaso de agua intacto, hay un cuaderno de tapas duras con la letra apretada de un hombre que no escribía para nadie más. Anotaba las horas antes que los hechos.\n\nLa última línea del día 3 dice: «A. V. — 21:30 — despacho». Debajo, nada.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-cuaderno"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/habitacion"
    },
    {
      "id": "c001-n-abel",
      "kind": "interrogation",
      "title": "Abel Varela",
      "location": "Biblioteca",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/abel-interrogatorio",
      "body": "Abel Varela se sienta con la espalda recta y las manos sobre las rodillas.\n\n—Salí hacia el pabellón a las nueve y media. El generador falla. Volví poco antes de las once y fui a la cocina a pedir té. Vera y Damián estaban allí. Los tres oímos al señor Miralles.\n\n—¿Quién lo vio en el pabellón?\n\n—Nadie. Pero durante las campanadas no me moví de la cocina. Pregúnteselo a ellos.\n\nSe alisa el chaleco. En el puño derecho falta un botón de cuero trenzado.\n\n—Lo perdí esta tarde cargando leña —dice, antes de que usted pregunte.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-alibi"
        }
      ]
    },
    {
      "id": "c001-n-vera",
      "kind": "interrogation",
      "title": "Vera Solís",
      "location": "Cocina",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/vera-interrogatorio",
      "body": "Vera habla sin dejar de secar la misma taza.\n\n—Estuve en la cocina desde que recogimos la cena. Damián bajó hacia las diez y media. Abel entró cuando faltaba menos de un minuto para las once. Lo sé porque yo esperaba el boletín de la radio.\n\n—¿Por dónde vino?\n\n—Por la puerta del vestíbulo, la que queda junto al salón. No por el pasillo del jardín. Pidió té. Entonces oímos al señor: la voz subía y bajaba mientras sonaban las campanadas. Al poco se oyó un golpe. Fui al salón y grité.\n\n—¿Vio al señor mientras hablaba?\n\nVera niega con la cabeza. La taza ha dejado un cerco húmedo en la mesa.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-vera-testimonio"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-vera-alibi"
        }
      ]
    },
    {
      "id": "c001-n-damian",
      "kind": "interrogation",
      "title": "Damián Otero",
      "location": "Comedor",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/damian-interrogatorio",
      "body": "Damián tiene los dedos manchados de nicotina.\n\n—Subí después de cenar. A las diez y media bajé a la cocina; Vera estaba allí. No volví a salir hasta que gritó. Abel llegó justo antes de las campanadas, por el vestíbulo.\n\n—¿Y entre la cena y las diez y media?\n\n—En mi cuarto. Dolor de cabeza.\n\nAparta los ojos. En la mesa hay una copia del testamento que Vera ha sacado de la carpeta familiar: la casa y la finca pasan al único sobrino.\n\n—Mi tío estaba sano ayer —dice—. No había venido a hablar de eso.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-damian-alibi"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-damian-motive"
        }
      ]
    },
    {
      "id": "c001-n-irene",
      "kind": "interrogation",
      "title": "Irene Lasa",
      "location": "Office",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/irene-interrogatorio",
      "body": "La doctora Lasa empuja un informe escrito en papel de carta.\n\n—Llegué a las once y veinte por la carretera alta. Venía del dispensario de San Román, donde atendí un parto. La comadrona puede confirmar las horas.\n\n—¿Cuándo murió Esteban?\n\n—El enfriamiento y los cambios iniciales del cuerpo sugieren que no acaba de morir. Mi estimación provisional es entre las nueve y las diez, pero aquí no puedo fijar una hora exacta. Habrá que contrastarla.\n\nAnota también la escasez de sangre junto al cuerpo y la necesidad de estudiar la herida.\n\n—Una voz no es una identificación visual —añade—. Tampoco mi informe sustituye a las demás pruebas.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-informe"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-irene-informe"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-irene-alibi"
        }
      ]
    },
    {
      "id": "c001-n-disco-hallado",
      "kind": "analysis",
      "title": "El plato del gramófono",
      "location": "Salón",
      "body": "La tapa ya está abierta. El disco del plato no tiene etiqueta impresa: es una grabación doméstica. En su funda, dentro del mueble, Esteban escribió «Dictado — octubre».\n\nLa aguja descansa en el surco final. La palanca de arranque está al alcance de cualquiera que pase junto a la mesa.",
      "effects": [
        {
          "effect": "discover_clue",
          "target": "c001-cl-disco"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/gramofono"
    },
    {
      "id": "c001-n-disco-escuchado",
      "kind": "analysis",
      "title": "Escuchar el disco",
      "location": "Salón",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/gramofono",
      "imageCaption": "La aguja vuelve al principio del surco.",
      "body": "Usted vuelve la aguja al principio y acciona la palanca. Durante dos minutos la voz de Esteban dicta una carta sobre el precio de la madera. Se detiene, repite una cantidad y vuelve a empezar.\n\nAl fondo suena una campanada aislada; al final, un golpe de un objeto contra madera. El aparato se detiene al terminar.\n\nVera, llamada para escucharlo, reconoce las pausas y el golpe que oyó desde la cocina.\n\n—Era esto —dice—. Hasta la tos.\n\nEl disco reproduce la secuencia que recuerda. Aún queda por comprobar quién pudo ponerlo en marcha y llegar a la cocina a tiempo.",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c001-cl-disco",
          "value": "analyzed"
        },
      ]
    },
    {
      "id": "c001-n-reloj-examen",
      "kind": "analysis",
      "title": "El reloj de la muñeca",
      "location": "Salón",
      "body": "El reloj tiene el cristal intacto y las agujas a las once. La corona está extraída.\n\nAl presionarla, el segundero vuelve a moverse. Usted lo observa durante un minuto y vuelve a detenerlo, anotando la intervención.\n\nEl mecanismo funciona. La posición de la corona permite detenerlo manualmente: la hora de la esfera necesita otra prueba que la confirme.",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c001-cl-reloj",
          "value": "analyzed"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/cuerpo"
    },
    {
      "id": "c001-n-atizador-analisis",
      "kind": "analysis",
      "title": "El atizador",
      "location": "Despacho",
      "body": "El atizador de latón está limpio salvo bajo el anillo del mango. Allí quedan restos pardos y un cabello gris.\n\nIrene compara el extremo con la forma de la herida: son compatibles, aunque la confirmación requerirá un análisis posterior. La mancha bajo la alfombra del despacho merece conservarse también.\n\nJunto a la pata del escritorio aparece un botón de cuero trenzado atrapado en una salpicadura seca. Usted lo guarda aparte y anota el lugar exacto.",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c001-cl-atizador",
          "value": "analyzed"
        },
        {
          "effect": "advance_clue",
          "target": "c001-cl-informe",
          "value": "analyzed"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/despacho"
    },
    {
      "id": "c001-n-libro-contraste",
      "kind": "analysis",
      "title": "El libro y el secante",
      "location": "Despacho",
      "body": "Las cuatro páginas arrancadas corresponden al último trimestre. En el secante se distingue, contra el espejo, la cifra 37.400.\n\nDentro del cajón hay tres recibos de venta de madera: 12.000, 9.400 y 16.000 pesetas entregadas a Abel Varela como administrador. Suman 37.400. Las copias numeradas del archivo comercial permiten reconstruir los asientos de las páginas arrancadas: esas entregas no figuran como ingresos.\n\nLa carta del auditor pide precisamente los recibos originales y el libro. Usted coloca ambos documentos juntos. Hay una discrepancia concreta que preguntar a Abel.",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c001-cl-libro",
          "value": "analyzed"
        },
        {
          "effect": "advance_clue",
          "target": "c001-cl-carta-auditoria",
          "value": "analyzed"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/reconstruccion"
    },
    {
      "id": "c001-n-vera-llave",
      "kind": "interrogation",
      "title": "Vera y la llave",
      "location": "Cocina",
      "body": "Vera reconoce el número 4.\n\n—Es del armario de cuentas del despacho, no de la puerta. Faltaba del llavero desde el martes. No lo dije: temía que registrasen mis cosas.\n\nLa llave abre ese armario. Dentro queda el hueco del libro encontrado en el cajón. Esteban solía guardarlo allí, explica Vera.\n\nElla misma trae del invernadero nueve cartas atadas con cordel: le exigen dinero por algo ocurrido en 1961.\n\n—Llevo dos años pagando. No sé quién escribe.\n\nLa letra es distinta de la de Esteban, pero eso no identifica al remitente ni descarta que alguien dictase las cartas. El miedo de Vera explica su silencio; todavía no es una coartada.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-vera-llave"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-cartas"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-vera-chantaje"
        },
        {
          "effect": "advance_clue",
          "target": "c001-cl-llave",
          "value": "analyzed"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/vera-interrogatorio"
    },
    {
      "id": "c001-n-damian-colillas",
      "kind": "interrogation",
      "title": "Damián y el invernadero",
      "location": "Comedor",
      "body": "Damián reconoce su tabaco.\n\n—Salí a fumar. Hacia las diez. Después volví al cuarto; a las diez y media bajé con Vera. No quería que supiera que había desobedecido a mi tío.\n\nDesde el invernadero vio luz en el despacho, pero no a una persona. Usted anota esa diferencia.\n\nAcepta mostrar la maleta. En el forro hay un pagaré vencido de once mil pesetas.\n\n—Vine a pedirle dinero —dice.\n\nLa deuda da sentido a la visita, aunque no establece dónde estuvo durante toda la franja de la muerte.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-damian-invernadero"
        },
        {
          "effect": "discover_clue",
          "target": "c001-cl-pagare"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-damian-deuda"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/damian-interrogatorio"
    },
    {
      "id": "c001-n-abel-cuentas",
      "kind": "interrogation",
      "title": "Abel y los 37.400",
      "location": "Biblioteca",
      "body": "Abel lee los recibos junto a la carta del auditor.\n\n—Me opuse a esa revisión. Un trámite innecesario —dice—. Esas entregas son desfases temporales.\n\n—Los clientes firmaron que se las entregaron a usted. ¿Dónde está el dinero?\n\nPide agua. No señala ningún asiento compensatorio. Cuando usted pregunta por las páginas arrancadas, responde que cualquiera pudo entrar en el despacho.\n\nLos documentos no explican por sí solos una muerte. Sí identifican una cantidad, un responsable de recibirla y una revisión próxima.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-cuentas"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-motive"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/abel-interrogatorio"
    },
    {
      "id": "c001-n-abel-cita",
      "kind": "interrogation",
      "title": "La cita de las nueve y media",
      "location": "Biblioteca",
      "body": "La página del cuaderno queda abierta sobre la mesa, con las iniciales a la vista.\n\n«A. V. — 21:30 — despacho».\n\n—Subí un momento —admite Abel—. Me pidió las cuentas del trimestre y se las llevé.\n\n—Hace un rato dijo que a esa hora estaba en el pabellón.\n\n—A las diez menos cuarto estaba en el pabellón.\n\nEs la segunda hora que da esta noche, y ninguna de las dos la puede sostener nadie más.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-cita"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/abel-interrogatorio"
    },
    {
      "id": "c001-n-calzado",
      "kind": "analysis",
      "title": "El calzado de la casa",
      "location": "Pasillo de servicio",
      "body": "Las huellas tienen una muesca triangular en el talón derecho. Las botas de Abel, número 43, repiten ese dibujo y esa rotura; conservan tierra de macetero.\n\nLos zapatos presentados por Vera, Irene y Damián tienen otros dibujos de suela. Usted fotografía y mide la comparación.\n\nEsto vincula las botas al recorrido. No establece quién las llevaba ni a qué hora pasó: habrá que cruzarlo con otra prueba.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-calzado"
        },
        {
          "effect": "advance_clue",
          "target": "c001-cl-huellas",
          "value": "analyzed"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/pasillo"
    },
    {
      "id": "c001-n-pabellon",
      "kind": "scene",
      "title": "El pabellón",
      "location": "Jardín trasero",
      "body": "El pabellón está a ochenta metros de la casa, al final de un camino empedrado. El generador está parado. La tapa de bornes conserva polvo y la caja de herramientas sigue cerrada, con los precintos de papel del mecánico intactos.\n\nNo encuentra indicios de la reparación que Abel describió. Eso no demuestra que no estuviera aquí: pudo venir y no trabajar. Usted anota ambas cosas.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-pabellon"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/pabellon"
    },
    {
      "id": "c001-n-copa",
      "kind": "interrogation",
      "title": "La copa del piano",
      "location": "Office",
      "body": "Irene reconoce la copa.\n\n—Me serví un poco después de examinarlo. Vera me trajo una copa limpia y la botella.\n\nLlamada para aclararlo, Vera confirma que la sacó del aparador después de la llegada de la doctora.\n\nIrene admite también una discusión en agosto por un préstamo que Esteban no devolvía.\n\n—No voy a fingir que éramos amigos sin cuentas pendientes.\n\nLa procedencia de la copa tiene ahora dos testimonios concordantes. La hora de llegada de Irene puede comprobarse por separado.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-irene-verano"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/irene-interrogatorio"
    },
    {
      "id": "c001-n-reconstruccion",
      "kind": "analysis",
      "title": "Reconstruir la noche",
      "location": "Despacho",
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/reconstruccion",
      "imageCaption": "La hora que la casa oyó y la hora en que Esteban murió.",
      "body": "Usted ordena los documentos sobre el escritorio.\n\nEl informe sitúa provisionalmente la muerte antes de las diez. La herida es compatible con el atizador; la sangre del despacho y la escasez de sangre en el salón apoyan un traslado. El botón y la cita sitúan a Abel junto a la víctima en la franja relevante.\n\nLa voz del disco reproduce lo que Vera recuerda. La prueba del recorrido permite ponerlo en marcha y llegar a la cocina antes de que acabe. Estar en la cocina a las once no resuelve dónde estaba nadie a las nueve y media.\n\nLos recibos explican lo que iba a examinar el auditor. Son piezas para su teoría; la acusación deberá indicar qué demuestra cada una."
    },
    {
      "id": "c001-n-boton",
      "kind": "analysis",
      "title": "Contrastar el botón del despacho",
      "location": "Biblioteca",
      "body": "El botón encontrado en la salpicadura encaja con los del puño de Abel: cuero trenzado, tres vueltas y el mismo hilo ocre. Un cabo de hilo permanece en el ojal vacío.\n\nAnte el botón, Abel reconoce que se desprendió durante su visita.\n\n—Esteban me agarró de la manga. Discutimos por los recibos. Se lo oculté porque me hacía parecer culpable. Pero lo dejé vivo.\n\nDice que fue hacia las nueve y media. La salpicadura que rodeaba el botón estaba junto al escritorio, lejos del salón. Su explicación anterior sobre la leña ya no se sostiene.",
      "effects": [
        {
          "effect": "advance_clue",
          "target": "c001-cl-cuaderno",
          "value": "analyzed"
        },
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-boton"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/abel-interrogatorio"
    },
    {
      "id": "c001-n-recorrido",
      "kind": "analysis",
      "title": "Comprobar el recorrido de la voz",
      "location": "Salón y cocina",
      "body": "El disco dura dos minutos. Usted lo inicia manualmente y camina por el vestíbulo hasta la cocina: dieciocho segundos. No hay un temporizador ni hace falta uno para realizar ese recorrido.\n\nVera y Damián, preguntados por separado, coinciden: Abel entró por ese lado menos de un minuto antes de las once y permaneció con ellos mientras se oía la voz. La puerta del jardín desemboca en el otro extremo de la cocina.\n\nRepetido desde la cocina, el dictado se oye sin distinguir las palabras. La campanada aislada grabada en el disco se diferencia de las once campanadas reales de la torre. El golpe final reproduce el que recordaban.\n\nLa demostración acredita una posibilidad concreta: alguien pudo iniciar el disco poco antes de las once y reunirse con los testigos mientras seguía sonando.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-abel-recorrido"
        },
        {
          "effect": "advance_clue",
          "target": "c001-cl-disco",
          "value": "verified"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/gramofono"
    },
    {
      "id": "c001-n-dispensario",
      "kind": "analysis",
      "title": "Comprobar la llegada de Irene",
      "location": "Teléfono del vestíbulo",
      "body": "La línea telefónica funciona. Usted llama al dispensario de San Román y pide hablar con la comadrona de guardia.\n\nElla consulta su registro: Irene estuvo atendiendo un parto entre las 20:45 y las 23:05. Recibieron a las 23:03 la llamada de Vera desde Villa Bruma. La doctora salió dos minutos después.\n\nVera confirma la llamada. El trayecto por la carretera alta tarda unos quince minutos. Las anotaciones y los dos testimonios encajan con la llegada a las 23:20; no con una presencia de Irene en la casa durante la franja investigada.",
      "effects": [
        {
          "effect": "reveal_fact",
          "target": "c001-f-irene-confirmada"
        }
      ],
      "imagePublicId": "archivos-de-medianoche/la-ultima-campanada/escenas/vestibulo"
    }
  ],
  "options": [
    {
      "id": "c001-o-intro-cuerpo",
      "from": "c001-n-intro",
      "to": "c001-n-cuerpo",
      "label": "Entrar en el salón y acercarse al cuerpo"
    },
    {
      "id": "c001-o-cuerpo-salon",
      "from": "c001-n-cuerpo",
      "to": "c001-n-salon",
      "label": "Levantar la vista y recorrer el salón"
    },
    {
      "id": "c001-o-despacho-libro",
      "to": "c001-n-libro-contraste",
      "label": "Registrar el cajón del escritorio",
      "line": "La casa",
      "requires": [
        { "requirement": "node", "target": "c001-n-despacho" }
      ]
    },
    {
      "id": "c001-o-salon",
      "to": "c001-n-salon",
      "label": "Examinar el salón",
      "line": "La casa"
    },
    {
      "id": "c001-o-despacho",
      "to": "c001-n-despacho",
      "label": "Examinar el despacho",
      "line": "La casa"
    },
    {
      "id": "c001-o-invernadero",
      "to": "c001-n-invernadero",
      "label": "Visitar el invernadero",
      "line": "La casa"
    },
    {
      "id": "c001-o-pasillo",
      "to": "c001-n-pasillo",
      "label": "Recorrer el pasillo de servicio",
      "line": "La casa"
    },
    {
      "id": "c001-o-habitacion",
      "to": "c001-n-habitacion",
      "label": "Subir a la habitación de Esteban",
      "line": "La casa"
    },
    {
      "id": "c001-o-cuerpo",
      "to": "c001-n-cuerpo",
      "label": "Volver a examinar el cuerpo",
      "line": "La casa",
      "repeatable": true
    },
    {
      "id": "c001-o-abel",
      "to": "c001-n-abel",
      "label": "Interrogar a Abel Varela",
      "line": "Los testimonios"
    },
    {
      "id": "c001-o-vera",
      "to": "c001-n-vera",
      "label": "Interrogar a Vera Solís",
      "line": "Los testimonios"
    },
    {
      "id": "c001-o-damian",
      "to": "c001-n-damian",
      "label": "Interrogar a Damián Otero",
      "line": "Los testimonios"
    },
    {
      "id": "c001-o-irene",
      "to": "c001-n-irene",
      "label": "Hablar con la doctora Lasa",
      "line": "Los testimonios"
    },
    {
      "id": "c001-o-disco-hallado",
      "to": "c001-n-disco-hallado",
      "label": "Examinar el disco del gramófono",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-gramofono"
        }
      ]
    },
    {
      "id": "c001-o-disco-escuchado",
      "to": "c001-n-disco-escuchado",
      "label": "Escuchar el disco",
      "hint": "La aguja está al final del surco.",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-disco"
        },
        {
          "requirement": "fact",
          "target": "c001-f-vera-testimonio"
        }
      ]
    },
    {
      "id": "c001-o-reloj",
      "to": "c001-n-reloj-examen",
      "label": "Examinar el reloj de pulsera",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-reloj"
        }
      ]
    },
    {
      "id": "c001-o-atizador",
      "to": "c001-n-atizador-analisis",
      "label": "Analizar el atizador",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-atizador"
        },
        {
          "requirement": "clue",
          "target": "c001-cl-informe"
        }
      ]
    },
    {
      "id": "c001-o-calzado",
      "to": "c001-n-calzado",
      "label": "Comparar las huellas con el calzado de la casa",
      "line": "Peritajes",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-huellas"
        }
      ]
    },
    {
      "id": "c001-o-reconstruccion",
      "to": "c001-n-reconstruccion",
      "label": "Consultar una síntesis de las pruebas (ayuda opcional)",
      "hint": "Dos versiones de la misma hora.",
      "line": "Peritajes",
      "repeatable": true,
      "requires": [
        {
          "requirement": "node",
          "target": "c001-n-atizador-analisis"
        },
        {
          "requirement": "node",
          "target": "c001-n-boton"
        },
        {
          "requirement": "node",
          "target": "c001-n-recorrido"
        },
        {
          "requirement": "node",
          "target": "c001-n-libro-contraste"
        },
        {
          "requirement": "node",
          "target": "c001-n-abel-cita"
        }
      ]
    },
    {
      "id": "c001-o-vera-llave",
      "to": "c001-n-vera-llave",
      "label": "Preguntar a Vera por la llave",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-llave"
        }
      ]
    },
    {
      "id": "c001-o-damian-colillas",
      "to": "c001-n-damian-colillas",
      "label": "Confrontar a Damián con las colillas",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-colillas"
        },
        {
          "requirement": "fact",
          "target": "c001-f-damian-alibi"
        }
      ]
    },
    {
      "id": "c001-o-abel-cuentas",
      "to": "c001-n-abel-cuentas",
      "label": "Confrontar a Abel con el libro de cuentas",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue_state",
          "target": "c001-cl-libro",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c001-o-abel-cita",
      "to": "c001-n-abel-cita",
      "label": "Preguntar a Abel por la cita de las nueve y media",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-cuaderno"
        },
        {
          "requirement": "fact",
          "target": "c001-f-abel-alibi"
        }
      ]
    },
    {
      "id": "c001-o-copa",
      "to": "c001-n-copa",
      "label": "Preguntar por la copa del salón",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "clue",
          "target": "c001-cl-copa"
        }
      ]
    },
    {
      "id": "c001-o-pabellon",
      "to": "c001-n-pabellon",
      "label": "Comprobar el pabellón del generador",
      "line": "Nuevas diligencias",
      "requires": [
        {
          "requirement": "fact",
          "target": "c001-f-abel-alibi"
        }
      ]
    },
    {
      "id": "c001-o-boton",
      "to": "c001-n-boton",
      "label": "Contrastar el botón del despacho",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "node",
          "target": "c001-n-atizador-analisis"
        },
        {
          "requirement": "node",
          "target": "c001-n-abel-cita"
        }
      ]
    },
    {
      "id": "c001-o-recorrido",
      "to": "c001-n-recorrido",
      "label": "Comprobar el recorrido de la voz",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "node",
          "target": "c001-n-disco-escuchado"
        },
        {
          "requirement": "fact",
          "target": "c001-f-damian-alibi"
        },
        {
          "requirement": "clue_state",
          "target": "c001-cl-reloj",
          "value": "analyzed"
        }
      ]
    },
    {
      "id": "c001-o-dispensario",
      "to": "c001-n-dispensario",
      "label": "Comprobar la llegada de Irene",
      "line": "Comprobaciones",
      "requires": [
        {
          "requirement": "fact",
          "target": "c001-f-irene-alibi"
        }
      ]
    }
  ],
  "motives": [
    {
      "id": "c001-mo-herencia",
      "label": "Heredar Villa Bruma"
    },
    {
      "id": "c001-mo-desfalco",
      "label": "Ocultar un desfalco en las cuentas"
    },
    {
      "id": "c001-mo-chantaje",
      "label": "Impedir que saliera a la luz un chantaje"
    },
    {
      "id": "c001-mo-deuda",
      "label": "Saldar una deuda de juego"
    },
    {
      "id": "c001-mo-rencor",
      "label": "Vengar una humillación antigua"
    }
  ],
  "methods": [
    {
      "id": "c001-me-escalera",
      "label": "Caída provocada en la escalera"
    },
    {
      "id": "c001-me-despacho",
      "label": "Agresión en el despacho y manipulación posterior de la escena"
    },
    {
      "id": "c001-me-veneno",
      "label": "Lo envenenó durante la cena"
    },
    {
      "id": "c001-me-salon",
      "label": "Lo golpeó en el salón durante una discusión a las once"
    }
  ],
  "solution": {
    "culprit": "c001-s-abel",
    "motive": "c001-mo-desfalco",
    "method": "c001-me-despacho",
    "evidence": [
      "c001-cl-informe",
      "c001-cl-disco",
      "c001-cl-libro",
      "c001-cl-cuaderno",
      "c001-cl-reloj",
      "c001-cl-atizador",
      "c001-cl-carta-auditoria",
      "c001-cl-huellas"
    ],
    "explanation": "Esteban recibió a Abel en el despacho hacia las 21:30 para revisar las cuentas antes de la auditoría. Los recibos acreditaban 37.400 pesetas entregadas al administrador que no figuraban en los asientos. Abel no pudo justificar el destino del dinero.\n\nDurante la discusión Abel lo golpeó con el atizador. La cita reconocida, el botón de su puño dentro de la salpicadura y la compatibilidad del arma con la herida sostienen la reconstrucción. La hora exacta del golpe no puede fijarse: ocurrió durante esa visita, dentro del intervalo estimado por Irene.\n\nArrancó las páginas y trasladó el cuerpo al salón por la escalera de servicio. La sangre quedó principalmente en el despacho. Las huellas de sus botas apoyan el recorrido, aunque no permiten fecharlo solas. La llave abre el armario de cuentas, pero no se ha probado quién la ocultó: ese detalle no es necesario para sostener la acusación.\n\nPoco antes de las once inició manualmente el disco de dos minutos y pasó por el vestíbulo a la cocina. El trayecto dura dieciocho segundos. Vera y Damián lo vieron entrar y permanecieron con él mientras la voz seguía sonando. Esa es la utilidad del engaño: convertir una presencia real a las once en una coartada para una muerte anterior. El reloj detenido reforzaba la hora falsa.\n\nLa ausencia de reparación no demuestra por sí sola dónde estuvo Abel. Tampoco los secretos de Vera y Damián los exculpan automáticamente; la acusación se apoya en las pruebas positivas contra él. La coartada de Irene sí ha podido contrastarse. El remitente de las cartas de Vera queda pendiente de otra investigación.",
    "epitaph": "La voz llegó a las once. La muerte había llegado antes.",
    "evidenceGroups": [
      {
        "label": "Vínculo con la agresión",
        "alternatives": [
          {
            "clueId": "c001-cl-cuaderno",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Motivo económico",
        "alternatives": [
          {
            "clueId": "c001-cl-libro",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c001-cl-carta-auditoria",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Lugar y arma",
        "alternatives": [
          {
            "clueId": "c001-cl-atizador",
            "stateKey": "analyzed"
          },
          {
            "clueId": "c001-cl-informe",
            "stateKey": "analyzed"
          }
        ]
      },
      {
        "label": "Engaño de la hora",
        "alternatives": [
          {
            "clueId": "c001-cl-disco",
            "stateKey": "verified"
          }
        ]
      }
    ],
    "accusationRequirements": [
      { "requirement": "node", "target": "c001-n-recorrido" }
    ]
  }
};
