# 🎧 Challenge Podcast – Frontend

Mini SPA application to explore and play music podcasts, developed for the **Frontend INDITEX** technical challenge.

👉 [Production Demo (Vercel)](https://challenge-podcast-l3k77o85a-davids-projects-9d077315.vercel.app/)

---

## 📌 Main Features

- **Single Page Application** with React + TypeScript + Vite.
- **FSD Architecture (Feature-Sliced Design)** for scalable and maintainable project structure.
- **Advanced data management with React Query** (`@tanstack/react-query`).
- **Data validation with Zod** for robustness.
- **Clean routing** with React Router (no `#` hashes).
- **3 main views**:
  1. List of the 100 most popular Apple podcasts.
  2. Podcast details (with episodes).
  3. Episode details (with HTML5 audio player).
- **Smart caching**: data persisted in `localStorage` and refreshed every 24h.
- **Real-time filter** by title and author.
- **Global loading indicator** on every route transition.
- **Dynamic UI with Framer Motion** for smooth animations.
- **Comprehensive testing**:
  - **Vitest** (unit tests).
  - **Testing Library** (component tests with accessibility best practices).
  - **Playwright** (end-to-end tests).
- **Automation**: Husky + Lint-Staged, commit conventions, and CI/CD with Vercel.

---

## ⚙️ Automation & CI/CD

This project features a complete **DevOps and code quality** setup:

### 🔹 GitHub Actions Workflows

- **`ci.yml`** → Continuous integration pipeline: lint, build, and tests.
- **`playwright.yml`** → Runs end-to-end tests on every PR.
- **`guard-main.yml`** → Ensures the `main` branch is always protected.
- **`auto-release-pr.yml`** and **`release-please.yml`** → Automatic changelog generation, semantic versioning, and releases.
- **`tag-on-merge.yml`** → Automatic version tagging on merge.

### 🔹 Maintenance & Quality

- **Dependabot** → Automates dependency updates.
- **CODEOWNERS** → Defines responsible reviewers for each part of the code.
- **Pull Request Templates** (`feature.md`, `fix.md`, `default.md`) → Standardize quality and context for every PR.

With this setup, the repository not only meets the technical challenge but also reflects **senior/lead team practices**:

- **Continuous delivery** with automatically versioned releases.
- **Guaranteed quality** via lint, unit, and e2e test pipelines.
- **Organized collaboration** thanks to PR templates and code owners.

## 🏗️ Architecture & Technical Decisions

### 🔹 Feature-Sliced Design (FSD)

The project follows the **FSD** methodology, designed to organize modern frontend apps with a focus on **scalability, separation of concerns, and maintainability**.

General project structure:

```bash
src/
├── app/ # Global config (providers, router, base styles)
├── pages/ # Pages (route entry points)
├── widgets/ # UI blocks composed of features
├── features/ # Specific functionalities (e.g., filtering)
├── entities/ # Domain entities (Podcast, Episode, Author)
└── shared/ # Utilities, hooks, atomic UI, common libraries
```

Advantages of this approach:

- **Scalability**: as the project grows, dependencies remain controlled.
- **Reusability**: components and entities can be reused across views.
- **Isolation**: each layer knows only the immediately lower layer, avoiding unnecessary coupling.
- **Clarity**: any developer can quickly locate where to modify or add logic.

### 🔹 Tech Stack

- **React 19 + TypeScript** → static typing and modern components.
- **Vite** → superior performance in development and build.
- **React Router DOM** → SPA navigation without `#`.
- **React Query** → caching, data sync, and auto revalidation.
- **Zod** → runtime schema validation.
- **Framer Motion** → smooth UI animations.
- **Sass** → scalable modular styles.
- **Testing**:
  - **Vitest** for fast unit tests.
  - **Testing Library** for accessible behavior validation.
  - **Playwright** for end-to-end flows.
- **Automation**: Husky, lint-staged, ESLint + Prettier, commitlint.

---

## 🚀 Available Scripts

In the project directory, you can run:

| Command                | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run dev`          | Starts the app in **development** mode with Vite.                    |
| `npm run build`        | Compiles TypeScript and generates an optimized **production** build. |
| `npm run preview`      | Serves the production build locally.                                 |
| `npm run lint`         | Runs ESLint on the entire project.                                   |
| `npm run lint:fix`     | Automatically fixes linting issues.                                  |
| `npm run format`       | Formats code with Prettier.                                          |
| `npm run format:check` | Checks formatting without modifying files.                           |
| `npm run test`         | Runs **unit tests** with Vitest.                                     |
| `npm run test:e2e`     | Runs **end-to-end tests** with Playwright.                           |
| `npm run prepare`      | Husky setup (Git hooks).                                             |

---

## 🌐 APIs & CORS

- **Top 100 Apple podcasts**:  
  `https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`

- **Podcast details & episodes**:  
  `https://itunes.apple.com/lookup?id={podcastId}&media=podcast&entity=podcastEpisode&limit=20`

- **CORS proxy used**:  
  [`https://corsproxy.io/`](https://corsproxy.io/)

This allows consuming the Apple API without CORS issues.

---

## 🖥️ Running Modes

### Development

```bash
npm install
npm run dev
Runs at http://localhost:5173.
```

Production

```bash
npm run build
npm run preview
Serves the optimized build locally.
```
