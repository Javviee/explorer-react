import type { Country } from '../types/country'

export const paisUno: Country = {
  names: { common: 'El Salvador' },
  codes: { alpha_2: 'SV' },
  capitals: [{ name: 'San Salvador' }],
  flag: {
    description:
      'The flag of El Salvador is composed of three equal horizontal bands of cobalt blue, white and cobalt blue, with the national coat of arms centered in the white band.',
    emoji: '🇸🇻',
    url_png: 'https://flags.restcountries.com/v5/w640/sv.png',
  },
  region: 'Americas',
  population: 6029976,
}

export const paisDos: Country = {
  names: { common: 'Japan' },
  codes: { alpha_2: 'JP' },
  capitals: [{ name: 'Tokyo' }],
  flag: {
    description: 'The flag of Japan features a crimson-red circle at the center of a white field.',
    emoji: '🇯🇵',
    url_png: 'https://flags.restcountries.com/v5/w640/jp.png',
  },
  region: 'Asia',
  population: 122650000,
}

export const paisTres: Country = {
  names: { common: 'Canada' },
  codes: { alpha_2: 'CA' },
  capitals: [{ name: 'Ottawa' }],
  flag: {
    description:
      'The flag of Canada is composed of a red vertical band on the hoist and fly sides and a central white square that is twice the width of the vertical bands. A large eleven-pointed red maple leaf is centered in the white square.',
    emoji: '🇨🇦',
    url_png: 'https://flags.restcountries.com/v5/w640/ca.png',
  },
  region: 'Americas',
  population: 41798407,
}

export const countriesDemo: Country[] = [paisUno, paisDos, paisTres]
