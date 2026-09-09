# Canon y continuidad — La última campanada

Revisión editorial del 9 de septiembre de 2026. Fuente de autoría: `db/seeds/case-001-la-ultima-campanada.ts`. Mantener los IDs al reeditar.

## Cronología del 3 de noviembre de 1972

- 20:45–23:05: Irene atiende un parto en San Román. La comadrona y el registro permiten contrastarlo.
- Hacia las 21:30: cita de Esteban y Abel en el despacho. Discuten por recibos sin contabilizar. Abel agrede a Esteban durante esa visita; no hay prueba que permita fijar el minuto exacto.
- Después: limpia el atizador, arranca páginas y traslada el cuerpo por la escalera de servicio al salón. El botón queda en una salpicadura del despacho. Las huellas no permiten fechar por sí solas los movimientos.
- Hacia las 22:00: Damián fuma en el invernadero. Solo ve luz en el despacho.
- 22:30: Damián se reúne con Vera en la cocina.
- Poco antes de las 23:00: Abel inicia manualmente el disco (dos minutos) y llega por el vestíbulo a la cocina (dieciocho segundos). No existe temporizador. Se queda con ambos mientras suena la voz durante las campanadas.
- Hacia las 23:01–23:03: termina el disco, Vera encuentra el cuerpo y llama al dispensario.
- 23:20: llega Irene por la carretera alta, abierta. El corte afecta al puente de la costa.
- 23:30: llega el investigador por esa misma carretera; la torre da la media.

La falsa hora proporciona a Abel una coartada presencial real para un momento posterior al crimen. El examen médico es provisional y se contrasta con la escena; no aporta certeza de minuto.

## Pruebas y límites

La acusación exige cubrir cuatro grupos con pruebas descubiertas en el estado necesario: vínculo con la agresión (cita y botón contrastados), motivo económico (libro o carta contrastados), lugar/arma (atizador o informe contrastados), y engaño (disco y recorrido verificados). No exige explorar todas las ramas. Se permiten evidencias complementarias sin un límite arbitrario de cinco.

La llave abre el armario de cuentas; no se afirma quién la escondió. El autor del chantaje de Vera queda sin identificar. Los secretos de Vera y Damián no equivalen a coartadas. La solución descansa en pruebas positivas contra Abel.

La síntesis del escritorio es opcional y exige los hallazgos que menciona. Los estados evolucionados no retroceden al releer escenas anteriores.

## Biblia visual

Fotografía cinematográfica realista, grano discreto, roble y nogal oscuros, luces de lámpara ámbar y lluvia azul grisácea. España, 1972; muebles antiguos conservados. Sin tecnología contemporánea ni violencia gráfica.

| Personaje | Continuidad |
| --- | --- |
| Abel | Unos 52 años, rostro alargado, entradas y sienes grises, gafas redondas, traje marrón de tweed de tres piezas, camisa crema, corbata oscura. |
| Vera | Unos 60 años, pelo gris recogido en moño bajo, vestido negro y delantal marfil. |
| Damián | Unos 29 años, pelo oscuro ondulado, bigote fino, chaqueta de pana oliva, camisa crema abierta. |
| Irene | Unos 46 años, melena corta oscura con mechón gris, traje de lana carbón, blusa marfil, carmín burdeos, maletín médico de cuero. |
| Esteban | Cabello gris, chaqueta azul oscuro, camisa crema, pantalón marrón. Cuerpo boca arriba junto a la alfombra; sin detalle gráfico. |

- Casa de granito de dos plantas y torre de reloj, invernadero de hierro y vidrio en el ala este.
- Salón: piano a la izquierda, ventanal a la derecha, alfombra persa roja, gramófono de caja de caoba y bocina **interior**, tapa abierta junto al ventanal.
- Despacho: primera planta, escritorio de nogal, lámpara verde, chimenea de piedra a la izquierda, ventana a la derecha sobre el invernadero.
- Cocina: azulejos crema envejecidos, mesa de madera, radio antigua, pasillo de servicio de baldosa terracota.
- Pruebas documentales: las imágenes son ilustrativas; las transcripciones accesibles del texto son la fuente de los datos. No depender de letras generadas en una imagen para resolver el caso.

Los atlas de personajes, espacios y objetos sirven de referencia para todas las escenas. Las regiones aprobadas se publican como recursos independientes en `archivos-de-medianoche/la-ultima-campanada/{escenas,sospechosos,pruebas}` y `.../portada`.

## Actualización y verificación

1. Conservar copia de la definición remota antes de editar Turso.
2. `pnpm db:migrate` añade `case_evidence_rules` sin eliminar tablas existentes.
3. `pnpm db:seed` actualiza los registros existentes y añade las diligencias nuevas; no reinicia investigaciones ni recalifica cierres históricos.
4. `pnpm assets:upload <manifest.json>` publica los archivos con copia anterior e invalidación de caché.
5. `pnpm test`, `pnpm build` y `pnpm assets la-ultima-campanada`.

Las partidas abiertas conservan sus hallazgos; pueden releer una diligencia para recibir un estado añadido por esta revisión. Los cierres antiguos se conservan como resultados históricos. Para experimentar la nueva investigación completa puede abrirse una lectura nueva.

La subida utiliza la [API oficial de Cloudinary](https://cloudinary.com/documentation/image_upload_api_reference). Las credenciales se leen del entorno y no se guardan en el manifiesto.
