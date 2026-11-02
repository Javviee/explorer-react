export interface CountryName {
  common: string
}

export interface CountryFlag {
  emoji: string
  description: string
  url_png: string
}

export interface CountryCapital {
  name: string
}

export interface CountryCodes {
  alpha_2: string
}

export interface Country {
  names: CountryName
  codes: CountryCodes
  flag: CountryFlag
  capitals: CountryCapital[]
  population: number
  region: string
}
