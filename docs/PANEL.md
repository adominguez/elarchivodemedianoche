# Dirección del Archivo — panel de telemetría

Panel interno en `/admin` para leer cómo se comportan los lectores y gestionar
el archivo durante una beta. No forma parte de la experiencia pública.

---

## No hay telemetría nueva

Esto es lo importante de entender antes de tocar nada: **no se ha añadido
ninguna tabla, ni ningún registro de eventos, ni ningún rastreo**.

El esquema ya guardaba todo lo necesario como efecto secundario de jugar:

| Tabla | Lo que ya registraba | Lo que responde en el panel |
| --- | --- | --- |
| `investigation_visits` | nodo, nº de visitas, `first_at`, `last_at` | qué escenas se alcanzan y cuáles no ve nadie |
| `investigations` | `current_node_id`, `status`, `difficulty`, fechas | dónde se detiene la gente y cuánto tarda en cerrar |
| `investigation_clues` | pista + estado vigente | qué pruebas se encuentran y cuáles se analizan |
| `accusations` | acusación completa, aciertos y veredicto | a quién señalan cuando fallan |

`src/lib/data/telemetryRepository.ts` son proyecciones de lectura sobre esas
tablas. La única escritura del panel es la gestión: publicar un expediente y
borrar investigaciones.

Consecuencia práctica: **el histórico ya existe**. El panel no empieza a contar
desde que se instala; muestra todo lo que se haya jugado hasta hoy.

---

## Acceso

Una sola llave en el entorno, porque todavía no hay cuentas:

```bash
# .env
ADMIN_TOKEN=<cadena larga y aleatoria>
```

Generar una:

```bash
node -e "console.log(require('crypto').randomBytes(24).toString('base64url'))"
```

Reglas que impone [`src/middleware.ts`](../src/middleware.ts):

- **Sin `ADMIN_TOKEN`, el panel no existe**: `/admin` responde 404, no un
  formulario de acceso. En producción no queremos anunciar que hay una puerta.
- Todo lo que cuelga de `/admin` exige sesión, salvo `/admin/entrar`.
- La cookie (`archivo_direccion`) **no guarda el token**, sino un HMAC derivado
  de él: leerla no da la credencial. Dura 12 horas y es `httpOnly`.
- La comparación es en tiempo constante sobre digest SHA-256, para no filtrar
  la longitud de lo que se teclea.

Cambiar `ADMIN_TOKEN` invalida todas las sesiones abiertas: es la forma de
echar a todo el mundo.

En Vercel, `ADMIN_TOKEN` es una variable de entorno más. Si no se define, el
panel simplemente no existe en producción, que es un valor por defecto seguro.

---

## Pantallas

### `/admin` — resumen

Cifras del archivo entero, actividad de los últimos 14 días y la tabla de
expedientes.

- **Abiertas** son las investigaciones creadas; **empezadas**, las que llegaron
  a leer el primer nodo. La diferencia es gente que entró y se fue sin pulsar
  nada: si es grande, el problema está en la portada, no en el caso.
- **Publicar / Retirar** saca o devuelve un expediente a la portada sin borrar
  nada ni cortar las investigaciones en curso. Es el interruptor para publicar
  un caso a medias sólo a quien tenga el enlace.

### `/admin/expediente/{slug}` — radiografía de un caso

La pantalla que de verdad sirve para corregir un expediente:

- **Recorrido de las diligencias.** Lectores distintos que alcanzaron cada
  nodo. El nodo de entrada marca el 100 %; lo interesante es la caída.
- **Escenas que nadie ha visto.** Contenido escrito que no llega a nadie:
  o la acción que lleva hasta él no se entiende, o su condición de desbloqueo
  es demasiado exigente.
- **Dónde se detienen.** Última diligencia de las investigaciones sin cerrar.
  Un nodo que acumula lectores parados es el mejor candidato a abandono.
- **Pistas**, de la menos encontrada a la más. Una pista falsa que encuentra
  todo el mundo cumple su función; una prueba esencial que casi nadie encuentra
  es un fallo de diseño, y el panel lo marca en rojo arriba del todo, porque
  sin ella la acusación correcta no puede acreditarse.
- **Acusaciones.** Veredictos, a quién señalan, qué motivo y qué método eligen,
  y con qué nivel de dificultad. Si el culpable real concentra casi todas las
  acusaciones, el caso es demasiado evidente; si no lo señala nadie, la cadena
  lógica no llega.

### `/admin/lectores` — lectores e investigaciones

Hoy un «lector» es una cookie anónima (`reader_key`), no una cuenta, y el panel
no aparenta otra cosa: dos navegadores de la misma persona son dos lectores, y
quien borre sus cookies aparece como nuevo. Cuando existan cuentas, estas
consultas agruparán por `investigations.user_id` —la columna ya está prevista—
sin rediseñar nada.

Acciones: borrar una investigación (libera al lector para repetir el caso desde
cero) o borrar un lector entero. Ambas piden confirmación y son irreversibles;
el progreso cae por `ON DELETE CASCADE`.

### `/admin/exportar.json`

Volcado plano de investigaciones, acusaciones y visitas para analizarlo fuera.

---

## Detalles que conviene conocer

- **Las fechas de SQLite son UTC sin zona.** `parseSqlDate` en
  [`src/lib/admin/metrics.ts`](../src/lib/admin/metrics.ts) las marca como tales
  antes de convertirlas: si se pasaran crudas a `new Date`, cada «hace 2 horas»
  saldría desplazado por la zona del navegador. Está cubierto por pruebas.
- **Toda la aritmética del panel es pura y está probada** en
  `tests/admin-metrics.test.ts`. El SQL no se prueba: se verifica leyéndolo
  contra datos reales.
- **Sin librería de gráficas.** Las barras son divisiones con un ancho en
  porcentaje: funcionan sin JavaScript y se imprimen bien.
- **El panel no se indexa** (`noindex, nofollow` en su layout) y usa un layout
  propio: la parte pública no debe parecer un dashboard, pero la trastienda
  puede serlo sin culpa.
- **La única mejora progresiva** es la confirmación de los borrados. Sin
  JavaScript el formulario se envía igual, como el resto del proyecto.
