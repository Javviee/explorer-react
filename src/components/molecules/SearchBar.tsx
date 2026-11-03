import type { ChangeEvent, JSX } from 'react'

interface SearchBarProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function SearchBar({ value, onChange }: SearchBarProps): JSX.Element {
  return (
    <div>
      <label
        htmlFor="country-search"
        className="mb-xs block text-sm font-semibold text-text-primary dark:text-text-primary-dark"
      >
        Buscar país
      </label>
      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute left-md top-1/2 h-5 w-5 -translate-y-1/2 text-primary dark:text-text-secondary-dark"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        <input
          id="country-search"
          name="country-search"
          type="search"
          autoComplete="off"
          placeholder="Escribe el nombre de un país"
          value={value}
          onChange={onChange}
          className="w-full rounded-full border border-border bg-surface py-md pl-12 pr-md font-semibold text-text-primary shadow-sm outline-none transition-colors duration-200 placeholder:font-normal placeholder:text-text-secondary hover:border-primary/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 dark:border-border-dark dark:bg-surface-dark dark:text-text-primary-dark dark:placeholder:text-text-secondary-dark"
        />
      </div>
    </div>
  )
}
