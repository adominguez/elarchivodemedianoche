import { caseAssets, type CaseDefinition } from './definition.ts';

const art = caseAssets('la-habitacion-que-respiraba');
const body = (...paragraphs: string[]) => paragraphs.join('\n\n');
const fact = (id:string,kind:'testimony'|'alibi'|'contradiction'|'motive'|'background',headline:string,detail:string) => ({id:`c006-f-${id}`,kind,headline,detail});
const clue = (id:string,name:string,kind:'essential'|'secondary'|'red_herring'|'context',foundAt:string,found:string,analyzed:string) => ({
  id:`c006-cl-${id}`,name,kind,foundAt,imagePublicId:art.clue(id),states:[
    {key:'found',label:name,description:found},
    {key:'analyzed',label:`${name} — análisis completado`,description:`${found} ${analyzed}`},
  ],
});
const node = (id:string,kind:'intro'|'scene'|'interrogation'|'analysis',title:string,location:string,paragraphs:string[],image:string,effects:CaseDefinition['nodes'][number]['effects']=[]) => ({
  id:`c006-n-${id}`,kind,title,location,body:body(...paragraphs),imagePublicId:art.scene(image),effects,
});
const option = (id:string,to:string,label:string,line:string,requires?:CaseDefinition['options'][number]['requires']) => ({
  id:`c006-o-${id}`,to:`c006-n-${to}`,label,line,requires,
});

export const case006: CaseDefinition = {
  id:'c006',slug:'la-habitacion-que-respiraba',fileCode:'#006',
  title:'La habitación que respiraba',subtitle:'Fraude durante una sesión espiritista',
  place:'Balneario de Santa Brígida, Ourense',dateLabel:'Noche del 2 de noviembre de 1912',
  briefing:body(
    'A las 23:43, durante una sesión convocada para pedir consejo a la esposa difunta de Augusto Valdés, un criado anunció que el médico acababa de certificar una muerte natural por neumonía: el industrial había fallecido. Amalia Voss propuso completar un último pasaje; Clara pidió escuchar la despedida y el capellán Leal apoyó el ruego. Todos cerraron los ojos. A las 23:44 las lámparas de gas se redujeron durante noventa y seis segundos a unas llamas piloto azules y, desde la biblioteca cerrada, sonó una campanilla.',
    'El notario advirtió que el testamento cerrado debía presentarse al juez sin abrir. Con el puente cortado, Clara y el capellán le pidieron comprobar el supuesto mensaje, y él cedió levantando un acta provisional ante los seis presentes. La caja seguía cerrada y contenía un pliego lacrado exteriormente idéntico al recibido por la tarde. Al romper el sello apareció un texto desconocido que entregaba el patrimonio al Círculo de la Luz Serena. Como el notario nunca había leído el contenido original, la sustitución podía pasar por auténtica hasta la apertura judicial.',
  ),
  coverPublicId:art.cover,entryNodeId:'c006-n-intro',
  suspects:[
    {id:'c006-s-amalia',name:'Amalia Voss',role:'Médium itinerante',portraitPublicId:art.suspect('amalia-voss'),description:'Cuarenta y un años. Cabello negro ondulado con una franja plateada, vestido de terciopelo burdeos y un camafeo de obsidiana. Habla con una calma estudiada.',relation:'Augusto financió sus sesiones y prometió una donación al Círculo de la Luz Serena.',facts:[
      fact('amalia-mesa','testimony','Afirma no haber abandonado el círculo','Sostiene que Clara le sujetó la derecha y la directora del hotel la izquierda durante toda la penumbra.'),
      fact('amalia-oficio','background','Conoce los trucos de gabinete','Admite usar trompetas, gasa luminosa y mecanismos ocultos para dar solemnidad a sus demostraciones.'),
      fact('amalia-guante','contradiction','Las dos manos eran señuelos','Los guantes contienen manos de cera unidas por una cinta bajo el chal; Amalia pudo abandonar la silla sin romper el círculo.'),
      fact('amalia-circulo','motive','Controla el Círculo mediante un alias','Los estatutos vinculan la asociación con A. Wendel, nombre que forma con sus apellidos de nacimiento.'),
      fact('amalia-deuda','motive','Debía rescatar su material empeñado','Una papeleta exige el pago de doce mil pesetas antes del lunes o subastarán su gabinete.'),
      fact('amalia-testamento','contradiction','Su vestido dejó la fibra del pasadizo','La fibra burdeos de la trompeta encaja en una pérdida reciente del forro de su manga, oculta bajo una costura improvisada.'),
    ]},
    {id:'c006-s-clara',name:'Clara Valdés',role:'Nieta de Augusto',portraitPublicId:art.suspect('clara-valdes'),description:'Veintisiete años. Cabello cobrizo trenzado, vestido verde oscuro y pendientes de perla. Ha pasado la noche entre la enfermería y el salón.',relation:'Heredera más cercana; discutió con Augusto después de anunciar que abandonaría el balneario.',facts:[
      fact('clara-herencia','motive','Temía quedar fuera del testamento','Augusto amenazó con desheredarla cuando descubrió que planeaba marcharse con un músico.'),
      fact('clara-viaje','background','Ocultaba una fuga','Dos billetes para Lisboa estaban cosidos al forro de su maleta y explican su discusión con el abuelo.'),
      fact('clara-enfermeria','testimony','Preparó la medicina de las once','Declara que pesó la dosis con la enfermera y volvió al salón poco antes de comenzar la sesión.'),
      fact('clara-dosis','alibi','La muerte fue natural','El registro, la balanza y el paquete aún sellado confirman que Augusto recibió la dosis prescrita; el médico certificó la neumonía a las 23:43.'),
      fact('clara-mano','alibi','Quedó enlazada entre dos testigos','Durante la penumbra sostuvo con la izquierda el guante derecho de Amalia y el notario no soltó su mano derecha.'),
      fact('clara-original','background','El original mantiene su herencia','La cláusula auténtica le lega la administración del balneario y desmiente que necesitara sustituirla.'),
    ]},
    {id:'c006-s-mateo',name:'Mateo Robles',role:'Jefe de mantenimiento',portraitPublicId:art.suspect('mateo-robles'),description:'Cincuenta y cinco años. Bigote gris, chaleco de trabajo marrón y un manojo de llaves de latón. Conoce las conducciones desde la reforma de 1898.',relation:'Mantiene las calderas, el alumbrado de gas y los pasos de servicio del edificio.',facts:[
      fact('mateo-pasajes','testimony','Conoce el corredor de servicio','Explica que las tuberías acústicas discurren detrás de la biblioteca y desembocan en el antiguo gabinete de música.'),
      fact('mateo-carbon','contradiction','Falseó las entregas de carbón','Anotó dos toneladas que nunca entraron para venderlas a una serrería cercana.'),
      fact('mateo-bomba','alibi','Trabajó en el achique durante la penumbra','El contador de la bomba y dos mozos registran su actividad continua entre las 23:38 y las 23:51.'),
      fact('mateo-gas','testimony','La presión bajó después del distribuidor','La caldera mantuvo caudal; el regulador actuó en el ramal del salón sin extinguir las llamas piloto.'),
      fact('mateo-herramienta','background','El mecanismo no pertenece al taller','Los tornillos y resortes del regulador proceden de maquinaria escénica, no del almacén de mantenimiento.'),
      fact('mateo-trompeta','background','Oyó vibrar el tubo de la biblioteca','Mientras achicaba agua percibió dos golpes metálicos por la conducción acústica, separados por poco más de un minuto.'),
    ]},
  ],
  clues:[
    clue('llave-notario','Llave de la caja de hierro','essential','Cadena del notario','La llave conocida no abandonó la cadena durante la sesión.','Dos dientes conservan cera roja de una impresión tomada antes de la noche; la llave auténtica sirvió de molde.'),
    clue('sello','Fragmentos del sello aparecido','essential','Biblioteca','El notario acaba de romper una oblea roja que imita el sol de su protocolo.','El relieve carece de dos mellas del sello oficial y muestra las burbujas de un molde de yeso artesanal.'),
    clue('codicilo','Testamento aparecido','essential','Caja de hierro','El texto extraído del pliego cerrado lega los bienes a una asociación espiritualista; el acta exterior incluye las firmas exigidas.','El papel lleva la filigrana del lote comprado por el balneario en septiembre. Las firmas del testador y los testigos fueron calcadas de cartas; la rúbrica del notario reproduce la que dejó en el registro del hotel.'),
    clue('testamento','Testamento cerrado original','essential','Trompeta acústica del pasadizo','El pliego aparece enrollado, atado con una cinta azul y todavía lacrado.','La numeración del acta exterior, la tinta y las dos mellas del sello confirman que es el documento que el notario recibió esa tarde sin conocer su contenido.'),
    clue('guante','Guantes de la sesión','essential','Salón de sesiones','Los dos guantes de Amalia pesan demasiado y permanecen unidos bajo el chal.','Cada uno contiene una mano de cera articulada; una cinta entre ambas mantuvo los señuelos en la mesa mientras los vecinos los sujetaban.'),
    clue('reloj-gas','Regulador de relojería','essential','Gabinete de utilería','Un torno pequeño sigue abrazado a la válvula real del ramal del salón y conserva un cordón negro en el disparador.','Un tirón libera el muelle: tarda noventa y seis segundos en reducir el caudal a la llama piloto y restaurarlo. El cordón alcanza el pedal oculto bajo la silla de Amalia y las mordazas conservan pintura del ramal del salón.'),
    clue('presion-gas','Banda de presión del gas','essential','Cuarto de calderas','La gráfica registra una bajada breve mientras la caldera sigue estable.','La presión desciende después del distribuidor hasta el umbral de las llamas piloto y sólo en el salón, compatible con un regulador colocado en su ramal.'),
    clue('gasa','Gasa fosforescente','context','Salón de sesiones','Un velo verde cuelga tras la cortina.','Contiene sulfuro de zinc y explica el resplandor atribuido a una aparición, pero no intervino en el robo del documento.'),
    clue('plano','Plano de conducciones de 1898','essential','Archivo del balneario','Una cámara estrecha rodea la biblioteca.','El trazado une el salón con un corredor tras los estantes y termina en el gabinete de utilería.'),
    clue('trompeta','Trompeta acústica','essential','Pasadizo de servicio','La boquilla tiene polvo removido y una fibra burdeos distinta de los uniformes del hotel.','El pabellón tiene anchura para ocultar un pliego enrollado y un cordel interior permitió hacer sonar la campanilla.'),
    clue('llave-copia','Llave de latón sin pulir','essential','Baúl de utilería','Una llave áspera yace entre limaduras recientes.','Su perfil reproduce la caja de hierro; abre la cerradura y conserva la misma cera que quedó en la llave del notario.'),
    clue('registro-circulo','Estatutos del Círculo','essential','Baúl de utilería','La asociación está administrada por una tal A. Wendel.','El alias combina los apellidos de nacimiento de Amalia y el camafeo repite el emblema registrado por la entidad.'),
    clue('papeleta','Papeleta de empeño','essential','Costurero de Amalia','El resguardo está sujeto con hilo del vestido burdeos.','Vence el lunes por doce mil pesetas y compromete todo su gabinete, creando una urgencia económica inmediata.'),
    clue('medicinas','Registro de medicinas','red_herring','Enfermería','La dosis de Augusto figura preparada por Clara.','La enfermera confirma cada pesada y el paquete sobrante sigue sellado; el médico certifica que la neumonía causó la muerte sin intervención ajena.'),
    clue('carbon','Libro de carbón','red_herring','Cuarto de calderas','Dos entregas no coinciden con el peso del depósito.','Mateo vendió combustible y corrigió el libro, una falta real que no explica la regulación localizada del gas.'),
    clue('bomba','Contador de la bomba de achique','context','Sótano','El contador avanzó durante la tormenta.','Las pulsaciones continuas y dos testigos mantienen a Mateo en el sótano durante los noventa y seis segundos.'),
  ],
  nodes:[
    node('intro','intro','La campana detrás del muro','Vestíbulo del balneario',[
      'A las 23:43, un criado interrumpe la sesión: el médico acaba de certificar la muerte natural de Augusto por neumonía. Amalia propone mantener el círculo un último minuto para recibir la despedida de su esposa difunta. Clara pide escucharla y el capellán Leal apoya el ruego. Todos cierran los ojos. Un trueno sacude la galería cuando las lámparas se reducen a llamas azules y, desde la biblioteca, suena una campanilla que nadie debía poder tocar.',
      'Noventa y seis segundos después vuelve la luz. Amalia proclama que la campana ha señalado la última voluntad de Augusto. El notario advierte que el pliego debe presentarse al juez sin abrir, pero el puente está cortado y Clara y el capellán insisten en comprobar el mensaje. Cede sólo para levantar un acta provisional ante los seis. En la caja encuentra un rollo lacrado como el recibido por la tarde; al romper la oblea lee un testamento desconocido que favorece al Círculo de la Luz Serena.',
    ],'hotel'),
    node('salon','scene','Examinar el salón de la sesión','Salón espiritista',[
      'Las seis sillas forman un círculo cerrado: Amalia, Clara, el notario, el capellán Leal, el pianista Íñigo Ferreiro y la directora del hotel. Clara ocupaba la derecha de la médium y el notario sujetaba la otra mano de Clara; a la izquierda de Amalia, la directora no soltó el segundo guante. Los cuatro testigos coinciden en que nadie rompió la cadena.',
      'Los dos guantes de Amalia han quedado bajo el chal. Pesan demasiado y sus dedos conservan una rigidez que no pertenece al cuero. Bajo el fleco de su silla asoma un aro de latón; un cordón negro sale de él y desaparece bajo la alfombra hacia la cortina. El último pasaje exigía noventa segundos de silencio y ojos cerrados mientras el espíritu «cruzaba el umbral». Tras la tela cuelga una gasa verdosa junto a una botella sin etiqueta y una puerta comunica directamente con el antiguo gabinete de música; cerca del ramal de gas permanece un olor a aceite de máquina.',
    ],'seance',[{effect:'discover_clue',target:'c006-cl-guante'},{effect:'discover_clue',target:'c006-cl-gasa'}]),
    node('biblioteca','scene','Registrar la biblioteca cerrada','Biblioteca',[
      'La cerradura de la puerta no está forzada y las ventanas siguen atrancadas por dentro. Sobre el terciopelo de la caja descansa el testamento que el notario acaba de desplegar. A su lado están los fragmentos del lacre rojo que cerraba el rollo. El acta exterior parecía completa, incluida la rúbrica notarial, pero al mirarla de cerca el notario reconoce una vacilación que nunca hace al firmar.',
      'La llave del notario continúa en su cadena. Bajo la lupa, dos dientes tienen una película mate adherida. Detrás de los estantes se oye un leve soplo cada vez que el viento presiona las chimeneas del edificio.',
    ],'library',[{effect:'discover_clue',target:'c006-cl-llave-notario'},{effect:'discover_clue',target:'c006-cl-sello'},{effect:'discover_clue',target:'c006-cl-codicilo'}]),
    node('archivo','scene','Abrir el archivo de obras','Archivo del balneario',[
      'Los legajos de la reforma de 1898 describen calefacción, gas y una red acústica con la que el servicio recibía órdenes sin cruzar los salones. En un plano doblado, una cámara sin nombre rodea tres lados de la biblioteca.',
      'Una de sus líneas termina tras el antiguo gabinete de música, hoy ocupado por la utilería de Amalia. Mateo firmó reparaciones recientes en otros conductos, pero éste figura clausurado sólo con paneles de madera.',
    ],'passage',[{effect:'discover_clue',target:'c006-cl-plano'}]),
    node('enfermeria','scene','Revisar la enfermería','Segundo piso',[
      'Augusto yace bajo varias mantas y el certificado fija la muerte a las 23:43. La enfermera conserva el registro de cada dosis, la balanza sin mover y un paquete farmacéutico todavía sellado. La neumonía comenzó antes de que el notario llegara al hotel y explica la muerte sin intervención ajena.',
      'Clara pasó aquí buena parte de la noche. En una maleta cercana aparecen dos billetes para Lisboa cosidos al forro. Su plan de marcharse explica la discusión familiar, pero no demuestra que tocara la medicina ni el testamento.',
    ],'infirmary',[{effect:'discover_clue',target:'c006-cl-medicinas'}]),
    node('calderas','scene','Inspeccionar el cuarto de calderas','Sótano',[
      'La caldera mantiene presión y el registrador sólo muestra una bajada breve en el ramal del salón. No llega a cero: se detiene en el caudal mínimo que conserva una llama piloto. Junto al sumidero, el contador de la bomba está cubierto de gotas y dos mozos recuerdan haber trabajado con Mateo mientras entraba agua de lluvia.',
      'El libro de carbón cuenta otra historia. Las existencias pesan menos de lo anotado y varias firmas parecen repasadas. Mateo protege un secreto, aunque la sala nunca dejó de producir gas durante la penumbra.',
    ],'boiler',[{effect:'discover_clue',target:'c006-cl-presion-gas'},{effect:'discover_clue',target:'c006-cl-carbon'},{effect:'discover_clue',target:'c006-cl-bomba'}]),
    node('utileria','scene','Registrar el gabinete de utilería','Antiguo gabinete de música',[
      'Detrás de las cortinas se apilan trompetas, poleas, cabezas de yeso y rollos de gasa. El ramal que alimenta las lámparas del salón atraviesa el gabinete antes de cruzar la pared; un mecanismo de relojería continúa sujeto a su válvula real y su cordón se pierde bajo el tabique hacia la mesa de la sesión. En un baúl aparecen una llave de latón aún áspera, papeles del Círculo y una papeleta escondida en el costurero.',
      'La pared comparte moldura con la biblioteca. Una trompeta acústica sale de ella a la altura del hombro; alrededor de la boquilla falta el polvo que cubre el resto del aparato.',
    ],'props',[{effect:'discover_clue',target:'c006-cl-reloj-gas'},{effect:'discover_clue',target:'c006-cl-llave-copia'},{effect:'discover_clue',target:'c006-cl-registro-circulo'},{effect:'discover_clue',target:'c006-cl-papeleta'},{effect:'discover_clue',target:'c006-cl-trompeta'}]),
    node('amalia','interrogation','Interrogar a Amalia Voss','Salón espiritista',[
      'Amalia no niega los artificios. Dice que el público necesita una forma visible para concentrarse y enumera sin pudor sus gasas y trompetas. Asegura, sin embargo, que durante la penumbra permaneció sentada: Clara sostuvo su mano derecha, la directora la izquierda y el ritual imponía silencio absoluto.',
      'Presenta el Círculo como una institución ajena que recibiría los bienes para abrir un sanatorio. Al preguntarle por el baúl, afirma que cualquier huésped pudo colocar allí una llave o papeles durante el día.',
    ],'amalia',[{effect:'reveal_fact',target:'c006-f-amalia-mesa'},{effect:'reveal_fact',target:'c006-f-amalia-oficio'}]),
    node('clara','interrogation','Interrogar a Clara Valdés','Enfermería',[
      'Clara reconoce los billetes y la amenaza de su abuelo. Pensaba huir a Lisboa después de la apertura del testamento porque estaba convencida de que Augusto la dejaría sin nada. La enfermera confirma que ambas prepararon la medicina de las once y que Clara regresó al salón antes de empezar la sesión.',
      'Durante la penumbra sostuvo con la izquierda la mano enguantada de Amalia. La recuerda fría, rígida y extrañamente pasiva. El notario mantuvo enlazada la derecha de Clara hasta que crecieron las llamas, de modo que ella tampoco pudo abandonar el círculo.',
    ],'clara',[{effect:'reveal_fact',target:'c006-f-clara-herencia'},{effect:'reveal_fact',target:'c006-f-clara-viaje'},{effect:'reveal_fact',target:'c006-f-clara-enfermeria'},{effect:'reveal_fact',target:'c006-f-clara-mano'}]),
    node('mateo','interrogation','Interrogar a Mateo Robles','Cuarto de calderas',[
      'Mateo admite que conoce cada paso de servicio. La red acústica, explica, unía el antiguo gabinete de música con la biblioteca; el gabinete se abre directamente tras la cortina del salón y dos paneles decorativos bastan para entrar en el corredor. Durante la penumbra oyó vibrar el tubo dos veces mientras accionaba la bomba.',
      'Se pone a la defensiva ante el libro de carbón y niega haber tocado el gas del salón. La banda de presión sitúa el regulador después del distribuidor que él vigilaba, no en la caldera.',
    ],'mateo',[{effect:'reveal_fact',target:'c006-f-mateo-pasajes'},{effect:'reveal_fact',target:'c006-f-mateo-gas'},{effect:'reveal_fact',target:'c006-f-mateo-trompeta'}]),
    node('guante','analysis','Abrir el guante de la sesión','Mesa de pruebas',[
      'Las puntadas interiores son recientes. Bajo cada guante aparece una mano de cera con articulaciones de alambre. Una cinta plana une ambos puños por debajo del chal y los mantiene a la distancia de los hombros aunque la silla quede vacía.',
      'Clara y la directora no sostuvieron a Amalia: sostuvieron los dos señuelos. El silencio ritual y la penumbra permitieron que la médium abandonara la silla sin que ninguno de sus vecinos rompiera el círculo.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-guante',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-amalia-guante'}]),
    node('reloj-gas','analysis','Probar el regulador de relojería','Mesa de pruebas',[
      'Al tirar del cordón negro, un gatillo libera el muelle: las mordazas giran sobre la válvula y reducen el paso hasta el caudal mínimo. Las llamas no se extinguen, sino que encogen hasta quedar azules. Noventa y seis segundos después, el mecanismo libera el eje y restaura la presión.',
      'El cordón encaja en el pedal bajo la silla de Amalia y la pintura adherida coincide con el ramal del salón. Pudo dispararlo con el pie después de conocer la muerte. La penumbra le dio un minuto y medio para salir, ejecutar el intercambio y regresar sin llenar la estancia de gas.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-reloj-gas',value:'analyzed'}]),
    node('gas','analysis','Interpretar la banda de presión','Cuarto de calderas',[
      'La curva general de la caldera permanece estable. Sólo el captador situado después de la derivación del salón baja hasta la presión piloto y recupera el caudal ordinario exactamente noventa y seis segundos más tarde.',
      'No fue una avería ni una maniobra desde el horno. El regulador actuó junto al salón, donde el olor a aceite y la pintura marcada señalan la instalación temporal del mecanismo.',
    ],'boiler',[{effect:'advance_clue',target:'c006-cl-presion-gas',value:'analyzed'}]),
    node('gasa','analysis','Examinar la gasa luminosa','Gabinete de utilería',[
      'El polvo verdoso contiene un compuesto fosforescente que almacena luz y brilla durante varios minutos. La botella y la tela explican la figura que algunos huéspedes creyeron ver junto a las cortinas.',
      'El truco pertenece a la sesión preparada y demuestra que lo sobrenatural tenía tramoya. No prueba quién abrió la caja ni forma parte necesaria de la sustitución.',
    ],'props',[{effect:'advance_clue',target:'c006-cl-gasa',value:'analyzed'}]),
    node('plano','analysis','Reconstruir las conducciones de 1898','Archivo del balneario',[
      'Las cotas muestran un pasillo de setenta centímetros oculto tras la biblioteca. Desde el gabinete de música se llega al estante central en veintidós pasos. Una tabla giratoria cierra cada extremo.',
      'La ruta evita pasillos públicos, puertas y ventanas. La cortina del salón oculta la entrada al gabinete, cedido por completo a Amalia para su material; desde allí se alcanza el corredor sin salir a la galería.',
    ],'passage',[{effect:'advance_clue',target:'c006-cl-plano',value:'analyzed'}]),
    node('trompeta','analysis','Examinar la trompeta acústica','Gabinete de utilería',[
      'El polvo se interrumpe alrededor de la boquilla y dentro del tubo hay dos arañazos recientes. Una fibra de terciopelo burdeos permanece prendida en el borde, distinta de los uniformes y cortinas del hotel.',
      'El pabellón tiene anchura suficiente para esconder un pliego enrollado. Un cordel tendido por el mismo tubo alcanza la campanilla de la biblioteca: una vez certificada la muerte, el sonido debía precipitar la apertura de la caja y presentar su contenido como respuesta de los espíritus.',
    ],'passage',[{effect:'advance_clue',target:'c006-cl-trompeta',value:'analyzed'}]),
    node('llave-notario','analysis','Examinar la llave del notario','Mesa de pruebas',[
      'La llave no presenta marcas de haber abierto la caja durante la sesión. En dos dientes, sin embargo, hay cera roja comprimida bajo una capa de polvo anterior a la tormenta.',
      'Durante la recepción, alguien retiró por error el abrigo del perchero común y lo devolvió pocos minutos después. La llave quedó fuera de la vista el tiempo suficiente para obtener el perfil, pero el notario no vio quién se llevó la prenda entre criados y huéspedes.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-llave-notario',value:'analyzed'}]),
    node('llave-copia','analysis','Probar la llave sin pulir','Biblioteca',[
      'La copia gira con resistencia y abre la caja. Las estrías de la lima coinciden con limaduras recogidas en el fondo del baúl, y los huecos guardan restos de la misma cera roja hallada en la llave original.',
      'No fue necesario robar la llave del notario durante la sesión. La duplicación estaba terminada antes de que comenzara la noche y esperaba junto al acceso al corredor.',
    ],'library',[{effect:'advance_clue',target:'c006-cl-llave-copia',value:'analyzed'}]),
    node('sello','analysis','Comparar los sellos de cera','Mesa de pruebas',[
      'Los fragmentos del sello aparecido reproducen el sol central de la notaría, pero omiten dos pequeñas mellas presentes en todas las obleas auténticas del protocolo. Pequeñas burbujas en el relieve demuestran que proceden de un molde de yeso artesanal.',
      'La cera comparte pigmento con la usada para copiar la llave. Documento y acceso proceden de una misma preparación; falta localizar dónde se fabricaron.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-sello',value:'analyzed'}]),
    node('codicilo','analysis','Peritar el testamento aparecido','Biblioteca',[
      'A contraluz aparece la filigrana exclusiva del lote de papel comprado por el balneario dos meses antes. Las firmas del testador y los testigos repiten temblores de cartas conservadas bajo el escritorio. La rúbrica del notario copia la del registro de huéspedes, incluida una mancha de aquella página que el trazo auténtico no tendría.',
      'El texto y la cubierta fueron preparados dentro del hotel. El pliego exterior imitaba el acta, las firmas y el sello del testamento cerrado que el notario recibió sin leer; por eso la falsificación necesitaba ocupar físicamente su lugar dentro de la caja.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-codicilo',value:'analyzed'}]),
    node('registro','analysis','Rastrear el Círculo de la Luz Serena','Biblioteca',[
      'Los estatutos nombran a A. Wendel como administradora única. Una carta antigua de Amalia revela sus apellidos de nacimiento, Voss Wendel, y el camafeo de obsidiana lleva el mismo sol estilizado de la asociación.',
      'El legado no iría a una institución independiente. Quedaría bajo el control directo de Amalia mediante un nombre abreviado que ocultaba su intervención.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-registro-circulo',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-amalia-circulo'}]),
    node('papeleta','analysis','Comprobar la papeleta de empeño','Recepción',[
      'La casa de préstamos confirma por teléfono que retiene parte del gabinete de Amalia y que el lunes venderá el lote si no recibe doce mil pesetas. El hilo del resguardo coincide con una reparación reciente de su vestido.',
      'La donación prometida por Augusto no cubría esa deuda. El testamento aparecido entregaba a la asociación bienes suficientes desde la muerte certificada esa misma noche.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-papeleta',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-amalia-deuda'}]),
    node('medicinas','analysis','Contrastar el registro de medicinas','Enfermería',[
      'Los pesos anotados coinciden con las dosis restantes. La enfermera abrió y cerró cada paquete delante de Clara; el sedante sin usar conserva el sello de farmacia y el médico documentó la neumonía antes de la llegada de la médium.',
      'Clara ocultaba una fuga, pero no intoxicó a Augusto. Durante la penumbra permaneció en el círculo: sostenía el guante derecho de Amalia con una mano y el notario mantuvo su otra mano enlazada.',
    ],'infirmary',[{effect:'advance_clue',target:'c006-cl-medicinas',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-clara-dosis'}]),
    node('carbon','analysis','Cuadrar el libro de carbón','Cuarto de calderas',[
      'Las facturas y el depósito dejan un hueco de dos toneladas. Mateo termina por admitir que las vendió a una serrería y repasó las firmas para conservar el empleo.',
      'El desvío explica su nerviosismo, pero la caldera produjo gas con normalidad. La reducción de luz fue una regulación local en el otro extremo del edificio.',
    ],'boiler',[{effect:'advance_clue',target:'c006-cl-carbon',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-mateo-carbon'}]),
    node('bomba','analysis','Leer el contador de la bomba','Sótano',[
      'Cada vuelta de la manivela avanza una cifra. Entre las 23:38 y las 23:51 el registro conserva una cadencia continua; dos mozos alternaron cubos mientras Mateo sostuvo la válvula de achique.',
      'Desde el sótano podía oír el tubo, pero no alcanzar el salón o la biblioteca en noventa y seis segundos. La tormenta dejó una coartada mecánica y dos testigos.',
    ],'boiler',[{effect:'advance_clue',target:'c006-cl-bomba',value:'analyzed'},{effect:'reveal_fact',target:'c006-f-mateo-bomba'}]),
    node('pasadizo','scene','Abrir el corredor de servicio','Tras la biblioteca',[
      'La moldura cede al presionar dos clavos de latón. El aire del corredor mueve las llamas como una respiración lenta. En el polvo hay una sola ida y vuelta: tacones estrechos, gotas de aceite y fibras burdeos junto a la trompeta. La otra salida abre tras la cortina del salón, dentro del gabinete de Amalia.',
      'Dentro del pabellón de metal aparece un rollo atado con cinta azul. La ruta desemboca detrás del estante central, a menos de un brazo de la caja de hierro. La habitación cerrada tenía una segunda puerta que sólo parecía pared.',
    ],'passage',[{effect:'discover_clue',target:'c006-cl-testamento'}]),
    node('testamento','analysis','Autenticar el testamento recuperado','Mesa de pruebas',[
      'El pliego continúa cerrado. La numeración del acta exterior coincide con el protocolo del notario, la tinta presenta el secado irregular de esa tarde y las dos mellas del sello auténtico aparecen en el lugar exacto.',
      'Al abrirlo ante los testigos, Augusto mantiene a Clara como administradora del balneario y limita la donación al Círculo a una cantidad modesta. El rollo escondido es el testamento cerrado auténtico; el paquete de la caja intentaba suplantar su cadena de custodia.',
    ],'evidence',[{effect:'advance_clue',target:'c006-cl-testamento',value:'analyzed'}]),
    node('confrontar-amalia','interrogation','Confrontar a Amalia con el pasadizo','Salón espiritista',[
      'Se colocan ante Amalia los guantes abiertos, la llave copiada y los estatutos. Mantiene que alguien utilizó su equipo para incriminarla, aunque no explica por qué el mecanismo regula la luz exactamente durante la parte silenciosa de la sesión que ella dirigía.',
      'La fibra burdeos de la trompeta encaja en una pérdida reciente del forro de su manga. Amalia había cerrado el desgarro con cuatro puntadas apresuradas y escondido la reparación bajo el puño. La coincidencia material rompe por primera vez su calma.',
    ],'amalia',[{effect:'reveal_fact',target:'c006-f-amalia-testamento'}]),
    node('confrontar-clara','interrogation','Confrontar a Clara con la herencia','Enfermería',[
      'Clara abre los billetes y admite que iba a marcharse aunque quedara sin dinero. El testamento auténtico la sorprende: Augusto conservó su herencia pese a la amenaza de la tarde.',
      'Repite cómo sostuvo el guante sin alcanzar la muñeca. El notario confirma que mantuvo su otra mano enlazada durante los noventa y seis segundos. Su error sostuvo la coartada de Amalia, pero su propia posición y la fibra burdeos la separan del fraude.',
    ],'clara',[{effect:'reveal_fact',target:'c006-f-clara-original'}]),
    node('confrontar-mateo','interrogation','Confrontar a Mateo con el mecanismo','Cuarto de calderas',[
      'Mateo compara el regulador con sus herramientas. Los resortes pertenecen a una caja musical y los tornillos tienen cabeza teatral, piezas que no usa el taller. Reconoce haber reparado un mecanismo semejante para Amalia una semana antes, sin saber dónde lo colocaría.',
      'Entrega el dinero del carbón y acepta responder por el desvío. El contador lo mantiene en el sótano; su conocimiento permite entender la ruta, pero su equipo no fabricó el regulador.',
    ],'mateo',[{effect:'reveal_fact',target:'c006-f-mateo-herramienta'}]),
    node('reconstruccion','analysis','Ordenar los noventa y seis segundos','Biblioteca',[
      'La banda de gas fija el comienzo y el final sin extinguir las llamas. Los dos guantes explican cómo una silla ocupada dejó de estarlo; el plano y la trompeta convierten paredes cerradas en una ruta; las dos llaves y los dos sellos separan originales de copias.',
      'La medicina, el carbón y los billetes revelan secretos distintos. Corresponde decidir cuáles sostienen el intercambio, quién recibía realmente la herencia y qué pruebas sólo explican por qué los demás mintieron.',
      'La reconstrucción está completa. El nombre, el motivo y el método siguen siendo responsabilidad de su acusación.',
    ],'reconstruction'),
  ],
  options:[
    option('salon','salon','Examinar el salón de la sesión','El balneario'),
    option('biblioteca','biblioteca','Registrar la biblioteca cerrada','El balneario'),
    option('archivo','archivo','Abrir el archivo de obras','El balneario'),
    option('enfermeria','enfermeria','Revisar la enfermería','El balneario'),
    option('calderas','calderas','Inspeccionar el cuarto de calderas','El balneario'),
    option('utileria','utileria','Registrar el gabinete de utilería','El balneario'),
    option('amalia','amalia','Interrogar a Amalia Voss','Testimonios'),
    option('clara','clara','Interrogar a Clara Valdés','Testimonios'),
    option('mateo','mateo','Interrogar a Mateo Robles','Testimonios'),
    option('guante','guante','Abrir los guantes de la sesión','La sesión',[{requirement:'clue',target:'c006-cl-guante'},{requirement:'fact',target:'c006-f-clara-mano'}]),
    option('reloj-gas','reloj-gas','Probar el regulador de relojería','La sesión',[{requirement:'clue',target:'c006-cl-reloj-gas'},{requirement:'node',target:'c006-n-salon'}]),
    option('gas','gas','Interpretar la banda de presión','La sesión',[{requirement:'clue',target:'c006-cl-presion-gas'},{requirement:'fact',target:'c006-f-mateo-gas'}]),
    option('gasa','gasa','Examinar la gasa luminosa','Comprobaciones',[{requirement:'clue',target:'c006-cl-gasa'},{requirement:'fact',target:'c006-f-amalia-oficio'}]),
    option('plano','plano','Reconstruir las conducciones de 1898','El paso oculto',[{requirement:'clue',target:'c006-cl-plano'},{requirement:'fact',target:'c006-f-mateo-pasajes'}]),
    option('trompeta','trompeta','Examinar la trompeta acústica','El paso oculto',[{requirement:'clue',target:'c006-cl-trompeta'},{requirement:'fact',target:'c006-f-mateo-trompeta'}]),
    option('llave-notario','llave-notario','Examinar la llave del notario','El documento',[{requirement:'clue',target:'c006-cl-llave-notario'}]),
    option('llave-copia','llave-copia','Probar la llave sin pulir','El documento',[{requirement:'clue',target:'c006-cl-llave-copia'}]),
    option('sello','sello','Comparar los sellos de cera','El documento',[{requirement:'clue',target:'c006-cl-sello'}]),
    option('codicilo','codicilo','Peritar el testamento aparecido','El documento',[{requirement:'clue',target:'c006-cl-codicilo'}]),
    option('registro','registro','Rastrear el Círculo de la Luz Serena','El móvil',[{requirement:'clue',target:'c006-cl-registro-circulo'},{requirement:'node',target:'c006-n-amalia'}]),
    option('papeleta','papeleta','Comprobar la papeleta de empeño','El móvil',[{requirement:'clue',target:'c006-cl-papeleta'}]),
    option('medicinas','medicinas','Contrastar el registro de medicinas','Comprobaciones',[{requirement:'clue',target:'c006-cl-medicinas'},{requirement:'node',target:'c006-n-clara'}]),
    option('carbon','carbon','Cuadrar el libro de carbón','Comprobaciones',[{requirement:'clue',target:'c006-cl-carbon'},{requirement:'node',target:'c006-n-mateo'}]),
    option('bomba','bomba','Leer el contador de la bomba','Comprobaciones',[{requirement:'clue',target:'c006-cl-bomba'},{requirement:'node',target:'c006-n-mateo'}]),
    option('pasadizo','pasadizo','Abrir el corredor de servicio','El paso oculto',[{requirement:'clue_state',target:'c006-cl-plano',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-trompeta',value:'analyzed'}]),
    option('testamento','testamento','Autenticar el testamento recuperado','El documento',[{requirement:'clue',target:'c006-cl-testamento'}]),
    option('confrontar-amalia','confrontar-amalia','Confrontar a Amalia con el pasadizo','Confrontaciones',[{requirement:'node',target:'c006-n-amalia'},{requirement:'clue_state',target:'c006-cl-guante',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-testamento',value:'analyzed'}]),
    option('confrontar-clara','confrontar-clara','Confrontar a Clara con la herencia','Confrontaciones',[{requirement:'node',target:'c006-n-clara'},{requirement:'clue_state',target:'c006-cl-medicinas',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-testamento',value:'analyzed'}]),
    option('confrontar-mateo','confrontar-mateo','Confrontar a Mateo con el mecanismo','Confrontaciones',[{requirement:'node',target:'c006-n-mateo'},{requirement:'clue_state',target:'c006-cl-reloj-gas',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-bomba',value:'analyzed'}]),
    option('reconstruccion','reconstruccion','Ordenar los noventa y seis segundos','Conclusiones',[{requirement:'clue_state',target:'c006-cl-guante',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-plano',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-testamento',value:'analyzed'},{requirement:'clue_state',target:'c006-cl-registro-circulo',value:'analyzed'}]),
  ],
  motives:[
    {id:'c006-m-herencia',label:'Controlar la herencia a través de una asociación propia y pagar sus deudas'},
    {id:'c006-m-fuga',label:'Conservar la herencia antes de huir del balneario'},
    {id:'c006-m-carbon',label:'Evitar que Augusto descubriera el desvío de combustible'},
    {id:'c006-m-prestigio',label:'Convertir una sesión fallida en un fenómeno famoso'},
    {id:'c006-m-venganza',label:'Castigar a Augusto por retirar una donación prometida'},
  ],
  methods:[
    {id:'c006-met-pasadizo',label:'Usó dos manos falsas, reguló la luz y cruzó el pasadizo para sustituir el testamento'},
    {id:'c006-met-veneno',label:'Drogó a Augusto y obligó al notario a abrir la caja durante la penumbra'},
    {id:'c006-met-caldera',label:'Redujo el gas desde las calderas y entró por la puerta con una llave maestra'},
    {id:'c006-met-ventana',label:'Accedió desde el exterior por la ventana de la biblioteca'},
    {id:'c006-met-complice',label:'Proyectó una aparición mientras un cómplice escondido cambiaba el documento'},
  ],
  solution:{
    culprit:'c006-s-amalia',motive:'c006-m-herencia',method:'c006-met-pasadizo',
    evidence:['c006-cl-guante','c006-cl-reloj-gas','c006-cl-presion-gas','c006-cl-plano','c006-cl-trompeta','c006-cl-llave-notario','c006-cl-llave-copia','c006-cl-sello','c006-cl-codicilo','c006-cl-testamento','c006-cl-registro-circulo','c006-cl-papeleta'],
    evidenceGroups:[
      {label:'Abandonó la mesa durante la penumbra',importance:'essential',alternatives:[{clueId:'c006-cl-guante',stateKey:'analyzed'},{clueId:'c006-cl-reloj-gas',stateKey:'analyzed'},{clueId:'c006-cl-presion-gas',stateKey:'analyzed'}]},
      {label:'Utilizó una ruta oculta',importance:'essential',alternatives:[{clueId:'c006-cl-plano',stateKey:'analyzed'},{clueId:'c006-cl-trompeta',stateKey:'analyzed'}]},
      {label:'Preparó y ejecutó la sustitución',importance:'essential',alternatives:[{clueId:'c006-cl-llave-notario',stateKey:'analyzed'},{clueId:'c006-cl-llave-copia',stateKey:'analyzed'},{clueId:'c006-cl-sello',stateKey:'analyzed'},{clueId:'c006-cl-codicilo',stateKey:'analyzed'},{clueId:'c006-cl-testamento',stateKey:'analyzed'}]},
      {label:'Controlaba el beneficiario y necesitaba el dinero',importance:'complementary',alternatives:[{clueId:'c006-cl-registro-circulo',stateKey:'analyzed'},{clueId:'c006-cl-papeleta',stateKey:'analyzed'}]},
    ],
    accusationRequirements:[
      {requirement:'node',target:'c006-n-pasadizo'},{requirement:'node',target:'c006-n-testamento'},
      {requirement:'node',target:'c006-n-amalia'},{requirement:'node',target:'c006-n-clara'},{requirement:'node',target:'c006-n-mateo'},
    ],
    explanation:body(
      'Amalia Voss preparó el fraude antes de la sesión. Tomó una impresión de la llave del notario, fabricó una copia y reprodujo el pliego exterior del testamento cerrado sobre papel del hotel. Calcó las firmas y obtuvo el sello falso de un molde de yeso guardado entre su utilería. El Círculo de la Luz Serena estaba administrado por ella bajo el alias A. Wendel, y el vencimiento de su empeño le daba una urgencia inmediata ante la muerte inminente de Augusto.',
      'Cuando el criado anunció la muerte a las 23:43, Amalia propuso completar un pasaje con silencio y los ojos cerrados; Clara y el capellán aceptaron. Con el pie accionó el pedal unido al regulador, dejó a Clara y a la directora sujetando las dos manos de cera ocultas bajo el chal y cruzó, tras la cortina, el gabinete y el corredor. Abrió la caja con la copia, sustituyó el pliego lacrado, escondió el original dentro de la trompeta y tiró de la campanilla para presionar al notario a una apertura provisional como supuesto mensaje sobrenatural antes de regresar en noventa y seis segundos.',
      'Clara ocultaba su fuga, pero el documento auténtico mantenía su herencia; el notario sostuvo su otra mano durante la penumbra y el registro médico descarta una intoxicación. Mateo había vendido carbón, aunque la bomba lo retuvo en el sótano y la banda demuestra que la regulación fue local. La habitación no estaba encantada: respiraba por una conducción olvidada.',
    ),
    epitaph:'La habitación respiraba. La mentira necesitó contener el aliento.',
  },
};
