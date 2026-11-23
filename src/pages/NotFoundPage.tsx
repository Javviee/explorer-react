import type { JSX } from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage(): JSX.Element {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-md py-lg sm:px-lg">
      <h1 className="font-display text-(length:--font-page-title) text-text-primary dark:text-text-primary-dark">
        Página no encontrada
      </h1>
      <p className="mt-sm text-text-secondary dark:text-text-secondary-dark">
        La dirección que buscas no existe.{' '}
        <Link to="/" className="font-semibold text-primary underline dark:text-text-primary-dark">
          Volver al inicio
        </Link>
      </p>
    </main>
  )
}
