import { useEffect, useState } from 'react'
import { fetchCountryByCode } from '../api/countries'
import type { CountryDetail } from '../types/country-detail'

type CountryDetailState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: CountryDetail }

interface DetailRequest {
  code: string
  state: CountryDetailState
}

interface UseCountryDetailResult {
  state: CountryDetailState
  retry: () => void
}

// Consulta el país cuando cambia el código de la ruta y gestiona carga, error y reintento.
export function useCountryDetail(code: string | undefined): UseCountryDetailResult {
  const normalizedCode: string = code?.trim().toUpperCase() ?? ''
  const [attempt, setAttempt] = useState<number>(0)
  const [request, setRequest] = useState<DetailRequest>({
    code: '',
    state: { status: 'loading' },
  })

  useEffect(() => {
    if (!normalizedCode) return

    // Cada ejecución del efecto tiene su propia marca de vigencia.
    let active: boolean = true

    async function loadDetail(): Promise<void> {
      setRequest({ code: normalizedCode, state: { status: 'loading' } })

      try {
        const country: CountryDetail = await fetchCountryByCode(normalizedCode)
        if (active) setRequest({ code: normalizedCode, state: { status: 'success', data: country } })
      } catch (error: unknown) {
        if (active) {
          setRequest({
            code: normalizedCode,
            state: {
              status: 'error',
              message:
                error instanceof Error ? error.message : 'No fue posible cargar el detalle del país.',
            },
          })
        }
      }
    }

    void loadDetail()

    // Descarta respuestas anteriores; no cancela la carga compartida del JSON.
    return () => {
      active = false
    }
  }, [normalizedCode, attempt])

  function retry(): void {
    setAttempt((previous: number): number => previous + 1)
  }

  if (!normalizedCode) {
    return { state: { status: 'error', message: 'No se indicó el código del país.' }, retry }
  }

  // Evita mostrar datos del país anterior antes de que el nuevo efecto se ejecute.
  const state: CountryDetailState = request.code === normalizedCode ? request.state : { status: 'loading' }

  return { state, retry }
}
