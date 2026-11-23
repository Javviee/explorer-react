import type { Country } from '../types/country'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

// Declarar `Country[]` no garantiza que el JSON lo cumpla: se validan los campos que usa la interfaz.
function isCountry(value: unknown): value is Country {
  if (!isRecord(value)) return false

  const { names, codes, flag, capitals, population, region } = value

  return (
    isRecord(names) &&
    typeof names.common === 'string' &&
    isRecord(codes) &&
    typeof codes.alpha_2 === 'string' &&
    isRecord(flag) &&
    typeof flag.url_svg === 'string' &&
    typeof flag.description === 'string' &&
    Array.isArray(capitals) &&
    typeof population === 'number' &&
    typeof region === 'string'
  )
}

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  const response: Response = await fetch(`${import.meta.env.BASE_URL}data/countries.json`, { signal })

  // fetch no rechaza las respuestas 404 o 500: hay que comprobar response.ok.
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al cargar los países`)
  }

  const data: unknown = await response.json()

  if (!Array.isArray(data) || data.length === 0 || !data.every(isCountry)) {
    throw new Error('El archivo de países está vacío o no tiene el formato esperado')
  }

  return data
}
