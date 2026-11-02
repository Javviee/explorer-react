# Explorer React

Migración de **Explorer App** a React: interfaz para explorar información de países, construida con componentes funcionales y props tipadas.

Esta es la versión React del proyecto. La versión Vanilla TypeScript se conserva como referencia de la migración: [Explorer-APP---DWA](https://github.com/Javviee/Explorer-APP---DWA) (rama `LAB-2`).

## Estado actual (S24)

- Proyecto base con React 18, Vite, TypeScript y Tailwind CSS v4.
- Componente `CountryCard.tsx` con props tipadas (`CountryCardProps`).
- `App.tsx` reutiliza el mismo componente con tres países de demostración guardados localmente (`src/data/countries-demo.ts`).
- Diseño adaptable (móvil y escritorio), efecto hover y modo oscuro automático según la preferencia del sistema.

Para esta etapa no se conecta la API ni se usa React Router; los datos son locales.

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`), design tokens con `@theme`
- pnpm

## Requisitos

- Node.js 22.12 o posterior
- pnpm

## Cómo ejecutar el proyecto

```bash
git clone https://github.com/Javviee/explorer-react.git
cd explorer-react
pnpm install
pnpm run dev
```

Abre la URL que muestre la terminal (por defecto `http://localhost:5173`).

Otros comandos:

```bash
pnpm run build     # compila para producción (carpeta dist/)
pnpm run preview   # sirve la versión compilada
```

## Estructura de carpetas

```
explorer-react/
├── index.html
├── public/
│   ├── favicon.svg
│   └── placeholder.png      Imagen de respaldo si una bandera no carga
└── src/
    ├── main.tsx             Monta React e importa el CSS global
    ├── App.tsx              Pantalla inicial: usa CountryCard con tres países locales
    ├── index.css            Tailwind + design tokens (@theme) + tipografía fluida
    ├── components/
    │   └── CountryCard.tsx  Tarjeta de país (props tipadas)
    ├── data/
    │   └── countries-demo.ts  Tres países de demostración (paisUno, paisDos, paisTres)
    ├── types/
    │   └── country.ts       Interface Country (reutilizada de la versión Vanilla)
    └── utils/
        └── format.ts        formatPopulation, getCapital, getFlagDescription (reutilizadas)
```

## Qué recibe `CountryCard`

Una sola prop, `country: Country`. `App` entrega el objeto y la tarjeta lo muestra: nombre, bandera, capital, región y población. Las props son de solo lectura.

## Reutilizado de la versión Vanilla TypeScript

- La interface `Country` (`src/types/country.ts`).
- Las utilidades `formatPopulation`, `getCapital` y `getFlagDescription` (`src/utils/format.ts`), que no dependen del DOM.
- Los design tokens, la tipografía fluida con `clamp()` y las Container Queries de la tarjeta.
- No se reutilizan `escapeHtml` ni los renderers que devuelven strings, porque JSX escapa el contenido automáticamente.
