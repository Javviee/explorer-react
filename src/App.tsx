import { useEffect, useState } from 'react'
import type { ChangeEvent, JSX } from 'react'
import { fetchCountries } from './api/countries'
import { CountryGrid } from './components/organisms/CountryGrid'
import { EmptyState, ErrorState, LoadingState } from './components/organisms/CountryStates'
import { Header } from './components/organisms/Header'
import { SiteHeader } from './components/organisms/SiteHeader'
import type { Country } from './types/country'
import type { AppState } from './utils/app-state'
import { filterCountries } from './utils/filter'

const INITIAL_VISIBLE_COUNTRIES: number = 8
const SEARCH_DEBOUNCE_MS: number = 300

export default function App(): JSX.Element {
  const [state, setState] = useState<AppState>({ status: 'loading' })
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [region, setRegion] = useState<string>('')
  const [retryCount, setRetryCount] = useState<number>(0)

  // Efecto 1: sincroniza el componente con la fuente de datos al montar y en cada reintento.
  useEffect(() => {
    const controller: AbortController = new AbortController()
    let active: boolean = true

    async function load(): Promise<void> {
      setState({ status: 'loading' })

      try {
        const countries: Country[] = await fetchCountries(controller.signal)
        if (active) setState({ status: 'success', data: countries })
      } catch (error: unknown) {
        // Una solicitud cancelada no es un error de carga: el efecto ya no está vigente.
        if (!active || controller.signal.aborted) return
        console.error('Error al cargar los países:', error)
        setState({ status: 'error', message: 'Verifica tu conexión e inténtalo nuevamente.' })
      }
    }

    void load()

    // Limpieza: cancela la solicitud pendiente cuando el efecto deja de ser vigente.
    return () => {
      active = false
      controller.abort()
    }
  }, [retryCount])

  // Efecto 2: aplica la búsqueda 300 ms después de la última pulsación.
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedQuery(query)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
    setQuery(event.currentTarget.value)
  }

  function handleRegionChange(event: ChangeEvent<HTMLSelectElement>): void {
    setRegion(event.currentTarget.value)
  }

  function handleClearFilters(): void {
    setQuery('')
    // Se limpia también el valor con debounce para que el cambio sea inmediato.
    setDebouncedQuery('')
    setRegion('')
  }

  function handleRetry(): void {
    setRetryCount((previous: number): number => previous + 1)
  }

  function handleSelect(code: string): void {
    // Comprobación temporal: el detalle se conectará con el enrutamiento.
    console.log('País seleccionado:', code)
  }

  const hasFilters: boolean = query.trim() !== '' || region !== ''
  const isFiltering: boolean = debouncedQuery.trim() !== '' || region !== ''

  const allCountries: Country[] = state.status === 'success' ? state.data : []
  // Regiones derivadas de los datos cargados: sin duplicados y en orden alfabético.
  const regions: string[] = Array.from(
    new Set(allCountries.map((country: Country): string => country.region)),
  ).sort()

  // Resultado derivado: no necesita efecto ni estado propio.
  const filteredCountries: Country[] = filterCountries(allCountries, debouncedQuery, region)
  const visibleCountries: Country[] = isFiltering
    ? filteredCountries
    : filteredCountries.slice(0, INITIAL_VISIBLE_COUNTRIES)

  let content: JSX.Element
  if (state.status === 'loading') {
    content = <LoadingState />
  } else if (state.status === 'error') {
    content = <ErrorState onRetry={handleRetry} />
  } else if (visibleCountries.length === 0) {
    content = <EmptyState query={debouncedQuery} hasRegion={region !== ''} />
  } else {
    content = <CountryGrid countries={visibleCountries} onSelect={handleSelect} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

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
                  onClick={handleClearFilters}
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
