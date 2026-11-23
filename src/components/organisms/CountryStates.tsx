import type { JSX } from 'react'

const SKELETON_COUNT: number = 8

interface ErrorStateProps {
  onRetry: () => void
}

interface EmptyStateProps {
  query: string
  hasRegion: boolean
}

// Ocho tarjetas esqueleto con la misma cuadrícula que CountryGrid.
export function LoadingState(): JSX.Element {
  return (
    <section
      role="status"
      aria-busy="true"
      aria-label="Cargando países"
      className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: SKELETON_COUNT }, (_: unknown, index: number): JSX.Element => (
        <div
          key={index}
          aria-hidden="true"
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-surface dark:border-border-dark dark:bg-surface-dark"
        >
          <div className="aspect-3/2 bg-border dark:bg-border-dark" />
          <div className="space-y-sm p-md">
            <div className="h-5 w-2/3 rounded bg-border dark:bg-border-dark" />
            <div className="h-4 w-full rounded bg-border dark:bg-border-dark" />
            <div className="h-4 w-4/5 rounded bg-border dark:bg-border-dark" />
            <div className="h-10 w-full rounded-full bg-border dark:bg-border-dark" />
          </div>
        </div>
      ))}
      <span className="sr-only">Cargando países…</span>
    </section>
  )
}

export function ErrorState({ onRetry }: ErrorStateProps): JSX.Element {
  return (
    <div
      role="alert"
      className="rounded-2xl border border-accent px-md py-lg text-center text-text-primary dark:text-text-primary-dark"
    >
      <p className="font-display text-xl">No pudimos cargar los países</p>
      <p className="mt-xs text-text-secondary dark:text-text-secondary-dark">
        Verifica tu conexión e inténtalo nuevamente.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-md rounded-full bg-primary px-lg py-sm font-semibold text-white transition-all duration-150 hover:bg-primary/90 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Reintentar
      </button>
    </div>
  )
}

export function EmptyState({ query, hasRegion }: EmptyStateProps): JSX.Element {
  const trimmedQuery: string = query.trim()
  const message: string =
    trimmedQuery !== ''
      ? `No hay resultados para "${trimmedQuery}"${hasRegion ? ' en la región seleccionada' : ''}.`
      : 'No hay resultados en la región seleccionada.'

  return (
    <p
      role="status"
      className="rounded-2xl border border-border bg-surface px-md py-lg text-center text-text-secondary dark:border-border-dark dark:bg-surface-dark dark:text-text-secondary-dark"
    >
      {message} Prueba con otro nombre o región, o limpia los filtros.
    </p>
  )
}
