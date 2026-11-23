// Etiqueta visible en español; el valor que se compara con los datos sigue siendo el de la API.
const REGION_LABELS: Readonly<Record<string, string | undefined>> = {
  Africa: 'África',
  Americas: 'América',
  Asia: 'Asia',
  Europe: 'Europa',
  Oceania: 'Oceanía',
  Antarctic: 'Antártida',
}

// Si llega una región desconocida se muestra tal cual, en lugar de ocultarla.
export function getRegionLabel(region: string): string {
  return REGION_LABELS[region] ?? region
}
