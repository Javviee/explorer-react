import type { JSX } from 'react'
import { CountryCard } from './components/CountryCard'
import { paisUno, paisDos, paisTres } from './data/countries-demo'

export default function App(): JSX.Element {
  return (
    <main className="min-h-screen px-md py-lg sm:px-lg">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-lg font-display text-(length:--font-page-title) text-text-primary dark:text-text-primary-dark">
          Explorer App
        </h1>
        <section
          aria-label="Países de ejemplo"
          className="grid grid-cols-1 gap-md sm:grid-cols-2 lg:grid-cols-3"
        >
          <CountryCard country={paisUno} />
          <CountryCard country={paisDos} />
          <CountryCard country={paisTres} />
        </section>
      </div>
    </main>
  )
}
