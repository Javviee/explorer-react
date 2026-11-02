# Explorer React

Migración de **Explorer App** a React: interfaz para explorar información de países, construida con componentes funcionales, props tipadas y composición siguiendo Atomic Design.

Esta es la versión React del proyecto. La versión Vanilla TypeScript se conserva como referencia de la migración: [Explorer-APP---DWA](https://github.com/Javviee/Explorer-APP---DWA) (rama `LAB-2`).

## Estado actual (S25: componentes, props y composición)

- Interfaz organizada en cinco componentes: `Badge` y `Flag` (átomos), `CountryCard` (molécula), `CountryGrid` y `Header` (organismos).
- `App` entrega un arreglo de países a `CountryGrid`, que genera una tarjeta por país con `map()` y una `key` estable.
- La tarjeta comunica la selección al padre con la función prop `onSelect` (por ahora solo registra el código en la consola).
- `Header` recibe un `title` y contenido mediante `children`.
- Diseño adaptable (la rejilla pasa de 1 a 4 columnas; cada tarjeta cambia su interior según su propio ancho), efecto hover y modo oscuro automático según la preferencia del sistema.

Los países son datos locales de demostración (`src/data/countries-demo.ts`); no se conecta la API ni se usa React Router en esta etapa.

## Atomic Design en este proyecto

| Nivel | Componente | Responsabilidad | Props |
|---|---|---|---|
| Átomo | `Badge` | Muestra la región como texto reutilizable. | `region: string` |
| Átomo | `Flag` | Muestra la bandera y usa `placeholder.png` si falla o no hay URL. | `src: string`, `alt: string` |
| Molécula | `CountryCard` | Combina `Flag`, `Badge` y los datos de un país. | `country: Country`, `onSelect: (code: string) => void` |
| Organismo | `CountryGrid` | Recorre un `Country[]` y crea una tarjeta por país. | `countries: Country[]`, `onSelect: (code: string) => void` |
| Organismo | `Header` | Título de la página y contenido de presentación. | `title: string`, `children: ReactNode` |

## Qué hace `CountryGrid` y qué recibe

`CountryGrid` recibe un arreglo `countries: Country[]` y la función `onSelect`. Recorre el arreglo con `map()` y, por cada país, devuelve un `CountryCard` con `key={country.codes.alpha_2}`, el objeto `country` y la misma función `onSelect`. No conoce cuántos países hay ni de dónde vienen: si recibe dos, muestra dos tarjetas; si recibe cuatro, muestra cuatro.

## Seguimiento de la migración

| Elemento | Estado |
|---|---|
| Tipos, utilidades y recursos copiados | Reutilizados (`Country`, `format.ts`, `placeholder.png`); revisar contratos al conectar la fuente completa. |
| Tarjeta, bandera y región | Organizadas como componentes. |
| Listado de países | Preparado para recibir cualquier `Country[]`; comprobado con datos temporales. |
| Cabecera de navegación, menú móvil y pie | Pendiente: el `Header` actual solo presenta título y contenido; falta adaptar la barra de navegación y el menú móvil (necesita estado). |
| Búsqueda, filtro por región y debounce | Pendiente: conectar al estado y a componentes de formulario. |
| Catálogo completo, carga, vacío, error y reintento | Pendiente: conectar mediante el módulo de datos y los efectos de React. |
| Vista inicial de 8 países con catálogo completo para filtrar | Pendiente: distinguir entre todos los países cargados y la lista visible. |
| Detalle y navegación | Pendiente: integrar con el enrutamiento. |
| Tema claro/oscuro | Solo por preferencia del sistema (la versión Vanilla tampoco tenía interruptor). |
| Apariencia equivalente a la versión Vanilla | Pendiente: comparar colores, formas y componentes al terminar la migración. |

Nota: `key` usa `codes.alpha_2`. Al cargar el catálogo completo habrá territorios sin ese código (por ejemplo, Abkhazia), así que entonces se usará un identificador alterno para que la `key` siga siendo única.

## Resultado

Pantalla actual (S25): `Header` y `CountryGrid` con tres tarjetas generadas desde el arreglo `countriesDemo`. La primera tarjeta muestra el foco al navegar con teclado.

![Explorer React con componentes atómicos (S25)](docs/captura-s25.png)

Capturas de la sesión anterior (S24), antes de reorganizar los componentes:

![Explorer React en modo claro](docs/captura-s24-claro.png)

![Explorer React en modo oscuro](docs/captura-s24-oscuro.png)

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
pnpm run lint      # revisa el código con ESLint
```

## Estructura de carpetas

```
explorer-react/
├── index.html
├── public/
│   ├── favicon.svg
│   └── placeholder.png        Imagen de respaldo si una bandera no carga
└── src/
    ├── main.tsx               Monta React e importa el CSS global
    ├── App.tsx                Compone la pantalla: Header + CountryGrid
    ├── index.css              Tailwind + design tokens (@theme) + tipografía fluida
    ├── components/
    │   ├── atoms/
    │   │   ├── Badge.tsx
    │   │   └── Flag.tsx
    │   ├── molecules/
    │   │   └── CountryCard.tsx
    │   └── organisms/
    │       ├── CountryGrid.tsx
    │       └── Header.tsx
    ├── data/
    │   └── countries-demo.ts  Países de demostración y arreglo countriesDemo
    ├── types/
    │   └── country.ts         Interface Country (reutilizada de la versión Vanilla)
    └── utils/
        └── format.ts          formatPopulation, getCapital, getFlagDescription (reutilizadas)
```

## Reutilizado de la versión Vanilla TypeScript

- La interface `Country` (`src/types/country.ts`).
- Las utilidades `formatPopulation`, `getCapital` y `getFlagDescription` (`src/utils/format.ts`), que no dependen del DOM.
- Los design tokens, la tipografía fluida con `clamp()` y las Container Queries de la tarjeta.
- No se reutilizan `escapeHtml` ni los renderers que devuelven strings, porque JSX escapa el contenido automáticamente.
