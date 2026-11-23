import type { Country } from './country'

export interface CountryNativeName {
  common?: string
  official?: string
}

export interface CountryCurrency {
  code: string
  name: string
  symbol?: string
}

export interface CountryLanguage {
  name: string
  native_name?: string
}

// Datos adicionales del mismo JSON; los campos opcionales pueden faltar en algunos territorios.
export interface CountryDetail extends Country {
  names: Country['names'] & {
    native?: Record<string, CountryNativeName>
  }
  subregion?: string
  tlds?: string[]
  currencies?: CountryCurrency[]
  languages?: CountryLanguage[]
  borders?: string[]
}
