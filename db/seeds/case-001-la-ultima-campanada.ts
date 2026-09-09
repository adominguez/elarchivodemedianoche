import { caseAssets } from './definition.ts';
import type { CaseDefinition } from './definition.ts';

const img = caseAssets('la-ultima-campanada');

/**
 * Expediente #001 — La última campanada.
 *
 * Contenido provisional escrito a mano para validar el motor: una verdad
 * cerrada, cuatro sospechosos, catorce evidencias y varias líneas de
 * investigación que pueden recorrerse en cualquier orden.
 */
export const case001: CaseDefinition = {
  id: 'c001',
  slug: 'la-ultima-campanada',
  fileCode: '#001',
  title: 'La última campanada',
  subtitle: 'Muerte en Villa Bruma',
  place: 'Villa Bruma, costa norte',
  dateLabel: 'Noche del 3 de noviembre',
  victimName: 'Esteban Miralles',
  briefing:
    'Esteban Miralles apareció muerto en el salón de Villa Bruma durante la tormenta. ' +
    'Cuatro personas dormían bajo su techo y las cuatro coinciden en una cosa: le oyeron ' +
    'vivo cuando el reloj de la torre dio la última campanada de las once. El puente estaba ' +
    'cortado. Nadie entró y nadie salió.',
  coverPublicId: img.cover,
  entryNodeId: 'c001-n-intro',

  // -------------------------------------------------------------------------
  // Sospechosos
  // -------------------------------------------------------------------------
  suspects: [
    {
      id: 'c001-s-abel',
      name: 'Abel Varela',
      role: 'Administrador',
      relation: 'Once años llevando las cuentas de Villa Bruma.',
      description:
        'Metódico, cortés, incapaz de levantar la voz. Conoce el valor de cada teja de la casa ' +
        'y el nombre de cada acreedor.',
      portraitPublicId: img.suspect('abel-varela'),
      facts: [
        {
          id: 'c001-f-abel-alibi',
          kind: 'alibi',
          headline: 'Dice haber pasado la noche en el pabellón',
          detail:
            'Asegura que bajó a las nueve y media a revisar el generador y que no volvió a la casa ' +
            'hasta oír los gritos. Nadie estuvo con él.',
        },
        {
          id: 'c001-f-abel-motive',
          kind: 'motive',
          headline: 'Se opuso a la auditoría',
          detail:
            'Reconoce que discutió con Esteban por la revisión de las cuentas. La llama «un trámite ' +
            'innecesario que sólo servía para desconfiar de mí».',
        },
        {
          id: 'c001-f-abel-cuentas',
          kind: 'contradiction',
          headline: 'No explica los 37.400',
          detail:
            'Ante el libro de cuentas habla de «desfases temporales». Cuando se le menciona la cifra ' +
            'del secante, deja de hablar y pide un vaso de agua.',
        },
        {
          id: 'c001-f-abel-cita',
          kind: 'contradiction',
          headline: 'Tenía una cita en el despacho a las nueve y media',
          detail:
            'Al ver la anotación del cuaderno admite que subió «un momento». Sitúa ese momento a las ' +
            'diez menos cuarto, justo en la hora que antes decía haber pasado en el pabellón.',
        },
        {
          id: 'c001-f-abel-calzado',
          kind: 'contradiction',
          headline: 'Barro del invernadero en sus botas',
          detail:
            'Un cuarenta y tres, con tierra fresca de macetero. El pabellón está al otro lado de la casa ' +
            'y se llega por el camino empedrado.',
        },
      ],
    },
    {
      id: 'c001-s-vera',
      name: 'Vera Solís',
      role: 'Ama de llaves',
      relation: 'Treinta años en la casa. Guarda todas las llaves.',
      description:
        'Habla poco y observa mucho. Sirve el café antes de que nadie lo pida y sabe qué puertas ' +
        'chirrían de madrugada.',
      portraitPublicId: img.suspect('vera-solis'),
      facts: [
        {
          id: 'c001-f-vera-testimonio',
          kind: 'testimony',
          headline: 'Le oyó hablar a las once',
          detail:
            '«Le oí en el salón cuando el reloj daba la última campanada. Hablaba solo, o discutía. ' +
            'Después se oyó caer algo y ya no dijo nada más.»',
        },
        {
          id: 'c001-f-vera-alibi',
          kind: 'alibi',
          headline: 'Dice que estaba en la cocina',
          detail:
            'Con la radio encendida. Nadie la vio, pero la radio se oía desde el pasillo de servicio ' +
            'hasta bien pasadas las once.',
        },
        {
          id: 'c001-f-vera-llave',
          kind: 'contradiction',
          headline: 'Ocultó la desaparición de una llave',
          detail:
            'Admite que echó en falta la llave del despacho el martes y que no lo comunicó a nadie. ' +
            '«No quería que registraran mi cuarto.»',
        },
        {
          id: 'c001-f-vera-chantaje',
          kind: 'background',
          headline: 'Alguien le exigía dinero',
          detail:
            'Las cartas del invernadero son suyas. Un remitente sin nombre le pedía cantidades pequeñas ' +
            'a cambio de callar algo ocurrido en 1961. No era Esteban: la letra no coincide.',
        },
      ],
    },
    {
      id: 'c001-s-damian',
      name: 'Damián Otero',
      role: 'Sobrino y heredero',
      relation: 'Único pariente vivo de la víctima.',
      description:
        'Llegó el viernes sin avisar y con una sola maleta. Fuma en cuanto nadie le mira y se ' +
        'sobresalta con los truenos.',
      portraitPublicId: img.suspect('damian-otero'),
      facts: [
        {
          id: 'c001-f-damian-alibi',
          kind: 'alibi',
          headline: 'Dice que no salió de su habitación',
          detail:
            'Afirma que se acostó después de la cena con dolor de cabeza y que no bajó hasta oír ' +
            'los gritos de Vera.',
        },
        {
          id: 'c001-f-damian-motive',
          kind: 'motive',
          headline: 'Hereda Villa Bruma',
          detail:
            'El testamento no se ha tocado en doce años. La finca, la casa y lo que quede de las ' +
            'cuentas pasan a su nombre.',
        },
        {
          id: 'c001-f-damian-invernadero',
          kind: 'contradiction',
          headline: 'Estuvo en el invernadero esa noche',
          detail:
            'Confrontado con las colillas, reconoce que salió a fumar «un rato, quizá a las diez». ' +
            'Dice que no vio a nadie, pero que la luz del despacho estaba encendida.',
        },
        {
          id: 'c001-f-damian-deuda',
          kind: 'motive',
          headline: 'Debe dinero a gente impaciente',
          detail:
            'Un pagaré de once mil, vencido en septiembre. Vino a Villa Bruma a pedir, no a visitar.',
        },
      ],
    },
    {
      id: 'c001-s-irene',
      name: 'Irene Lasa',
      role: 'Médica',
      relation: 'Amiga de la víctima desde la universidad. Certificó la muerte.',
      description:
        'Serena hasta resultar fría. Fue la única que se atrevió a mover el cuerpo y la única que ' +
        'anotó la hora en un papel.',
      portraitPublicId: img.suspect('irene-lasa'),
      facts: [
        {
          id: 'c001-f-irene-informe',
          kind: 'testimony',
          headline: 'Sitúa la muerte antes de las diez',
          detail:
            '«La lividez y la temperatura no admiten discusión: murió entre las nueve y las diez. ' +
            'Lo que ustedes oyeran a las once, no era él.»',
        },
        {
          id: 'c001-f-irene-alibi',
          kind: 'alibi',
          headline: 'Llegó a la casa a las once y veinte',
          detail:
            'Venía por la carretera de la costa con el puente cortado. Dos vecinos la vieron dar la ' +
            'vuelta en el cruce.',
        },
        {
          id: 'c001-f-irene-verano',
          kind: 'background',
          headline: 'Discutió con Esteban en agosto',
          detail:
            'Por un préstamo antiguo que él no terminaba de devolver. «Discutir con Esteban era la ' +
            'forma normal de hablar con Esteban.»',
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Evidencias
  // -------------------------------------------------------------------------
  clues: [
    {
      id: 'c001-cl-reloj',
      name: 'Reloj de pulsera detenido',
      kind: 'essential',
      foundAt: 'En la muñeca del cuerpo',
      imagePublicId: img.clue('reloj'),
      states: [
        {
          key: 'found',
          label: 'Reloj de pulsera detenido',
          description: 'Parado a las once en punto. Es la hora que repite todo el mundo en esta casa.',
        },
        {
          key: 'analyzed',
          label: 'Reloj de pulsera — examinado',
          description:
            'El cristal está intacto y la corona, girada hacia fuera. No se detuvo con el golpe: ' +
            'alguien lo paró con los dedos.',
        },
      ],
    },
    {
      id: 'c001-cl-gramofono',
      name: 'Gramófono del salón',
      kind: 'secondary',
      foundAt: 'Junto al ventanal del salón',
      imagePublicId: img.clue('gramofono'),
      states: [
        {
          key: 'found',
          label: 'Gramófono del salón',
          description:
            'La aguja descansa al final del surco y la manivela sigue tensa. A alguien le dio cuerda ' +
            'hace pocas horas.',
        },
      ],
    },
    {
      id: 'c001-cl-disco',
      name: 'Disco de gramófono',
      kind: 'essential',
      foundAt: 'En el plato del gramófono',
      imagePublicId: img.clue('disco'),
      states: [
        {
          key: 'found',
          label: 'Disco de gramófono',
          description:
            'Sin etiqueta, con el surco de una grabación doméstica. No es música: la aguja araña ' +
            'demasiado pronto.',
        },
        {
          key: 'analyzed',
          label: 'Disco de gramófono — escuchado',
          description:
            'Dos minutos de la voz de Esteban dictando una carta. Al fondo, una campanada. Y al final, ' +
            'un golpe seco contra la madera.',
        },
      ],
    },
    {
      id: 'c001-cl-atizador',
      name: 'Atizador de latón',
      kind: 'essential',
      foundAt: 'En el despacho, colgado en su sitio',
      imagePublicId: img.clue('atizador'),
      states: [
        {
          key: 'found',
          label: 'Atizador de latón',
          description: 'Limpio. Demasiado limpio para una casa con la chimenea encendida.',
        },
        {
          key: 'analyzed',
          label: 'Atizador — analizado',
          description:
            'Bajo el anillo del mango quedan restos pardos y un cabello gris. Se limpió deprisa ' +
            'y de noche.',
        },
      ],
    },
    {
      id: 'c001-cl-carta-auditoria',
      name: 'Carta de la auditoría',
      kind: 'essential',
      foundAt: 'En el escritorio del despacho',
      imagePublicId: img.clue('carta-auditoria'),
      states: [
        {
          key: 'found',
          label: 'Carta de la auditoría',
          description:
            'Fechada el lunes. Esteban citaba a un auditor de la capital para el jueves: ' +
            '«toda la contabilidad de los tres últimos ejercicios».',
        },
      ],
    },
    {
      id: 'c001-cl-libro',
      name: 'Libro de cuentas',
      kind: 'essential',
      foundAt: 'En el cajón del despacho',
      imagePublicId: img.clue('libro-cuentas'),
      states: [
        {
          key: 'found',
          label: 'Libro de cuentas',
          description: 'Faltan cuatro páginas, arrancadas de raíz y sin disimulo.',
        },
        {
          key: 'analyzed',
          label: 'Libro de cuentas — contrastado',
          description:
            'El secante del cajón conserva el reflejo de la última suma escrita: 37.400. Esa cifra ' +
            'no aparece en ninguna página del libro.',
        },
      ],
    },
    {
      id: 'c001-cl-cuaderno',
      name: 'Cuaderno de Esteban',
      kind: 'essential',
      foundAt: 'En la mesilla de su habitación',
      imagePublicId: img.clue('cuaderno'),
      states: [
        {
          key: 'found',
          label: 'Cuaderno de Esteban',
          description:
            'Letra apretada, sin adjetivos. La última anotación del día 3 dice: «A. V. — 21:30 — despacho».',
        },
      ],
    },
    {
      id: 'c001-cl-informe',
      name: 'Informe de la doctora Lasa',
      kind: 'essential',
      foundAt: 'Redactado en el office, sobre papel de carta',
      imagePublicId: img.clue('informe'),
      states: [
        {
          key: 'found',
          label: 'Informe de la doctora Lasa',
          description:
            'Temperatura hepática, lividez fija en el costado derecho, rigidez completa en mandíbula. ' +
            'Muerte entre las 21:00 y las 22:00.',
        },
      ],
    },
    {
      id: 'c001-cl-llave',
      name: 'Llave del despacho',
      kind: 'secondary',
      foundAt: 'Bajo un banco del invernadero',
      imagePublicId: img.clue('llave'),
      states: [
        {
          key: 'found',
          label: 'Llave del despacho',
          description:
            'Una llave larga, de guardas antiguas, con el número 4 grabado. No estaba en el llavero ' +
            'de la casa.',
        },
      ],
    },
    {
      id: 'c001-cl-huellas',
      name: 'Huellas de barro',
      kind: 'secondary',
      foundAt: 'En el pasillo de servicio',
      imagePublicId: img.clue('huellas'),
      states: [
        {
          key: 'found',
          label: 'Huellas de barro',
          description:
            'Van del invernadero al despacho y vuelven. Suela ancha, número grande. Nadie las ha pisado ' +
            'encima: son de después de la cena.',
        },
      ],
    },
    {
      id: 'c001-cl-colillas',
      name: 'Colillas en el invernadero',
      kind: 'secondary',
      foundAt: 'Bajo la palmera del invernadero',
      imagePublicId: img.clue('colillas'),
      states: [
        {
          key: 'found',
          label: 'Colillas en el invernadero',
          description: 'Cinco, de tabaco rubio, apagadas contra la maceta. En esta casa sólo fuma uno.',
        },
      ],
    },
    {
      id: 'c001-cl-copa',
      name: 'Copa con carmín',
      kind: 'red_herring',
      foundAt: 'Sobre el piano del salón',
      imagePublicId: img.clue('copa'),
      states: [
        {
          key: 'found',
          label: 'Copa con carmín',
          description:
            'Coñac a medias y una marca de carmín en el borde. En Villa Bruma hay dos mujeres y ' +
            'un solo tono de carmín.',
        },
      ],
    },
    {
      id: 'c001-cl-cartas',
      name: 'Cartas atadas con cordel',
      kind: 'red_herring',
      foundAt: 'Escondidas tras los maceteros del invernadero',
      imagePublicId: img.clue('cartas'),
      states: [
        {
          key: 'found',
          label: 'Cartas atadas con cordel',
          description:
            'Nueve cartas sin firma, todas con la misma exigencia y cantidades cada vez mayores. ' +
            'Ninguna menciona a Esteban.',
        },
      ],
    },
    {
      id: 'c001-cl-pagare',
      name: 'Pagaré vencido',
      kind: 'red_herring',
      foundAt: 'En el forro de la maleta de Damián',
      imagePublicId: img.clue('pagare'),
      states: [
        {
          key: 'found',
          label: 'Pagaré vencido',
          description: 'Once mil, con vencimiento en septiembre y dos firmas que no son de fiar.',
        },
      ],
    },
  ],

  // -------------------------------------------------------------------------
  // Nodos narrativos
  // -------------------------------------------------------------------------
  nodes: [
    {
      id: 'c001-n-intro',
      kind: 'intro',
      title: 'Villa Bruma, once y cuarenta',
      location: 'Vestíbulo',
      imagePublicId: img.scene('vestibulo'),
      imageCaption: 'El vestíbulo de Villa Bruma, con el agua entrando por debajo de la puerta.',
      body:
        'La casa huele a leña mojada y a lámpara de petróleo. Fuera, la tormenta ha arrancado el ' +
        'puente de la carretera y ha dejado a Villa Bruma sola con sus cuatro habitantes y su muerto.\n\n' +
        'Vera Solís le espera en el vestíbulo con las manos cruzadas sobre el delantal. Detrás de ella, ' +
        'la puerta del salón está entornada.\n\n' +
        '—Le oímos a las once —dice—. Todos. Y cuando entramos, ya no había nada que hacer.\n\n' +
        'El reloj de la torre da la media. En esta casa las horas se oyen antes que se leen.',
    },
    {
      id: 'c001-n-cuerpo',
      kind: 'scene',
      title: 'El cuerpo',
      location: 'Salón',
      imagePublicId: img.scene('cuerpo'),
      imageCaption: 'Esteban Miralles, junto a la alfombra del salón.',
      body:
        'Esteban Miralles yace boca arriba junto a la alfombra, con la cabeza vuelta hacia el ventanal. ' +
        'La herida está en el parietal derecho, limpia y profunda, y no hay nada cerca con lo que ' +
        'pudiera habérsela hecho al caer.\n\n' +
        'Hay poca sangre en la alfombra. Muy poca para una herida así.\n\n' +
        'En la muñeca izquierda lleva un reloj de pulsera parado a las once en punto. Todos en la casa ' +
        'lo han visto ya, y todos lo repiten como si fuera una prueba.',
      effects: [{ effect: 'discover_clue', target: 'c001-cl-reloj' }],
    },
    {
      id: 'c001-n-salon',
      kind: 'scene',
      title: 'El salón',
      location: 'Salón',
      imagePublicId: img.scene('salon'),
      imageCaption: 'El gramófono, junto al ventanal.',
      body:
        'El salón está ordenado con una pulcritud que no corresponde a una noche así. Ni un cojín ' +
        'torcido, ni una silla fuera de sitio. Nadie se defendió aquí.\n\n' +
        'Junto al ventanal, el gramófono tiene la tapa abierta y la aguja apoyada al final del disco. ' +
        'La manivela sigue tensa. Sobre el piano, una copa de coñac a medias con una marca de carmín ' +
        'en el borde.\n\n' +
        'Desde aquí se oye el reloj de la torre con una nitidez incómoda.',
      effects: [
        { effect: 'discover_clue', target: 'c001-cl-gramofono' },
        { effect: 'discover_clue', target: 'c001-cl-copa' },
      ],
    },
    {
      id: 'c001-n-despacho',
      kind: 'scene',
      title: 'El despacho',
      location: 'Primera planta',
      imagePublicId: img.scene('despacho'),
      imageCaption: 'El despacho de Esteban, con la lámpara todavía encendida.',
      body:
        'La lámpara del escritorio sigue encendida, aunque nadie recuerda haberla dejado así. La ' +
        'chimenea está apagada y el atizador cuelga de su gancho, sin una sola mancha de hollín.\n\n' +
        'Sobre el escritorio, una carta abierta: un auditor de la capital confirma su visita para el ' +
        'jueves. En el cajón, el libro de cuentas de la finca, con cuatro páginas arrancadas.\n\n' +
        'Bajo el borde de la alfombra, una mancha oscura que ha calado la madera y que nadie ha ' +
        'llegado a fregar del todo.',
      effects: [
        { effect: 'discover_clue', target: 'c001-cl-atizador' },
        { effect: 'discover_clue', target: 'c001-cl-carta-auditoria' },
        { effect: 'discover_clue', target: 'c001-cl-libro' },
      ],
    },
    {
      id: 'c001-n-invernadero',
      kind: 'scene',
      title: 'El invernadero',
      location: 'Ala este',
      imagePublicId: img.scene('invernadero'),
      imageCaption: 'El invernadero, con los cristales temblando por el viento.',
      body:
        'El invernadero está a diez grados menos que el resto de la casa y huele a tierra removida. ' +
        'Los cristales tiemblan con cada racha.\n\n' +
        'Bajo el banco de las macetas, medio hundida en el mantillo, hay una llave larga con el ' +
        'número 4 grabado en el ojo. Junto a la palmera, cinco colillas de tabaco rubio apagadas ' +
        'contra el barro.\n\n' +
        'Alguien ha estado aquí esta noche, y no ha venido a regar.',
      effects: [
        { effect: 'discover_clue', target: 'c001-cl-llave' },
        { effect: 'discover_clue', target: 'c001-cl-colillas' },
      ],
    },
    {
      id: 'c001-n-pasillo',
      kind: 'scene',
      title: 'El pasillo de servicio',
      location: 'Planta baja',
      body:
        'El pasillo de servicio comunica la cocina con la escalera trasera y con la puerta del ' +
        'invernadero. Aquí la casa deja de fingir: el suelo es de baldosa y no lo cubre ninguna alfombra.\n\n' +
        'Sobre la baldosa hay huellas de barro. Van hacia la escalera y vuelven, y nadie las ha pisado ' +
        'encima. Son de suela ancha y de un número grande.\n\n' +
        'Desde el fondo llega, todavía, el zumbido de la radio de la cocina.',
      effects: [{ effect: 'discover_clue', target: 'c001-cl-huellas' }],
    },
    {
      id: 'c001-n-habitacion',
      kind: 'scene',
      title: 'La habitación de Esteban',
      location: 'Segunda planta',
      body:
        'La cama está hecha. Esteban no llegó a acostarse.\n\n' +
        'En la mesilla, bajo un vaso de agua intacto, hay un cuaderno de tapas duras con la letra ' +
        'apretada de un hombre que no escribía para nadie más. Anotaba las horas antes que los hechos.\n\n' +
        'La última línea del día 3 dice: «A. V. — 21:30 — despacho». Debajo, nada.',
      effects: [{ effect: 'discover_clue', target: 'c001-cl-cuaderno' }],
    },
    {
      id: 'c001-n-abel',
      kind: 'interrogation',
      title: 'Abel Varela',
      location: 'Biblioteca',
      imagePublicId: img.scene('abel-interrogatorio'),
      body:
        'Abel Varela se sienta con la espalda recta y las manos sobre las rodillas, como quien espera ' +
        'una revisión de inventario.\n\n' +
        '—Bajé al pabellón a las nueve y media —dice—. El generador lleva un mes fallando y con esta ' +
        'tormenta no quise arriesgarme. Volví cuando oí a Vera gritar.\n\n' +
        '—¿Solo?\n\n' +
        '—Solo. Es lo malo de los generadores.\n\n' +
        'Cuando se le pregunta por la auditoría, tarda medio segundo de más en contestar.\n\n' +
        '—Un trámite innecesario. Once años sin un céntimo de diferencia y de pronto un señor de la ' +
        'capital viene a contarme mis propias sumas.',
      effects: [
        { effect: 'reveal_fact', target: 'c001-f-abel-alibi' },
        { effect: 'reveal_fact', target: 'c001-f-abel-motive' },
      ],
    },
    {
      id: 'c001-n-vera',
      kind: 'interrogation',
      title: 'Vera Solís',
      location: 'Cocina',
      imagePublicId: img.scene('vera-interrogatorio'),
      body:
        'Vera habla sin dejar de secar la misma taza.\n\n' +
        '—Estuve aquí toda la noche, con la radio. A las once le oí en el salón. Hablaba, o discutía; ' +
        'la voz le subía y le bajaba. Después algo cayó y ya no dijo nada más.\n\n' +
        '—¿Está segura de la hora?\n\n' +
        '—Sonaba la última campanada mientras le oía. En esta casa una no necesita reloj.\n\n' +
        'Deja la taza. La deja demasiado despacio.',
      effects: [
        { effect: 'reveal_fact', target: 'c001-f-vera-testimonio' },
        { effect: 'reveal_fact', target: 'c001-f-vera-alibi' },
      ],
    },
    {
      id: 'c001-n-damian',
      kind: 'interrogation',
      title: 'Damián Otero',
      location: 'Comedor',
      imagePublicId: img.scene('damian-interrogatorio'),
      body:
        'Damián no ha dormido y tampoco lo disimula. Tiene las manos manchadas de nicotina y un ' +
        'temblor que atribuye al frío.\n\n' +
        '—Subí después de cenar. Me dolía la cabeza. No bajé hasta que oí gritar a Vera.\n\n' +
        '—¿No oyó a su tío a las once?\n\n' +
        '—Le oí. Claro que le oí. Todo el mundo le oyó. —Se pasa la lengua por los labios—. Mi tío ' +
        'hablaba solo cuando bebía, y bebía todas las noches.\n\n' +
        'Cuando se menciona el testamento, sonríe por primera vez, y no le sale bien.',
      effects: [
        { effect: 'reveal_fact', target: 'c001-f-damian-alibi' },
        { effect: 'reveal_fact', target: 'c001-f-damian-motive' },
      ],
    },
    {
      id: 'c001-n-irene',
      kind: 'interrogation',
      title: 'Irene Lasa',
      location: 'Office',
      imagePublicId: img.scene('irene-interrogatorio'),
      body:
        'La doctora Lasa ha escrito su informe en papel de carta, a falta de otra cosa, y lo empuja ' +
        'sobre la mesa sin ceremonia.\n\n' +
        '—Llegué a las once y veinte. El puente estaba cortado y tuve que dar la vuelta por el cruce.\n\n' +
        'Señala tres líneas con la uña.\n\n' +
        '—Lividez fija en el costado derecho. Rigidez completa en mandíbula y cuello. Temperatura ' +
        'hepática compatible con dos o tres horas de muerte cuando llegué. Esteban murió entre las nueve ' +
        'y las diez.\n\n' +
        '—Toda la casa le oyó a las once.\n\n' +
        '—Toda la casa oyó algo a las once —corrige—. No era él.',
      effects: [
        { effect: 'discover_clue', target: 'c001-cl-informe' },
        { effect: 'reveal_fact', target: 'c001-f-irene-informe' },
        { effect: 'reveal_fact', target: 'c001-f-irene-alibi' },
      ],
    },
    {
      id: 'c001-n-disco-hallado',
      kind: 'analysis',
      title: 'El plato del gramófono',
      location: 'Salón',
      body:
        'Bajo la tapa hay un disco sin etiqueta. No es de fábrica: el surco es el de una grabación ' +
        'doméstica, de las que se hacían en casa con un equipo de aficionado.\n\n' +
        'La aguja está apoyada al final, donde el surco se cierra. Sea lo que sea, sonó entero.',
      effects: [{ effect: 'discover_clue', target: 'c001-cl-disco' }],
    },
    {
      id: 'c001-n-disco-escuchado',
      kind: 'analysis',
      title: 'Escuchar el disco',
      location: 'Salón',
      imagePublicId: img.scene('gramofono'),
      imageCaption: 'La aguja vuelve al principio del surco.',
      body:
        'La manivela cede con un chasquido. Durante dos minutos, la voz de Esteban Miralles llena el ' +
        'salón dictando una carta comercial sobre el precio de la madera. La voz sube y baja, se ' +
        'interrumpe, vuelve a empezar. Parece una discusión si no se entiende lo que dice.\n\n' +
        'Al fondo de la grabación, muy lejos, suena una campanada.\n\n' +
        'Y al final, cuando el surco ya se cierra, se oye un golpe seco contra la madera.\n\n' +
        'La voz que toda la casa oyó a las once estaba en este disco. Y quien lo puso sabía a qué hora ' +
        'debía sonar.',
      effects: [
        { effect: 'advance_clue', target: 'c001-cl-disco', value: 'analyzed' },
        { effect: 'set_flag', target: 'hora_falsificada', value: '1' },
      ],
    },
    {
      id: 'c001-n-reloj-examen',
      kind: 'analysis',
      title: 'El reloj de la muñeca',
      location: 'Salón',
      body:
        'El reloj sale de la muñeca con facilidad. Marca las once en punto y no ha vuelto a moverse.\n\n' +
        'El cristal está intacto. Ni una fisura, ni una raya. Un reloj que se para por un golpe se ' +
        'rompe por el cristal; éste no.\n\n' +
        'La corona está girada hacia fuera, en la posición de puesta en hora. Alguien lo detuvo con ' +
        'los dedos y lo dejó marcando la hora que le convenía.',
      effects: [{ effect: 'advance_clue', target: 'c001-cl-reloj', value: 'analyzed' }],
    },
    {
      id: 'c001-n-atizador-analisis',
      kind: 'analysis',
      title: 'El atizador',
      location: 'Despacho',
      body:
        'El atizador pesa más de lo que aparenta. Está limpio hasta el brillo, lo cual en una casa con ' +
        'chimenea sólo significa una cosa.\n\n' +
        'Bajo el anillo del mango, donde el trapo no llega, quedan restos pardos secos. Y adherido a ' +
        'ellos, un cabello gris.\n\n' +
        'El arma nunca salió del despacho. El muerto sí.',
      effects: [{ effect: 'advance_clue', target: 'c001-cl-atizador', value: 'analyzed' }],
    },
    {
      id: 'c001-n-libro-contraste',
      kind: 'analysis',
      title: 'El libro y el secante',
      location: 'Despacho',
      body:
        'Las cuatro páginas arrancadas corresponden al último trimestre. Quien las quitó no se molestó ' +
        'en igualar el corte.\n\n' +
        'En el fondo del cajón hay un secante viejo, de esos que guardan a la inversa todo lo que se ' +
        'escribió encima. Puesto contra el espejo del despacho, la última suma se lee sin esfuerzo: ' +
        '37.400.\n\n' +
        'Esa cifra no aparece en ninguna página del libro. Ni en la caja de la finca.',
      effects: [{ effect: 'advance_clue', target: 'c001-cl-libro', value: 'analyzed' }],
    },
    {
      id: 'c001-n-vera-llave',
      kind: 'interrogation',
      title: 'Vera y la llave',
      location: 'Cocina',
      body:
        'Vera mira la llave del número 4 sobre la mesa de la cocina y deja de secar la taza.\n\n' +
        '—La eché en falta el martes —dice al fin—. No dije nada.\n\n' +
        '—¿Por qué?\n\n' +
        '—Porque habrían registrado mi cuarto. —Levanta la vista—. Y hay cosas mías en esta casa que ' +
        'no tienen que ver con el señor Miralles.\n\n' +
        'Las cosas están en el invernadero, tras los maceteros: nueve cartas atadas con un cordel, sin ' +
        'firma, todas pidiendo dinero y ninguna mencionando a Esteban.\n\n' +
        '—Llevo dos años pagando para que alguien se calle —dice—. No maté a nadie. Sólo tengo miedo.',
      effects: [
        { effect: 'reveal_fact', target: 'c001-f-vera-llave' },
        { effect: 'discover_clue', target: 'c001-cl-cartas' },
        { effect: 'reveal_fact', target: 'c001-f-vera-chantaje' },
      ],
    },
    {
      id: 'c001-n-damian-colillas',
      kind: 'interrogation',
      title: 'Damián y el invernadero',
      location: 'Comedor',
      body:
        'Las cinco colillas sobre el plato le hacen más efecto que cualquier pregunta.\n\n' +
        '—Está bien. Salí a fumar. A las diez, o por ahí. En mi habitación no se puede fumar, mi tío ' +
        'lo tenía prohibido.\n\n' +
        '—¿Vio a alguien?\n\n' +
        '—A nadie. Pero la luz del despacho estaba encendida, y la ventana del despacho da al ' +
        'invernadero. —Traga saliva—. Y no se oía nada. Ni una voz.\n\n' +
        'En el forro de su maleta aparece después un pagaré vencido de once mil. Damián no vino a ' +
        'Villa Bruma a visitar a su tío.',
      effects: [
        { effect: 'reveal_fact', target: 'c001-f-damian-invernadero' },
        { effect: 'discover_clue', target: 'c001-cl-pagare' },
        { effect: 'reveal_fact', target: 'c001-f-damian-deuda' },
      ],
    },
    {
      id: 'c001-n-abel-cuentas',
      kind: 'interrogation',
      title: 'Abel y los 37.400',
      location: 'Biblioteca',
      body:
        'Abel Varela mira el libro de cuentas y el secante durante un tiempo largo.\n\n' +
        '—Desfases temporales —dice—. Se compensan a final de ejercicio. Cualquiera que entienda de ' +
        'contabilidad se lo explicaría.\n\n' +
        '—Treinta y siete mil cuatrocientas.\n\n' +
        'No contesta. Se afloja el cuello de la camisa y pide un vaso de agua.\n\n' +
        'Cuando se le pregunta quién arrancó las páginas, responde que la casa lleva meses llena de ' +
        'gente que entra y sale del despacho. Es la primera vez que dice algo que no es exacto.',
      effects: [{ effect: 'reveal_fact', target: 'c001-f-abel-cuentas' }],
    },
    {
      id: 'c001-n-abel-cita',
      kind: 'interrogation',
      title: 'La cita de las nueve y media',
      location: 'Biblioteca',
      body:
        'La página del cuaderno queda abierta sobre la mesa, con las iniciales a la vista.\n\n' +
        '«A. V. — 21:30 — despacho».\n\n' +
        '—Subí un momento —admite Abel—. Me pidió las cuentas del trimestre y se las llevé.\n\n' +
        '—Hace un rato dijo que a esa hora estaba en el pabellón.\n\n' +
        '—A las diez menos cuarto estaba en el pabellón.\n\n' +
        'Es la segunda hora que da esta noche, y ninguna de las dos la puede sostener nadie más.',
      effects: [{ effect: 'reveal_fact', target: 'c001-f-abel-cita' }],
    },
    {
      id: 'c001-n-calzado',
      kind: 'analysis',
      title: 'El calzado de la casa',
      location: 'Pasillo de servicio',
      body:
        'Cuatro pares de zapatos alineados en el pasillo, más los que cada uno lleva puestos.\n\n' +
        'Las huellas de barro son de suela ancha y número grande: un cuarenta y tres. Vera calza un ' +
        'treinta y siete; Irene, un treinta y nueve; Damián, un cuarenta y uno.\n\n' +
        'Las botas de Abel Varela, guardadas junto a la puerta del pabellón, tienen tierra fresca de ' +
        'macetero en el borde. Al pabellón se va por el camino empedrado.',
      effects: [{ effect: 'reveal_fact', target: 'c001-f-abel-calzado' }],
    },
    {
      id: 'c001-n-pabellon',
      kind: 'scene',
      title: 'El pabellón',
      location: 'Jardín trasero',
      body:
        'El pabellón está a ochenta metros de la casa, al final de un camino empedrado que la lluvia ' +
        'ha dejado limpio como una mesa.\n\n' +
        'El generador está frío. La tapa de bornes conserva el polvo intacto y la caja de herramientas ' +
        'no se ha abierto: la humedad ha sellado los cierres.\n\n' +
        'Nadie ha reparado nada aquí esta noche.',
      effects: [{ effect: 'set_flag', target: 'pabellon_revisado', value: '1' }],
    },
    {
      id: 'c001-n-copa',
      kind: 'interrogation',
      title: 'La copa del piano',
      location: 'Office',
      body:
        'La copa con la marca de carmín aparece sobre la mesa del office y la doctora Lasa la ' +
        'reconoce antes de que nadie pregunte.\n\n' +
        '—Mía. Me serví un dedo mientras esperaba a que llegara alguien con autoridad para ' +
        'levantar el cuerpo. —Se encoge de hombros—. No me disculpo.\n\n' +
        '—¿Bebió con él alguna vez?\n\n' +
        '—En agosto, y acabamos discutiendo. Me debía dinero de hace veinte años y le molestaba ' +
        'que se lo recordara. —Sostiene la mirada—. Discutir con Esteban era la forma normal de ' +
        'hablar con Esteban. No es un motivo; es una costumbre.\n\n' +
        'La copa se llenó después de la muerte. No prueba nada sobre esa noche, y eso también ' +
        'es información.',
      effects: [{ effect: 'reveal_fact', target: 'c001-f-irene-verano' }],
    },
    {
      id: 'c001-n-reconstruccion',
      kind: 'analysis',
      title: 'Reconstruir la noche',
      location: 'Despacho',
      imagePublicId: img.scene('reconstruccion'),
      imageCaption: 'La hora que la casa oyó y la hora en que Esteban murió.',
      body:
        'Sobre el escritorio caben las dos versiones de la misma noche.\n\n' +
        'La que oyó la casa: Esteban vivo a las once, discutiendo en el salón, un golpe, el reloj ' +
        'detenido en la muñeca a las once en punto.\n\n' +
        'La que dice el cuerpo: muerto entre las nueve y las diez, golpeado en el despacho con algo ' +
        'que nunca salió del despacho, trasladado después a una alfombra que apenas se manchó.\n\n' +
        'Entre las dos versiones hay una hora larga y un disco de gramófono. Alguien necesitaba que ' +
        'esa hora existiera. Falta saber para qué le servía.',
    },
  ],

  // -------------------------------------------------------------------------
  // Acciones de investigación
  // -------------------------------------------------------------------------
  options: [
    // Continuaciones inmediatas del nodo que se está leyendo.
    {
      id: 'c001-o-intro-cuerpo',
      from: 'c001-n-intro',
      to: 'c001-n-cuerpo',
      label: 'Entrar en el salón y acercarse al cuerpo',
    },
    {
      id: 'c001-o-cuerpo-salon',
      from: 'c001-n-cuerpo',
      to: 'c001-n-salon',
      label: 'Levantar la vista y recorrer el salón',
    },
    {
      id: 'c001-o-despacho-libro',
      from: 'c001-n-despacho',
      to: 'c001-n-libro-contraste',
      label: 'Registrar el cajón del escritorio',
    },

    // Línea: la casa.
    { id: 'c001-o-salon', to: 'c001-n-salon', label: 'Examinar el salón', line: 'La casa' },
    { id: 'c001-o-despacho', to: 'c001-n-despacho', label: 'Examinar el despacho', line: 'La casa' },
    {
      id: 'c001-o-invernadero',
      to: 'c001-n-invernadero',
      label: 'Visitar el invernadero',
      line: 'La casa',
    },
    {
      id: 'c001-o-pasillo',
      to: 'c001-n-pasillo',
      label: 'Recorrer el pasillo de servicio',
      line: 'La casa',
    },
    {
      id: 'c001-o-habitacion',
      to: 'c001-n-habitacion',
      label: 'Subir a la habitación de Esteban',
      line: 'La casa',
    },
    {
      id: 'c001-o-cuerpo',
      to: 'c001-n-cuerpo',
      label: 'Volver a examinar el cuerpo',
      line: 'La casa',
      repeatable: true,
    },

    // Línea: los testimonios.
    {
      id: 'c001-o-abel',
      to: 'c001-n-abel',
      label: 'Interrogar a Abel Varela',
      line: 'Los testimonios',
    },
    { id: 'c001-o-vera', to: 'c001-n-vera', label: 'Interrogar a Vera Solís', line: 'Los testimonios' },
    {
      id: 'c001-o-damian',
      to: 'c001-n-damian',
      label: 'Interrogar a Damián Otero',
      line: 'Los testimonios',
    },
    {
      id: 'c001-o-irene',
      to: 'c001-n-irene',
      label: 'Hablar con la doctora Lasa',
      line: 'Los testimonios',
    },

    // Línea: peritajes. Todas exigen haber encontrado antes la evidencia.
    {
      id: 'c001-o-disco-hallado',
      to: 'c001-n-disco-hallado',
      label: 'Levantar la tapa del gramófono',
      line: 'Peritajes',
      requires: [{ requirement: 'clue', target: 'c001-cl-gramofono' }],
    },
    {
      id: 'c001-o-disco-escuchado',
      to: 'c001-n-disco-escuchado',
      label: 'Escuchar el disco',
      hint: 'La aguja está al final del surco.',
      line: 'Peritajes',
      requires: [{ requirement: 'clue', target: 'c001-cl-disco' }],
    },
    {
      id: 'c001-o-reloj',
      to: 'c001-n-reloj-examen',
      label: 'Examinar el reloj de pulsera',
      line: 'Peritajes',
      requires: [{ requirement: 'clue', target: 'c001-cl-reloj' }],
    },
    {
      id: 'c001-o-atizador',
      to: 'c001-n-atizador-analisis',
      label: 'Analizar el atizador',
      line: 'Peritajes',
      requires: [{ requirement: 'clue', target: 'c001-cl-atizador' }],
    },
    {
      id: 'c001-o-calzado',
      to: 'c001-n-calzado',
      label: 'Comparar las huellas con el calzado de la casa',
      line: 'Peritajes',
      requires: [{ requirement: 'clue', target: 'c001-cl-huellas' }],
    },
    {
      id: 'c001-o-reconstruccion',
      to: 'c001-n-reconstruccion',
      label: 'Reconstruir la noche sobre el escritorio',
      hint: 'Dos versiones de la misma hora.',
      line: 'Peritajes',
      repeatable: true,
      requires: [
        { requirement: 'flag', target: 'hora_falsificada' },
        { requirement: 'clue', target: 'c001-cl-informe' },
      ],
    },

    // Línea: nuevas diligencias. Se abren con lo que se descubre.
    {
      id: 'c001-o-vera-llave',
      to: 'c001-n-vera-llave',
      label: 'Preguntar a Vera por la llave',
      line: 'Nuevas diligencias',
      requires: [{ requirement: 'clue', target: 'c001-cl-llave' }],
    },
    {
      id: 'c001-o-damian-colillas',
      to: 'c001-n-damian-colillas',
      label: 'Confrontar a Damián con las colillas',
      line: 'Nuevas diligencias',
      requires: [{ requirement: 'clue', target: 'c001-cl-colillas' }],
    },
    {
      id: 'c001-o-abel-cuentas',
      to: 'c001-n-abel-cuentas',
      label: 'Confrontar a Abel con el libro de cuentas',
      line: 'Nuevas diligencias',
      requires: [{ requirement: 'clue_state', target: 'c001-cl-libro', value: 'analyzed' }],
    },
    {
      id: 'c001-o-abel-cita',
      to: 'c001-n-abel-cita',
      label: 'Preguntar a Abel por la cita de las nueve y media',
      line: 'Nuevas diligencias',
      requires: [
        { requirement: 'clue', target: 'c001-cl-cuaderno' },
        { requirement: 'fact', target: 'c001-f-abel-alibi' },
      ],
    },
    {
      id: 'c001-o-copa',
      to: 'c001-n-copa',
      label: 'Preguntar por la copa del salón',
      line: 'Nuevas diligencias',
      requires: [{ requirement: 'clue', target: 'c001-cl-copa' }],
    },
    {
      id: 'c001-o-pabellon',
      to: 'c001-n-pabellon',
      label: 'Comprobar el pabellón del generador',
      line: 'Nuevas diligencias',
      requires: [{ requirement: 'fact', target: 'c001-f-abel-alibi' }],
    },
  ],

  // -------------------------------------------------------------------------
  // Acusación
  // -------------------------------------------------------------------------
  motives: [
    { id: 'c001-mo-herencia', label: 'Heredar Villa Bruma' },
    { id: 'c001-mo-desfalco', label: 'Ocultar un desfalco en las cuentas' },
    { id: 'c001-mo-chantaje', label: 'Impedir que saliera a la luz un chantaje' },
    { id: 'c001-mo-deuda', label: 'Saldar una deuda de juego' },
    { id: 'c001-mo-rencor', label: 'Vengar una humillación antigua' },
  ],
  methods: [
    { id: 'c001-me-escalera', label: 'Lo empujó por la escalera de la torre a las once' },
    {
      id: 'c001-me-despacho',
      label:
        'Lo golpeó en el despacho antes de las diez y fingió la hora con una grabación',
    },
    { id: 'c001-me-veneno', label: 'Lo envenenó durante la cena' },
    { id: 'c001-me-salon', label: 'Lo golpeó en el salón durante una discusión a las once' },
  ],
  solution: {
    culprit: 'c001-s-abel',
    motive: 'c001-mo-desfalco',
    method: 'c001-me-despacho',
    evidence: [
      'c001-cl-informe',
      'c001-cl-disco',
      'c001-cl-libro',
      'c001-cl-cuaderno',
      'c001-cl-reloj',
    ],
    explanation:
      'Esteban Miralles citó a su administrador en el despacho a las nueve y media para pedirle las ' +
      'cuentas del trimestre antes de la auditoría del jueves. Abel Varela llevaba dos años tapando ' +
      'un agujero de 37.400 y sabía que un auditor de la capital lo encontraría en una tarde.\n\n' +
      'Le golpeó con el atizador de la propia chimenea del despacho, arrancó las cuatro páginas del ' +
      'libro y bajó el cuerpo al salón por la escalera de servicio, dejando en el pasillo unas huellas ' +
      'de barro que venían del invernadero, donde poco antes había tirado la llave del número 4.\n\n' +
      'Después preparó la hora. Puso en el gramófono un disco casero con la voz de Esteban dictando ' +
      'una carta, le dio cuerda para que sonara al filo de las once, y paró el reloj de pulsera con ' +
      'los dedos: por eso el cristal está intacto y la corona, girada. Toda la casa oyó vivo a un ' +
      'hombre que llevaba hora y media muerto.\n\n' +
      'Vera pagaba un chantaje que nada tenía que ver con esta muerte. Damián fumaba en el invernadero ' +
      'con un pagaré cosido en la maleta. Irene llegó cuando ya no había nada que certificar salvo ' +
      'una hora que no encajaba.',
    epitaph: 'Todo caso esconde una verdad. Ésta duró noventa minutos más de la cuenta.',
  },
};

export default case001;
