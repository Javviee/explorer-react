import { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'

export function SiteHeader(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  // Referencia al botón para devolverle el foco al cerrar el menú con Escape.
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  function handleToggleMenu(): void {
    setIsMenuOpen((previous: boolean): boolean => !previous)
  }

  function handleCloseMenu(): void {
    setIsMenuOpen(false)
  }

  // Escucha el teclado solo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Cierra el menú al cruzar el breakpoint md (768 px) en cualquier dirección.
  useEffect(() => {
    const desktopBreakpoint: MediaQueryList = window.matchMedia('(min-width: 768px)')

    function handleBreakpointChange(): void {
      setIsMenuOpen(false)
    }

    desktopBreakpoint.addEventListener('change', handleBreakpointChange)
    return () => {
      desktopBreakpoint.removeEventListener('change', handleBreakpointChange)
    }
  }, [])

  return (
    <header className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-md py-md sm:px-lg">
        <div className="flex items-center justify-between gap-md">
          <a
            href="#inicio"
            onClick={handleCloseMenu}
            className="font-display text-3xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:text-4xl lg:text-5xl"
          >
            Explorer App
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={handleToggleMenu}
            aria-controls="main-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md transition-all duration-150 hover:bg-white/15 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:hidden"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={isMenuOpen ? 'hidden h-6 w-6' : 'h-6 w-6'}
            >
              <path strokeLinecap="round" strokeWidth="2" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className={isMenuOpen ? 'h-6 w-6' : 'hidden h-6 w-6'}
            >
              <path strokeLinecap="round" strokeWidth="2" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav
          id="main-menu"
          aria-label="Navegación principal"
          className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-white/15 pb-xs pt-sm md:mt-sm md:block md:border-0 md:pb-0 md:pt-0`}
        >
          <ul className="flex flex-col gap-xs md:flex-row md:items-center md:gap-md">
            <li>
              <a
                href="#inicio"
                onClick={handleCloseMenu}
                aria-current="page"
                className="block rounded-md px-sm py-xs font-semibold transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#paises"
                onClick={handleCloseMenu}
                className="block rounded-md px-sm py-xs font-semibold text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explorar países
              </a>
            </li>
            <li>
              <a
                href="#acerca-de"
                onClick={handleCloseMenu}
                className="block rounded-md px-sm py-xs font-semibold text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Acerca de
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
