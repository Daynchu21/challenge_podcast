# 🎧 Challenge Podcast – Frontend

Mini-aplicación para escuchar podcasts musicales.  
Desarrollada en **React + TypeScript + Vite** como parte de la prueba técnica Frontend.

---

## 🚀 Requisitos técnicos

- Node.js >= 18
- npm o yarn

---

## 📦 Instalación

Clonar el repositorio e instalar dependencias:

```bash
git clone https://github.com/Daynchu21/challenge_podcast.git
cd challenge_podcast
npm install
▶️ Ejecución
```

🔹 Modo desarrollo
Sirve los assets sin minificar.
Se habilitan mensajes de error más descriptivos y hot reload.

```bash
Copiar código
npm run dev
Abrir en navegador: http://localhost:5173
```

🔹 Modo producción
Genera build optimizado con assets concatenados y minificados.

```bash
Copiar código
npm run build
npm run preview
Abrir en navegador: http://localhost:4173
```

🧪 Tests
Unit/Integration → Jest + React Testing Library

E2E → Playwright

Ejecutar:

```bash
Copiar código
# Unit + integration tests
npm run test
```

# End-to-end tests

npm run test:e2e
📂 Arquitectura del proyecto

```bash
Copiar código
src/
  ├── components/   # Componentes reutilizables de UI
  ├── pages/        # Vistas principales (Home, Podcast, Episode)
  ├── services/     # APIs y cache localStorage
  ├── hooks/        # Custom hooks
  ├── types/        # Definiciones TS
  ├── App.tsx       # Configuración de rutas
  └── main.tsx      # Entry point
tests/              # Unit y E2E tests
```

🌐 Endpoints utilizados
Top 100 podcasts
https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json

Detalle de un podcast

https://itunes.apple.com/lookup?id={id}&media=podcast&entity=podcastEpisode&limit=20

Proxy CORS (si se requiere)
https://allorigins.win

✨ Funcionalidades principales
Listado de los 100 podcasts más populares (Apple API).

Cache local: listado y detalles almacenados por 24h.

Filtro inmediato de podcasts por nombre o autor.

Vista de detalle con episodios y metadatos.

Vista de episodio con reproductor de audio.

Routing limpio con react-router-dom.

Indicador de carga en cada navegación.

🔧 Calidad y CI/CD
Este repositorio incluye:

```bash
ESLint + Prettier para linting y formateo.

Husky + Commitlint para commits semánticos.

Tests unitarios y e2e automatizados.

GitHub Actions para CI:

Lint

Unit tests

Build

E2E tests

Workflow en .github/workflows/ci.yml
```

🔧 CI/CD

Este repo incluye:

```bash
Lint + Prettier check

Unit + E2E tests

Build check (Vite)
```

Automatizado con GitHub Actions en cada PR y push a main.

---

# ⚙️ 2. CI/CD (GitHub Actions)

Crear el archivo `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [develop, main]
  pull_request:
    branches: [develop, main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Run unit tests
        run: npm run test -- --ci --coverage

      - name: Build app
        run: npm run build

      - name: Run E2E tests
        run: npx playwright install --with-deps && npm run test:e2e
```
