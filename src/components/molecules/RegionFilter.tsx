import type { ChangeEvent, JSX } from 'react'

interface RegionFilterProps {
  value: string
  regions: string[]
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

// Etiqueta visible en español; el valor que se compara con los datos sigue siendo el de la API.
const REGION_LABELS: Record<string, string> = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Antarctic: 'Antártida',
}

export function RegionFilter({ value, regions, onChange }: RegionFilterProps): JSX.Element {
  return (
    <div>
      <label
        htmlFor="region-filter"
        className="mb-xs block text-sm font-semibold text-text-primary dark:text-text-primary-dark"
      >
        Filtrar por región
      </label>
      <select
        id="region-filter"
        name="region-filter"
        value={value}
        onChange={onChange}
        className="min-h-11 w-full rounded-2xl border border-border bg-primary px-lg py-sm font-semibold text-white outline-none transition-all duration-150 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-border-dark"
      >
        <option value="">Todas las regiones</option>
        {regions.map((region: string): JSX.Element => (
          <option key={region} value={region}>
            {REGION_LABELS[region] ?? region}
          </option>
        ))}
      </select>
    </div>
  )
}
