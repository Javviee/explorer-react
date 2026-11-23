import { useEffect } from 'react'
import type { ChangeEvent, JSX } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CountryGrid } from '../components/organisms/CountryGrid'
import { EmptyState, ErrorState, LoadingState } from '../components/organisms/CountryStates'
import { Header } from '../components/organisms/Header'
import { useCountries } from '../hooks/useCountries'
import { useSearch } from '../hooks/useSearch'
import type { Country } from '../types/country'

export default function HomePage(): JSX.Element {
  const navigate = useNavigate()
  const location = useLocation()
  const { state, retry } = useCountries()

  // Mientras no haya datos exitosos, useSearch recibe un arreglo vacío válido.
  const allCountries: Country[] = state.status === 'success' ? state.data : []
  const {
    query,
    debouncedQuery,
    region,
    regions,
    hasFilters,
    visibleCountries,
    setQuery,
    setRegion,
    clearFilters,
  } = useSearch(allCountries)

  // Con React Router el cambio de hash no desplaza la página solo: se hace al llegar a /#paises.
  useEffect(() => {
    if (location.hash === '') return
    document.getElementById(location.hash.slice(1))?.scrollIntoView()
  }, [location.key, location.hash])

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value)
  }

  function handleRegionChange(event: ChangeEvent<HTMLSelectElement>): void {
    setRegion(event.currentTarget.value)
  }

  function handleSelect(code: string): void {
    navigate(`/country/${encodeURIComponent(code)}`)
  }

  let content: JSX.Element
  if (state.status === 'loading') {
    content = <LoadingState />
  } else if (state.status === 'error') {
    content = <ErrorState onRetry={retry} />
  } else if (visibleCountries.length === 0) {
    content = <EmptyState query={debouncedQuery} hasRegion={region !== ''} />
  } else {
    content = <CountryGrid countries={visibleCountries} onSelect={handleSelect} />
  }

  return (
    <main id="inicio" className="mx-auto w-full max-w-6xl flex-1 px-md py-lg sm:px-lg">
      <Header
        title="Explora países del mundo"
        query={query}
        region={region}
        regions={regions}
        onQueryChange={handleQueryChange}
        onRegionChange={handleRegionChange}
      >
        <p>Busca un país o filtra por región para consultar su información.</p>
      </Header>

      <section id="paises" aria-labelledby="countries-title">
        <div className="mb-md flex flex-wrap items-center justify-between gap-sm">
          <h2
            id="countries-title"
            className="font-display text-2xl text-text-primary dark:text-text-primary-dark"
          >
            Explorar países
          </h2>
          <div className="flex items-center gap-md">
            {state.status === 'success' && (
              <p aria-live="polite" className="text-sm text-text-secondary dark:text-text-secondary-dark">
                Mostrando {visibleCountries.length} de {allCountries.length}{' '}
                {allCountries.length === 1 ? 'país' : 'países'}
              </p>
            )}
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-primary px-md py-xs text-sm font-semibold text-primary transition-all duration-150 hover:bg-primary hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:border-text-secondary-dark dark:text-text-primary-dark dark:hover:bg-primary"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {content}
      </section>
    </main>
  )
}
