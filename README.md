# Meguhome

A personal start page: greeting, weather, pinned links, and an image collection you can upload to.
React + TypeScript + Vite on the front, a small Express server for the collection uploads.

## Run it

```bash
npm install
cp .env.example .env   # then add your OpenWeather key
npm run dev            # Vite on :5173 + upload server on :3001
```

Without `VITE_WEATHER_API_KEY` the app still runs — the weather card just tells you the key is missing.

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server and the upload server together |
| `npm run server` | Upload server only (`:3001`) |
| `npm run build` | Typecheck, then build to `dist/` |
| `npm test` | Run the test suite once |
| `npm run lint` | ESLint over the project |

## Layout

```
src/
  config.ts          Everything you would want to change: name, bio, links, city
  types.ts           Config types
  components/        One card per file
  index.css          Base styles, the page-load reveal, reduced-motion handling
tailwind.config.js   Colour, type, radius, and shadow tokens
server.js            GET/POST/DELETE /api/collection, files land in public/archwizardcollection
```

Design tokens live in `tailwind.config.js` — warm paper background, white cards with hairline
borders, crimson as the single accent and ember gold as support. Components use those tokens
(`text-mute`, `rounded-card`, `bg-crimson-tint`) rather than one-off hex values.

## Collection API

| Method | Path | Notes |
| --- | --- | --- |
| `GET` | `/api/collection` | Image paths, newest first |
| `POST` | `/api/upload` | `multipart/form-data`, field `image`, 10 MB max, images only |
| `DELETE` | `/api/collection/:filename` | Filename is resolved inside the collection directory only |

The server has no authentication, so run it on your own machine or behind something that does.

## Deploy

`./deploy.sh` builds and rsyncs `dist/` to `$DEPLOY_HOST`, ships `nginx.conf`, and reloads nginx.
See `DEPLOY.md`.
