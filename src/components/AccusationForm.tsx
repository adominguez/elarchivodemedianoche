import { useState } from 'react';
import type { AccusationFormView } from '@lib/presentation/dossier';

interface Props {
  form: AccusationFormView;
  /** Evidencias que se pueden aportar como máximo. */
  maxEvidence?: number;
}

/**
 * Formulario de acusación.
 *
 * Es una isla mínima: sin JavaScript sigue siendo un formulario que se envía
 * al servidor. El cliente sólo añade el recuento de evidencias y evita enviar
 * una acusación a medias.
 */
export default function AccusationForm({ form, maxEvidence = 5 }: Props) {
  const [culprit, setCulprit] = useState('');
  const [motive, setMotive] = useState('');
  const [method, setMethod] = useState('');
  const [evidence, setEvidence] = useState<string[]>([]);

  const complete = culprit !== '' && motive !== '' && method !== '';

  function toggleEvidence(id: string) {
    setEvidence((current) =>
      current.includes(id)
        ? current.filter((candidate) => candidate !== id)
        : current.length >= maxEvidence
          ? current
          : [...current, id],
    );
  }

  return (
    <form method="post" className="space-y-8">
      <input type="hidden" name="intencion" value="acusar" />

      <fieldset>
        <legend className="typed-sm mb-3 text-gold-400">1 · Culpable</legend>
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {form.suspects.map((suspect) => (
            <li key={suspect.id}>
              <label
                className={`flex h-full cursor-pointer flex-col gap-2 border p-2 transition-colors ${
                  culprit === suspect.id
                    ? 'border-blood-bright bg-blood/20'
                    : 'border-parchment-400/20 hover:border-parchment-400/50'
                }`}
              >
                <input
                  type="radio"
                  name="culpable"
                  value={suspect.id}
                  checked={culprit === suspect.id}
                  onChange={() => setCulprit(suspect.id)}
                  className="sr-only"
                  required
                />
                <span className="photo block">
                  {suspect.thumbSrc ? (
                    <img
                      src={suspect.thumbSrc}
                      alt=""
                      className="aspect-square w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="photo-missing typed aspect-square w-full text-lg">
                      {suspect.initials}
                    </span>
                  )}
                </span>
                <span className="typed-sm text-parchment-100">{suspect.name}</span>
                <span className="typed-sm text-parchment-400">{suspect.role}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <ChoiceList
        step="2"
        legend="Motivo"
        name="motivo"
        options={form.motives}
        selected={motive}
        onSelect={setMotive}
      />

      <ChoiceList
        step="3"
        legend="Método"
        name="metodo"
        options={form.methods}
        selected={method}
        onSelect={setMethod}
      />

      <fieldset>
        <legend className="typed-sm mb-3 text-gold-400">
          4 · Evidencias que sostienen la acusación
          <span className="ml-2 text-parchment-400">
            {evidence.length}/{maxEvidence}
          </span>
        </legend>

        {form.evidence.length === 0 ? (
          <p className="font-narrative italic text-parchment-300/70">
            Todavía no ha incorporado ninguna evidencia al expediente.
          </p>
        ) : (
          <ul className="space-y-1">
            {form.evidence.map((clue) => {
              const checked = evidence.includes(clue.id);
              const full = !checked && evidence.length >= maxEvidence;
              return (
                <li key={clue.id}>
                  <label
                    className={`flex cursor-pointer items-baseline gap-3 border-l-2 py-1.5 pl-3 ${
                      checked
                        ? 'border-gold-500 text-parchment-100'
                        : 'border-transparent text-parchment-300/80'
                    } ${full ? 'opacity-40' : ''}`}
                  >
                    <input
                      type="checkbox"
                      name="evidencia"
                      value={clue.id}
                      checked={checked}
                      disabled={full}
                      onChange={() => toggleEvidence(clue.id)}
                      className="sr-only"
                    />
                    <span className="action-mark" aria-hidden="true">
                      {checked ? '✕' : '·'}
                    </span>
                    <span className="font-narrative">{clue.label}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        )}
      </fieldset>

      <div className="flex flex-wrap items-center gap-4 border-t border-parchment-400/20 pt-5">
        <button
          type="submit"
          disabled={!complete}
          className="stamp stamp-flat border-blood-bright px-5 py-2.5 text-blood-bright transition-colors hover:bg-blood/20 disabled:cursor-not-allowed disabled:opacity-35"
        >
          Formular la acusación
        </button>
        {!complete && (
          <p className="typed-sm text-parchment-400/70">
            Falta culpable, motivo o método.
          </p>
        )}
      </div>
    </form>
  );
}

interface ChoiceListProps {
  step: string;
  legend: string;
  name: string;
  options: Array<{ id: string; label: string }>;
  selected: string;
  onSelect: (id: string) => void;
}

function ChoiceList({ step, legend, name, options, selected, onSelect }: ChoiceListProps) {
  return (
    <fieldset>
      <legend className="typed-sm mb-3 text-gold-400">
        {step} · {legend}
      </legend>
      <ul className="space-y-1">
        {options.map((option) => (
          <li key={option.id}>
            <label
              className={`flex cursor-pointer items-baseline gap-3 border-l-2 py-1.5 pl-3 ${
                selected === option.id
                  ? 'border-gold-500 text-parchment-100'
                  : 'border-transparent text-parchment-300/80'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.id}
                checked={selected === option.id}
                onChange={() => onSelect(option.id)}
                className="sr-only"
                required
              />
              <span className="action-mark" aria-hidden="true">
                {selected === option.id ? '✕' : '·'}
              </span>
              <span className="font-narrative text-lg leading-snug">{option.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}
