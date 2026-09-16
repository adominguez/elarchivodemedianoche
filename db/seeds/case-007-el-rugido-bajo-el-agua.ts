import { caseAssets, type CaseDefinition } from './definition.ts';

const art=caseAssets('el-rugido-bajo-el-agua');
const body=(...paragraphs:string[])=>paragraphs.join('\n\n');
const fact=(id:string,kind:'testimony'|'alibi'|'contradiction'|'motive'|'background',headline:string,detail:string)=>({id:`c007-f-${id}`,kind,headline,detail});
const clue=(id:string,name:string,kind:'essential'|'secondary'|'red_herring'|'context',foundAt:string,found:string,analyzed:string)=>({
  id:`c007-cl-${id}`,name,kind,foundAt,imagePublicId:art.clue(id),states:[
    {key:'found',label:name,description:found},
    {key:'analyzed',label:`${name} — análisis completado`,description:`${found} ${analyzed}`},
  ],
});
const node=(id:string,kind:'intro'|'scene'|'interrogation'|'analysis',title:string,location:string,paragraphs:string[],image:string,effects:CaseDefinition['nodes'][number]['effects']=[])=>({
  id:`c007-n-${id}`,kind,title,location,body:body(...paragraphs),imagePublicId:art.scene(image),effects,
});
const option=(id:string,to:string,label:string,line:string,requires?:CaseDefinition['options'][number]['requires'])=>({id:`c007-o-${id}`,to:`c007-n-${to}`,label,line,requires});

export const case007:CaseDefinition={
  id:'c007',slug:'el-rugido-bajo-el-agua',fileCode:'#007',
  title:'El rugido bajo el agua',subtitle:'Una desaparición en el zoológico',
  place:'Parque Zoológico del Litoral, Málaga',dateLabel:'Noche del 17 de mayo de 1986',victimName:'Sira, tigresa de Bengala',
  briefing:body(
    'Sira, una tigresa de Bengala de ciento cuarenta y dos kilos, debía salir al amanecer hacia una supuesta reserva de cría. Desde las seis de la tarde, un boletín del puerto advertía que una tormenta eléctrica alcanzaría Málaga entre las 22:15 y las 22:30; el protocolo del parque ordenaba aislar entonces la iluminación exterior. A las 22:18 una descarga derribó además el transformador. El generador tardó noventa y seis segundos en arrancar y el sector de felinos permaneció a oscuras hasta que volvió la red siete minutos después.',
    'A las 22:25 la jaula estaba vacía. El candado seguía cerrado, el precinto oficial continuaba entero y unas huellas avanzaban desde la plataforma hasta el foso, donde terminaban frente al agua. Dos minutos después se oyó un rugido bajo la pajarera norte. La búsqueda se dirigió al exterior, pero ninguna puerta perimetral se abrió y nadie encontró a Sira. Hay que recuperarla antes de que despierte por completo y averiguar quién convirtió un recinto sellado en una salida invisible.',
  ),
  coverPublicId:art.cover,entryNodeId:'c007-n-intro',
  suspects:[
    {id:'c007-s-leire',name:'Leire Santacruz',role:'Veterinaria jefe',portraitPublicId:art.suspect('leire-santacruz'),description:'Treinta y nueve años. Cabello oscuro rizado a la altura de la mandíbula, bata blanca sobre blusa verde petróleo y una pulsera roja de hilo. Habla con precisión clínica.',relation:'Responsable de la salud de Sira y del examen previo a su traslado.',facts:[
      fact('leire-examen','testimony','Inmovilizó a Sira para el examen','Reconoce haber disparado el dardo de las 21:52, pero sostiene que llevaba una dosis ligera destinada a obtener una muestra de sangre.'),
      fact('leire-clinica','alibi','Afirma que permaneció en la clínica','Dice que la auxiliar la vio antes y después del apagón, aunque nadie puede situarla entre las 22:18 y las 22:23.'),
      fact('leire-ruta','background','Conoce los corredores veterinarios','Dirigió durante años los traslados internos y sabe manejar la jaula, el montacargas y las cuarentenas antiguas.'),
      fact('leire-oposicion','motive','Intentó detener el traslado','Una carta sin registrar pide inspeccionar al comprador y advierte que Sira acabaría en una colección ambulante.'),
      fact('leire-grasa','contradiction','Llevaba grasa de la bisagra en la manga','La grasa negra de su puño contiene el mismo grafito y la misma pintura verde que los pasadores retirados del recinto.'),
    ]},
    {id:'c007-s-mauro',name:'Mauro Galán',role:'Director del parque',portraitPublicId:art.suspect('mauro-galan'),description:'Cincuenta y siete años. Cabello plateado peinado hacia atrás, gafas doradas y traje safari color arena con corbata burdeos.',relation:'Firmó el traslado y negociaba directamente con la entidad compradora.',facts:[
      fact('mauro-reserva','testimony','Presenta el traslado como un programa de cría','Asegura que Atlas Fauna gestiona una reserva marroquí y que la salida de Sira salvaría las cuentas del parque.'),
      fact('mauro-anticipo','motive','Recibió un anticipo no declarado','Una sociedad intermediaria abonó dinero en una cuenta que no figura en la contabilidad zoológica.'),
      fact('mauro-telefono','alibi','Habló desde su despacho durante el apagón','La centralita y la telefonista mantienen conectada su extensión con Tánger entre las 22:16 y las 22:27.'),
      fact('mauro-pienso','contradiction','Infló facturas de alimentación','Las cantidades pagadas superan durante meses lo que entró en almacén; desvió fondos, pero necesitaba entregar a Sira para cobrar el resto.'),
      fact('mauro-destino','background','Sabía que no existía ninguna reserva','Al confrontarlo admite que el comprador explotaba una colección itinerante y que ocultó ese destino al patronato.'),
    ]},
    {id:'c007-s-nerea',name:'Nerea Campos',role:'Fotógrafa y activista',portraitPublicId:art.suspect('nerea-campos'),description:'Veintisiete años. Pelo negro muy corto, chaqueta vaquera, camiseta de rayas y cámara de 35 mm con correa roja.',relation:'Había denunciado el traslado y amenazó públicamente con impedirlo.',facts:[
      fact('nerea-amenaza','motive','Prometió liberar a Sira','Sus octavillas anuncian que la tigresa no abandonará Málaga y convierten su protesta en el señuelo más visible.'),
      fact('nerea-archivo','contradiction','Entró sin permiso en el archivo','Forzó un cajón para fotografiar el contrato; ocultó la intrusión porque podía costarle la acreditación.'),
      fact('nerea-carrete','alibi','Su carrete la sitúa en la puerta sur','Una secuencia continua, el reloj luminoso del aparcamiento y dos vigilantes la mantienen lejos del recinto durante el apagón.'),
      fact('nerea-copia','background','Conservó una copia del contrato','Sus fotografías permiten leer la cláusula que transforma una cesión de cría en una venta definitiva.'),
      fact('nerea-sombra','background','Fotografió una bata junto a la clínica','En el último fotograma aparece una figura de blanco empujando algo bajo durante los primeros segundos de oscuridad.'),
    ]},
    {id:'c007-s-basilio',name:'Basilio Roca',role:'Jefe de cuidadores',portraitPublicId:art.suspect('basilio-roca'),description:'Cuarenta y ocho años. Complexión robusta, bigote espeso, uniforme verde oliva y gorra beige gastada.',relation:'Selló la puerta de servicio y era el último responsable de la ronda de felinos.',facts:[
      fact('basilio-precinto','testimony','Colocó el precinto oficial','Anotó su número a las 21:35. Después del examen vio a Sira tumbada en la plataforma y creyó normal aquel sopor porque Leire le había anunciado una sedación ligera.'),
      fact('basilio-pienso','contradiction','Alteró el registro de carne','Vendía a un restaurante parte del alimento sobrante y completaba después las cantidades sobre el papel.'),
      fact('basilio-radio','alibi','Atendió la crisis en los primates','Cuatro llamadas sucesivas y dos cuidadores lo sitúan cerrando compuertas entre las 22:19 y las 22:26.'),
      fact('basilio-bisagra','background','Conocía el defecto de la puerta','Había pedido cambiar los pasadores exteriores, pero retiró el aviso para evitar una sanción por mantenimiento atrasado.'),
      fact('basilio-viajes','background','Oyó dos recorridos del montacargas','Desde la casa de primates distinguió una bajada pesada y un regreso más rápido durante el apagón.'),
    ]},
    {id:'c007-s-raul',name:'Raúl Mena',role:'Electricista',portraitPublicId:art.suspect('raul-mena'),description:'Treinta y tres años. Delgado, cabello castaño rizado, mono azul de trabajo y chaqueta impermeable naranja.',relation:'Mantenía el transformador, el generador y el montacargas de servicio.',facts:[
      fact('raul-tormenta','testimony','Atribuye el corte al transformador','El registrador confirma una descarga exterior a las 22:18; el apagón principal no fue provocado desde el parque.'),
      fact('raul-gasoleo','contradiction','Había extraído gasóleo del generador','El depósito bajo y aire en la tubería explican los noventa y seis segundos de retraso que intentó ocultar.'),
      fact('raul-cuadro','alibi','Permaneció ante el cuadro eléctrico','Su ayudante, el registrador y tres maniobras firmadas lo mantienen en la central durante toda la oscuridad.'),
      fact('raul-ascensor','background','El montacargas funciona sin corriente','Explica que el contrapeso y el freno hidráulico permiten un descenso y un retorno manuales durante un corte.'),
      fact('raul-pesos','background','Reconoce las dos cargas registradas','La aguja marcó doscientos treinta y ocho kilos al bajar y noventa y seis al regresar.'),
    ]},
  ],
  clues:[
    clue('dardo','Dardo del examen veterinario','essential','Recinto de Sira','Un dardo de aluminio yace bajo el bebedero con la etiqueta del examen de las 21:52.','La junta conserva anestésico de inmovilización y la aguja penetró por completo; no contenía la dosis ligera anotada en la ficha.'),
    clue('sedante','Vial de inmovilización','essential','Clínica veterinaria','Un vial casi vacío aparece en la bandeja de curas, aunque el inventario lo registra como intacto.','La cantidad ausente coincide con una inmovilización completa para un felino de ciento cuarenta kilos y con el residuo del dardo.'),
    clue('bisagra','Pasadores de la puerta','essential','Recinto de Sira','El candado y el precinto están enteros, pero dos pasadores tienen grasa removida.','Las chavetas fueron enderezadas y recolocadas desde el corredor trasero: podía retirarse el panel completo sin abrir el cierre sellado.'),
    clue('huellas','Huellas hacia el foso','essential','Arena del recinto','Seis pisadas de tigre avanzan hasta el agua y se detienen de forma abrupta.','Todas repiten la misma grieta, profundidad y separación; fueron estampadas con el molde educativo de la clínica antes de la lluvia.'),
    clue('ascensor','Banda del montacargas','essential','Galería de servicio','El registrador mecánico dibuja dos desplazamientos durante el corte.','A las 22:20 bajaron 238 kilos y a las 22:24 subieron 96: la diferencia de 142 kilos coincide exactamente con el peso de Sira.'),
    clue('jaula','Jaula de tratamiento','essential','Clínica veterinaria','Una jaula baja de 96 kilos tiene las ruedas mojadas y el cable del torno recién recogido.','Estaba colocada junto al corredor antes del corte. Una recreación con 142 kilos de sacos emplea 76 segundos en retirar el panel y cargarla, y otros 31 en alcanzar el montacargas; las ruedas llevan arena del recinto y cal del sótano.'),
    clue('plano','Plano veterinario de 1968','essential','Archivo técnico','Una galería une felinos, clínica y las antiguas cuarentenas bajo la pajarera.','El recorrido evita zonas públicas y desemboca bajo el estanque de aves en un recinto que sigue ventilado, aunque figura clausurado desde 1979.'),
    clue('rejilla','Pelo en la rejilla norte','essential','Pajarera norte','Varios pelos anaranjados están prendidos en una salida de ventilación junto al suelo.','Son de tigre y llegaron desde dentro del conducto; el rugido se propagó por la galería desde la cuarentena, no desde los jardines.'),
    clue('contrato','Contrato de traslado','essential','Despacho de dirección','La portada habla de conservación, pero el anexo cede la propiedad de Sira a Atlas Fauna.','La dirección de Atlas pertenece a un intermediario de espectáculos y el pago final dependía de entregar la tigresa al amanecer.'),
    clue('carta','Carta veterinaria sin registrar','essential','Archivo de dirección','Una carta de Leire solicita suspender el traslado por falta de garantías.','El borrador lleva fecha de esa tarde y adjunta fotografías de jaulas ambulantes; Mauro la guardó sin enviarla al patronato.'),
    clue('carrete','Carrete de la puerta sur','red_herring','Cámara de Nerea','El negativo contiene doce fotografías tomadas durante la tormenta.','El reloj del aparcamiento avanza de 22:17 a 22:26 sin cortes y dos vigilantes aparecen en la secuencia junto a Nerea.'),
    clue('radio','Registro de radio de cuidadores','red_herring','Casa de primates','Cuatro avisos piden ayuda por compuertas atascadas durante el corte.','La voz de Basilio responde desde primates y dos cuidadores anotan su llegada antes del segundo aviso.'),
    clue('generador','Registrador del generador','red_herring','Central eléctrica','La cinta marca descarga exterior, tres intentos de arranque y presión estable después.','Raúl ocultó falta de combustible, pero sus maniobras continuas y su ayudante lo mantienen en la central mientras se movía la tigresa.'),
    clue('facturas','Facturas de alimentación','red_herring','Almacén de cuidadores','Los pagos por carne superan el peso recibido durante cinco meses.','Mauro autorizó facturas infladas y Basilio vendió sobrantes, pero ambos necesitaban que Sira siguiera registrada y no prepararon su ruta.'),
    clue('telefono','Hoja de la centralita','context','Recepción','La extensión del director estuvo conectada con Tánger durante once minutos.','La telefonista oyó a Mauro negociar el pago y confirma que no abandonó el despacho entre las 22:16 y las 22:27.'),
    clue('sira','Collar de identificación de Sira','essential','Cuarentena subterránea','Sira aparece viva, somnolienta y encerrada con agua y ventilación; conserva su collar numerado.','La temperatura, las pupilas y el pulso concuerdan con el anestésico del dardo. No escapó: fue trasladada y preparada para despertar con seguridad.'),
  ],
  nodes:[
    node('intro','intro','La jaula que no se abrió','Pabellón de felinos',[
      'La tormenta ha dejado ramas sobre los paseos y charcos bajo los focos de emergencia. Tras el vidrio del pabellón, la plataforma de Sira está vacía. El candado cuelga cerrado, el alambre del precinto conserva su torsión y ningún barro exterior entra en la galería. Sólo seis huellas cruzan la arena hacia el foso.',
      'La tigresa debía ser cargada al amanecer. Ahora puede estar anestesiada, herida o suelta entre visitantes evacuados. El rugido que llegó desde la pajarera norte ha dividido la búsqueda. Antes de seguirlo conviene responder a una pregunta más incómoda: si nadie abrió la puerta, ¿qué parte del recinto hizo de puerta?',
    ],'zoo'),
    node('recinto','scene','Inspeccionar el recinto sellado','Pabellón de felinos',[
      'El número del precinto coincide con el libro de ronda y el candado no presenta limaduras. En cambio, la pintura verde de los goznes está arañada alrededor de las chavetas. El panel de servicio pesa demasiado para caer por accidente, pero sus pasadores podrían salir hacia la galería técnica.',
      'Bajo el bebedero aparece el dardo usado en el examen. En la arena, las seis huellas terminan antes del agua sin salpicaduras, pelos ni marcas de retorno. Sira no saltó al foso: alguien quiso que la búsqueda comenzara allí.',
    ],'enclosure',[{effect:'discover_clue',target:'c007-cl-dardo'},{effect:'discover_clue',target:'c007-cl-bisagra'},{effect:'discover_clue',target:'c007-cl-huellas'}]),
    node('clinica','scene','Registrar la clínica veterinaria','Clínica',[
      'La bandeja del examen sigue sobre el fregadero. Falta casi todo el contenido de un vial que el inventario describe como intacto. La jaula de tratamiento ocupa el pasillo, ya orientada hacia el corredor de servicio como si aguardara el traslado del amanecer: tiene el piso móvil, un torno manual y gotas de agua de lluvia en dos ruedas.',
      'La auxiliar vio a Leire antes del apagón y volvió a verla a las 22:24, inclinada sobre la mesa. Entre ambas horas atendía una llamada en farmacia. Junto a la pared falta el molde de una pata de tigre que se empleaba en las visitas escolares.',
    ],'clinic',[{effect:'discover_clue',target:'c007-cl-sedante'},{effect:'discover_clue',target:'c007-cl-jaula'}]),
    node('direccion','scene','Revisar el despacho de dirección','Edificio administrativo',[
      'El contrato visible promete incorporar a Sira a un programa de cría, pero un anexo oculto bajo el secante transmite la propiedad a Atlas Fauna. La mitad del pago sólo llegará cuando el camión cruce la verja al amanecer.',
      'En un cajón cerrado hay facturas de carne, una carta de la veterinaria que nunca llegó al patronato y una tira de contactos fotográficos. La mesa no explica cómo salió la tigresa, pero sí por qué varias personas querían impedir o asegurar el traslado.',
    ],'office',[{effect:'discover_clue',target:'c007-cl-contrato'},{effect:'discover_clue',target:'c007-cl-carta'},{effect:'discover_clue',target:'c007-cl-facturas'}]),
    node('central','scene','Examinar la central eléctrica','Edificio de mantenimiento',[
      'El transformador recibió una descarga a las 22:18. El generador intentó arrancar tres veces antes de estabilizarse: el depósito está por debajo de la marca de seguridad y la tubería conserva una burbuja de aire. Raúl llevaba varios minutos frente al cuadro, preparado para aplicar el aislamiento preventivo que ordenaba el aviso meteorológico de las 18:00.',
      'El sector veterinario recuperó corriente crítica, pero el pabellón de felinos no volvió a iluminarse hasta las 22:25. La avería creó la oportunidad; los registros dirán si quien la mantuvo abierta pudo también usarla.',
    ],'power',[{effect:'discover_clue',target:'c007-cl-generador'}]),
    node('primates','scene','Comprobar la casa de primates','Sector oriental',[
      'Los chimpancés arrancaron una compuerta interior al apagarse los focos. Dos cuidadores aún recogen herramientas y recuerdan a Basilio entrando antes del segundo aviso de radio. Su voz aparece cuatro veces entre interferencias mientras ordena cerrar corredores.',
      'En el almacén contiguo, los albaranes no coinciden con la carne recibida. El engaño lleva meses y afecta a dirección y cuidadores, pero no deja libre a Basilio durante los minutos en que desapareció Sira.',
    ],'primates',[{effect:'discover_clue',target:'c007-cl-radio'},{effect:'discover_clue',target:'c007-cl-facturas'}]),
    node('galeria','scene','Bajar a la galería de servicio','Bajo la clínica',[
      'Un montacargas de reja conecta la clínica con un corredor húmedo. No necesita electricidad para bajar: un contrapeso mueve la cabina y un freno hidráulico regula el retorno. La banda de papel conserva dos picos recientes pese al corte.',
      'Las ruedas de una jaula han dejado líneas paralelas sobre la cal. Hacia el norte, el corredor termina ante un muro pintado; una corriente tibia sale por la rejilla de ventilación que continúa hacia la pajarera.',
    ],'lift',[{effect:'discover_clue',target:'c007-cl-ascensor'},{effect:'discover_clue',target:'c007-cl-rejilla'}]),
    node('archivo','scene','Abrir el archivo técnico','Edificio administrativo',[
      'Los planos modernos terminan en la clínica, pero una carpeta de 1968 conserva el proyecto completo. Bajo el actual estanque de la pajarera hubo tres cuarentenas para grandes felinos, comunicadas por la misma galería y ventiladas mediante conductos que aún figuran en el mantenimiento anual.',
      'La centralita comparte armario con los planos. Su hoja nocturna registra una llamada de once minutos desde el despacho del director hasta Tánger, iniciada dos minutos antes del apagón.',
    ],'archive',[{effect:'discover_clue',target:'c007-cl-plano'},{effect:'discover_clue',target:'c007-cl-telefono'}]),
    node('leire','interrogation','Interrogar a Leire Santacruz','Clínica veterinaria',[
      'Leire no discute que disparó el dardo. Afirma que era una dosis ligera para extraer sangre y que Sira permaneció despierta cuando abandonó el recinto. Durante el corte, dice, ordenó la clínica y esperó a que la auxiliar regresara de farmacia.',
      'Conoce las cuarentenas antiguas, pero las considera inseguras desde su clausura. Al mencionar el traslado endurece la voz: pidió garantías, no recibió respuesta y temía que el viaje terminara en una colección ambulante. Niega haber decidido por su cuenta.',
    ],'leire',[{effect:'reveal_fact',target:'c007-f-leire-examen'},{effect:'reveal_fact',target:'c007-f-leire-clinica'},{effect:'reveal_fact',target:'c007-f-leire-ruta'}]),
    node('mauro','interrogation','Interrogar a Mauro Galán','Despacho de dirección',[
      'Mauro llama convenio de conservación a lo que el anexo presenta como una venta. Sostiene que el parque necesita el dinero, admite un anticipo ingresado fuera de la contabilidad ordinaria y afirma que Atlas Fauna dispone de instalaciones adecuadas. Durante la oscuridad, asegura, negociaba desde su teléfono con el representante en Tánger.',
      'Las facturas infladas lo irritan más que la desaparición. Admite haber autorizado pagos sin comprobar pesos, pero insiste en que perder a Sira significa perder el segundo plazo y el cargo. Tenía razones para ocultar el destino, no para impedir la entrega.',
    ],'mauro',[{effect:'reveal_fact',target:'c007-f-mauro-reserva'},{effect:'reveal_fact',target:'c007-f-mauro-anticipo'},{effect:'reveal_fact',target:'c007-f-mauro-pienso'}]),
    node('nerea','interrogation','Interrogar a Nerea Campos','Puerta sur',[
      'Nerea no retira su amenaza: habría bloqueado el camión delante de las cámaras. Niega, sin embargo, haber tocado a Sira. Durante el apagón fotografió la verja sur porque esperaba que el comprador adelantara la llegada.',
      'Su nerviosismo procede de otra intrusión. Entró en el archivo esa tarde y fotografió el contrato después de forzar un cajón. Entrega el carrete sólo cuando comprende que las imágenes también pueden fijar dónde estuvo durante la desaparición.',
    ],'nerea',[{effect:'discover_clue',target:'c007-cl-carrete'},{effect:'reveal_fact',target:'c007-f-nerea-amenaza'},{effect:'reveal_fact',target:'c007-f-nerea-archivo'}]),
    node('basilio','interrogation','Interrogar a Basilio Roca','Casa de cuidadores',[
      'Basilio recita de memoria el número del precinto. Lo colocó a las 21:35 y comprobó el candado después del examen veterinario. Vio a Sira tendida en la plataforma, con los movimientos lentos; Leire le había advertido que una sedación ligera podía dejarla adormecida y no encontró motivo para dar la alarma. Cuando se apagaron las luces, la radio lo mandó a primates y no regresó hasta encontrar el recinto vacío.',
      'Oculta algo más antiguo: la puerta de servicio tenía pasadores accesibles desde la galería. Pidió repararlos, luego retiró el aviso para evitar que descubrieran atrasos y diferencias en la carne. Desde primates oyó vibrar el montacargas, aunque entonces no distinguió cuántas maniobras se hicieron.',
    ],'basilio',[{effect:'reveal_fact',target:'c007-f-basilio-precinto'},{effect:'reveal_fact',target:'c007-f-basilio-pienso'},{effect:'reveal_fact',target:'c007-f-basilio-bisagra'}]),
    node('raul','interrogation','Interrogar a Raúl Mena','Central eléctrica',[
      'Raúl señala la descarga exterior en el registrador. No causó la tormenta, pero el generador debería haber respondido en menos de diez segundos. Reconoce que el arranque se prolongó y culpa a una revisión pendiente.',
      'Conoce el montacargas: el contrapeso permite moverlo sin corriente y una banda mecánica pesa cada viaje. Dice no haber abandonado el cuadro; su ayudante confirma las tres maniobras, aunque ambos evitan hablar del nivel de combustible.',
    ],'raul',[{effect:'reveal_fact',target:'c007-f-raul-tormenta'},{effect:'reveal_fact',target:'c007-f-raul-ascensor'}]),
    node('dardo','analysis','Analizar el dardo veterinario','Mesa de pruebas',[
      'La etiqueta corresponde al examen de las 21:52 y la aguja conserva sangre de Sira. Bajo el tapón queda anestésico de inmovilización en una concentración incompatible con una simple toma de muestra.',
      'La tigresa empezó a perder coordinación antes del apagón. Quien preparó el dardo no improvisó una fuga durante la tormenta: necesitaba que ciento cuarenta y dos kilos de músculo pudieran cargarse sin resistencia.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-dardo',value:'analyzed'}]),
    node('sedante','analysis','Cuadrar el inventario de anestésicos','Clínica veterinaria',[
      'El precinto del vial fue perforado y vuelto a cubrir con la etiqueta del lote. La cantidad ausente completa exactamente la carga hallada en el dardo; no hay otra intervención de grandes felinos anotada esa semana.',
      'Sólo el armario veterinario guarda esa sustancia. La preparación ocurrió antes del corte y convirtió el examen autorizado en el primer paso del traslado clandestino.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-sedante',value:'analyzed'}]),
    node('bisagra','analysis','Desmontar la puerta sellada','Pabellón de felinos',[
      'Al retirar las cubiertas se descubre que el candado une puerta y marco, pero las bisagras pertenecen a un panel completo. Las chavetas se enderezaron, recibieron grasa con grafito y fueron colocadas de nuevo a mano.',
      'El precinto dice la verdad sólo sobre el cierre: nadie lo abrió. Desde la galería trasera era posible separar el panel, acercar una jaula y devolver cada pasador antes de que regresara la luz.',
    ],'enclosure',[{effect:'advance_clue',target:'c007-cl-bisagra',value:'analyzed'}]),
    node('huellas','analysis','Moldear las huellas del foso','Mesa de pruebas',[
      'Las seis impresiones comparten una grieta minúscula en la almohadilla central. También tienen idéntica profundidad, aunque el terreno se ablanda cerca del agua. Ningún animal repite así peso y apoyo.',
      'El dibujo coincide con el molde de caucho usado en las visitas escolares y desaparecido de la clínica. Las huellas fueron una escenografía: desviaban la búsqueda hacia el foso mientras Sira viajaba en sentido contrario.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-huellas',value:'analyzed'}]),
    node('ascensor','analysis','Leer la banda del montacargas','Galería de servicio',[
      'La aguja mecánica registró 238 kilos al descender a las 22:20. Cuatro minutos después volvió a subir con 96. El mecanismo siguió funcionando por contrapeso aunque el cuadro eléctrico estuviera apagado.',
      'La jaula de tratamiento pesa 96 kilos y Sira, 142. La primera cifra suma ambas; la segunda demuestra que la jaula regresó vacía. El animal quedó en algún punto de la galería inferior.',
    ],'lift',[{effect:'advance_clue',target:'c007-cl-ascensor',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-raul-pesos'}]),
    node('jaula','analysis','Examinar la jaula de tratamiento','Clínica veterinaria',[
      'Las ruedas delanteras llevan arena rojiza del recinto; las traseras, cal húmeda de la galería. El torno conserva un pelo anaranjado y el piso deslizante permite arrastrar sobre una lona al animal inmovilizado.',
      'La jaula ya estaba alineada con el corredor antes del apagón, justificada por el traslado del amanecer. Una recreación con 142 kilos de sacos necesita 76 segundos para retirar las chavetas preaflojadas, apartar el panel y cargar el peso mediante el torno; recorrer los dieciocho metros hasta el montacargas lleva otros 31. Los 107 segundos encajan antes de la bajada de las 22:20.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-jaula',value:'analyzed'}]),
    node('plano','analysis','Reconstruir la red veterinaria','Archivo técnico',[
      'El plano de 1968 prolonga la galería bajo el estanque de la pajarera hasta tres celdas de cuarentena. Dos fueron rellenadas; la tercera conserva puerta, desagüe y un respiradero conectado a la rejilla norte.',
      'Desde el montacargas se llega en menos de un minuto empujando una jaula. El lugar no figura en los mapas públicos, pero sí en los manuales que utilizan veterinarios, mantenimiento y jefes de cuidadores.',
    ],'archive',[{effect:'advance_clue',target:'c007-cl-plano',value:'analyzed'}]),
    node('rejilla','analysis','Seguir el rugido de la pajarera','Pajarera norte',[
      'Los pelos de la rejilla no fueron depositados desde el paseo: están atrapados en el lado interior y orientados por el aire ascendente. Al golpear el conducto, el sonido viaja hacia abajo y regresa amplificado desde la galería.',
      'El rugido de las 22:27 no señalaba un animal suelto entre los árboles. Procedía de la cuarentena bajo el suelo, cuando Sira empezaba a despertar y su voz encontró la antigua ventilación.',
    ],'service',[{effect:'advance_clue',target:'c007-cl-rejilla',value:'analyzed'}]),
    node('contrato','analysis','Identificar al comprador de Sira','Despacho de dirección',[
      'Atlas Fauna no administra una reserva. Comparte domicilio, teléfono y representante con un espectáculo itinerante sancionado dos veces por transportar grandes felinos en jaulas pequeñas.',
      'El anexo convierte la cesión en venta definitiva y condiciona el último pago a la salida de Sira. Mauro ocultó el destino; para otra persona, el documento convertía el traslado del amanecer en una urgencia que debía impedirse esa misma noche.',
    ],'office',[{effect:'advance_clue',target:'c007-cl-contrato',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-nerea-copia'}]),
    node('carta','analysis','Reconstruir la carta interceptada','Archivo de dirección',[
      'El borrador de Leire adjunta fotografías de Atlas Fauna y solicita una inspección inmediata. La hoja de registro no contiene entrada: el original quedó doblado en el cajón privado de Mauro antes de llegar al patronato.',
      'La veterinaria agotó el procedimiento interno esa tarde y sabía que el camión llegaría antes de cualquier respuesta oficial. Su oposición era concreta: impedir que Sira fuese entregada al comprador descrito en el anexo.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-carta',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-leire-oposicion'}]),
    node('carrete','analysis','Revelar el carrete de Nerea','Laboratorio fotográfico',[
      'Doce fotogramas muestran la puerta sur, a dos vigilantes y el reloj luminoso del aparcamiento. Los minutos avanzan sin saltos desde las 22:17 hasta las 22:26; el borde del negativo mantiene numeración continua.',
      'Nerea entró en el archivo y amenazó con bloquear el traslado, pero permaneció junto a la verja durante toda la ventana. En una exposición larga aparece al fondo una silueta baja cruzando cerca de la clínica; la lluvia impide distinguir quién la empuja.',
    ],'evidence',[{effect:'advance_clue',target:'c007-cl-carrete',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-nerea-carrete'}]),
    node('radio','analysis','Ordenar las llamadas de cuidadores','Casa de primates',[
      'El primer aviso entra a las 22:19:14. Basilio responde cuarenta segundos después; dos cuidadores lo ven cerrar la compuerta occidental y su voz vuelve a quedar grabada a las 22:21, 22:23 y 22:26.',
      'No pudo desmontar la puerta, bajar a Sira y regresar entre esas llamadas. Su silencio protegía el negocio de la carne y el defecto de las bisagras, no una ausencia durante el apagón.',
    ],'primates',[{effect:'advance_clue',target:'c007-cl-radio',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-basilio-radio'}]),
    node('generador','analysis','Reconstruir el apagón','Central eléctrica',[
      'La descarga del transformador llegó desde la línea exterior. El boletín del puerto, recibido a las 18:00, situaba la tormenta sobre el parque entre las 22:15 y las 22:30; el protocolo obligaba a aislar las luces exteriores en cuanto los rayos alcanzaran la costa. Los tres intentos de arranque y las maniobras posteriores están impresos y firmados por Raúl y su ayudante sin un intervalo suficiente para abandonar el cuadro.',
      'El corte general fue natural y se adelantó al aislamiento preventivo que habría dejado felinos a oscuras de todos modos. El retraso procede de combustible extraído y aire en la tubería, no de una manipulación durante el corte. Raúl permaneció intentando arrancarlo mientras otra persona ejecutaba un plan preparado alrededor de una ventana anunciada desde aquella tarde.',
    ],'power',[{effect:'advance_clue',target:'c007-cl-generador',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-raul-cuadro'}]),
    node('facturas','analysis','Auditar la alimentación de los felinos','Almacén de cuidadores',[
      'Los recibos incluyen más carne de la que entró por la báscula. Basilio vendía los sobrantes y Mauro aprobaba importes inflados que después repartían mediante una empresa de suministros.',
      'El fraude explica por qué ambos ocultaron documentos y defectos. También los ata a la presencia de Sira: el director necesitaba entregarla para cobrar y el cuidador necesitaba mantener animales registrados para sostener las facturas.',
    ],'office',[{effect:'advance_clue',target:'c007-cl-facturas',value:'analyzed'}]),
    node('telefono','analysis','Contrastar la llamada a Tánger','Recepción',[
      'La conexión comienza a las 22:16 y termina a las 22:27. La telefonista oyó a Mauro discutir el saldo de la venta; el representante confirmó después que permanecieron hablando incluso cuando se apagaron las luces.',
      'La llamada prueba la negociación irregular y al mismo tiempo mantiene al director en su despacho. No pudo recorrer felinos, clínica y galería mientras defendía por teléfono una entrega que aún esperaba completar.',
    ],'office',[{effect:'advance_clue',target:'c007-cl-telefono',value:'analyzed'},{effect:'reveal_fact',target:'c007-f-mauro-telefono'}]),
    node('cuarentena','scene','Abrir la cuarentena subterránea','Bajo el estanque de la pajarera',[
      'Tras retirar una placa de fibra aparece una puerta de malla. Dentro, Sira respira sobre una cama de paja, todavía somnolienta. Tiene agua limpia, ventilación abierta y una manta doblada contra el hormigón. Nadie la abandonó al azar: prepararon el recinto para mantenerla segura varias horas.',
      'Su collar sigue en el cuello y no hay heridas de fuga. Junto a la puerta quedan una gasa veterinaria, marcas de las ruedas y una mancha de grasa negra a la altura de una manga. La tigresa está viva; el misterio ya no es dónde está, sino quién sabía exactamente cuánto tardaría en despertar.',
    ],'quarantine',[{effect:'discover_clue',target:'c007-cl-sira'}]),
    node('sira','analysis','Examinar a Sira','Bajo el estanque de la pajarera',[
      'Las pupilas, la temperatura y el pulso concuerdan con el anestésico hallado en el dardo. La dosis empezó a perder efecto alrededor de las 22:27, la hora del rugido transmitido por la ventilación.',
      'El collar confirma su identidad y el cuerpo no muestra golpes ni inmersión. Sira fue inmovilizada, cargada y escondida con conocimientos veterinarios; el foso y las huellas sólo debían comprar tiempo hasta después de la salida prevista del camión.',
    ],'quarantine',[{effect:'advance_clue',target:'c007-cl-sira',value:'analyzed'}]),
    node('confrontar-leire','interrogation','Confrontar a Leire con el traslado','Clínica veterinaria',[
      'Ante el vial, la banda del montacargas y la carta interceptada, Leire insiste en que cualquiera pudo usar su material. Su explicación se quiebra al comparar la manga de su bata con los pasadores de la puerta.',
      'La grasa del puño contiene grafito y escamas verdes idénticas a las bisagras. Leire había limpiado sus manos, pero no la costura interior. Admite haber desmontado antes ese panel en simulacros veterinarios y deja de sostener que permaneció en la clínica.',
    ],'leire',[{effect:'reveal_fact',target:'c007-f-leire-grasa'}]),
    node('confrontar-mauro','interrogation','Confrontar a Mauro con Atlas Fauna','Despacho de dirección',[
      'Las fotografías de las jaulas ambulantes eliminan la última ambigüedad. Mauro reconoce que Atlas Fauna no era una reserva y que evitó informar al patronato porque necesitaba el pago para cubrir el déficit.',
      'Su delito económico no explica la desaparición: la llamada lo mantiene en el despacho y la venta dependía de entregar a Sira. El silencio de Mauro creó el motivo de otra persona, pero frustrar el traslado le costaba dinero a él.',
    ],'mauro',[{effect:'reveal_fact',target:'c007-f-mauro-destino'}]),
    node('confrontar-nerea','interrogation','Confrontar a Nerea con el carrete','Puerta sur',[
      'Nerea admite que forzó el archivo para obtener las fotografías del contrato. No liberó a Sira; pensaba encadenarse al camión cuando llegara y necesitaba imágenes públicas, no un animal oculto.',
      'El carrete la mantiene en la puerta y conserva el detalle que ella no vio al disparar: una figura con bata blanca empuja la jaula hacia la clínica. Su intrusión aporta la prueba del destino y también descarta su oportunidad física.',
    ],'nerea',[{effect:'reveal_fact',target:'c007-f-nerea-copia'},{effect:'reveal_fact',target:'c007-f-nerea-sombra'}]),
    node('confrontar-basilio','interrogation','Confrontar a Basilio con la puerta','Pabellón de felinos',[
      'Basilio reconoce que el precinto nunca protegió las bisagras. Retiró la solicitud de reparación para que una inspección no alcanzara las diferencias de carne y creyó que nadie recordaría el defecto durante la tormenta.',
      'Al ver la banda del montacargas identifica los sonidos: una bajada bajo carga y un retorno vacío. Sus llamadas desde primates cierran su posición mientras el panel fue desmontado, aunque su negligencia hizo posible el truco del recinto sellado.',
    ],'basilio',[{effect:'reveal_fact',target:'c007-f-basilio-viajes'}]),
    node('confrontar-raul','interrogation','Confrontar a Raúl con el generador','Central eléctrica',[
      'Raúl admite haber vendido dos garrafas de gasóleo y haber falseado el nivel del depósito. La tormenta fue real; los noventa y seis segundos de retraso fueron la consecuencia de su desvío.',
      'Entrega el esquema del montacargas y reconoce los pesos de la banda. Su falta creó la oscuridad, pero el ayudante y el cuadro lo mantienen inmóvil mientras la jaula bajaba con 238 kilos y regresaba con 96.',
    ],'raul',[{effect:'reveal_fact',target:'c007-f-raul-gasoleo'},{effect:'reveal_fact',target:'c007-f-raul-cuadro'}]),
    node('reconstruccion','analysis','Reconstruir los siete minutos','Cuarentena subterránea',[
      'El dardo inmovilizó a Sira antes de la tormenta. El panel salió de sus bisagras sin romper el precinto, la jaula recorrió la clínica y la banda pesó animal y vehículo al bajar. Las huellas falsas empujaron la búsqueda hacia el foso; el rugido viajó desde la cuarentena por la ventilación.',
      'Las llamadas, fotografías y radios cierran las coartadas de quienes mintieron por otros asuntos. El contrato y la carta explican el conflicto, pero corresponde decidir quién convirtió su acceso profesional en un rescate clandestino y qué pruebas sostienen cada parte de esa acusación.',
      'La reconstrucción está completa. La acusación final sigue siendo suya.',
    ],'reconstruction'),
  ],
  options:[
    option('recinto','recinto','Inspeccionar el recinto sellado','El zoológico'),option('clinica','clinica','Registrar la clínica veterinaria','El zoológico'),option('direccion','direccion','Revisar el despacho de dirección','El zoológico'),option('central','central','Examinar la central eléctrica','El zoológico'),option('primates','primates','Comprobar la casa de primates','El zoológico'),option('galeria','galeria','Bajar a la galería de servicio','El zoológico'),option('archivo','archivo','Abrir el archivo técnico','El zoológico'),
    option('leire','leire','Interrogar a Leire Santacruz','Testimonios'),option('mauro','mauro','Interrogar a Mauro Galán','Testimonios'),option('nerea','nerea','Interrogar a Nerea Campos','Testimonios'),option('basilio','basilio','Interrogar a Basilio Roca','Testimonios'),option('raul','raul','Interrogar a Raúl Mena','Testimonios'),
    option('dardo','dardo','Analizar el dardo veterinario','El recinto',[{requirement:'clue',target:'c007-cl-dardo'},{requirement:'node',target:'c007-n-leire'}]),
    option('sedante','sedante','Cuadrar el inventario de anestésicos','El recinto',[{requirement:'clue',target:'c007-cl-sedante'},{requirement:'fact',target:'c007-f-leire-examen'}]),
    option('bisagra','bisagra','Desmontar la puerta sellada','El recinto',[{requirement:'clue',target:'c007-cl-bisagra'},{requirement:'fact',target:'c007-f-basilio-bisagra'}]),
    option('huellas','huellas','Moldear las huellas del foso','El recinto',[{requirement:'clue',target:'c007-cl-huellas'},{requirement:'node',target:'c007-n-clinica'}]),
    option('ascensor','ascensor','Leer la banda del montacargas','La ruta de servicio',[{requirement:'clue',target:'c007-cl-ascensor'},{requirement:'fact',target:'c007-f-raul-ascensor'}]),
    option('jaula','jaula','Examinar la jaula de tratamiento','La ruta de servicio',[{requirement:'clue',target:'c007-cl-jaula'},{requirement:'clue_state',target:'c007-cl-ascensor',value:'analyzed'}]),
    option('plano','plano','Reconstruir la red veterinaria','La ruta de servicio',[{requirement:'clue',target:'c007-cl-plano'},{requirement:'node',target:'c007-n-basilio'}]),
    option('rejilla','rejilla','Seguir el rugido de la pajarera','La ruta de servicio',[{requirement:'clue',target:'c007-cl-rejilla'},{requirement:'clue_state',target:'c007-cl-plano',value:'analyzed'}]),
    option('contrato','contrato','Identificar al comprador de Sira','El traslado',[{requirement:'clue',target:'c007-cl-contrato'},{requirement:'node',target:'c007-n-mauro'}]),
    option('carta','carta','Reconstruir la carta interceptada','El traslado',[{requirement:'clue',target:'c007-cl-carta'},{requirement:'node',target:'c007-n-leire'}]),
    option('carrete','carrete','Revelar el carrete de Nerea','Comprobaciones',[{requirement:'clue',target:'c007-cl-carrete'}]),
    option('radio','radio','Ordenar las llamadas de cuidadores','Comprobaciones',[{requirement:'clue',target:'c007-cl-radio'},{requirement:'node',target:'c007-n-basilio'}]),
    option('generador','generador','Reconstruir el apagón','Comprobaciones',[{requirement:'clue',target:'c007-cl-generador'},{requirement:'node',target:'c007-n-raul'}]),
    option('facturas','facturas','Auditar la alimentación de los felinos','Comprobaciones',[{requirement:'clue',target:'c007-cl-facturas'},{requirement:'node',target:'c007-n-mauro'},{requirement:'node',target:'c007-n-basilio'}]),
    option('telefono','telefono','Contrastar la llamada a Tánger','Comprobaciones',[{requirement:'clue',target:'c007-cl-telefono'},{requirement:'node',target:'c007-n-mauro'}]),
    option('cuarentena','cuarentena','Abrir la cuarentena subterránea','La tigresa',[{requirement:'clue_state',target:'c007-cl-plano',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-rejilla',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-ascensor',value:'analyzed'}]),
    option('sira','sira','Examinar a Sira','La tigresa',[{requirement:'clue',target:'c007-cl-sira'}]),
    option('confrontar-leire','confrontar-leire','Confrontar a Leire con el traslado','Confrontaciones',[{requirement:'node',target:'c007-n-leire'},{requirement:'clue_state',target:'c007-cl-bisagra',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-carta',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-sira',value:'analyzed'}]),
    option('confrontar-mauro','confrontar-mauro','Confrontar a Mauro con Atlas Fauna','Confrontaciones',[{requirement:'node',target:'c007-n-mauro'},{requirement:'clue_state',target:'c007-cl-contrato',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-telefono',value:'analyzed'}]),
    option('confrontar-nerea','confrontar-nerea','Confrontar a Nerea con el carrete','Confrontaciones',[{requirement:'node',target:'c007-n-nerea'},{requirement:'clue_state',target:'c007-cl-carrete',value:'analyzed'}]),
    option('confrontar-basilio','confrontar-basilio','Confrontar a Basilio con la puerta','Confrontaciones',[{requirement:'node',target:'c007-n-basilio'},{requirement:'clue_state',target:'c007-cl-bisagra',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-radio',value:'analyzed'}]),
    option('confrontar-raul','confrontar-raul','Confrontar a Raúl con el generador','Confrontaciones',[{requirement:'node',target:'c007-n-raul'},{requirement:'clue_state',target:'c007-cl-generador',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-ascensor',value:'analyzed'}]),
    option('reconstruccion','reconstruccion','Ordenar los siete minutos','Conclusiones',[{requirement:'clue_state',target:'c007-cl-dardo',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-bisagra',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-ascensor',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-sira',value:'analyzed'},{requirement:'clue_state',target:'c007-cl-contrato',value:'analyzed'}]),
  ],
  motives:[
    {id:'c007-m-proteger',label:'Impedir la venta clandestina y mantener a Sira a salvo hasta que llegara una inspección'},
    {id:'c007-m-anticipo',label:'Cobrar el seguro y ocultar el anticipo recibido por el traslado'},
    {id:'c007-m-activismo',label:'Convertir la liberación de Sira en una campaña pública'},
    {id:'c007-m-pienso',label:'Evitar que una auditoría descubriera el fraude de alimentación'},
    {id:'c007-m-gasoleo',label:'Desviar la investigación del combustible robado del generador'},
  ],
  methods:[
    {id:'c007-met-galeria',label:'La inmovilizó, desmontó el panel sellado y la bajó en la jaula hasta la cuarentena'},
    {id:'c007-met-foso',label:'La hizo cruzar el foso y salir por un desagüe durante el apagón'},
    {id:'c007-met-camion',label:'La sacó en un camión de suministros antes de cortar la electricidad'},
    {id:'c007-met-complice',label:'Un cómplice abrió el candado y sustituyó el precinto después de la fuga'},
    {id:'c007-met-puerta',label:'La condujo despierta por la puerta principal mientras los cuidadores atendían primates'},
  ],
  solution:{
    culprit:'c007-s-leire',motive:'c007-m-proteger',method:'c007-met-galeria',
    evidence:['c007-cl-dardo','c007-cl-sedante','c007-cl-bisagra','c007-cl-huellas','c007-cl-ascensor','c007-cl-jaula','c007-cl-plano','c007-cl-rejilla','c007-cl-sira','c007-cl-contrato','c007-cl-carta'],
    evidenceGroups:[
      {label:'Sira fue inmovilizada antes del apagón',importance:'essential',alternatives:[{clueId:'c007-cl-dardo',stateKey:'analyzed'},{clueId:'c007-cl-sedante',stateKey:'analyzed'}]},
      {label:'El recinto sellado fue preparado como engaño',importance:'essential',alternatives:[{clueId:'c007-cl-bisagra',stateKey:'analyzed'},{clueId:'c007-cl-huellas',stateKey:'analyzed'}]},
      {label:'Una jaula transportó los 142 kilos de Sira',importance:'essential',alternatives:[{clueId:'c007-cl-ascensor',stateKey:'analyzed'},{clueId:'c007-cl-jaula',stateKey:'analyzed'}]},
      {label:'La tigresa quedó oculta bajo la pajarera',importance:'essential',alternatives:[{clueId:'c007-cl-plano',stateKey:'analyzed'},{clueId:'c007-cl-rejilla',stateKey:'analyzed'},{clueId:'c007-cl-sira',stateKey:'analyzed'}]},
      {label:'El traslado suponía un peligro que alguien quiso impedir',importance:'complementary',alternatives:[{clueId:'c007-cl-contrato',stateKey:'analyzed'},{clueId:'c007-cl-carta',stateKey:'analyzed'}]},
    ],
    accusationRequirements:[
      {requirement:'node',target:'c007-n-cuarentena'},{requirement:'node',target:'c007-n-sira'},
      {requirement:'node',target:'c007-n-leire'},{requirement:'node',target:'c007-n-mauro'},{requirement:'node',target:'c007-n-nerea'},{requirement:'node',target:'c007-n-basilio'},{requirement:'node',target:'c007-n-raul'},
    ],
    explanation:body(
      'Leire Santacruz descubrió que la supuesta reserva era una colección itinerante y que Mauro había interceptado su petición de inspección. Como el camión llegaría al amanecer, preparó una desaparición que mantuviera a Sira dentro del parque y obligara a revisar el contrato. El boletín meteorológico de las 18:00 le daba una ventana previsible: el protocolo dejaría sin iluminación exterior el sector de felinos entre las 22:15 y las 22:30, aunque la tormenta no dañara nada. Durante el examen de las 21:52 cargó el dardo con una dosis completa de inmovilización, preparó la antigua cuarentena, colocó la jaula junto al corredor y estampó con el molde educativo las falsas huellas hacia el foso.',
      'Leire no provocó la descarga que derribó el transformador, pero había construido su plan alrededor del aislamiento anunciado. Cuando llegó la oscuridad retiró desde la galería los pasadores preaflojados sin tocar el candado ni el precinto. La jaula ya estaba alineada: la recreación demuestra que apartar el panel, cargar los 142 kilos con el torno y cubrir los dieciocho metros exigía 107 segundos. El montacargas registró 238 kilos al bajar a las 22:20 —96 de jaula y 142 de tigresa— y 96 al regresar. Ocultó a Sira bajo la pajarera, recolocó el panel y volvió a la clínica antes de que regresara la auxiliar.',
      'El rugido viajó por la ventilación cuando el anestésico comenzó a perder efecto. Nerea estaba en la puerta sur; Basilio atendía primates; Raúl permanecía ante el cuadro y Mauro negociaba por teléfono una venta que necesitaba completar. Sus delitos y secretos explican sus mentiras, pero sólo Leire reúne el acceso al anestésico, el dominio de la jaula, la ventana sin testigos, la grasa de la bisagra y el motivo para impedir la entrega sin sacar a Sira del parque.',
    ),
    epitaph:'La jaula siguió cerrada. Lo que se abrió fue el camino que nadie miraba.',
  },
};
