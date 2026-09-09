# El Archivo de Medianoche

Cuentos de misterio interactivos (estilo Cluedo): el lector va tomando decisiones que revelan o descartan pistas, y al final puede llegar a averiguar al asesino... o no.

Hermano de [historias-interactivas](../historias-interactivas), pero enfocado exclusivamente en este género, para público adulto (18+), y con las historias autoradas por un agente (razonamiento multi-paso, autoverificación de coherencia) en vez de generadas con una sola llamada a la API.

## Estado

Scaffold inicial: Astro + React + Tailwind, sin modelo de datos ni motor de historias todavía. Eso se diseña a medida que se define la mecánica del misterio (pistas, culpable, condición de acierto).

## Comandos

| Comando         | Acción                                      |
| :-------------- | :------------------------------------------- |
| `pnpm install`  | Instala dependencias                          |
| `pnpm dev`      | Servidor de desarrollo en `localhost:4321`    |
| `pnpm build`    | Build de producción a `./dist/`               |
| `pnpm preview`  | Preview del build en local                    |
