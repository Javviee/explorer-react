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
  names: { common: 'Costa Rica' },
  codes: { alpha_2: 'CR' },
  capitals: [{ name: 'San José' }],
  flag: {
    description:
      'The flag of Costa Rica is composed of five horizontal bands of blue, white, red, white and blue. The central red band is twice the height of the other four bands and bears the national coat of arms within a white oval offset towards the hoist side.',
    emoji: '🇨🇷',
    url_png: 'https://flags.restcountries.com/v5/w640/cr.png',
  },
  region: 'Americas',
  population: 5160700,
}

export const paisTres: Country = {
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

export const countriesDemo: Country[] = [paisUno, paisDos, paisTres]
