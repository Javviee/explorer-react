import { useEffect, useState } from 'react'
import type { Country } from '../types/country'
import { filterCountries } from '../utils/filter'

const INITIAL_VISIBLE_COUNTRIES: number = 8
const SEARCH_DEBOUNCE_MS: number = 300

interface UseSearchResult {
  query: string
  debouncedQuery: string
  region: string
  regions: string[]
  hasFilters: boolean
  visibleCountries: Country[]
  setQuery: (value: string) => void
  setRegion: (value: string) => void
  clearFilters: () => void
}

// Encapsula la búsqueda: texto, región, debounce y países visibles. No obtiene datos: los recibe.
export function useSearch(countries: Country[]): UseSearchResult {
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [region, setRegion] = useState<string>('')

  // Aplica la búsqueda 300 ms después de la última pulsación.
  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedQuery(query)
    }, SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  function clearFilters(): void {
    setQuery('')
    // Se limpia también el valor con debounce para que el cambio sea inmediato.
    setDebouncedQuery('')
    setRegion('')
  }

  // Valores derivados: se recalculan en cada render, sin estado adicional.
  const regions: string[] = Array.from(
    new Set(countries.map((country: Country): string => country.region)),
  ).sort()
  const hasFilters: boolean = query.trim() !== '' || region !== ''
  const isFiltering: boolean = debouncedQuery.trim() !== '' || region !== ''
  const filtered: Country[] = filterCountries(countries, debouncedQuery, region)
  const visibleCountries: Country[] = isFiltering ? filtered : filtered.slice(0, INITIAL_VISIBLE_COUNTRIES)

  return {
    query,
    debouncedQuery,
    region,
    regions,
    hasFilters,
    visibleCountries,
    setQuery,
    setRegion,
    clearFilters,
  }
}
