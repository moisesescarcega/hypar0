# Cascarones de concreto: Bordes curvos

## Aplicación creativa del paraboloide hiperbólico

Visualización interactiva de algunas de las obras del arquitecto Félix Candela.

El actual repositorio es una aplicación web que permite visualizar y interactuar con algunas de las obras del arquitecto Félix Candela. Está elaborada con Astro, React, Three.js y Tailwind CSS. En constante desarrollo.

Los componentes para poder configurar la aplicación se encuentran en el directorio `src/components/canvas/`. 

La estructura del proyecto es la siguiente:
```text
├── public/
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── ConfigHypar.jsx  ...Interfaz de uso
│   │   │   ├── NurbsSurface.jsx ...Superficie NURBS
│   │   │   ├── QuadraticB.jsx ...Superficie cuadrática
│   │   │   ├── Ruled1.jsx ...Superficie reglada
│   │   │   ├── SurfaceNurbs.jsx ...Superficie NURBS
│   │   │   ├── canvas.jsx ...Componente principal
│   │   ├── Footer.astro ...Pie de página
│   │   ├── Header.astro ...Encabezado
│   │   ├── BaseHead.astro ...Encabezado de la página
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

Project created by Moisés Escárcega for the exhibition "Félix Candela: Fonction, forme et élegance des coques en beton".
Universidad Nacional Autónoma de México, Facultad de Arquitectura.

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).
