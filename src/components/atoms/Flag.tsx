import type { JSX, SyntheticEvent } from 'react'

interface FlagProps {
  src: string
  alt: string
}

const FALLBACK_URL = `${import.meta.env.BASE_URL}placeholder.png`

function handleFlagError(event: SyntheticEvent<HTMLImageElement>): void {
  const image = event.currentTarget

  // Evita volver a asignar el respaldo si este también falla.
  if (image.src === new URL(FALLBACK_URL, window.location.href).href) return
  image.src = FALLBACK_URL
}

export function Flag({ src, alt }: FlagProps): JSX.Element {
  return (
    <img
      src={src || FALLBACK_URL}
      alt={alt}
      loading="lazy"
      onError={handleFlagError}
      className="aspect-3/2 w-full shrink-0 bg-background object-cover transition-transform duration-300 group-hover:scale-105 @min-[20rem]:aspect-auto @min-[20rem]:w-2/5 dark:bg-background-dark"
    />
  )
}
