import { useState } from 'react'
import type { ChangeEvent, JSX } from 'react'
import { CountryGrid } from './components/organisms/CountryGrid'
import { Header } from './components/organisms/Header'
import { SiteHeader } from './components/organisms/SiteHeader'
import { countriesDemo } from './data/countries-demo'
import type { Country } from './types/country'
import { filterCountries } from './utils/filter'

export default function App(): JSX.Element {
  const [query, setQuery] = useState<string>('')
  const [region, setRegion] = useState<string>('')

  // Resultado derivado: se recalcula en cada render a partir de la colección original.
  const filteredCountries: Country[] = filterCountries(countriesDemo, query, region)
  const hasFilters: boolean = query.trim() !== '' || region !== ''

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value)
  }

  function handleRegionChange(event: ChangeEvent<HTMLSelectElement>): void {
    setRegion(event.currentTarget.value)
  }

  function handleClearFilters(): void {
    setQuery('')
    setRegion('')
  }

  function handleSelect(code: string): void {
    // Comprobación temporal: el detalle se conectará con el enrutamiento.
    console.log('País seleccionado:', code)
  }

  const emptyMessage: string =
    query.trim() !== ''
      ? `No se encontraron países que coincidan con "${query.trim()}"${region !== '' ? ' en la región seleccionada' : ''}.`
      : 'No se encontraron países en la región seleccionada.'

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main id="inicio" className="mx-auto w-full max-w-6xl flex-1 px-md py-lg sm:px-lg">
        <Header title="Explora países del mundo">
          <p>Busca un país o filtra por región para consultar su información.</p>
        </Header>

        <section
          aria-label="Filtros de países"
          className="mb-lg grid gap-md sm:grid-cols-[1fr_14rem] sm:items-end"
        >
          <div>
            <label
              htmlFor="country-search"
              className="mb-xs block text-sm font-semibold text-text-primary dark:text-text-primary-dark"
            >
              Buscar país
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="pointer-events-none absolute left-md top-1/2 h-5 w-5 -translate-y-1/2 text-primary dark:text-text-secondary-dark"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" strokeLinecap="round" />
              </svg>
              <input
                id="country-search"
                name="country-search"
                type="search"
                autoComplete="off"
                placeholder="Escribe el nombre de un país"
                value={query}
                onChange={handleQueryChange}
                className="w-full rounded-full border border-border bg-surface py-md pl-12 pr-md font-semibold text-text-primary shadow-sm outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-text-secondary hover:border-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-border-dark dark:bg-surface-dark dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark"
              />
            </div>
          </div>

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
              value={region}
              onChange={handleRegionChange}
              className="min-h-11 w-full rounded-2xl border border-border bg-primary px-lg py-sm font-semibold text-white outline-none transition-all duration-150 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-border-dark"
            >
              <option value="">Todas las regiones</option>
              <option value="Africa">África</option>
              <option value="Americas">América</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>
          </div>
        </section>

        <section id="paises" aria-labelledby="countries-title">
          <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
            <h2
              id="countries-title"
              className="font-display text-2xl text-text-primary dark:text-text-primary-dark"
            >
              Explorar países
            </h2>
            <div className="flex items-center gap-md">
              <p aria-live="polite" className="text-sm text-text-secondary dark:text-text-secondary-dark">
                Mostrando {filteredCountries.length} de {countriesDemo.length}{' '}
                {countriesDemo.length === 1 ? 'país' : 'países'}
              </p>
              {hasFilters && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-full border border-primary px-md py-xs text-sm font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-text-secondary-dark dark:text-text-primary-dark dark:hover:bg-primary"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>

          {filteredCountries.length > 0 ? (
            <CountryGrid countries={filteredCountries} onSelect={handleSelect} />
          ) : (
            <p
              role="status"
              className="rounded-2xl border border-border bg-surface px-md py-lg text-center text-text-secondary dark:border-border-dark dark:bg-surface-dark dark:text-text-secondary-dark"
            >
              {emptyMessage} Prueba con otro nombre o región, o limpia los filtros.
            </p>
          )}
        </section>
      </main>

      <footer
        id="acerca-de"
        className="border-t border-border px-md py-lg text-center text-sm text-text-secondary dark:border-border-dark dark:text-text-secondary-dark"
      >
        <h2 className="font-display text-xl text-text-primary dark:text-text-primary-dark">Acerca de</h2>
        <p className="mx-auto mt-xs max-w-2xl">
          Explorer App es un proyecto académico para explorar información básica de países, migrado de
          Vanilla TypeScript a React. Datos de demostración basados en REST Countries.
        </p>
        <p className="mt-sm">Explorer App — Javier Barahona</p>
      </footer>
    </div>
  )
}
