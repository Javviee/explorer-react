import type { Country } from '../types/country'

// Estados posibles durante la carga de países: la interfaz decide qué mostrar según `status`.
export type AppState =
  | { status: 'loading' }
  | { status: 'success'; data: Country[] }
  | { status: 'error'; message: string }
