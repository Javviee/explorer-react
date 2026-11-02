import type { JSX } from 'react'
import type { Country } from '../../types/country'
import { formatPopulation, getCapital, getFlagDescription } from '../../utils/format'
import { Badge } from '../atoms/Badge'
import { Flag } from '../atoms/Flag'

interface CountryCardProps {
  country: Country
  onSelect: (code: string) => void
}

export function CountryCard({ country, onSelect }: CountryCardProps): JSX.Element {
  return (
    <article className="@container group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:border-border-dark dark:bg-surface-dark">
      <div className="flex flex-col @min-[20rem]:flex-row">
        <Flag src={country.flag.url_png} alt={getFlagDescription(country)} />
        <div className="flex min-w-0 flex-1 flex-col gap-xs px-md py-md">
          <h2 className="text-(length:--font-country-name) font-semibold text-text-primary dark:text-text-primary-dark">
            {country.names.common}
          </h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-sm gap-y-xs text-sm">
            <dt className="text-text-secondary dark:text-text-secondary-dark">Capital</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">{getCapital(country)}</dd>
            <dt className="text-text-secondary dark:text-text-secondary-dark">Región</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">
              <Badge region={country.region} />
            </dd>
            <dt className="text-text-secondary dark:text-text-secondary-dark">Población</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">
              {formatPopulation(country.population)}
            </dd>
          </dl>
          <button
            type="button"
            aria-label={`Ver más información de ${country.names.common}`}
            onClick={() => onSelect(country.codes.alpha_2)}
            className="mt-sm flex min-h-11 w-full items-center justify-center rounded-full bg-primary font-semibold text-white transition-all duration-200 hover:bg-primary/90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Ver más
          </button>
        </div>
      </div>
    </article>
  )
}
