import type { Country } from '../types/country'

export function filterCountries(countries: Country[], query: string, region: string): Country[] {
  const normalizedQuery: string = query.trim().toLowerCase()

  return countries.filter((country: Country): boolean => {
    const matchesName: boolean = country.names.common.toLowerCase().includes(normalizedQuery)
    const matchesRegion: boolean = region === '' || country.region === region

    return matchesName && matchesRegion
  })
}
