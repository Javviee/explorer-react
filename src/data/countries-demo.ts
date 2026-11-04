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

export const paisCuatro: Country = {
  names: { common: 'Costa Rica' },
  codes: { alpha_2: 'CR' },
  capitals: [{ name: 'San José' }],
  flag: {
    description:
      'The flag of Costa Rica features five horizontal bands of blue, white, red, white and blue, with the red band being twice as wide as the others.',
    emoji: '🇨🇷',
    url_png: 'https://flags.restcountries.com/v5/w640/cr.png',
  },
  region: 'Americas',
  population: 5213000,
}

export const paisCinco: Country = {
  names: { common: 'Germany' },
  codes: { alpha_2: 'DE' },
  capitals: [{ name: 'Berlin' }],
  flag: {
    description: 'The flag of Germany consists of three equal horizontal bands of black, red and gold.',
    emoji: '🇩🇪',
    url_png: 'https://flags.restcountries.com/v5/w640/de.png',
  },
  region: 'Europe',
  population: 83280000,
}

export const paisSeis: Country = {
  names: { common: 'France' },
  codes: { alpha_2: 'FR' },
  capitals: [{ name: 'Paris' }],
  flag: {
    description: 'The flag of France consists of three equal vertical bands of blue, white and red.',
    emoji: '🇫🇷',
    url_png: 'https://flags.restcountries.com/v5/w640/fr.png',
  },
  region: 'Europe',
  population: 66548000,
}

export const countriesDemo: Country[] = [paisUno, paisDos, paisTres, paisCuatro, paisCinco, paisSeis]
