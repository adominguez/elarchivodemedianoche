-- ===========================================================================
-- El Archivo de Medianoche — esquema libSQL / Turso
--
-- Dos mitades bien separadas:
--   1. DEFINICIÓN DEL EXPEDIENTE  → contenido editorial, inmutable para el lector.
--   2. INVESTIGACIÓN              → progreso de una lectura concreta.
--
-- La definición es lo que produce (hoy) el seed y (mañana) el generador por IA.
-- El progreso nunca se mezcla con ella: así un caso nuevo no necesita tocar
-- componentes ni migrar lecturas existentes.
-- ===========================================================================

PRAGMA foreign_keys = ON;

-- ===========================================================================
-- 1. DEFINICIÓN DEL EXPEDIENTE
-- ===========================================================================

CREATE TABLE IF NOT EXISTS cases (
  id              TEXT PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  file_code       TEXT NOT NULL,               -- "#001"
  title           TEXT NOT NULL,
  subtitle        TEXT,
  place           TEXT,                        -- "Villa Bruma, costa norte"
  date_label      TEXT,                        -- "Noche del 3 de noviembre"
  victim_name     TEXT,
  briefing        TEXT NOT NULL,               -- lo que sabe el investigador al abrir el caso
  cover_public_id TEXT,                        -- Cloudinary
  entry_node_id   TEXT NOT NULL,               -- nodo de apertura
  published       INTEGER NOT NULL DEFAULT 1,
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS suspects (
  id                 TEXT PRIMARY KEY,
  case_id            TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  name               TEXT NOT NULL,
  role               TEXT NOT NULL,            -- "Administrador"
  portrait_public_id TEXT,                     -- Cloudinary
  description        TEXT NOT NULL,
  relation           TEXT,                     -- relación con la víctima
  position           INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_suspects_case ON suspects(case_id);

CREATE TABLE IF NOT EXISTS clues (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  kind            TEXT NOT NULL DEFAULT 'secondary',  -- essential|secondary|red_herring|context
  image_public_id TEXT,                                -- Cloudinary
  found_at        TEXT,                                -- "Encontrado en el salón"
  position        INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_clues_case ON clues(case_id);

-- Una pista evoluciona: el primer estado es el del hallazgo, los siguientes
-- se alcanzan investigando (analizarla, contrastarla, etc.).
CREATE TABLE IF NOT EXISTS clue_states (
  id          TEXT PRIMARY KEY,
  case_id     TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  clue_id     TEXT NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
  state_key   TEXT NOT NULL,                   -- 'found', 'analyzed', ...
  label       TEXT NOT NULL,                   -- "DISCO DE GRAMÓFONO — ANALIZADO"
  description TEXT NOT NULL,
  position    INTEGER NOT NULL DEFAULT 0,      -- 0 = estado inicial al descubrirla
  UNIQUE (clue_id, state_key)
);
CREATE INDEX IF NOT EXISTS idx_clue_states_case ON clue_states(case_id);

-- Hechos objetivos sobre un sospechoso. Se muestran tal cual; la deducción
-- la hace el lector, no el sistema.
CREATE TABLE IF NOT EXISTS suspect_facts (
  id         TEXT PRIMARY KEY,
  case_id    TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  suspect_id TEXT NOT NULL REFERENCES suspects(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,                    -- testimony|alibi|contradiction|motive|background
  headline   TEXT NOT NULL,                    -- "Coartada incompleta"
  detail     TEXT NOT NULL,
  position   INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_suspect_facts_case ON suspect_facts(case_id);

-- Un nodo narrativo: lo que el investigador lee al realizar una acción.
CREATE TABLE IF NOT EXISTS case_nodes (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  kind            TEXT NOT NULL DEFAULT 'scene',  -- intro|scene|interrogation|analysis
  title           TEXT NOT NULL,
  location        TEXT,
  body            TEXT NOT NULL,                  -- párrafos separados por línea en blanco
  image_public_id TEXT,                           -- Cloudinary
  image_caption   TEXT
);
CREATE INDEX IF NOT EXISTS idx_case_nodes_case ON case_nodes(case_id);

-- Lo que produce visitar un nodo.
CREATE TABLE IF NOT EXISTS node_effects (
  id       TEXT PRIMARY KEY,
  case_id  TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  node_id  TEXT NOT NULL REFERENCES case_nodes(id) ON DELETE CASCADE,
  effect   TEXT NOT NULL,   -- discover_clue | advance_clue | reveal_fact | set_flag
  target_id TEXT NOT NULL,  -- clue_id | fact_id | nombre del flag
  value    TEXT,            -- state_key (advance_clue) | valor (set_flag)
  position INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_node_effects_node ON node_effects(node_id);

-- Una acción de investigación.
--   source_node_id NULL → la acción está disponible desde el expediente entero
--   (investigación no excluyente: no se pierde al elegir otra rama).
CREATE TABLE IF NOT EXISTS node_options (
  id             TEXT PRIMARY KEY,
  case_id        TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  source_node_id TEXT REFERENCES case_nodes(id) ON DELETE CASCADE,
  target_node_id TEXT NOT NULL REFERENCES case_nodes(id) ON DELETE CASCADE,
  label          TEXT NOT NULL,             -- "Examinar el despacho"
  hint           TEXT,
  line           TEXT,                      -- línea de investigación que agrupa la acción
  repeatable     INTEGER NOT NULL DEFAULT 0,
  position       INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_node_options_case ON node_options(case_id);

-- Condiciones de desbloqueo de una acción.
CREATE TABLE IF NOT EXISTS option_requirements (
  id          TEXT PRIMARY KEY,
  case_id     TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  option_id   TEXT NOT NULL REFERENCES node_options(id) ON DELETE CASCADE,
  requirement TEXT NOT NULL,   -- clue | clue_state | fact | node | flag
  target_id   TEXT NOT NULL,
  value       TEXT             -- state_key (clue_state) | valor esperado (flag)
);
CREATE INDEX IF NOT EXISTS idx_option_requirements_option ON option_requirements(option_id);

-- Alternativas que se ofrecen al acusar (motivo y método).
CREATE TABLE IF NOT EXISTS solution_options (
  id        TEXT PRIMARY KEY,
  case_id   TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL,     -- motive | method
  label     TEXT NOT NULL,
  position  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_solution_options_case ON solution_options(case_id);

-- La verdad del caso.
CREATE TABLE IF NOT EXISTS case_solutions (
  case_id            TEXT PRIMARY KEY REFERENCES cases(id) ON DELETE CASCADE,
  culprit_suspect_id TEXT NOT NULL REFERENCES suspects(id),
  motive_option_id   TEXT NOT NULL REFERENCES solution_options(id),
  method_option_id   TEXT NOT NULL REFERENCES solution_options(id),
  explanation        TEXT NOT NULL,   -- se revela al cerrar el expediente
  epitaph            TEXT
);

-- Pistas que sostienen la acusación correcta.
CREATE TABLE IF NOT EXISTS solution_evidence (
  case_id TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  clue_id TEXT NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
  PRIMARY KEY (case_id, clue_id)
);

-- ===========================================================================
-- 2. INVESTIGACIÓN (progreso)
-- ===========================================================================

-- Una lectura del expediente. Hoy se identifica con una cookie anónima;
-- `user_id` queda reservado para cuando exista autenticación, sin rediseñar.
CREATE TABLE IF NOT EXISTS investigations (
  id              TEXT PRIMARY KEY,
  case_id         TEXT NOT NULL REFERENCES cases(id) ON DELETE CASCADE,
  reader_key      TEXT NOT NULL,
  user_id         TEXT,
  status          TEXT NOT NULL DEFAULT 'open',  -- open | closed
  current_node_id TEXT REFERENCES case_nodes(id),
  started_at      TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at      TEXT NOT NULL DEFAULT (datetime('now')),
  closed_at       TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_investigations_reader
  ON investigations(case_id, reader_key);

CREATE TABLE IF NOT EXISTS investigation_visits (
  investigation_id TEXT NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
  node_id          TEXT NOT NULL REFERENCES case_nodes(id) ON DELETE CASCADE,
  visits           INTEGER NOT NULL DEFAULT 1,
  first_at         TEXT NOT NULL DEFAULT (datetime('now')),
  last_at          TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (investigation_id, node_id)
);

-- El estado de la pista se guarda aquí: una pista descubierta siempre tiene
-- exactamente un estado vigente. No hay segunda fuente de verdad.
CREATE TABLE IF NOT EXISTS investigation_clues (
  investigation_id TEXT NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
  clue_id          TEXT NOT NULL REFERENCES clues(id) ON DELETE CASCADE,
  state_key        TEXT NOT NULL,
  discovered_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (investigation_id, clue_id)
);

CREATE TABLE IF NOT EXISTS investigation_facts (
  investigation_id TEXT NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
  fact_id          TEXT NOT NULL REFERENCES suspect_facts(id) ON DELETE CASCADE,
  discovered_at    TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (investigation_id, fact_id)
);

CREATE TABLE IF NOT EXISTS investigation_flags (
  investigation_id TEXT NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
  flag             TEXT NOT NULL,
  value            TEXT NOT NULL DEFAULT '1',
  PRIMARY KEY (investigation_id, flag)
);

CREATE TABLE IF NOT EXISTS accusations (
  id                 TEXT PRIMARY KEY,
  investigation_id   TEXT NOT NULL REFERENCES investigations(id) ON DELETE CASCADE,
  culprit_suspect_id TEXT NOT NULL,
  motive_option_id   TEXT NOT NULL,
  method_option_id   TEXT NOT NULL,
  evidence_ids       TEXT NOT NULL DEFAULT '[]',   -- JSON array de clue_id
  culprit_correct    INTEGER NOT NULL,
  motive_correct     INTEGER NOT NULL,
  method_correct     INTEGER NOT NULL,
  evidence_hits      INTEGER NOT NULL DEFAULT 0,
  evidence_total     INTEGER NOT NULL DEFAULT 0,
  verdict            TEXT NOT NULL,                -- solved | partial | failed
  created_at         TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_accusations_investigation
  ON accusations(investigation_id);
