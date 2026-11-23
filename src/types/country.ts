interface CountryName {
  common: string
}

interface CountryFlag {
  description: string
  url_svg: string
}

interface CountryCapital {
  name: string
}

interface CountryCodes {
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
