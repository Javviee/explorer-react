import type { JSX } from 'react'
import type { Country } from '../types/country'
import { formatPopulation, getCapital, getFlagDescription } from '../utils/format'

interface CountryCardProps {
  country: Country
}

export function CountryCard({ country }: CountryCardProps): JSX.Element {
  return (
    <article className="@container group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-border-dark dark:bg-surface-dark">
      <div className="flex flex-col @min-[20rem]:flex-row">
        <img
          src={country.flag.url_png || '/placeholder.png'}
          alt={getFlagDescription(country)}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = '/placeholder.png'
          }}
          className="aspect-3/2 w-full shrink-0 bg-background object-cover transition-transform duration-300 group-hover:scale-105 @min-[20rem]:aspect-auto @min-[20rem]:w-2/5 dark:bg-background-dark"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-xs px-md py-md">
          <h2 className="text-(length:--font-country-name) font-semibold text-text-primary dark:text-text-primary-dark">
            {country.names.common}
          </h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-sm gap-y-xs text-sm">
            <dt className="text-text-secondary dark:text-text-secondary-dark">Capital</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">{getCapital(country)}</dd>
            <dt className="text-text-secondary dark:text-text-secondary-dark">Región</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">{country.region}</dd>
            <dt className="text-text-secondary dark:text-text-secondary-dark">Población</dt>
            <dd className="text-text-primary dark:text-text-primary-dark">
              {formatPopulation(country.population)}
            </dd>
          </dl>
        </div>
      </div>
    </article>
  )
}
