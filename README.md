# Explorer React

Migración de **Explorer App** a React: interfaz para explorar información de países, construida con componentes funcionales, props tipadas y composición siguiendo Atomic Design.

Esta es la versión React del proyecto. La versión Vanilla TypeScript se conserva como referencia de la migración: [Explorer-APP---DWA](https://github.com/Javviee/Explorer-APP---DWA) (rama `LAB-2`).

## Estado actual (S29: useEffect y consumo de datos)

- Los países ya no son datos de demostración en el código: se cargan desde `public/data/countries.json` (254 territorios) con `fetch`, dentro de un `useEffect`. Solo se muestran 8 países destacados mientras no haya filtros; al buscar o filtrar se usa el catálogo completo.
- Servicio tipado `src/api/countries.ts` (`fetchCountries`): comprueba `response.ok`, recibe el JSON como `unknown` y **valida** su estructura antes de devolver `Country[]`. `App` no conoce los detalles de la solicitud.
- Estado de la carga modelado con una unión discriminada (`AppState` en `src/utils/app-state.ts`): `loading`, `success` (con `data`) o `error` (con `message`).
- Estados de interfaz (`CountryStates.tsx`): ocho tarjetas *skeleton* mientras carga, mensaje "No pudimos cargar los países" con botón **Reintentar** si falla, y "No hay resultados" si la búsqueda no coincide.
- Debounce de 300 ms en la búsqueda con un segundo `useEffect` (`setTimeout` + `clearTimeout`).
- El filtrado sigue siendo un valor derivado durante el render (`filterCountries`): no necesita efecto.
- El contrato `Country` ahora usa `flag.url_svg` (campo real del JSON).

### Cómo funciona la carga

Secuencia: render inicial (`loading`) → `useEffect` → `fetchCountries` → respuesta validada → `setState({ status: 'success', ... })` → nuevo renderizado.

- **Efecto de carga**, dependencias `[retryCount]`: se ejecuta al montar y cada vez que **Reintentar** incrementa `retryCount`. Su limpieza llama a `controller.abort()` y marca `active = false`, así una respuesta obsoleta nunca actualiza el estado.
- **Efecto de debounce**, dependencias `[query]`: cada pulsación reinicia un temporizador de 300 ms; la limpieza lo cancela con `clearTimeout`. Este efecto no vuelve a consultar el JSON: solo decide cuándo se aplica la búsqueda sobre los países ya cargados.
- En desarrollo, `StrictMode` ejecuta el efecto dos veces para comprobar que la limpieza funciona; por eso puede verse más de una solicitud solo en desarrollo.

### Respuestas breves (práctica S29)

1. **¿Por qué el filtro local no requiere `useEffect`?** Porque los países filtrados se calculan a partir de datos que ya están en el estado (`state.data`, `debouncedQuery`, `region`); es un cálculo del renderizado, no una sincronización con un sistema externo.
2. **¿Diferencia entre un 404 y una solicitud cancelada?** Un 404 es una respuesta del servidor que `fetch` no rechaza por sí sola: se detecta con `response.ok` y es un error de carga. Una solicitud cancelada la provoca la propia aplicación con `AbortController`; no es un fallo y no debe mostrar error.
3. **¿Qué hace `return () => controller.abort()`?** Es la función de limpieza: cancela la solicitud pendiente cuando el efecto deja de ser vigente (reintento o desmontaje), evitando que una respuesta antigua actualice el estado.
4. **¿Qué estados debe contemplar la interfaz?** Cargando (skeleton), error (mensaje y Reintentar), sin resultados (mensaje) y datos disponibles (tarjetas).
5. **Dependencias:** `[retryCount]` vuelve a cargar solo cuando se pulsa Reintentar; `[query]` reinicia el debounce en cada cambio del texto; un arreglo vacío `[]` ejecutaría el efecto una sola vez al montar.

## Estado anterior (S27: componentes controlados para búsqueda y filtro)

- Nuevas moléculas `SearchBar` y `RegionFilter`: componentes **controlados** (reciben `value` y `onChange` tipados; no guardan estado).
- `Header` conserva `title` y `children` y ahora transmite `query`, `region`, `regions` y los callbacks a ambos controles.
- El estado (`query`, `region`) sigue en `App`, que es el único dueño; las regiones del selector se **derivan** de los datos con `Array.from(new Set(...)).sort()`, y la etiqueta en español se separa del valor (`Americas` → "América").
- Comportamiento igual que en S26: filtrado derivado, contador, mensaje sin resultados y **Limpiar filtros**.

## S26: useState, búsqueda reactiva y filtrado

- Búsqueda por nombre y filtro por región conectados al estado de React: `query` y `region` con `useState<string>("")`, enlazados al `input` y al `select` con `value` y `onChange` (eventos tipados).
- Los países visibles son un **resultado derivado**: `filterCountries(...)` se recalcula en cada render desde la colección original, sin otro estado.
- Contador ("Mostrando X de Y países"), mensaje cuando no hay coincidencias y botón **Limpiar filtros** que restablece ambos estados.
- Nuevo `SiteHeader`: barra de navegación con menú móvil controlado por estado local (`isMenuOpen`), `aria-expanded`, cierre con Escape (devuelve el foco al botón) y al cruzar los 768 px.
- `CountryGrid` y `CountryCard` se conservan; "Ver más" sigue registrando el código del país en la consola.

Desde S25: interfaz organizada con Atomic Design (`Badge`, `Flag`, `CountryCard`, `CountryGrid`, `Header`), con `onSelect` como función prop, diseño adaptable, hover y modo oscuro automático según la preferencia del sistema.

Desde S29 los países se leen del archivo local `public/data/countries.json` (derivado de REST Countries); no se usa ninguna API de pago ni React Router en esta etapa.

## Atomic Design en este proyecto

| Nivel | Componente | Responsabilidad | Props |
|---|---|---|---|
| Átomo | `Badge` | Muestra la región como texto reutilizable. | `region: string` |
| Átomo | `Flag` | Muestra la bandera y usa `placeholder.png` si falla o no hay URL. | `src: string`, `alt: string` |
| Molécula | `CountryCard` | Combina `Flag`, `Badge` y los datos de un país. | `country: Country`, `onSelect: (code: string) => void` |
| Organismo | `CountryGrid` | Recorre un `Country[]` y crea una tarjeta por país. | `countries: Country[]`, `onSelect: (code: string) => void` |
| Molécula | `SearchBar` | Campo de búsqueda controlado con etiqueta e ícono. | `value: string`, `onChange` |
| Molécula | `RegionFilter` | Selector de región controlado; opciones recibidas por props. | `value: string`, `regions: string[]`, `onChange` |
| Organismo | `Header` | Título, contenido y controles de filtro; transmite props sin estado propio. | `title`, `children`, `query`, `region`, `regions`, `onQueryChange`, `onRegionChange` |
| Organismo | `CountryStates` | `LoadingState` (8 skeleton), `ErrorState` (con Reintentar) y `EmptyState`. | `onRetry`; `query`, `hasRegion` |
| Organismo | `SiteHeader` | Barra superior con navegación y menú móvil (estado local `isMenuOpen`). | Sin props |

## Qué hace `CountryGrid` y qué recibe

`CountryGrid` recibe un arreglo `countries: Country[]` y la función `onSelect`. Recorre el arreglo con `map()` y, por cada país, devuelve un `CountryCard` con `key={country.codes.alpha_2 || country.names.common}`, el objeto `country` y la misma función `onSelect`. No conoce cuántos países hay ni de dónde vienen: si recibe dos, muestra dos tarjetas; si recibe cuatro, muestra cuatro.

## Cómo funciona la búsqueda reactiva

Al escribir en el campo, `onChange` llama a `setQuery(event.currentTarget.value)`. Esa llamada solicita a React actualizar el estado; React vuelve a ejecutar `App` con el nuevo `query` y vuelve a dibujar el JSX. `filteredCountries` se calcula en ese mismo render con `filterCountries(...)`: como es un valor derivado de estados que ya existen y de una colección que no cambia, no necesita su propio `useState` (guardarlo duplicaría la información y podría desincronizarse). El filtro trabaja siempre sobre la colección original, así que limpiar la búsqueda conserva la región y cambiar la región conserva el texto.

La etiqueta visible del selector (por ejemplo, "América") es distinta del valor que se compara con los datos (`Americas`): se separa la presentación de la lógica.

## Seguimiento de la migración

| Elemento | Estado |
|---|---|
| Tipos, utilidades y recursos copiados | Reutilizados (`Country`, `format.ts`, `placeholder.png`); revisar contratos al conectar la fuente completa. |
| Tarjeta, bandera y región | Organizadas como componentes. |
| Listado de países | Recibe cualquier `Country[]`; ahora alimentado desde `countries.json`. |
| Cabecera de navegación y menú móvil | Migrados en `SiteHeader` (estado `isMenuOpen`, `aria-expanded`, Escape y breakpoint de 768 px). Pendiente: ícono de perfil de la versión Vanilla. |
| Pie / "Acerca de" | Migrado como `<footer id="acerca-de">`, destino del enlace del menú. |
| Búsqueda y filtro por región combinados | Migrados con `useState` y `filterCountries`; controles extraídos en S27 a `SearchBar` y `RegionFilter` (estado en `App`). |
| Debounce de 300 ms | Migrado en S29 con un segundo `useEffect` (`setTimeout` y `clearTimeout`). |
| Catálogo completo, carga, vacío, error y reintento | Migrados en S29: `fetchCountries` (validado), `AppState`, skeleton, error con Reintentar y mensaje sin resultados. |
| Vista inicial de 8 países con catálogo completo para filtrar | Migrada en S29: se carga el catálogo completo y se muestran 8 países mientras no haya filtros. |
| Detalle y navegación | Pendiente: integrar con el enrutamiento. |
| Tema claro/oscuro | Solo por preferencia del sistema (la versión Vanilla tampoco tenía interruptor). |
| Apariencia equivalente a la versión Vanilla | Pendiente: comparar colores, formas y componentes al terminar la migración. |

Nota: el catálogo incluye cuatro territorios sin `alpha_2` (Abkhazia, Northern Cyprus, Somaliland y South Ossetia), por lo que la `key` usa `codes.alpha_2 || names.common`; sin bandera se usa `placeholder.png`.

## Resultado

Carga de datos con `useEffect` (S29): el catálogo se lee de `public/data/countries.json` (254 países). La captura muestra la búsqueda `el` combinada con la región América: "Mostrando 5 de 254 países" y el botón "Limpiar filtros". Sin filtros se muestran 8 países destacados.

![Países cargados desde countries.json con búsqueda y filtro (S29)](docs/captura-s29.png)

Componentes controlados (S27): con `SearchBar` y `RegionFilter` extraídos, `can` + región América se comporta igual que en S26; el estado sigue en `App` y las regiones del selector se derivan de los datos.

![Filtros con SearchBar y RegionFilter (S27)](docs/captura-s27-filtros.png)

Búsqueda y filtro combinados (S26): `can` + región América devuelve solo Canada; el contador muestra "1 de 6 países" y aparece el botón "Limpiar filtros".

![Filtro aplicado: can + América (S26)](docs/captura-s26-filtro.png)

Sin coincidencias (S26): `CAN` + región Asia no devuelve países y se muestra un mensaje en lugar de una cuadrícula vacía.

![Mensaje sin coincidencias: CAN + Asia (S26)](docs/captura-s26-sin-resultados.png)

Pantalla de la sesión S25: `Header` y `CountryGrid` con tarjetas generadas desde un arreglo de países. La primera tarjeta muestra el foco al navegar con teclado.

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
│   ├── data/
│   │   └── countries.json     Catálogo local de países (fuente de datos de fetchCountries)
│   ├── favicon.svg
│   └── placeholder.png        Imagen de respaldo si una bandera no carga
└── src/
    ├── main.tsx               Monta React e importa el CSS global
    ├── App.tsx                Dueño del estado; efectos de carga y debounce; compone la pantalla
    ├── index.css              Tailwind + design tokens (@theme) + tipografía fluida
    ├── api/
    │   └── countries.ts       fetchCountries: fetch tipado, comprobación de response.ok y validación
    ├── components/
    │   ├── atoms/
    │   │   ├── Badge.tsx
    │   │   └── Flag.tsx
    │   ├── molecules/
    │   │   ├── CountryCard.tsx
    │   │   ├── RegionFilter.tsx
    │   │   └── SearchBar.tsx
    │   └── organisms/
    │       ├── CountryGrid.tsx
    │       ├── CountryStates.tsx   LoadingState (skeleton), ErrorState (Reintentar), EmptyState
    │       ├── Header.tsx
    │       └── SiteHeader.tsx
    ├── types/
    │   └── country.ts         Interface Country (flag.url_svg)
    └── utils/
        ├── app-state.ts       AppState: loading | success | error
        ├── filter.ts          filterCountries: filtra por nombre y región sin modificar el arreglo original
        └── format.ts          formatPopulation, getCapital, getFlagDescription (reutilizadas)
```

## Reutilizado de la versión Vanilla TypeScript

- La interface `Country` (`src/types/country.ts`).
- Las utilidades `formatPopulation`, `getCapital` y `getFlagDescription` (`src/utils/format.ts`), que no dependen del DOM.
- Los design tokens, la tipografía fluida con `clamp()` y las Container Queries de la tarjeta.
- No se reutilizan `escapeHtml` ni los renderers que devuelven strings, porque JSX escapa el contenido automáticamente.
