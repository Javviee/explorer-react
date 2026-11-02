import type { JSX } from 'react'
import { CountryGrid } from './components/organisms/CountryGrid'
import { Header } from './components/organisms/Header'
import { countriesDemo } from './data/countries-demo'

export default function App(): JSX.Element {
  function handleSelect(code: string): void {
    // Comprobación temporal: el detalle se conectará con el enrutamiento.
    console.log('País seleccionado:', code)
  }

  return (
    <main className="min-h-screen px-md py-lg sm:px-lg">
      <div className="mx-auto max-w-6xl">
        <Header title="Explora países del mundo">
          <p>Explorer App: migración de la interfaz a componentes React.</p>
        </Header>
        <CountryGrid countries={countriesDemo} onSelect={handleSelect} />
      </div>
    </main>
  )
}
