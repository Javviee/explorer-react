import type { JSX } from 'react'
import { getRegionLabel } from '../../utils/regions'

interface BadgeProps {
  region: string
}

export function Badge({ region }: BadgeProps): JSX.Element {
  return <span className="text-inherit">{getRegionLabel(region)}</span>
}
