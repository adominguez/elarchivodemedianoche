# Arquitectura y puesta en marcha

Documento técnico de la primera iteración: cómo está montado el proyecto y cómo
se levanta. La visión de producto vive en el [README](../README.md).

---

## Puesta en marcha

```bash
pnpm install
cp .env.example .env      # rellena TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, CLOUDINARY_CLOUD_NAME
pnpm db:reset             # aplica el esquema y carga el expediente #001
pnpm dev
```

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo. |
| `pnpm db:migrate` | Aplica `db/schema.sql` sobre Turso (idempotente). |
| `pnpm db:seed` | Valida y vuelca las definiciones de `db/seeds/` en Turso. |
| `pnpm db:reset` | Migrar + sembrar. |
| `pnpm assets [slug]` | Lista los `publicId` que espera un expediente y cuáles faltan en Cloudinary. |
| `pnpm test` | Pruebas del motor de investigación (Node test runner). |
| `pnpm check` | Diagnóstico de tipos de Astro/TypeScript. |
| `pnpm build` | `astro check` + build de servidor. |
| `pnpm start` | Arranca el build de producción. |

### Sin credenciales de Turso

En **desarrollo**, si `TURSO_DATABASE_URL` está vacía, la aplicación abre un
fichero libSQL local en `.data/` con el mismo driver y el mismo SQL, y avisa por
consola. Es un borrador de trabajo, nunca el almacenamiento definitivo.

En **producción**, la ausencia de `TURSO_DATABASE_URL` es un error explícito: el
servidor se niega a arrancar una petición contra un almacenamiento improvisado.

### Imágenes: convención de carpetas

Los `publicId` los construye `caseAssets()` en
[`db/seeds/definition.ts`](../db/seeds/definition.ts), en un solo sitio, para que
cada expediente nuevo herede la convención:

```text
archivos-de-medianoche/{historia}/portada
archivos-de-medianoche/{historia}/escenas/{nombre}
archivos-de-medianoche/{historia}/sospechosos/{nombre}
archivos-de-medianoche/{historia}/pruebas/{nombre}
```

`{historia}` es el slug del expediente (`la-ultima-campanada`), no su id: quien
sube o revisa las imágenes lee nombres, no códigos.

Si `CLOUDINARY_CLOUD_NAME` está vacía, el servicio de imágenes devuelve `null` y
la interfaz pinta marcadores tipográficos de expediente en lugar de huecos. En
cuanto se suben los recursos con esos `publicId`, las imágenes aparecen sin tocar
una línea de código. `pnpm assets` dice cuáles faltan.

---

## Capas

```text
TURSO ──► src/lib/data/      repositorios: el único SQL del proyecto
           │                 (caseRepository, progressRepository)
           ▼
         src/lib/domain/     modelo de dominio + motor de investigación (puro)
           │
           ▼
         src/lib/presentation/  modelos de presentación (view models)
           │
           ▼
         src/components/ + src/pages/   interfaz

CLOUDINARY ──► src/lib/images/cloudinary.ts ──► interfaz
```

Reglas que sostienen la separación:

- Ningún componente importa `@libsql/client` ni escribe SQL.
- Ningún componente construye una URL de Cloudinary: recibe una imagen ya
  resuelta (`src`, `srcSet`, `sizes`) del servicio de imágenes.
- El motor (`src/lib/domain/engine.ts`) es puro: no conoce Turso, ni Astro, ni la
  interfaz. Por eso se prueba en `tests/engine.test.ts` sin levantar nada.
- La interfaz no decide reglas del caso; traduce una petición HTTP en una acción.

### Tres modelos, no uno

| Modelo | Dónde | Para qué |
| --- | --- | --- |
| Persistencia | `db/schema.sql` + mapeo en `src/lib/data/` | Filas, claves, índices. |
| Dominio | `src/lib/domain/types.ts` | Lo que entiende el motor. |
| Presentación | `src/lib/presentation/dossier.ts` | Exactamente lo que pinta la UI. |

El esquema puede evolucionar sin arrastrar a los componentes.

---

## Modelo de datos

Dos mitades que nunca se mezclan.

**Definición del expediente** (contenido editorial, inmutable para el lector):
`cases`, `suspects`, `suspect_facts`, `clues`, `clue_states`, `case_nodes`,
`node_effects`, `node_options`, `option_requirements`, `solution_options`,
`case_solutions`, `solution_evidence`.

**Investigación** (progreso de una lectura): `investigations`,
`investigation_visits`, `investigation_clues`, `investigation_facts`,
`investigation_flags`, `accusations`.

Decisiones que conviene conocer:

- **Las opciones desbloqueadas no se guardan.** Se derivan de lo descubierto
  (pistas, hechos, nodos, banderas) cada vez que se pinta la pantalla. Una sola
  fuente de verdad.
- **El estado de una pista vive en `investigation_clues.state_key`.** Una pista
  descubierta tiene siempre un estado vigente, y evoluciona actualizándolo.
- **`node_options.source_node_id` nulo = acción abierta en todo el expediente.**
  Es lo que hace que la investigación no sea excluyente: elegir una línea nunca
  cierra las demás. Con valor, es una continuación inmediata de ese nodo.
- **Identidad del lector.** Hoy, una cookie anónima (`archivo_lector`) guardada en
  `investigations.reader_key`. La columna `user_id` ya está prevista para cuando
  existan cuentas: no habrá que rediseñar el modelo.

---

## El motor

`src/lib/domain/engine.ts`, funciones puras:

| Función | Responsabilidad |
| --- | --- |
| `openInvestigations` | Acciones abiertas en todo el expediente, con su estado. |
| `nodeContinuations` | Continuaciones inmediatas del nodo que se lee. |
| `canFollow` | Valida una acción entrante antes de aplicarla. |
| `visitNode` | Aplica los efectos de un nodo y devuelve el estado nuevo **y el delta**. |
| `caseProgress` | Avance aproximado de la investigación. |
| `judgeAccusation` | Compara la acusación con la verdad del caso. |

`visitNode` devuelve un delta (`StateChanges`) que sirve para dos cosas a la vez:
lo que se escribe en Turso y lo que se le anuncia al lector. Es idempotente:
releer un nodo no vuelve a "descubrir" nada.

Estados de una acción en pantalla:

- `→` disponible;
- `🔓` desbloqueada por un hallazgo previo;
- `✓` ya recorrida (sigue a la vista, y se puede releer).

---

## Contenido y generación futura

Un expediente se escribe como una **definición** (`db/seeds/definition.ts`), no
como filas. `pnpm db:seed` la valida y la vuelca:

```text
CASE DEFINITION ──► scripts/seed.ts ──► TURSO ──► motor ──► UI
```

`scripts/seed.ts` comprueba antes de escribir que no haya nodos inalcanzables,
efectos que apunten a pistas o hechos inexistentes, estados de pista mal
referenciados ni soluciones huérfanas.

Ese mismo formato es el que deberá emitir el generador por IA. Añadir un
expediente nuevo no requiere tocar ningún componente.

Para las imágenes, el camino previsto es el mismo:

```text
prompt ──► generación ──► Cloudinary ──► publicId ──► TURSO ──► UI
```

---

## Decisiones de implementación

- **`output: 'server'` + adaptador Node.** El expediente se renderiza bajo demanda
  porque depende del progreso del lector.
- **Formularios HTML, no una SPA.** Cada acción de investigación es un `POST` que
  el servidor persiste y vuelve a derivar desde Turso. No hay progreso viviendo
  en el cliente ni dos fuentes de verdad. Funciona sin JavaScript.
- **Una sola isla React** (`AccusationForm`), y sólo para contar evidencias y
  evitar enviar una acusación a medias. Sin JavaScript sigue siendo un
  formulario normal.
- **`astro:env` para las credenciales.** `CLOUDINARY_CLOUD_NAME` se declara como
  `secret` a propósito: en `astro:env` los valores públicos se incrustan al
  compilar y los secretos se leen del entorno en ejecución, que es lo que
  queremos para no rehacer el build al cambiar de cuenta. Nada de esto llega al
  cliente: las URLs se construyen al renderizar.
- **Tipografías autoalojadas** con la API de fuentes de Astro (EB Garamond para
  la narración, Special Elite para la máquina de escribir). Sin peticiones a
  terceros en tiempo de ejecución.


## Revisión editorial de septiembre de 2026

`case_evidence_rules` guarda los grupos de pruebas y sus estados mínimos.
`judgeAccusation` recibe también el progreso: acertar las opciones sin sostener
los grupos produce un resultado parcial. Los estados de pistas son monotónicos.
`pnpm db:update` conserva una copia previa y comprueba el progreso después
de aplicar esta edición; `pnpm assets:upload` publica el manifiesto visual.
La continuidad del primer caso vive en [EXPEDIENTE-001.md](EXPEDIENTE-001.md).
