import { caseAssets, type CaseDefinition } from './definition.ts';

const art = caseAssets('ocho-minutos-bajo-tierra');
const body = (...paragraphs: string[]) => paragraphs.join('\n\n');
const fact = (id: string, kind: 'testimony'|'alibi'|'contradiction'|'motive'|'background', headline: string, detail: string) => ({ id: 'c005-f-' + id, kind, headline, detail });
const clue = (id: string, name: string, kind: 'essential'|'secondary'|'red_herring'|'context', foundAt: string, found: string, analyzed: string) => ({
  id: 'c005-cl-' + id, name, kind, foundAt, imagePublicId: art.clue(id),
  states: [
    { key: 'found', label: name, description: found },
    { key: 'analyzed', label: name + ' — análisis completado', description: analyzed },
  ],
});
const node = (id: string, kind: 'intro'|'scene'|'interrogation'|'analysis', title: string, location: string, paragraphs: string[], image: string, effects: CaseDefinition['nodes'][number]['effects'] = []) => ({
  id: 'c005-n-' + id, kind, title, location, body: body(...paragraphs), imagePublicId: art.scene(image), effects,
});
const option = (id: string, to: string, label: string, hint?: string, requires?: CaseDefinition['options'][number]['requires']) => ({
  id: 'c005-o-' + id, to: 'c005-n-' + to, label, hint, requires,
});

export const case005: CaseDefinition = {
  id: 'c005',
  slug: 'ocho-minutos-bajo-tierra',
  fileCode: '#005',
  title: 'Ocho minutos bajo tierra',
  subtitle: 'El robo del Correo del Oeste',
  place: 'Túnel de la Umbría, Sierra de Guadarrama',
  dateLabel: '15 de octubre de 1961',
  victimName: 'Caja de nóminas de la presa de Valdecañas',
  briefing: body(
    'El Correo del Oeste salió de Madrid con ciento veinte pasajeros, nueve vagones y una caja de nóminas de setenta y dos kilos encerrada en el furgón postal. Al abandonar el túnel de la Umbría, el precinto seguía en su sitio y el tren no se había detenido. La caja, con un millón doscientas mil pesetas, había desaparecido.',
    'Durante ocho minutos, la montaña ocultó el convoy. Una luz roja obligó al maquinista a reducir la marcha; el telégrafo quedó ocupado y nadie pudo ver el exterior. Seis personas conocían el envío o podían acercarse al furgón. Antes del amanecer debe reconstruir cómo sacaron un objeto imposible de ocultar y señalar quién preparó el terreno.',
  ),
  coverPublicId: art.cover,
  entryNodeId: 'c005-n-intro',
  suspects: [
    {
      id: 'c005-s-julian', name: 'Julián Cid', role: 'Jefe de tren', portraitPublicId: art.suspect('julian-cid'),
      description: 'Veterano meticuloso de cincuenta y tres años. Custodia las llaves de servicio, inspecciona los precintos y conoce cada curva de la línea.',
      relation: 'Responsable del convoy y de la seguridad del furgón postal.',
      facts: [
        fact('julian-ronda','testimony','Una ronda sin testigos','Afirma que recorrió los coches durante el túnel, pero nadie lo vio entre la cola y el furgón.'),
        fact('julian-sello','contradiction','La mordaza defectuosa','La marca irregular del nuevo precinto coincide con su tenaza de reserva.'),
        fact('julian-ruta','background','Conocía el desagüe','Su cuaderno sitúa una revisión personal en el kilómetro 84,6 el día anterior.'),
        fact('julian-deuda','motive','Una deuda urgente','Un pagaré de juego vencía al mediodía siguiente por una cantidad que no podía cubrir.'),
        fact('julian-lampara','contradiction','Cristal de señales','La lámpara falsa fue montada con un cristal rojo del armario bajo su custodia.'),
        fact('julian-sacos','contradiction','Conocía el escondite','Pregunta si la caja seguía cerrada bajo el segundo saco, tres detalles que nadie le había revelado.'),
      ],
    },
    {
      id: 'c005-s-tomas', name: 'Tomás Veiga', role: 'Maquinista', portraitPublicId: art.suspect('tomas-veiga'),
      description: 'Conductor de vapor de cuarenta y seis años. Teme perder el puesto por una inspección médica y por las pastillas que usa en los turnos nocturnos.',
      relation: 'Controlaba la velocidad del tren cuando apareció la señal roja.',
      facts: [
        fact('tomas-alibi','alibi','No abandonó la locomotora','El velocímetro y el fogonero lo sitúan a los mandos durante toda la reducción.'),
        fact('tomas-pastillas','motive','Ocultó estimulantes','Escondía comprimidos prohibidos; su mentira protege el empleo, no explica el robo.'),
        fact('tomas-senal','testimony','Obedeció una roja fija','Vio una luz roja baja, impropia de una señal reglamentaria, y frenó sin llegar a detenerse.'),
        fact('tomas-cristal','background','Reconoce el cristal','Identifica la lente como una pieza de repuesto del armario del jefe de tren.'),
      ],
    },
    {
      id: 'c005-s-eusebio', name: 'Eusebio Roldán', role: 'Empleado postal', portraitPublicId: art.suspect('eusebio-roldan'),
      description: 'Clasificador de cincuenta y nueve años, áspero y preciso. Responde por la jaula de valores y guarda tabaco francés entre sacas ordinarias.',
      relation: 'Cerró la caja y entregó la llave postal antes de salir de Madrid.',
      facts: [
        fact('eusebio-alibi','alibi','Encerrado por las sacas','El peso y el orden de las sacas prueban que permaneció en el compartimento de clasificación.'),
        fact('eusebio-tabaco','motive','Contrabando menor','Ocultaba tabaco sin timbre; tenía una razón para mentir sobre el inventario.'),
        fact('eusebio-llave','testimony','La llave viajó en un sobre','Selló la llave de la jaula y la entregó a Julián para la custodia reglamentaria.'),
        fact('eusebio-caja','background','Reconoce la caja recuperada','El golpe del asa y el número interior confirman que es la caja cargada en Madrid.'),
        fact('eusebio-dospasadas','testimony','Oyó dos pasadas del carro','Al reconstruir los sonidos distingue un trayecto vacío hacia la plataforma y el regreso al furgón antes de mover la caja.'),
      ],
    },
    {
      id: 'c005-s-marcelo', name: 'Marcelo Frías', role: 'Delegado de los obreros', portraitPublicId: art.suspect('marcelo-frias'),
      description: 'Cantero de treinta y ocho años y delegado sindical. Viajaba para exigir que la empresa pagase atrasos y había amenazado con apoderarse de la nómina.',
      relation: 'Conocía el importe y el destino del dinero de sus compañeros.',
      facts: [
        fact('marcelo-alibi','alibi','Una partida documentada','Cuatro billetes y el tanteo lo mantienen jugando a las cartas durante todo el túnel.'),
        fact('marcelo-amenaza','motive','Amenaza pública','Dijo que tomaría la caja si la empresa volvía a retrasar los jornales.'),
        fact('marcelo-lista','background','Defendía una nómina completa','Su lista coincide con el importe transportado; no falta ningún trabajador ficticio.'),
        fact('marcelo-ruta','testimony','No conocía el punto exacto','Sabía que el tren cruzaría la sierra, pero no el poste donde comenzó la reducción.'),
      ],
    },
    {
      id: 'c005-s-nuria', name: 'Nuria Salcedo', role: 'Telegrafista de a bordo', portraitPublicId: art.suspect('nuria-salcedo'),
      description: 'Operadora de treinta y un años, concentrada y reservada. Mantuvo comunicación con las estaciones mientras el convoy atravesaba la montaña.',
      relation: 'Recibía avisos de vía y conoció por adelantado el tren que llevaba la nómina.',
      facts: [
        fact('nuria-alibi','alibi','La cinta no deja huecos','Su manipulación continua queda impresa en la cinta Morse entre las 23:41 y las 23:52.'),
        fact('nuria-codigo','testimony','Un parte antiguo provocó el aviso','La estación retransmitió una precaución auténtica basada en un parte falso que usaba una abreviatura retirada.'),
        fact('nuria-carta','motive','Preparó una filtración','Escribió a su pareja mencionando el envío, pero el borrador quedó sin cerrar en su cajón.'),
        fact('nuria-destinatario','background','La filtración nunca salió','El pagador confirma que no recibió ningún aviso; el borrador permaneció en el tren desde Madrid.'),
      ],
    },
    {
      id: 'c005-s-adela', name: 'Adela Barea', role: 'Encargada del coche comedor', portraitPublicId: art.suspect('adela-barea'),
      description: 'Hostelera de cuarenta y nueve años, cordial sólo cuando le conviene. Controla al personal de servicio y un pequeño almacén bajo el suelo.',
      relation: 'Su coche comunica los pasajeros con el furgón y permaneció abierto durante el túnel.',
      facts: [
        fact('adela-alibi','alibi','Cafés durante el túnel','Siete vales consecutivos y sus clientes la sitúan sirviendo junto a la barra.'),
        fact('adela-licor','motive','Licor sin declarar','Guardaba coñac francés bajo el piso y temía un registro de aduanas.'),
        fact('adela-ruido','testimony','Dos pasadas y un golpe','Oyó el carro vacío hacia la plataforma, su regreso al furgón y, poco después, un golpe amortiguado bajo el tren.'),
        fact('adela-golpe','background','El golpe fue después de la frenada','Al confrontar horarios coloca el ruido cuando el convoy ya rodaba lentamente dentro del túnel.'),
      ],
    },
  ],
  clues: [
    clue('velocimetro','Banda del velocímetro','essential','Locomotora','La tira registra una reducción brusca, pero no una parada.','El tren pasó de 68 a 12 km/h entre los kilómetros 83,8 y 85,4: recorrió 1,6 kilómetros en ocho minutos.'),
    clue('morse','Cinta del telégrafo','secondary','Cabina de comunicaciones','Una secuencia continua conserva mensajes y pulsaciones.','Nuria trabajó sin interrupción. La estación retransmitió una precaución auténtica originada por un parte de vía falsificado.'),
    clue('lampara','Lámpara roja de carburo','essential','Talud del túnel','Una lámpara artesanal sigue encendida tras una celosía.','La lente procede del armario del jefe de tren y el depósito fue preparado para arder toda la noche.'),
    clue('precinto','Precinto del furgón','essential','Furgón postal','El plomo aparenta estar intacto, aunque su borde limpio contrasta con la suciedad del viaje.','Fue sustituido durante el trayecto; la mordida inferior tiene un diente roto.'),
    clue('tenaza','Tenaza de reserva','essential','Coche de cola','La herramienta de Julián conserva polvo de plomo reciente.','Su diente mellado reproduce exactamente la huella del precinto falso.'),
    clue('llave','Sobre de la llave postal','essential','Coche de cola','El lacre parece entero y, al tacto, parece conservar una llave dentro, pero el papel está ondulado.','El sobre se abrió con vapor para copiar la llave; el original fue devuelto y el sobre se selló de nuevo antes de partir.'),
    clue('carro','Carro de sacas','essential','Furgón postal','Una rueda tiene hollín fresco y una fibra negra.','El carro vacío cruzó la plataforma para recoger la soga, regresó al furgón y después transportó la caja hacia la puerta lateral.'),
    clue('puerta','Carril de la puerta lateral','essential','Furgón postal','La grasa está barrida en una franja reciente.','La puerta se abrió unos cuarenta centímetros en marcha; la marca coincide con el ancho de la caja.'),
    clue('soga','Soga alquitranada','essential','Plataforma trasera','Una cuerda húmeda está escondida bajo una lona.','Soportó unos setenta kilos y contiene arena rojiza del desagüe del kilómetro 84,6.'),
    clue('arena','Arena rojiza','essential','Base del túnel','Un rastro artificial cubre el cauce de un desagüe.','Son sacos de arena colocados para recibir la caja y evitar que se rompiera al caer.'),
    clue('caja','Caja de nóminas','essential','Desagüe del kilómetro 84,6','La caja aparece bajo dos sacos; el cierre está golpeado.','Conserva todo el dinero, fibras de soga alquitranada y la marca de haber sido descendida de canto.'),
    clue('cuaderno','Cuaderno de rondas','secondary','Coche de cola','Julián anotó una revisión de vía el día anterior.','La página dibuja el desagüe 84,6, calcula cuatro minutos desde el inicio de la reducción y ensaya la abreviatura obsoleta del parte falso.'),
    clue('pagare','Pagaré de juego','secondary','Maletín del jefe de tren','Una deuda vence al mediodía siguiente.','Julián debía 310.000 pesetas y había falsificado la firma de la mutualidad ferroviaria como aval.'),
    clue('billetes','Billetes de la partida','red_herring','Coche de tercera','Cuatro viajeros guardan billetes con marcas de tanteo.','La secuencia prueba que Marcelo jugó sin ausentarse durante los ocho minutos.'),
    clue('vales','Vales del comedor','red_herring','Coche comedor','Siete tickets llevan horas consecutivas.','Clientes distintos reconocen cada consumición y sitúan a Adela detrás de la barra.'),
    clue('pesos','Hoja de pesos postales','red_herring','Compartimento de clasificación','El inventario mezcla sacas, paquetes y una partida de tabaco.','El orden de los pesos encierra físicamente a Eusebio entre las sacas hasta después del túnel.'),
  ],
  nodes: [
    node('intro','intro','Un tren que no se detuvo','Estación de Ávila',[
      'El Correo del Oeste entra bajo la marquesina a las 00:17, cubierto de hollín y con el silbato todavía resonando contra los cristales. Eusebio corta el precinto del furgón ante el jefe de estación. Tras la puerta, la jaula de valores está abierta y el hueco de la caja parece demasiado grande para pertenecer a un tren en marcha.',
      'Nadie ha bajado desde Madrid. En el túnel de la Umbría una luz roja obligó a reducir la velocidad, aunque el convoy nunca se detuvo. La caja pesa setenta y dos kilos; no cabe bajo un asiento y dos personas la levantarían con dificultad. El ladrón tuvo ocho minutos, oscuridad y un trayecto preparado.',
      'Retiene al personal y a los viajeros relacionados con la nómina. El correo saldrá de nuevo al amanecer. Hasta entonces, el tren, sus registros y la vía permanecen bajo su autoridad.',
    ],'tren-noche'),
    node('furgon','scene','Examinar el furgón postal','Furgón postal',[
      'La jaula ocupa el centro del coche, rodeada de sacas que se balancean con el vapor residual de los frenos. El candado no está forzado. En cambio, el plomo exterior presenta una rebaba brillante y sin la suciedad acumulada durante el viaje, como si lo hubieran prensado deprisa después de abrir la puerta.',
      'El carril lateral tiene la grasa limpiada en una banda estrecha. Bajo una mesa aparece el carro de sacas, mal encajado y con una rueda tiznada. Nada permite esconder una caja de setenta y dos kilos dentro del vagón: quien la sacó tuvo que entregarla al exterior.',
    ],'furgon',[
      {effect:'discover_clue',target:'c005-cl-precinto'},{effect:'discover_clue',target:'c005-cl-puerta'},{effect:'discover_clue',target:'c005-cl-carro'}
    ]),
    node('locomotora','scene','Subir a la locomotora','Locomotora',[
      'El hogar abierto tiñe de cobre la cara del fogonero. Tomás señala una banda de papel que corre bajo el velocímetro: la aguja descendió con fuerza y se mantuvo baja, pero jamás tocó el cero. A sus pies hay un tubo de comprimidos oculto dentro de un guante.',
      'Desde la cabina describen una luz roja demasiado baja, clavada junto al hastial del túnel. Tomás obedeció porque un desprendimiento podía estar tras la curva. La señal desapareció de su vista al entrar en la montaña y nadie comunicó después una incidencia reglamentaria.',
    ],'locomotora',[{effect:'discover_clue',target:'c005-cl-velocimetro'}]),
    node('comunicaciones','scene','Revisar la cabina telegráfica','Cabina de comunicaciones',[
      'La cinta Morse cae hasta el suelo en bucles estrechos. Entre mensajes rutinarios aparece una orden de precaución transmitida por la estación anterior poco antes del túnel. La mano de Nuria anotó la hora y respondió durante toda la reducción, sin un silencio bastante largo para abandonar el manipulador.',
      'La transmisión es ferroviaria y auténtica, pero remite a un parte de vía presentado esa tarde por un supuesto capataz. El texto de origen usa una abreviatura que los manuales nuevos ya no recogen. En el cajón de Nuria hay además un borrador sin cerrar que menciona la nómina y al pagador de la presa; nunca llegó a las sacas postales.',
    ],'telegrafo',[{effect:'discover_clue',target:'c005-cl-morse'}]),
    node('comedor','scene','Registrar el coche comedor','Coche comedor',[
      'Tazas aún calientes cubren la barra. Adela ha ordenado siete vales por hora y mesa, con una pulcritud que parece preparada para una inspección. Bajo una trampilla hay botellas francesas sin marchamo, suficientes para explicar su resistencia al registro.',
      'La plataforma trasera comunica con el furgón. Allí, bajo una lona mojada, descansa una soga alquitranada. Adela admite que oyó el carro cruzar vacío hacia la plataforma, regresar al furgón y, poco después, un golpe sordo bajo el tren; asegura que no dejó de servir cafés.',
    ],'comedor',[{effect:'discover_clue',target:'c005-cl-vales'},{effect:'discover_clue',target:'c005-cl-soga'}]),
    node('tercera','scene','Inspeccionar el coche de tercera','Coche de tercera',[
      'Marcelo y tres canteros siguen alrededor de una baraja. Los billetes llevan sumas a lápiz y pequeñas marcas en cada esquina. Sus compañeros conocen la amenaza que lanzó contra la empresa: si faltaban jornales otra vez, él mismo tomaría la caja.',
      'En su cartera aparece una lista completa de obreros y cantidades. El total coincide con la nómina transportada y no hay nombres inventados. Marcelo conocía el valor, aunque los billetes pueden fijar dónde estuvo cuando el tren cruzó la montaña.',
    ],'tercera',[{effect:'discover_clue',target:'c005-cl-billetes'}]),
    node('clasificacion','scene','Examinar la clasificación postal','Compartimento de clasificación',[
      'Las sacas forman un pasillo tan estrecho que obliga a avanzar de lado. Eusebio sostiene que durante el túnel quedó encerrado al caer dos bultos pesados. Entre el roce de la lona oyó ruedas en dos direcciones, pero atribuyó el ruido al balanceo del tren. La hoja de pesos permite reconstruir el orden exacto de cada saco cargado en Madrid.',
      'Tras una valija aparece tabaco francés sin timbre. El hallazgo explica por qué el empleado falseó parte del inventario, pero no abre la jaula: la llave viajó en un sobre lacrado que entregó al jefe de tren antes de la salida.',
    ],'clasificacion',[{effect:'discover_clue',target:'c005-cl-pesos'}]),
    node('cola','scene','Registrar el coche de cola','Coche de cola',[
      'El despacho de Julián parece un modelo de disciplina ferroviaria. En el armario faltan una lente roja y un sello de plomo. La tenaza de reserva tiene un diente mellado; el cuaderno de rondas incluye un croquis reciente del túnel y una suma repetida varias veces.',
      'Dentro del maletín aparece un pagaré vencido, avalado con el sello de la mutualidad. Sobre la mesa, donde el jefe de estación lo ha dejado bajo custodia, el sobre sigue lacrado y parece conservar dentro una llave postal, aunque el papel se ondula alrededor de la solapa como después de recibir vapor.',
    ],'coche-cola',[
      {effect:'discover_clue',target:'c005-cl-tenaza'},{effect:'discover_clue',target:'c005-cl-llave'},
      {effect:'discover_clue',target:'c005-cl-cuaderno'},{effect:'discover_clue',target:'c005-cl-pagare'}
    ]),
    node('julian','interrogation','Interrogar a Julián Cid','Coche de cola',[
      'Julián recibe las preguntas de pie, con la gorra bajo el brazo. Declara que revisó puertas y frenos desde la cola hasta el furgón mientras el tren reducía la marcha. Presenta esa ronda sin testigos como una obligación inevitable del cargo.',
      'Conocía la nómina, custodiaba la llave postal y podía usar las herramientas de precintado. Niega haber abierto el sobre o presentado ningún parte de vía y atribuye el croquis del túnel a una inspección rutinaria. No explica por qué la revisión de un desagüe figura en un cuaderno reservado al material rodante.',
    ],'julian', [{effect:'reveal_fact',target:'c005-f-julian-ronda'}]),
    node('tomas','interrogation','Interrogar a Tomás Veiga','Locomotora',[
      'Tomás empieza negando cualquier sustancia hasta que usted coloca el tubo sobre la mesa. Entonces admite que usa estimulantes para soportar los turnos y que una inspección médica acabaría con su carrera. Su secreto explica el miedo, no el hueco del furgón.',
      'Vio una roja fija y baja, frenó hasta doce kilómetros por hora y mantuvo una mano en el regulador. El fogonero confirma cada maniobra. Para abandonar la locomotora habría tenido que cruzar el ténder de carbón y recorrer ocho coches sin que la banda alterase su trazo.',
    ],'tomas',[
      {effect:'reveal_fact',target:'c005-f-tomas-pastillas'},{effect:'reveal_fact',target:'c005-f-tomas-senal'}
    ]),
    node('eusebio','interrogation','Interrogar a Eusebio Roldán','Compartimento postal',[
      'Eusebio protesta por el tabaco antes de que usted lo mencione. Confiesa que lo escondió entre las sacas para venderlo en Cáceres. Durante el túnel dos bultos se desplazaron y lo encerraron contra la mesa de clasificación. Oyó pasar el carro dos veces al otro lado del mamparo, pero el estrépito de la lona le impidió distinguir el golpe exterior.',
      'Cerró personalmente la caja en Madrid. Luego metió la única llave de la jaula en un sobre, estampó lacre y se lo entregó a Julián conforme al reglamento. Al llegar a Ávila, Julián le mostró el mismo sobre aparentemente intacto. Eusebio palpó una llave bajo el papel, pero el jefe de estación retuvo el sobre cerrado como prueba.',
    ],'eusebio',[
      {effect:'reveal_fact',target:'c005-f-eusebio-tabaco'},{effect:'reveal_fact',target:'c005-f-eusebio-llave'}
    ]),
    node('marcelo','interrogation','Interrogar a Marcelo Frías','Coche de tercera',[
      'Marcelo no retira la amenaza. Dice que estaba dispuesto a ocupar la oficina de pagos, no a arrojar el salario de ciento veinte familias a una cuneta. Entrega su lista: cada nombre corresponde a un obrero real y cada peseta tiene destinatario.',
      'Afirma que jugó al tute desde antes de la señal hasta después del túnel. Tres compañeros lo respaldan, aunque también dependen de él. Los billetes marcados permitirán saber si la partida fue improvisada para fabricar una coartada.',
    ],'marcelo',[
      {effect:'reveal_fact',target:'c005-f-marcelo-amenaza'},{effect:'reveal_fact',target:'c005-f-marcelo-lista'}
    ]),
    node('nuria','interrogation','Interrogar a Nuria Salcedo','Cabina de comunicaciones',[
      'Nuria reconoce su letra en el borrador. Pensó avisar a su pareja, pagador de la presa, para que preparase las nóminas sin retraso, pero no terminó de cerrarlo ni lo entregó al correo. La intención quebrantaba el secreto del servicio; la información no salió de su cajón.',
      'Durante la señal roja recibió y repitió mensajes sin abandonar el manipulador. La estación transmitió una precaución reglamentaria a partir de un parte de vía, aunque una abreviatura antigua del documento original le resultó extraña. Su cinta conserva cada pulsación.',
    ],'nuria',[{effect:'reveal_fact',target:'c005-f-nuria-carta'}]),
    node('adela','interrogation','Interrogar a Adela Barea','Coche comedor',[
      'Adela admite las botellas francesas con fastidio, como si ese delito menor agotara su paciencia. Sirvió café mientras las lámparas oscilaban por la frenada. Los clientes dejaron vales consecutivos, pero todos estaban de espaldas a la plataforma.',
      'Oyó el carro cruzar ligero hacia la plataforma, regresar más despacio al furgón y después un golpe amortiguado bajo las ruedas. No miró porque una cafetera rebosaba y porque temía que el revisor encontrase el licor bajo el suelo. Su recuerdo necesita una hora precisa.',
    ],'adela',[
      {effect:'reveal_fact',target:'c005-f-adela-licor'},{effect:'reveal_fact',target:'c005-f-adela-ruido'}
    ]),
    node('velocimetro','analysis','Leer la banda del velocímetro','Mesa de pruebas',[
      'La banda registra el viaje sobre un eje de tiempo continuo. A las 23:43 la velocidad cae desde sesenta y ocho kilómetros por hora; permanece en doce hasta las 23:51 y vuelve a subir. No existe una línea horizontal que indique parada. En esos ocho minutos el tren recorrió exactamente 1,6 kilómetros, desde el 83,8 hasta el 85,4.',
      'El desagüe 84,6 quedó a mitad del tramo y el convoy pasó ante él hacia las 23:47. A esa marcha un objeto podía descender junto al tren sin desintegrarse, siempre que una cuerda controlase la caída. Tomás no soltó el regulador: cada corrección de presión queda ligada a la caligrafía mecánica de la locomotora.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-velocimetro',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-tomas-alibi'}
    ]),
    node('morse','analysis','Descifrar la cinta Morse','Mesa de comunicaciones',[
      'Las pulsaciones forman una cadena sin intervalos entre las 23:41 y las 23:52. Nuria recibió de la estación anterior la precaución reglamentaria, pidió confirmación y transmitió el paso del convoy. Abandonar la mesa habría dejado al menos tres minutos en blanco.',
      'La estación confirma que retransmitió de buena fe un parte de vía depositado esa tarde en Madrid por un supuesto capataz. La fórmula “vía dudosa” del original usa un grupo retirado trece años antes. El emisor no necesitaba estar junto a otro telégrafo durante el viaje: había provocado la orden antes de subir al tren.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-morse',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-nuria-alibi'},{effect:'reveal_fact',target:'c005-f-nuria-codigo'}
    ]),
    node('precinto','analysis','Comparar el precinto','Mesa de pruebas',[
      'Al microscopio, el plomo revela dos edades. La cara visible conserva suciedad de Madrid; el canto inferior fue cortado y prensado con metal limpio durante el viaje. El supuesto precinto intacto es una sustitución hecha para resistir una mirada rápida.',
      'Una de las mordazas dejó un hueco triangular donde debería haber un punto. Esa imperfección convierte una herramienta común en una firma y permite comparar todas las tenazas del convoy.',
    ],'mesa-pruebas',[{effect:'advance_clue',target:'c005-cl-precinto',value:'analyzed'}]),
    node('tenaza','analysis','Probar la tenaza mellada','Mesa de pruebas',[
      'Se prensa un plomo nuevo con la tenaza hallada en el despacho de Julián. La mordida reproduce el hueco triangular del precinto falso, incluso una raya oblicua apenas visible. En la bisagra queda polvo gris todavía reciente.',
      'La herramienta pertenece al juego de reserva del jefe de tren. Los empleados postales llevan otro emblema y una matriz distinta. Quien cerró de nuevo el furgón utilizó material bajo control directo de Julián.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-tenaza',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-julian-sello'}
    ]),
    node('llave','analysis','Examinar el sobre lacrado','Mesa de pruebas',[
      'El lacre no se rompió, pero el papel conserva gotas secas y fibras levantadas en la solapa. Vapor aplicado desde abajo ablandó el adhesivo. En la llave original aparecen restos de cera de molde dentro de dos dientes; alguien tomó una impresión, la devolvió y cerró de nuevo el sobre antes de partir.',
      'La operación exigió tiempo, un pequeño taller y privacidad antes de la salida. Desde que Eusebio entregó el sobre, sólo Julián lo custodió. Durante el túnel pudo abrir la jaula con una copia mientras el original llegaba a Ávila dentro de su envoltorio aparentemente intacto.',
    ],'mesa-pruebas',[{effect:'advance_clue',target:'c005-cl-llave',value:'analyzed'}]),
    node('carro','analysis','Reconstruir el trayecto del carro','Furgón postal',[
      'El hollín de una rueda no procede del suelo interior, sino de la plataforma abierta entre el comedor y el furgón. Una fibra alquitranada coincide con la cuerda escondida allí. El primer trayecto fue del carro vacío para recogerla; por eso Adela y Eusebio oyeron ruedas en ambos sentidos.',
      'Ya de regreso en el furgón, la caja podía colocarse de canto en el carro y recorrer el pasillo interior hasta la puerta lateral. Las marcas del tablero prueban que soportó más peso que cualquier saca. El carro no necesitó volver a la plataforma una vez cargado.',
    ],'furgon',[{effect:'advance_clue',target:'c005-cl-carro',value:'analyzed'}]),
    node('puerta','analysis','Medir el carril de la puerta','Furgón postal',[
      'La grasa desplazada marca una apertura de cuarenta y dos centímetros. El ancho de la caja es de cuarenta. La puerta no estuvo abierta hasta el tope, donde habría golpeado y alertado a los pasajeros.',
      'Con el tren a doce kilómetros por hora, una abertura controlada bastaba para pasar la caja de canto y bajarla con una cuerda. El aire del túnel dejó hollín exterior sobre el borde recién movido.',
    ],'furgon',[{effect:'advance_clue',target:'c005-cl-puerta',value:'analyzed'}]),
    node('soga','analysis','Analizar la soga','Mesa de pruebas',[
      'Las fibras están estiradas por una carga cercana a setenta kilos. Un lazo conserva pintura verde de la caja y el extremo opuesto muestra un nudo ferroviario de descenso, común entre guardafrenos veteranos.',
      'Entre el alquitrán aparece arena roja con mica blanca. No procede del balasto gris de la estación. La muestra permite buscar el punto exacto donde la carga tocó tierra.',
    ],'mesa-pruebas',[{effect:'advance_clue',target:'c005-cl-soga',value:'analyzed'}]),
    node('billetes','analysis','Ordenar los billetes marcados','Coche de tercera',[
      'Las sumas forman veinticuatro manos consecutivas. Cuatro tintas y cuatro presiones diferentes alternan sin huecos desde las 23:39 hasta las 23:54. Fingir la secuencia habría exigido la colaboración perfecta de todo el coche.',
      'Marcelo jugaba cuando apareció la señal, cuando se abrió la puerta y cuando el tren recuperó velocidad. Su amenaza era real; su oportunidad, no.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-billetes',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-marcelo-alibi'}
    ]),
    node('vales','analysis','Contrastar los vales del comedor','Coche comedor',[
      'Cada vale corresponde a una taza todavía identificable y a un pasajero distinto. Los testimonios encajan: Adela cobró, sirvió y retiró servicio durante todo el túnel, sin un intervalo suficiente para mover la caja.',
      'El ruido llegó después de la frenada, cuando el traqueteo disminuyó. Su precisión mejora al ordenar las consumiciones. La plataforma estuvo ocupada por otra persona mientras ella permanecía a la vista.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-vales',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-adela-alibi'}
    ]),
    node('pesos','analysis','Reconstruir el orden de las sacas','Compartimento de clasificación',[
      'La hoja mezcla un peso falso para ocultar el tabaco, pero las etiquetas de destino permiten corregirlo. Dos sacas de treinta kilos cayeron atravesadas en el único pasillo y no se movieron hasta Ávila.',
      'Eusebio quedó al otro lado, junto a la mesa, sin acceso a la jaula ni a la puerta. El contrabando explica la alteración del inventario; la geometría de los bultos demuestra su encierro.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-pesos',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-eusebio-alibi'}
    ]),
    node('cuaderno','analysis','Estudiar el cuaderno de rondas','Coche de cola',[
      'La revisión del 14 de octubre no habla de frenos. Dibuja el desagüe del kilómetro 84,6, anota “arena blanda” y calcula cuatro minutos desde el comienzo de una reducción a doce kilómetros por hora. Dos marcas, 83,8 y 85,4, delimitan un tramo de ocho minutos.',
      'En el margen aparece varias veces la abreviatura obsoleta copiada en el parte falso. La caligrafía es de Julián. La visita del día anterior le permitió preparar la caída, comprobar el acceso desde el camino forestal y diseñar una advertencia que la estación retransmitiría sin necesidad de un cómplice.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-cuaderno',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-julian-ruta'}
    ]),
    node('pagare','analysis','Verificar el pagaré','Despacho del jefe de estación',[
      'El pagaré vence a las doce del día siguiente y reclama trescientas diez mil pesetas. El aval lleva el sello de la mutualidad ferroviaria, pero la firma pertenece a un vocal fallecido meses atrás.',
      'Julián no sólo debía dinero: se exponía a prisión y a perder la pensión cuando el acreedor presentase el documento. La caja ofrecía efectivo inmediato y una cantidad suficiente para huir después de cubrir la deuda.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-pagare',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-julian-deuda'}
    ]),
    node('tunel','scene','Inspeccionar el túnel','Kilómetro 84,6',[
      'Una vagoneta de mantenimiento los acerca antes del amanecer. Tras una celosía aparece una lámpara roja de carburo orientada hacia Madrid. No es una señal ferroviaria: alguien la colocó baja para que sólo la viera el correo al aproximarse.',
      'Bajo el muro, un rastro de arena rojiza abandona el balasto y entra en un desagüe. Dos huellas profundas cortan el polvo junto a sacos apilados. La montaña conserva el lugar preparado para recibir la carga.',
    ],'tunel',[
      {effect:'discover_clue',target:'c005-cl-lampara'},{effect:'discover_clue',target:'c005-cl-arena'}
    ]),
    node('lampara','analysis','Desmontar la lámpara falsa','Taller de vía',[
      'La carcasa procede de una lámpara agrícola, pero la lente roja lleva grabado el número del Correo del Oeste. Pertenece al lote de repuestos guardado en el armario de Julián. El depósito sobredimensionado podía arder hasta el amanecer.',
      'La señal fue colocada antes del viaje y dirigida sólo al sentido de marcha del correo. No ayudaba a un ladrón improvisado: obligaba al tren exacto a cruzar despacio el punto elegido.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-lampara',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-julian-lampara'}
    ]),
    node('arena','analysis','Examinar la cama de arena','Desagüe del kilómetro 84,6',[
      'Los sacos forman una rampa hundida. Sobre ellos hay una impresión rectangular de cuarenta por sesenta centímetros, pintura verde y fibras de cuerda. La caja cayó de canto, se deslizó y quedó fuera de la vista desde la vía.',
      'Una huella conduce al camino forestal, pero termina donde el barro de la víspera fue barrido. El ladrón pensaba volver después, cuando el tren estuviera lejos y la búsqueda se concentrase en los vagones.',
    ],'alcantarilla',[{effect:'advance_clue',target:'c005-cl-arena',value:'analyzed'}]),
    node('caja','scene','Abrir el desagüe','Desagüe del kilómetro 84,6',[
      'Al retirar el segundo saco aparece una esquina verde. La caja está encajada bajo la bóveda, sujeta por la propia cuerda. Pesa lo anunciado y el cierre conserva un golpe reciente, pero nadie ha intentado abrirla.',
      'Dentro siguen los fajos sellados: un millón doscientas mil pesetas. El plan no era robar billetes durante el trayecto, sino abandonar el tren limpio y regresar por el camino forestal antes de que se localizase el punto de caída.',
    ],'alcantarilla',[{effect:'discover_clue',target:'c005-cl-caja'}]),
    node('caja-analisis','analysis','Identificar la caja recuperada','Mesa de pruebas',[
      'Eusebio reconoce el golpe antiguo del asa y descubre bajo el forro el número que anotó en Madrid. Los sellos interiores no se han roto. La nómina completa regresa a custodia de la estación.',
      'La pintura verde aparece en la soga y el roce lateral coincide con el carril del furgón. La cadena material queda cerrada: jaula, carro, puerta, cuerda, arena y caja son etapas del mismo movimiento.',
    ],'mesa-pruebas',[
      {effect:'advance_clue',target:'c005-cl-caja',value:'analyzed'},{effect:'reveal_fact',target:'c005-f-eusebio-caja'}
    ]),
    node('confrontar-julian','interrogation','Confrontar a Julián con el desagüe','Despacho del jefe de estación',[
      'Usted no revela que la búsqueda haya encontrado nada. Sólo coloca sobre la mesa el croquis del kilómetro 84,6 y el pagaré. Julián conserva la calma hasta que oye la palabra desagüe. Entonces pregunta si la caja seguía cerrada debajo del segundo saco.',
      'Nadie le había dicho que la caja apareció, que seguía cerrada ni que estaba oculta bajo dos sacos. Los tres detalles nacen de un conocimiento imposible para quien sólo hizo una ronda ferroviaria.',
    ],'julian',[{effect:'reveal_fact',target:'c005-f-julian-sacos'}]),
    node('confrontar-tomas','interrogation','Confrontar a Tomás con la lámpara','Taller de vía',[
      'Tomás gira la lente entre los dedos y reconoce el número antes de limpiarlo. Explica que esos cristales se retiraron de la locomotora años atrás y quedaron en el armario del jefe de tren para emergencias.',
      'Su miedo era otro: las pastillas. La banda, el fogonero y la presión de vapor lo mantienen en la cabina. La lámpara confirma que alguien provocó su maniobra desde fuera.',
    ],'tomas',[{effect:'reveal_fact',target:'c005-f-tomas-cristal'}]),
    node('confrontar-eusebio','interrogation','Confrontar a Eusebio con la caja','Furgón postal',[
      'Eusebio examina el asa golpeada y levanta el forro sin vacilar. Recita el número interior que escribió en Madrid. Sólo entonces respira: el dinero de los obreros no se ha perdido.',
      'Al ver la cuerda y el carro juntos corrige su recuerdo: oyó primero un rodar ligero hacia la plataforma y luego el regreso más lento, antes de que el peso cruzase el furgón. Acepta la sanción por el tabaco; la nueva secuencia separa su contrabando del robo principal.',
    ],'eusebio',[{effect:'reveal_fact',target:'c005-f-eusebio-dospasadas'}]),
    node('confrontar-marcelo','interrogation','Confrontar a Marcelo con el punto de caída','Coche de tercera',[
      'Marcelo reconoce la zona general de la sierra, pero confunde el desagüe con un paso situado cuatro kilómetros más al oeste. Nunca trabajó en ese tramo y su lista no contiene postes ni horarios.',
      'Las cartas lo retienen ante cuatro testigos. La amenaza explica su enojo y lo convierte en un sospechoso visible; no le proporciona el conocimiento de vía necesario para preparar el kilómetro 84,6.',
    ],'marcelo',[{effect:'reveal_fact',target:'c005-f-marcelo-ruta'}]),
    node('confrontar-nuria','interrogation','Confrontar a Nuria con la carta','Cabina de comunicaciones',[
      'El pagador es localizado por teléfono en la presa. Confirma que Nuria había prometido avisarle, pero que esa noche no recibió carta, telegrama ni llamada. El borrador conserva la esquina doblada con la que ella marca los textos aún pendientes.',
      'Nuria preparó una indiscreción y responderá por ello, pero la información nunca salió del tren. La cinta demuestra que no dejó su puesto y el parte falso se había presentado antes de la salida por una vía completamente distinta.',
    ],'nuria',[{effect:'reveal_fact',target:'c005-f-nuria-destinatario'}]),
    node('confrontar-adela','interrogation','Confrontar a Adela con los horarios','Coche comedor',[
      'Al ordenar los vales, Adela sitúa el traqueteo del carro después del tercer café y el golpe antes del quinto. Fue durante el tramo estable a doce kilómetros por hora, no durante la frenada violenta.',
      'Acepta entregar el licor. Sus clientes sostienen su presencia y su oído aporta la secuencia que faltaba: el carro vacío recogió la soga en la plataforma, regresó al furgón y después la caja tocó la cama de arena.',
    ],'adela',[{effect:'reveal_fact',target:'c005-f-adela-golpe'}]),
    node('reconstruccion','analysis','Reconstruir los ocho minutos','Despacho del jefe de estación',[
      'Un parte de vía falsificado y una lámpara roja redujeron el correo sin detenerlo. La llave original volvió a su sobre después de servir como molde para una copia; el precinto fue reemplazado. El carro recogió la soga y luego llevó la caja hasta una puerta abierta apenas lo necesario.',
      'En el kilómetro 84,6, sacos de arena recibieron la carga. La caja quedó escondida para una recogida posterior. Velocidad, acceso, herramienta, conocimiento del terreno y urgencia económica convergen en una sola persona.',
      'La reconstrucción está completa. El nombre, el motivo y el método de la acusación final siguen siendo decisión suya.',
    ],'reconstruccion'),
  ],
  options: [
    option('furgon','furgon','Examinar el furgón postal'), option('locomotora','locomotora','Subir a la locomotora'),
    option('comunicaciones','comunicaciones','Revisar la cabina telegráfica'), option('comedor','comedor','Registrar el coche comedor'),
    option('tercera','tercera','Inspeccionar el coche de tercera'), option('clasificacion','clasificacion','Examinar la clasificación postal'),
    option('cola','cola','Registrar el coche de cola'),
    option('julian','julian','Interrogar a Julián Cid'), option('tomas','tomas','Interrogar a Tomás Veiga'),
    option('eusebio','eusebio','Interrogar a Eusebio Roldán'), option('marcelo','marcelo','Interrogar a Marcelo Frías'),
    option('nuria','nuria','Interrogar a Nuria Salcedo'), option('adela','adela','Interrogar a Adela Barea'),
    option('velocimetro','velocimetro','Leer la banda del velocímetro',undefined,[{requirement:'clue',target:'c005-cl-velocimetro'},{requirement:'fact',target:'c005-f-tomas-senal'}]),
    option('morse','morse','Descifrar la cinta Morse',undefined,[{requirement:'clue',target:'c005-cl-morse'},{requirement:'node',target:'c005-n-nuria'}]),
    option('precinto','precinto','Comparar el precinto',undefined,[{requirement:'clue',target:'c005-cl-precinto'}]),
    option('tenaza','tenaza','Probar la tenaza mellada',undefined,[{requirement:'clue',target:'c005-cl-tenaza'},{requirement:'clue_state',target:'c005-cl-precinto',value:'analyzed'}]),
    option('llave','llave','Examinar el sobre lacrado',undefined,[{requirement:'clue',target:'c005-cl-llave'},{requirement:'fact',target:'c005-f-eusebio-llave'}]),
    option('carro','carro','Reconstruir el trayecto del carro',undefined,[{requirement:'clue',target:'c005-cl-carro'},{requirement:'fact',target:'c005-f-adela-ruido'}]),
    option('puerta','puerta','Medir el carril de la puerta',undefined,[{requirement:'clue',target:'c005-cl-puerta'}]),
    option('soga','soga','Analizar la soga',undefined,[{requirement:'clue',target:'c005-cl-soga'}]),
    option('billetes','billetes','Ordenar los billetes marcados',undefined,[{requirement:'clue',target:'c005-cl-billetes'},{requirement:'node',target:'c005-n-marcelo'}]),
    option('vales','vales','Contrastar los vales del comedor',undefined,[{requirement:'clue',target:'c005-cl-vales'},{requirement:'node',target:'c005-n-adela'}]),
    option('pesos','pesos','Reconstruir el orden de las sacas',undefined,[{requirement:'clue',target:'c005-cl-pesos'},{requirement:'node',target:'c005-n-eusebio'}]),
    option('cuaderno','cuaderno','Estudiar el cuaderno de rondas',undefined,[{requirement:'clue',target:'c005-cl-cuaderno'},{requirement:'node',target:'c005-n-julian'}]),
    option('pagare','pagare','Verificar el pagaré',undefined,[{requirement:'clue',target:'c005-cl-pagare'},{requirement:'node',target:'c005-n-julian'}]),
    option('tunel','tunel','Inspeccionar el túnel',undefined,[{requirement:'clue_state',target:'c005-cl-velocimetro',value:'analyzed'},{requirement:'clue_state',target:'c005-cl-soga',value:'analyzed'}]),
    option('lampara','lampara','Desmontar la lámpara falsa',undefined,[{requirement:'clue',target:'c005-cl-lampara'}]),
    option('arena','arena','Examinar la cama de arena',undefined,[{requirement:'clue',target:'c005-cl-arena'}]),
    option('caja','caja','Abrir el desagüe',undefined,[{requirement:'clue_state',target:'c005-cl-arena',value:'analyzed'},{requirement:'clue_state',target:'c005-cl-soga',value:'analyzed'}]),
    option('caja-analisis','caja-analisis','Identificar la caja recuperada',undefined,[{requirement:'clue',target:'c005-cl-caja'}]),
    option('confrontar-julian','confrontar-julian','Confrontar a Julián con el desagüe',undefined,[{requirement:'node',target:'c005-n-julian'},{requirement:'clue_state',target:'c005-cl-cuaderno',value:'analyzed'},{requirement:'clue',target:'c005-cl-caja'}]),
    option('confrontar-tomas','confrontar-tomas','Confrontar a Tomás con la lámpara',undefined,[{requirement:'node',target:'c005-n-tomas'},{requirement:'clue_state',target:'c005-cl-lampara',value:'analyzed'}]),
    option('confrontar-eusebio','confrontar-eusebio','Confrontar a Eusebio con la caja',undefined,[{requirement:'node',target:'c005-n-eusebio'},{requirement:'clue_state',target:'c005-cl-caja',value:'analyzed'}]),
    option('confrontar-marcelo','confrontar-marcelo','Confrontar a Marcelo con el punto de caída',undefined,[{requirement:'node',target:'c005-n-marcelo'},{requirement:'clue_state',target:'c005-cl-cuaderno',value:'analyzed'}]),
    option('confrontar-nuria','confrontar-nuria','Confrontar a Nuria con la carta',undefined,[{requirement:'node',target:'c005-n-nuria'},{requirement:'clue_state',target:'c005-cl-morse',value:'analyzed'}]),
    option('confrontar-adela','confrontar-adela','Confrontar a Adela con los horarios',undefined,[{requirement:'node',target:'c005-n-adela'},{requirement:'clue_state',target:'c005-cl-vales',value:'analyzed'}]),
    option('reconstruccion','reconstruccion','Reconstruir los ocho minutos',undefined,[
      {requirement:'clue_state',target:'c005-cl-lampara',value:'analyzed'},{requirement:'clue_state',target:'c005-cl-tenaza',value:'analyzed'},
      {requirement:'clue_state',target:'c005-cl-llave',value:'analyzed'},{requirement:'clue_state',target:'c005-cl-carro',value:'analyzed'},
      {requirement:'clue_state',target:'c005-cl-puerta',value:'analyzed'},{requirement:'clue_state',target:'c005-cl-caja',value:'analyzed'},
      {requirement:'clue_state',target:'c005-cl-pagare',value:'analyzed'},
    ]),
  ],
  motives: [
    {id:'c005-m-deuda',label:'Cubrir una deuda y evitar que se descubra un aval falsificado'},
    {id:'c005-m-jornales',label:'Forzar el pago de los jornales atrasados'},
    {id:'c005-m-contrabando',label:'Ocultar el contrabando transportado en el tren'},
    {id:'c005-m-filtracion',label:'Vender el itinerario de la nómina a una banda de carretera'},
    {id:'c005-m-despido',label:'Perjudicar a la compañía ferroviaria antes de un despido'},
  ],
  methods: [
    {id:'c005-met-descenso',label:'Provocó una reducción y descendió la caja a un escondite preparado'},
    {id:'c005-met-complice',label:'Un cómplice manipuló la señal y recogió la caja junto a la vía'},
    {id:'c005-met-oculta',label:'Ocultó la caja dentro de una saca postal y la bajó en Ávila'},
    {id:'c005-met-sustitucion',label:'Sustituyó la caja antes de salir y escenificó el robo en el túnel'},
    {id:'c005-met-estacion',label:'Abrió el furgón durante una maniobra previa y alteró después los registros'},
  ],
  solution: {
    culprit:'c005-s-julian', motive:'c005-m-deuda', method:'c005-met-descenso',
    evidence:['c005-cl-velocimetro','c005-cl-lampara','c005-cl-precinto','c005-cl-tenaza','c005-cl-llave','c005-cl-carro','c005-cl-puerta','c005-cl-soga','c005-cl-arena','c005-cl-caja','c005-cl-cuaderno','c005-cl-pagare'],
    evidenceGroups:[
      {label:'Reducción preparada',importance:'essential',alternatives:[{clueId:'c005-cl-velocimetro',stateKey:'analyzed'},{clueId:'c005-cl-lampara',stateKey:'analyzed'}]},
      {label:'Apertura y cierre del furgón',importance:'essential',alternatives:[{clueId:'c005-cl-precinto',stateKey:'analyzed'},{clueId:'c005-cl-tenaza',stateKey:'analyzed'},{clueId:'c005-cl-llave',stateKey:'analyzed'}]},
      {label:'Salida física de la caja',importance:'essential',alternatives:[{clueId:'c005-cl-carro',stateKey:'analyzed'},{clueId:'c005-cl-puerta',stateKey:'analyzed'},{clueId:'c005-cl-soga',stateKey:'analyzed'},{clueId:'c005-cl-caja',stateKey:'analyzed'}]},
      {label:'Preparación y móvil',importance:'complementary',alternatives:[{clueId:'c005-cl-arena',stateKey:'analyzed'},{clueId:'c005-cl-cuaderno',stateKey:'analyzed'},{clueId:'c005-cl-pagare',stateKey:'analyzed'}]},
    ],
    accusationRequirements:[
      {requirement:'node',target:'c005-n-caja'},
      {requirement:'node',target:'c005-n-julian'},{requirement:'node',target:'c005-n-tomas'},
      {requirement:'node',target:'c005-n-eusebio'},{requirement:'node',target:'c005-n-marcelo'},
      {requirement:'node',target:'c005-n-nuria'},{requirement:'node',target:'c005-n-adela'},
    ],
    explanation:body(
      'Julián Cid preparó el robo el día anterior. Colocó una lámpara roja junto al túnel, acondicionó con sacos de arena el desagüe del kilómetro 84,6 y presentó un parte falso que la estación retransmitió de buena fe. Antes de salir abrió con vapor el sobre postal, copió la llave, devolvió el original y volvió a sellarlo.',
      'La advertencia y la lámpara redujeron el tren a doce kilómetros por hora durante 1,6 kilómetros. Julián abrió la jaula con la copia, llevó el carro vacío a recoger la soga y, ya dentro del furgón, movió la caja hasta la puerta lateral. La descendió hacia las 23:47, cerró el furgón con su tenaza mellada y dejó la jaula abierta porque el precinto exterior bastaba para retrasar el descubrimiento hasta Ávila. Pensaba recoger la caja por el camino forestal.',
      'El pagaré explica la urgencia: necesitaba cubrir una deuda y evitar que el aval falsificado llegara a la mutualidad. La nómina se recuperó completa. Los demás ocultaban faltas reales, pero sus coartadas positivas los separan del robo.',
    ),
    epitaph:'El tren no se detuvo. La verdad tampoco.',
  },
};

const optionLines: Record<string, string[]> = {
  'El tren': ['furgon','locomotora','comunicaciones','comedor','tercera','clasificacion','cola'],
  'Testimonios': ['julian','tomas','eusebio','marcelo','nuria','adela'],
  'Peritajes del convoy': ['velocimetro','morse','precinto','tenaza','llave','carro','puerta','soga'],
  'Comprobaciones': ['billetes','vales','pesos','cuaderno','pagare'],
  'El túnel': ['tunel','lampara','arena','caja','caja-analisis'],
  'Confrontaciones': ['confrontar-julian','confrontar-tomas','confrontar-eusebio','confrontar-marcelo','confrontar-nuria','confrontar-adela'],
  'Conclusiones': ['reconstruccion'],
};

for (const [line, ids] of Object.entries(optionLines)) {
  for (const id of ids) {
    const investigation = case005.options.find((option) => option.id === `c005-o-${id}`);
    if (investigation) investigation.line = line;
  }
}
