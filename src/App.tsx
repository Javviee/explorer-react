import type { JSX } from 'react'
import { Route, Routes } from 'react-router-dom'
import { SiteHeader } from './components/organisms/SiteHeader'
import CountryDetailPage from './pages/CountryDetailPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

// App define la estructura común (cabecera y pie) y qué página se muestra en cada ruta.
export default function App(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/country/:code" element={<CountryDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <footer
        id="acerca-de"
        className="bg-secondary px-md py-lg text-center text-sm text-white"
      >
        <h2 className="font-display text-xl">Acerca de</h2>
        <p className="mx-auto mt-xs max-w-2xl">
          Explorer App es un proyecto académico para explorar información básica de países, migrado de
          Vanilla TypeScript a React. Datos de demostración basados en REST Countries.
        </p>
        <p className="mt-sm">Explorer App — Javier Barahona</p>
      </footer>
    </div>
  )
}
