import type { JSX, ReactNode } from 'react'

interface HeaderProps {
  title: string
  children: ReactNode
}

export function Header({ title, children }: HeaderProps): JSX.Element {
  return (
    <header className="mb-lg">
      <h1 className="font-display text-(length:--font-page-title) text-text-primary dark:text-text-primary-dark">
        {title}
      </h1>
      <div className="mt-sm text-text-secondary dark:text-text-secondary-dark">{children}</div>
    </header>
  )
}
