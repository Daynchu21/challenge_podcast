# 🎧 Challenge Podcast – Frontend

Mini aplicación SPA para explorar y reproducir podcasts musicales, desarrollada como parte de la prueba técnica **Frontend INDITEX**.

👉 [Demo en producción (Vercel)](https://challenge-podcast-l3k77o85a-davids-projects-9d077315.vercel.app/)

---

## 📌 Características principales

- **Single Page Application** con React + TypeScript + Vite.
- **Arquitectura FSD (Feature-Sliced Design)** para escalar el proyecto de forma ordenada y mantenible.
- **Gestión de datos avanzada con React Query** (`@tanstack/react-query`).
- **Validación de datos con Zod** para mayor robustez.
- **Routing limpio** con React Router (sin hashes `#`).
- **3 vistas principales**:
  1. Listado de los 100 podcasts más populares de Apple.
  2. Detalle de un podcast (con episodios).
  3. Detalle de un episodio (con reproductor de audio HTML5).
- **Cacheo inteligente**: data persistida en `localStorage` y refrescada cada 24h.
- **Filtro en tiempo real** por título y autor.
- **Indicador global de carga** en cada transición de ruta.
- **UI dinámica con Framer Motion** para animaciones fluidas.
- **Testing completo**:
  - **Vitest** (unit tests).
  - **Testing Library** (component tests con buenas prácticas de accesibilidad).
  - **Playwright** (end-to-end tests).
- **Automatización**: Husky + Lint-Staged, convenciones de commits y CI/CD con Vercel.

---

## ⚙️ Automatización y CI/CD

Este proyecto cuenta con un setup de **DevOps y calidad de código** completo:

### 🔹 GitHub Actions Workflows

- **`ci.yml`** → Pipeline de integración continua: lint, build y tests.
- **`playwright.yml`** → Corre tests end-to-end en cada PR.
- **`guard-main.yml`** → Asegura que la rama `main` siempre esté protegida.
- **`auto-release-pr.yml`** y **`release-please.yml`** → Generación automática de changelog, versionado semántico y releases.
- **`tag-on-merge.yml`** → Etiquetado automático de versiones al hacer merge.

### 🔹 Mantenimiento y calidad

- **Dependabot** → Automatiza la actualización de dependencias.
- **CODEOWNERS** → Define revisores responsables de cada parte del código.
- **Pull Request Templates** (`feature.md`, `fix.md`, `default.md`) → Estandarizan la calidad y contexto de cada PR.

Con este setup, el repositorio no solo cumple la prueba técnica, sino que también refleja prácticas de **equipo senior/lead**:

- **Entrega continua** con releases versionados automáticamente.
- **Calidad garantizada** por pipelines de lint, test unitarios y e2e.
- **Colaboración organizada** gracias a PR templates y code owners.

## 🏗️ Arquitectura y decisiones técnicas

### 🔹 Feature-Sliced Design (FSD)

El proyecto sigue la metodología **FSD**, pensada para organizar aplicaciones frontend modernas con foco en **escalabilidad, separación de responsabilidades y facilidad de mantenimiento**.

Estructura general del proyecto:
```bash
src/
├── app/ # Configuración global (providers, router, estilos base)
├── pages/ # Páginas (entry points de rutas)
├── widgets/ # Bloques UI compuestos por features
├── features/ # Funcionalidades específicas (ej: filtrado)
├── entities/ # Entidades del dominio (Podcast, Episodio, Autor)
└── shared/ # Utilidades, hooks, UI atómica, librerías comunes
```
Ventajas de este enfoque:

- **Escalabilidad**: al crecer el proyecto, las dependencias se mantienen controladas.
- **Reusabilidad**: componentes y entidades se pueden reutilizar en diferentes vistas.
- **Aislamiento**: cada capa sabe de la capa inmediatamente inferior, evitando acoplamiento innecesario.
- **Claridad**: cualquier developer puede ubicar rápidamente dónde modificar o añadir lógica.

### 🔹 Stack técnico

- **React 19 + TypeScript** → tipado estático y componentes modernos.
- **Vite** → rendimiento superior en desarrollo y build.
- **React Router DOM** → navegación SPA sin `#`.
- **React Query** → cacheo, sincronización de datos y revalidación automática.
- **Zod** → validación runtime de esquemas.
- **Framer Motion** → animaciones fluidas en UI.
- **Sass** → estilos modulares escalables.
- **Testing**:
  - **Vitest** para unit tests rápidos.
  - **Testing Library** para validar comportamiento accesible.
  - **Playwright** para flujos end-to-end.
- **Automatización**: Husky, lint-staged, ESLint + Prettier, commitlint.

---

## 🚀 Scripts disponibles

En el directorio del proyecto, podés correr:

| Comando                | Descripción                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | Levanta la app en modo **development** con Vite.                     |
| `npm run build`        | Compila TypeScript y genera build optimizada en modo **production**. |
| `npm run preview`      | Sirve localmente la build de producción.                             |
| `npm run lint`         | Ejecuta ESLint sobre todo el proyecto.                               |
| `npm run lint:fix`     | Corrige automáticamente los problemas de linting.                    |
| `npm run format`       | Formatea el código con Prettier.                                     |
| `npm run format:check` | Verifica formato sin modificar archivos.                             |
| `npm run test`         | Ejecuta los **unit tests** con Vitest.                               |
| `npm run test:e2e`     | Corre los **end-to-end tests** con Playwright.                       |
| `npm run prepare`      | Configuración de Husky (hooks de Git).                               |

---

## 🌐 APIs y CORS

- **Top 100 podcasts Apple**:  
  `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`

- **Detalle de un podcast y episodios**:  
  `https://itunes.apple.com/lookup?id={podcastId}&media=podcast&entity=podcastEpisode&limit=20`

- **Proxy CORS utilizado**:  
  [`https://corsproxy.io/`](https://corsproxy.io/)

Esto permite consumir la API de Apple sin problemas de CORS.

---

## 🖥️ Modo de ejecución

### Development

```bash
npm install
npm run dev
Se levanta en http://localhost:5173.
```

Production

```bash
npm run build
npm run preview
Sirve la build optimizada en local.
```
