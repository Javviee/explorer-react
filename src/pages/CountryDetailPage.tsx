import type { JSX } from 'react'
import { Link, useParams } from 'react-router-dom'

// Página inicial: confirma que se llega al país seleccionado. La consulta y el detalle completo vienen después.
export default function CountryDetailPage(): JSX.Element {
  const { code } = useParams<{ code: string }>()

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-md py-lg sm:px-lg">
      <Link
        to="/"
        className="inline-block rounded-md py-xs font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary dark:text-text-primary-dark"
      >
        ← Volver al listado
      </Link>

      <h1 className="mt-md font-display text-(length:--font-page-title) text-text-primary dark:text-text-primary-dark">
        Detalle del país
      </h1>
      <p className="mt-sm text-text-secondary dark:text-text-secondary-dark">
        Código del país:{' '}
        <strong className="text-text-primary dark:text-text-primary-dark">{code?.toUpperCase()}</strong>
      </p>
    </main>
  )
}
