# El Archivo de Medianoche

**El Archivo de Medianoche** es una plataforma web de historias interactivas de misterio, investigación y crimen en la que el lector adopta el papel de investigador.

La experiencia combina la lectura de una historia ramificada con elementos propios de una investigación: sospechosos, pistas, coartadas, contradicciones y decisiones sobre qué investigar.

El objetivo no es crear un videojuego de detectives, sino una **experiencia narrativa interactiva donde leer se sienta como investigar**.

> **El Árbol de las Historias pregunta:** ¿Qué quieres que ocurra ahora?  
> **El Archivo de Medianoche pregunta:** ¿Qué quieres investigar ahora?

---

# Concepto

Cada historia representa un **expediente**.

Al comenzar un expediente, el lector conoce un misterio:

- un asesinato;
- una desaparición;
- un robo;
- un sabotaje;
- un misterio aparentemente imposible;
- u otro suceso que requiera investigación.

Existe una verdad establecida desde el comienzo del caso: qué ocurrió, quién fue responsable, cómo lo hizo y por qué.

El lector deberá reconstruir esa verdad explorando diferentes ramas narrativas.

Durante la investigación podrá:

- visitar lugares;
- examinar escenas;
- interrogar sospechosos;
- descubrir pistas;
- comprobar coartadas;
- detectar contradicciones;
- desbloquear nuevas líneas de investigación;
- formar su propia teoría;
- y finalmente resolver el caso.

---

# Principio fundamental

El proyecto debe continuar siendo principalmente **narrativo**.

No queremos construir un videojuego complejo.

La estructura principal sigue siendo:

**Narración → decisión → narración → decisión → narración**

La diferencia es que las decisiones representan acciones de investigación.

Ejemplos:

- Examinar el despacho.
- Interrogar a Abel.
- Comprobar el registro telefónico.
- Investigar el jardín.
- Preguntar a Vera por la llave.
- Volver a examinar el reloj.

El texto narra qué sucede y qué descubre el investigador.

La interfaz complementa la narración mostrando el estado actual del expediente.

---

# Stack y decisiones técnicas

Las siguientes decisiones forman parte de la arquitectura inicial del proyecto y deben respetarse salvo que exista una razón técnica muy justificada para cambiarlas.

## Base de datos — Turso

La persistencia principal utilizará **Turso**.

Turso almacenará progresivamente:

- expedientes;
- nodos narrativos;
- sospechosos;
- pistas;
- relaciones entre nodos;
- condiciones de desbloqueo;
- soluciones;
- progreso de las investigaciones;
- futuras cuentas de usuario;
- estadísticas de resolución.

La estructura debe estar preparada para evolucionar sin acoplar la UI directamente al esquema de base de datos.

La lógica de dominio debe trabajar con modelos propios.

---

## Imágenes — Cloudinary

Todas las imágenes asociadas a contenido dinámico utilizarán **Cloudinary**.

Ejemplos:

- portadas de expedientes;
- ilustraciones de nodos;
- retratos de sospechosos;
- imágenes de pistas;
- escenarios;
- recursos generados mediante IA.

La base de datos no debe almacenar binarios.

Debe almacenar únicamente la información necesaria para identificar y recuperar cada recurso de Cloudinary, idealmente mediante:

- `publicId`;
- metadata necesaria;
- transformaciones cuando corresponda.

Evitar depender de URLs finales hardcodeadas cuando podamos construirlas a partir del recurso de Cloudinary.

---

# Separación de responsabilidades

Conceptualmente:

```text
TURSO
  │
  ↓
Repositorio / Data layer
  │
  ↓
Dominio
  │
  ↓
Motor de investigación
  │
  ↓
UI
```

Y para imágenes:

```text
CLOUDINARY
    │
    ↓
Image service
    │
    ↓
UI
```

Los componentes de interfaz no deberían realizar consultas SQL ni conocer detalles internos de Turso.

Del mismo modo, los componentes no deberían contener lógica específica para construir manualmente URLs de Cloudinary repartida por toda la aplicación.

---

# Estructura de un caso

Un caso puede contener aproximadamente:

- 4-6 sospechosos;
- 10-20 pistas;
- varias localizaciones;
- interrogatorios;
- coartadas;
- contradicciones;
- pistas falsas;
- pistas esenciales;
- 30-50 nodos narrativos;
- varias líneas de investigación;
- una solución lógica.

Estas cifras son orientativas.

Se prioriza tener **más investigación y más decisiones** frente a nodos excesivamente largos.

---

# Investigación no excluyente

A diferencia de un cuento interactivo tradicional, elegir una línea de investigación no tiene por qué eliminar las demás.

Ejemplo:

```text
¿Qué quieres investigar?

→ Examinar el despacho
→ Interrogar a Abel
→ Visitar el invernadero
```

Después de examinar el despacho:

```text
✓ Examinar el despacho
→ Interrogar a Abel
→ Visitar el invernadero
🔓 Preguntar a Vera por la llave encontrada
```

Internamente utilizamos nodos y relaciones, pero la experiencia debe transmitir la sensación de estar explorando un **expediente**, no simplemente recorriendo un árbol.

---

# El expediente

Mientras avanza la historia, el lector mantiene un expediente con toda la información descubierta.

## Sospechosos

Cada sospechoso tendrá:

- nombre;
- retrato;
- descripción;
- relación con la víctima o el caso;
- información conocida;
- coartada;
- contradicciones descubiertas;
- estado de investigación.

Ejemplo:

```text
ABEL VARELA
Administrador

⚠ Contradicción encontrada
```

El sistema puede mostrar hechos objetivos:

- coartada confirmada;
- coartada incompleta;
- contradicción detectada;
- nueva información.

Pero debe evitar realizar automáticamente las deducciones importantes.

El lector tiene que sacar sus propias conclusiones.

---

# Pistas

Las pistas se descubren durante la narración y pasan a formar parte del expediente.

Ejemplos:

- reloj detenido;
- carta;
- huellas;
- grabación;
- llave;
- registro telefónico.

Cada pista puede contener:

- imagen;
- nombre;
- descripción;
- lugar donde fue encontrada;
- información conocida;
- estado.

Una pista puede evolucionar.

```text
DISCO DE GRAMÓFONO

Encontrado en el salón.
```

Más adelante:

```text
DISCO DE GRAMÓFONO — ANALIZADO

Contiene una grabación de la voz de Esteban.
```

Puede haber:

- pistas esenciales;
- pistas secundarias;
- pistas para descartar sospechosos;
- pistas falsas;
- información contextual.

---

# Desbloqueo de investigación

Las decisiones disponibles pueden depender de lo descubierto anteriormente.

```text
Encontrar carta
       ↓
desbloquea
       ↓
Preguntar a Abel por la carta
```

Esto permite crear investigaciones profundas sin abandonar el sistema narrativo basado en nodos.

---

# Resolver el caso

El lector no necesita descubrir el 100 % del expediente.

Cuando crea que tiene suficientes pruebas puede intentar resolverlo.

La resolución puede solicitar:

### Culpable

¿Quién es responsable?

### Motivo

¿Por qué lo hizo?

### Método

¿Cómo ocurrió?

### Evidencias

¿Qué pistas sostienen la teoría?

No debería bastar con acertar el culpable al azar.

Ejemplo:

```text
CULPABLE
Abel Varela ✓

MOTIVO
Ocultar un desfalco ✓

MÉTODO
Golpeó a Esteban antes de las 22:00 ✓

ENGAÑO
Utilizó una grabación para falsear la hora ✓

EVIDENCIAS
4/5 correctas
```

---

# Resultado

Al resolver un expediente:

```text
EXPEDIENTE #001 — CERRADO

Culpable: correcto
Motivo: correcto
Método: correcto

Pistas descubiertas: 14/18
Investigación completada: 87 %
```

También podrá mostrarse posteriormente la solución completa.

---

# Dirección visual

El Archivo de Medianoche debe tener una identidad propia.

Conceptos:

- expedientes;
- carpetas;
- fotografías;
- documentos;
- anotaciones;
- sellos;
- mapas;
- pruebas;
- fotografías de sospechosos;
- papel envejecido;
- escritorios;
- ambientes nocturnos;
- iluminación cálida;
- estética detectivesca y literaria.

La interfaz no debe convertirse en un dashboard administrativo.

Debe sentirse como **abrir y explorar un expediente dentro de una novela de misterio**.

---

# Generación mediante IA

A largo plazo los expedientes podrán generarse mediante IA.

Antes de generar la narración debe existir una **verdad del caso**.

Conceptualmente:

```text
CASE_TRUTH

victim
culprit
motive
method
real_time_of_crime

timeline

suspects
  knowledge
  secrets
  motives
  alibis
  lies

clues
  essential
  secondary
  red_herrings

logical_solution
```

Esta información constituye el canon del expediente.

La narración nunca debe contradecirlo.

La solución debe poder deducirse utilizando exclusivamente información accesible durante la investigación.

---

# Generación de imágenes

El flujo futuro será aproximadamente:

```text
Generación del expediente
          ↓
Generación de prompts visuales
          ↓
Generación de imágenes mediante IA
          ↓
Cloudinary
          ↓
Guardar publicId / metadata en Turso
          ↓
Mostrar en la aplicación
```

De esta manera la plataforma no queda acoplada a un proveedor concreto de generación de imágenes.

Cloudinary actúa como capa estable de almacenamiento y distribución de recursos visuales.

---

# MVP

La primera versión debe mantenerse deliberadamente pequeña.

No implementar inicialmente:

- chat libre con sospechosos;
- personajes controlados dinámicamente por IA;
- mundos abiertos;
- movimiento por mapas;
- sistemas complejos de inventario;
- multijugador;
- sistemas RPG;
- mecánicas propias de videojuegos.

El MVP debe demostrar únicamente:

> **Leer → investigar → descubrir → sospechar → deducir → acusar**

---

# Primer expediente

El primer prototipo puede inspirarse en la estructura de **La última campanada de Villa Bruma**, utilizado previamente como cuento interactivo en El Árbol de las Historias.

El objetivo inicial es comprobar cómo transformar una historia detectivesca ramificada en un verdadero expediente narrativo.

---

# Visión

El Archivo de Medianoche pretende construir una biblioteca de misterios interactivos donde cada historia sea un nuevo expediente.

El lector no observa cómo otra persona resuelve el misterio.

**El lector investiga.**

Cada decisión abre una nueva línea de investigación.

Cada pista cambia lo que sabemos.

Cada sospechoso puede estar diciendo la verdad, ocultando algo o mintiendo.

Y cuando el lector crea conocer la verdad, deberá demostrarlo.

**El Archivo de Medianoche**

*Todo caso esconde una verdad.*

---

# Estado del proyecto

Primera iteración implementada: un *vertical slice* completo del **Expediente
#001 — La última campanada**, con persistencia en Turso e imágenes servidas por
Cloudinary.

```bash
pnpm install
cp .env.example .env
pnpm db:reset
pnpm dev
```

La arquitectura, el modelo de datos, el motor de investigación y las decisiones
de implementación están documentados en
[`docs/ARQUITECTURA.md`](docs/ARQUITECTURA.md).
