import type { JSX } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Flag } from '../components/atoms/Flag'
import { useCountryDetail } from '../hooks/useCountryDetail'
import type {
  CountryCurrency,
  CountryDetail,
  CountryLanguage,
  CountryNativeName,
} from '../types/country-detail'
import { getCountryRouteCode } from '../utils/country-codes'
import { formatPopulation, getCapital, getFlagDescription } from '../utils/format'
import { getRegionLabel } from '../utils/regions'

interface CountryRouteParams {
  code: string
}

interface CountryDetailContentProps {
  country: CountryDetail
}

const NOT_AVAILABLE: string = 'No disponible'

const FOCUS_OUTLINE: string =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary dark:focus-visible:outline-white'

function DataItem({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <dt className="inline font-bold text-text-primary dark:text-text-primary-dark">{label}: </dt>
      <dd className="inline wrap-break-word">{value}</dd>
    </div>
  )
}

function CountryDetailContent({ country }: CountryDetailContentProps): JSX.Element {
  const nativeName: string =
    Object.values(country.names.native ?? {})
      .map((name: CountryNativeName): string => name.official || name.common || '')
      .find((name: string): boolean => name.length > 0) ?? country.names.common
  const domains: string = country.tlds?.join(', ') || NOT_AVAILABLE
  const currencies: string =
    country.currencies?.map((currency: CountryCurrency): string => currency.name).join(', ') ||
    NOT_AVAILABLE
  const languages: string =
    country.languages?.map((language: CountryLanguage): string => language.name).join(', ') ||
    NOT_AVAILABLE
  const borders: string[] = country.borders ?? []

  return (
    <article className="mt-12 grid items-center gap-10 text-text-secondary lg:mt-16 lg:grid-cols-2 lg:gap-16 dark:text-text-secondary-dark">
      {/* La bandera conserva su proporción y se muestra completa. */}
      <Flag
        src={country.flag.url_svg}
        alt={getFlagDescription(country)}
        className="aspect-3/2 w-full rounded-lg bg-surface object-contain shadow-sm dark:bg-surface-dark"
      />

      <div className="min-w-0">
        <h1 className="font-display text-3xl text-text-primary sm:text-4xl dark:text-text-primary-dark">
          {country.names.common}
        </h1>

        <div className="mt-8 grid gap-8 text-sm leading-6 sm:grid-cols-2">
          <dl className="space-y-2">
            <DataItem label="Nombre nativo" value={nativeName} />
            <DataItem label="Población" value={formatPopulation(country.population)} />
            <DataItem label="Región" value={getRegionLabel(country.region)} />
            <DataItem label="Subregión" value={country.subregion || NOT_AVAILABLE} />
            <DataItem label="Capital" value={getCapital(country)} />
          </dl>

          <dl className="space-y-2">
            <DataItem label="Dominio" value={domains} />
            <DataItem label="Moneda" value={currencies} />
            <DataItem label="Idiomas" value={languages} />
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <h2 className="text-sm font-semibold text-text-primary dark:text-text-primary-dark">
            Países fronterizos:
          </h2>
          {borders.length === 0 ? (
            <p className="text-sm">Sin fronteras terrestres.</p>
          ) : (
            borders.map((border: string): JSX.Element => {
              // Se mantiene la etiqueta de tres letras y se adapta el destino a dos letras.
              const routeCode: string | undefined = getCountryRouteCode(border)

              return routeCode ? (
                <Link
                  key={border}
                  to={`/country/${encodeURIComponent(routeCode)}`}
                  aria-label={`Ver país fronterizo ${border}`}
                  className={`inline-flex min-h-11 min-w-16 items-center justify-center rounded-lg border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-primary shadow-sm transition-colors hover:bg-background dark:border-border-dark dark:bg-surface-dark dark:text-text-primary-dark dark:hover:bg-border-dark ${FOCUS_OUTLINE}`}
                >
                  {border}
                </Link>
              ) : (
                <span key={border} className="rounded-lg border border-border px-4 py-2 text-sm dark:border-border-dark">
                  {border} (no disponible)
                </span>
              )
            })
          )}
        </div>
      </div>
    </article>
  )
}

export default function CountryDetailPage(): JSX.Element {
  const { code } = useParams<keyof CountryRouteParams>()
  // Los hooks se invocan antes de cualquier renderizado condicional.
  const { state, retry } = useCountryDetail(code)

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-md py-lg sm:px-lg">
      {/* Destino explícito: también funciona al abrir directamente el detalle. */}
      <Link
        to="/"
        className={`inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-8 py-2 font-semibold text-white transition-colors hover:bg-accent/90 ${FOCUS_OUTLINE}`}
      >
        ← Atrás
      </Link>

      {state.status === 'loading' && (
        <p role="status" className="mt-12 text-text-secondary dark:text-text-secondary-dark">
          Cargando información del país...
        </p>
      )}

      {state.status === 'error' && (
        <section className="mt-12 rounded-lg border border-border bg-surface p-6 dark:border-border-dark dark:bg-surface-dark">
          <h1 className="font-display text-2xl text-text-primary dark:text-text-primary-dark">
            No se pudo mostrar el país
          </h1>
          <p role="alert" className="mt-3 text-text-secondary dark:text-text-secondary-dark">
            {state.message}
          </p>
          <button
            type="button"
            onClick={retry}
            className={`mt-5 min-h-11 rounded-full bg-primary px-5 py-2 font-semibold text-white transition-colors hover:bg-primary/90 ${FOCUS_OUTLINE}`}
          >
            Reintentar
          </button>
        </section>
      )}

      {state.status === 'success' && <CountryDetailContent country={state.data} />}
    </main>
  )
}
