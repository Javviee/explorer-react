import type { Country } from '../types/country'
import type { CountryDetail } from '../types/country-detail'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isOptionalArrayOf(value: unknown, isItem: (item: unknown) => boolean): boolean {
  return value === undefined || (Array.isArray(value) && value.every(isItem))
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

// Además de lo anterior, comprueba los campos opcionales del detalle cuando están presentes.
function isCountryDetail(value: unknown): value is CountryDetail {
  if (!isCountry(value)) return false

  const { tlds, currencies, languages, borders, subregion } = value as unknown as Record<string, unknown>

  return (
    (subregion === undefined || typeof subregion === 'string') &&
    isOptionalArrayOf(tlds, (item: unknown): boolean => typeof item === 'string') &&
    isOptionalArrayOf(borders, (item: unknown): boolean => typeof item === 'string') &&
    isOptionalArrayOf(currencies, (item: unknown): boolean => isRecord(item) && typeof item.name === 'string') &&
    isOptionalArrayOf(languages, (item: unknown): boolean => isRecord(item) && typeof item.name === 'string')
  )
}

async function requestCountries(signal?: AbortSignal): Promise<CountryDetail[]> {
  const response: Response = await fetch(`${import.meta.env.BASE_URL}data/countries.json`, { signal })

  // fetch no rechaza las respuestas 404 o 500: hay que comprobar response.ok.
  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status} al cargar los países`)
  }

  let data: unknown
  try {
    data = await response.json()
  } catch {
    // Un fallo de lectura (por ejemplo, una página HTML en lugar del JSON) no debe llegar crudo al usuario.
    throw new Error('El archivo de países no tiene un formato JSON válido')
  }

  if (!Array.isArray(data) || data.length === 0 || !data.every(isCountryDetail)) {
    throw new Error('El archivo de países está vacío o no tiene el formato esperado')
  }

  return data
}

// Carga compartida: las consultas por código reutilizan el mismo JSON durante la sesión.
let sharedCountries: Promise<CountryDetail[]> | undefined

function loadSharedCountries(): Promise<CountryDetail[]> {
  if (!sharedCountries) {
    sharedCountries = requestCountries().catch((error: unknown): never => {
      // Si falla, la siguiente consulta (por ejemplo, Reintentar) vuelve a intentarlo.
      sharedCountries = undefined
      throw error
    })
  }

  return sharedCountries
}

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  return requestCountries(signal)
}

export async function fetchCountryByCode(code: string): Promise<CountryDetail> {
  const countries: CountryDetail[] = await loadSharedCountries()
  const normalizedCode: string = code.trim().toUpperCase()
  const country: CountryDetail | undefined = countries.find(
    (item: CountryDetail): boolean => item.codes.alpha_2.toUpperCase() === normalizedCode,
  )

  if (!country) {
    throw new Error(`No se encontró ningún país con el código "${normalizedCode}".`)
  }

  return country
}
