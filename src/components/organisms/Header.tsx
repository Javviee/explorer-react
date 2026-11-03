import type { ChangeEvent, JSX, ReactNode } from 'react'
import { RegionFilter } from '../molecules/RegionFilter'
import { SearchBar } from '../molecules/SearchBar'

interface HeaderProps {
  title: string
  children: ReactNode
  query: string
  region: string
  regions: string[]
  onQueryChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRegionChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

// Organiza la presentación y los controles; no guarda estado: solo transmite props y callbacks.
export function Header({
  title,
  children,
  query,
  region,
  regions,
  onQueryChange,
  onRegionChange,
}: HeaderProps): JSX.Element {
  return (
    <header className="mb-lg">
      <h1 className="font-display text-(length:--font-page-title) text-text-primary dark:text-text-primary-dark">
        {title}
      </h1>
      <div className="mt-sm text-text-secondary dark:text-text-secondary-dark">{children}</div>

      <section
        aria-label="Filtros de países"
        className="mt-lg grid gap-md sm:grid-cols-[1fr_14rem] sm:items-end"
      >
        <SearchBar value={query} onChange={onQueryChange} />
        <RegionFilter value={region} regions={regions} onChange={onRegionChange} />
      </section>
    </header>
  )
}
