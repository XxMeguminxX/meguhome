# Home Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a personal anime-style home dashboard with character showcase + practical widgets (clock, weather, calendar, quick links), deployed as static files via Nginx on VPS.

**Architecture:** React 18 + Vite 5 + TypeScript single-page app. Tailwind CSS for styling. All content configured via `src/config.ts`. Each widget is an isolated component — one failing doesn't crash others. Compiled to static `/dist` and served via Nginx.

**Tech Stack:** React 18, Vite 5, TypeScript 5, Tailwind CSS 3, Vitest, React Testing Library, OpenWeatherMap API (free tier)

**Parallelization:** Tasks 1 and 2 must run sequentially first. Once complete, Tasks 3–7 are fully independent and can run in parallel across agents. Task 8 (assembly) requires all prior tasks complete.

---

## File Map

| File | Responsibility |
|------|----------------|
| `src/types.ts` | Shared TypeScript interfaces |
| `src/config.ts` | All user-configurable content (character, weather, links) |
| `src/test-setup.ts` | Vitest + Testing Library global setup |
| `vite.config.ts` | Vite + React plugin + Vitest config |
| `tailwind.config.js` | Tailwind theme (colors, fonts) |
| `src/index.css` | Global styles, Tailwind directives, Google Fonts |
| `src/main.tsx` | React root mount |
| `src/App.tsx` | Root layout, background, decorative circles |
| `src/App.test.tsx` | Smoke test for full app render |
| `src/components/ClockWidget.tsx` | Live HH:MM:SS + date display |
| `src/components/ClockWidget.test.tsx` | Clock unit tests |
| `src/components/Navbar.tsx` | Top nav: logo, links, ClockWidget slot |
| `src/components/Navbar.test.tsx` | Navbar render tests |
| `src/components/CharacterPanel.tsx` | Character name, description, Read More modal |
| `src/components/CharacterPanel.test.tsx` | CharacterPanel + modal tests |
| `src/components/WeatherWidget.tsx` | Weather fetch + display + error state |
| `src/components/WeatherWidget.test.tsx` | Weather fetch mock tests |
| `src/components/CalendarWidget.tsx` | Monthly calendar, today highlight, prev/next nav |
| `src/components/CalendarWidget.test.tsx` | Calendar logic tests |
| `src/components/QuickLinks.tsx` | Configurable bookmark chips |
| `src/components/QuickLinks.test.tsx` | QuickLinks render tests |
| `public/character.svg` | Placeholder character SVG |
| `nginx.conf` | Nginx site config for VPS |
| `deploy.sh` | rsync deploy script |
| `.env.example` | Template for environment variables |
| `DEPLOY.md` | Deployment instructions |

---

## Task 1: Project Setup

**Files:**
- Create: `vite.config.ts`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `src/index.css`
- Create: `src/test-setup.ts`
- Create: `src/main.tsx`
- Create: `src/App.tsx` (placeholder)
- Create: `public/character.svg`
- Create: `.env.example`

- [ ] **Step 1: Scaffold Vite + React + TypeScript**

Run from `/Users/erikwahyusaputra/koding/home-dashboard`:
```bash
npm create vite@latest . -- --template react-ts
```
When prompted about non-empty directory → choose **"Ignore files and continue"**.

- [ ] **Step 2: Install all dependencies**

```bash
npm install
npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
npx tailwindcss init -p
```

- [ ] **Step 3: Configure Vite with Vitest**

Replace `vite.config.ts` entirely:
```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },
})
```

- [ ] **Step 4: Configure Tailwind**

Replace `tailwind.config.js` entirely:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        lavender: {
          50: '#f5f0ff',
          100: '#ede8fa',
          200: '#e8e0f0',
          300: '#d8c8f0',
          400: '#b89ddc',
          500: '#9b7ec8',
        },
        blush: '#e8a0bf',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 5: Set up global CSS**

Replace `src/index.css` entirely:
```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-lavender-50 font-sans;
}
```

- [ ] **Step 6: Set up Vitest globals**

Create `src/test-setup.ts`:
```ts
import '@testing-library/jest-dom'
```

- [ ] **Step 7: Clean up boilerplate and set placeholder App**

Replace `src/App.tsx`:
```tsx
export default function App() {
  return <div>Home Dashboard</div>
}
```

Replace `src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

Delete these boilerplate files:
```bash
rm -f src/App.css src/assets/react.svg public/vite.svg
```

- [ ] **Step 8: Create placeholder character SVG**

Create `public/character.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
  <ellipse cx="150" cy="120" rx="70" ry="80" fill="#d8c8f0"/>
  <ellipse cx="150" cy="290" rx="90" ry="110" fill="#c8b0e0"/>
  <circle cx="120" cy="110" r="8" fill="#9b7ec8"/>
  <circle cx="180" cy="110" r="8" fill="#9b7ec8"/>
  <path d="M 130 140 Q 150 155 170 140" stroke="#9b7ec8" stroke-width="2" fill="none"/>
  <text x="150" y="390" text-anchor="middle" fill="#9b7ec8" font-size="12" font-family="sans-serif">character placeholder</text>
</svg>
```

- [ ] **Step 9: Create env template**

Create `.env.example`:
```
VITE_WEATHER_API_KEY=your_openweathermap_api_key_here
```

Create `.env.local` (not committed):
```
VITE_WEATHER_API_KEY=
```

Verify `.gitignore` includes `.env.local` and `dist/` (Vite scaffold adds these by default).

- [ ] **Step 10: Verify dev server starts**

```bash
npm run dev
```
Expected: server at `http://localhost:5173`, page shows "Home Dashboard" text.

- [ ] **Step 11: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + TS + Tailwind project"
```

---

## Task 2: Config & Types

**Files:**
- Create: `src/types.ts`
- Create: `src/config.ts`
- Create: `src/config.test.ts`

- [ ] **Step 1: Write the failing test**

Create `src/config.test.ts`:
```ts
import { describe, it, expect } from 'vitest'
import { config } from './config'

describe('config', () => {
  it('has character with required fields', () => {
    expect(config.character.name).toBeTruthy()
    expect(config.character.subtitle).toBeTruthy()
    expect(config.character.description).toBeTruthy()
    expect(config.character.imagePath).toBeTruthy()
    expect(config.character.readMoreContent).toBeTruthy()
  })

  it('has weather config with city', () => {
    expect(config.weather.city).toBeTruthy()
  })

  it('has at least one quick link with label and url', () => {
    expect(config.quickLinks.length).toBeGreaterThan(0)
    expect(config.quickLinks[0].label).toBeTruthy()
    expect(config.quickLinks[0].url).toBeTruthy()
  })

  it('has site config with title and nav links', () => {
    expect(config.site.title).toBeTruthy()
    expect(config.site.navLinks.length).toBeGreaterThan(0)
    config.site.navLinks.forEach(link => {
      expect(link.label).toBeTruthy()
      expect(link.href).toBeTruthy()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/config.test.ts
```
Expected: FAIL — "Cannot find module './config'"

- [ ] **Step 3: Create shared types**

Create `src/types.ts`:
```ts
export interface CharacterConfig {
  name: string
  subtitle: string
  description: string
  imagePath: string
  readMoreContent: string
}

export interface WeatherConfig {
  city: string
  apiKey: string
}

export interface QuickLink {
  label: string
  url: string
  icon?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SiteConfig {
  title: string
  navLinks: NavLink[]
}

export interface AppConfig {
  character: CharacterConfig
  weather: WeatherConfig
  quickLinks: QuickLink[]
  site: SiteConfig
}
```

- [ ] **Step 4: Create config**

Create `src/config.ts`:
```ts
import type { AppConfig } from './types'

export const config: AppConfig = {
  site: {
    title: 'Home Dashboard',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'Links', href: '#links' },
      { label: 'About', href: '#about' },
    ],
  },
  character: {
    name: 'Shima Rin',
    subtitle: 'Character Info',
    description:
      'A young girl who enjoys solo camping in scenic locations. She prefers quiet adventures and the peace of nature over crowds.',
    imagePath: '/character.svg',
    readMoreContent:
      'Shima Rin is known for her love of solitude and the outdoors. She camps alone, brews her own coffee, and finds joy in simple moments under the open sky. Over time, she discovers that sharing these experiences with friends can be just as rewarding.',
  },
  weather: {
    city: 'Jakarta',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY ?? '',
  },
  quickLinks: [
    { label: 'GitHub', url: 'https://github.com', icon: '⌨️' },
    { label: 'Notion', url: 'https://notion.so', icon: '📝' },
    { label: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ],
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run src/config.test.ts
```
Expected: PASS — 4 tests passing

- [ ] **Step 6: Commit**

```bash
git add src/types.ts src/config.ts src/config.test.ts
git commit -m "feat: add config and type definitions"
```

---

## Task 3: ClockWidget + Navbar

> **Agent note:** Implement ClockWidget first, then Navbar (Navbar imports ClockWidget).

**Files:**
- Create: `src/components/ClockWidget.tsx`
- Create: `src/components/ClockWidget.test.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Navbar.test.tsx`

- [ ] **Step 1: Write ClockWidget failing test**

Create `src/components/ClockWidget.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ClockWidget from './ClockWidget'

describe('ClockWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-04T14:30:45'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders current time in HH:MM:SS format', () => {
    render(<ClockWidget />)
    expect(screen.getByText('14:30:45')).toBeInTheDocument()
  })

  it('renders current date with weekday and month', () => {
    render(<ClockWidget />)
    expect(screen.getByText(/Thursday/)).toBeInTheDocument()
    expect(screen.getByText(/June/)).toBeInTheDocument()
  })

  it('updates time every second', () => {
    render(<ClockWidget />)
    expect(screen.getByText('14:30:45')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.getByText('14:30:46')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run ClockWidget test to verify it fails**

```bash
npx vitest run src/components/ClockWidget.test.tsx
```
Expected: FAIL — "Cannot find module './ClockWidget'"

- [ ] **Step 3: Implement ClockWidget**

Create `src/components/ClockWidget.tsx`:
```tsx
import { useState, useEffect } from 'react'

function formatTime(date: Date): string {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ClockWidget() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="text-right">
      <div className="text-lg font-mono font-semibold text-lavender-500">
        {formatTime(now)}
      </div>
      <div className="text-xs text-gray-400 mt-0.5">{formatDate(now)}</div>
    </div>
  )
}
```

- [ ] **Step 4: Run ClockWidget test to verify it passes**

```bash
npx vitest run src/components/ClockWidget.test.tsx
```
Expected: PASS — 3 tests passing

- [ ] **Step 5: Write Navbar failing test**

Create `src/components/Navbar.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { config } from '../config'

describe('Navbar', () => {
  it('renders site title', () => {
    render(<Navbar />)
    expect(screen.getByText(config.site.title)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    config.site.navLinks.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument()
    })
  })

  it('renders clock (font-mono element)', () => {
    render(<Navbar />)
    expect(document.querySelector('.font-mono')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Run Navbar test to verify it fails**

```bash
npx vitest run src/components/Navbar.test.tsx
```
Expected: FAIL — "Cannot find module './Navbar'"

- [ ] **Step 7: Implement Navbar**

Create `src/components/Navbar.tsx`:
```tsx
import { config } from '../config'
import ClockWidget from './ClockWidget'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white/40 backdrop-blur-md border-b border-white/30">
      <span className="font-serif font-bold text-lavender-500 text-lg">
        {config.site.title}
      </span>

      <ul className="flex gap-6">
        {config.site.navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-lavender-500 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <ClockWidget />
    </nav>
  )
}
```

- [ ] **Step 8: Run Navbar test to verify it passes**

```bash
npx vitest run src/components/Navbar.test.tsx
```
Expected: PASS — 3 tests passing

- [ ] **Step 9: Commit**

```bash
git add src/components/ClockWidget.tsx src/components/ClockWidget.test.tsx src/components/Navbar.tsx src/components/Navbar.test.tsx
git commit -m "feat: add ClockWidget and Navbar"
```

---

## Task 4: CharacterPanel

**Files:**
- Create: `src/components/CharacterPanel.tsx`
- Create: `src/components/CharacterPanel.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/CharacterPanel.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterPanel from './CharacterPanel'
import { config } from '../config'

describe('CharacterPanel', () => {
  it('renders character subtitle', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.subtitle)).toBeInTheDocument()
  })

  it('renders character name', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.name)).toBeInTheDocument()
  })

  it('renders character description', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.description)).toBeInTheDocument()
  })

  it('renders Read More button', () => {
    render(<CharacterPanel />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('opens modal when Read More is clicked', async () => {
    const user = userEvent.setup()
    render(<CharacterPanel />)
    await user.click(screen.getByRole('button', { name: /read more/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(config.character.readMoreContent)).toBeInTheDocument()
  })

  it('closes modal when backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<CharacterPanel />)
    await user.click(screen.getByRole('button', { name: /read more/i }))
    await user.click(screen.getByTestId('modal-backdrop'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders character image', () => {
    render(<CharacterPanel />)
    expect(screen.getByRole('img', { name: config.character.name })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/CharacterPanel.test.tsx
```
Expected: FAIL — "Cannot find module './CharacterPanel'"

- [ ] **Step 3: Implement CharacterPanel**

Create `src/components/CharacterPanel.tsx`:
```tsx
import { useState } from 'react'
import { config } from '../config'

function FallbackCharacter() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-lavender-100 rounded-2xl">
      <span className="text-lavender-400 text-6xl">✦</span>
    </div>
  )
}

export default function CharacterPanel() {
  const [modalOpen, setModalOpen] = useState(false)
  const [imgError, setImgError] = useState(false)
  const { character } = config

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium uppercase tracking-widest text-lavender-400">
          {character.subtitle}
        </p>
        <h1 className="font-serif text-5xl font-bold text-gray-800 leading-tight">
          {character.name}
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
          {character.description}
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="mt-2 w-fit px-5 py-2 rounded-full bg-lavender-500 text-white text-sm font-medium hover:bg-lavender-400 transition-colors"
        >
          Read More
        </button>

        <div className="relative w-48 h-64 mt-4">
          {imgError ? (
            <FallbackCharacter />
          ) : (
            <img
              src={character.imagePath}
              alt={character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain drop-shadow-xl"
            />
          )}
        </div>
      </div>

      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            data-testid="modal-backdrop"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />
          <div className="relative z-10 bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl">
            <h2 className="font-serif text-2xl font-bold text-gray-800 mb-4">
              {character.name}
            </h2>
            <p className="text-gray-600 leading-relaxed">{character.readMoreContent}</p>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 px-4 py-2 rounded-full bg-lavender-500 text-white text-sm hover:bg-lavender-400 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/CharacterPanel.test.tsx
```
Expected: PASS — 7 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/CharacterPanel.tsx src/components/CharacterPanel.test.tsx
git commit -m "feat: add CharacterPanel with Read More modal"
```

---

## Task 5: WeatherWidget

**Files:**
- Create: `src/components/WeatherWidget.tsx`
- Create: `src/components/WeatherWidget.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/WeatherWidget.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import WeatherWidget from './WeatherWidget'

const mockWeatherResponse = {
  weather: [{ description: 'clear sky', icon: '01d' }],
  main: { temp: 30.5 },
  name: 'Jakarta',
}

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders weather data on success', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText('Jakarta')).toBeInTheDocument()
      expect(screen.getByText(/30/)).toBeInTheDocument()
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    })
  })

  it('shows error state when fetch throws', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'))
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/cuaca tidak tersedia/i)).toBeInTheDocument()
    })
  })

  it('shows error state when response is not ok', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/cuaca tidak tersedia/i)).toBeInTheDocument()
    })
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/WeatherWidget.test.tsx
```
Expected: FAIL — "Cannot find module './WeatherWidget'"

- [ ] **Step 3: Implement WeatherWidget**

Create `src/components/WeatherWidget.tsx`:
```tsx
import { useState, useEffect } from 'react'

interface WeatherData {
  description: string
  temp: number
  icon: string
  city: string
}

interface Props {
  city: string
  apiKey: string
}

const REFRESH_MS = 10 * 60 * 1000

async function fetchWeather(city: string, apiKey: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  const res = await fetch(url)
  if (!res.ok) throw new Error('fetch failed')
  const data = await res.json()
  return {
    description: data.weather[0].description,
    temp: Math.round(data.main.temp),
    icon: data.weather[0].icon,
    city: data.name,
  }
}

export default function WeatherWidget({ city, apiKey }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchWeather(city, apiKey)
        if (!cancelled) { setWeather(data); setStatus('ok') }
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => { cancelled = true; clearInterval(id) }
  }, [city, apiKey])

  if (status === 'loading') {
    return (
      <div className="bg-white/50 backdrop-blur rounded-2xl p-4">
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-white/50 backdrop-blur rounded-2xl p-4">
        <span className="text-gray-400 text-sm">Cuaca tidak tersedia</span>
      </div>
    )
  }

  return (
    <div className="bg-white/50 backdrop-blur rounded-2xl p-4 flex items-center gap-3">
      <img
        src={`https://openweathermap.org/img/wn/${weather!.icon}@2x.png`}
        alt={weather!.description}
        className="w-12 h-12"
      />
      <div>
        <div className="text-2xl font-bold text-gray-700">{weather!.temp}°C</div>
        <div className="text-xs text-gray-500 capitalize">{weather!.description}</div>
        <div className="text-xs text-lavender-400 font-medium">{weather!.city}</div>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/WeatherWidget.test.tsx
```
Expected: PASS — 4 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/WeatherWidget.tsx src/components/WeatherWidget.test.tsx
git commit -m "feat: add WeatherWidget with OpenWeatherMap integration"
```

---

## Task 6: CalendarWidget

**Files:**
- Create: `src/components/CalendarWidget.tsx`
- Create: `src/components/CalendarWidget.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/CalendarWidget.test.tsx`:
```tsx
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarWidget from './CalendarWidget'

describe('CalendarWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-04'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders current month and year', () => {
    render(<CalendarWidget />)
    expect(screen.getByText(/June 2026/)).toBeInTheDocument()
  })

  it('renders day name headers', () => {
    render(<CalendarWidget />)
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('highlights today with lavender background', () => {
    render(<CalendarWidget />)
    // day 4 is today — find the cell with "4" that has the highlight class
    const cells = screen.getAllByText('4')
    const todayCell = cells.find(el => el.className.includes('bg-lavender'))
    expect(todayCell).toBeTruthy()
  })

  it('navigates to next month', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })
    render(<CalendarWidget />)
    await user.click(screen.getByLabelText('Next month'))
    expect(screen.getByText(/July 2026/)).toBeInTheDocument()
  })

  it('navigates to previous month', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })
    render(<CalendarWidget />)
    await user.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText(/May 2026/)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/CalendarWidget.test.tsx
```
Expected: FAIL — "Cannot find module './CalendarWidget'"

- [ ] **Step 3: Implement CalendarWidget**

Create `src/components/CalendarWidget.tsx`:
```tsx
import { useState } from 'react'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarWidget() {
  const today = new Date()
  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })

  const { year, month } = viewDate
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  function prevMonth() {
    setViewDate(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    )
  }

  function nextMonth() {
    setViewDate(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    )
  }

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="bg-white/50 backdrop-blur rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="text-lavender-400 hover:text-lavender-500 font-bold w-6 text-center"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-700">{monthLabel}</span>
        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="text-lavender-400 hover:text-lavender-500 font-bold w-6 text-center"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-xs text-gray-400 font-medium py-1">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={`text-xs py-1 rounded-full ${
              day === null
                ? ''
                : isToday(day)
                ? 'bg-lavender-500 text-white font-bold'
                : 'text-gray-600 hover:bg-lavender-100 cursor-default'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/CalendarWidget.test.tsx
```
Expected: PASS — 5 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/CalendarWidget.tsx src/components/CalendarWidget.test.tsx
git commit -m "feat: add CalendarWidget with month navigation"
```

---

## Task 7: QuickLinks

**Files:**
- Create: `src/components/QuickLinks.tsx`
- Create: `src/components/QuickLinks.test.tsx`

- [ ] **Step 1: Write the failing test**

Create `src/components/QuickLinks.test.tsx`:
```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import QuickLinks from './QuickLinks'
import type { QuickLink } from '../types'

const links: QuickLink[] = [
  { label: 'GitHub', url: 'https://github.com', icon: '⌨️' },
  { label: 'Notion', url: 'https://notion.so', icon: '📝' },
]

describe('QuickLinks', () => {
  it('renders all link labels', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Notion')).toBeInTheDocument()
  })

  it('renders correct hrefs', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com'
    )
    expect(screen.getByRole('link', { name: /notion/i })).toHaveAttribute(
      'href',
      'https://notion.so'
    )
  })

  it('opens links in new tab with rel safety attributes', () => {
    render(<QuickLinks links={links} />)
    screen.getAllByRole('link').forEach(a => {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders icons when provided', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByText('⌨️')).toBeInTheDocument()
    expect(screen.getByText('📝')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/components/QuickLinks.test.tsx
```
Expected: FAIL — "Cannot find module './QuickLinks'"

- [ ] **Step 3: Implement QuickLinks**

Create `src/components/QuickLinks.tsx`:
```tsx
import type { QuickLink } from '../types'

interface Props {
  links: QuickLink[]
}

export default function QuickLinks({ links }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-white/50 text-sm text-gray-600 hover:bg-lavender-100 hover:text-lavender-500 transition-all shadow-sm"
        >
          {link.icon && <span>{link.icon}</span>}
          {link.label}
        </a>
      ))}
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run src/components/QuickLinks.test.tsx
```
Expected: PASS — 4 tests passing

- [ ] **Step 5: Commit**

```bash
git add src/components/QuickLinks.tsx src/components/QuickLinks.test.tsx
git commit -m "feat: add QuickLinks bookmark component"
```

---

## Task 8: App Assembly

**Prerequisites:** Tasks 3–7 must all be complete.

**Files:**
- Modify: `src/App.tsx`
- Create: `src/App.test.tsx`

- [ ] **Step 1: Write the smoke test**

Create `src/App.test.tsx`:
```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

vi.spyOn(global, 'fetch').mockResolvedValue({
  ok: true,
  json: async () => ({
    weather: [{ description: 'clear sky', icon: '01d' }],
    main: { temp: 28 },
    name: 'Jakarta',
  }),
} as Response)

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('renders character name from config', () => {
    render(<App />)
    expect(screen.getByText('Shima Rin')).toBeInTheDocument()
  })

  it('renders nav link from config', () => {
    render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders quick links section', () => {
    render(<App />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run src/App.test.tsx
```
Expected: FAIL — App still renders placeholder "Home Dashboard" text only

- [ ] **Step 3: Assemble App**

Replace `src/App.tsx` entirely:
```tsx
import Navbar from './components/Navbar'
import CharacterPanel from './components/CharacterPanel'
import WeatherWidget from './components/WeatherWidget'
import CalendarWidget from './components/CalendarWidget'
import QuickLinks from './components/QuickLinks'
import { config } from './config'

function DecorativeCircles() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-lavender-300/30 blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-blush/20 blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-lavender-400/20 blur-2xl" />
      <div className="absolute top-20 left-1/3 w-40 h-40 rounded-full bg-blush/15 blur-2xl" />
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-50 to-lavender-200 relative">
      <DecorativeCircles />

      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-3 gap-8 items-start">
          <div className="col-span-2">
            <CharacterPanel />
          </div>

          <div className="flex flex-col gap-4">
            <WeatherWidget city={config.weather.city} apiKey={config.weather.apiKey} />
            <CalendarWidget />
          </div>
        </div>

        <div id="links" className="mt-12">
          <QuickLinks links={config.quickLinks} />
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Step 4: Run App test to verify it passes**

```bash
npx vitest run src/App.test.tsx
```
Expected: PASS — 4 tests passing

- [ ] **Step 5: Run full test suite**

```bash
npx vitest run
```
Expected: All tests pass across all files (config, ClockWidget, Navbar, CharacterPanel, WeatherWidget, CalendarWidget, QuickLinks, App).

- [ ] **Step 6: Verify visually in browser**

```bash
npm run dev
```
Open `http://localhost:5173` and verify:
- Lavender gradient background visible
- Decorative blur circles visible
- Navbar: site title left, nav links center, live clock right
- Character name "Shima Rin" with subtitle and description
- SVG placeholder character image visible
- WeatherWidget loading state (or data if API key configured)
- CalendarWidget with today highlighted
- Quick links chips at bottom

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "feat: assemble full dashboard layout"
```

---

## Task 9: Deployment Config

**Files:**
- Create: `nginx.conf`
- Create: `deploy.sh`
- Create: `DEPLOY.md`

- [ ] **Step 1: Create Nginx config**

Create `nginx.conf`:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/home-dashboard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|svg|ico|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

- [ ] **Step 2: Create deploy script**

Create `deploy.sh`:
```bash
#!/bin/bash
set -e

REMOTE_USER="${DEPLOY_USER:-root}"
REMOTE_HOST="${DEPLOY_HOST:?Error: DEPLOY_HOST is not set}"
REMOTE_PATH="/var/www/home-dashboard"

echo "Building..."
npm run build

echo "Uploading to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
rsync -avz --delete dist/ "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/"

echo "Deploy complete."
```

```bash
chmod +x deploy.sh
```

- [ ] **Step 3: Verify build succeeds**

```bash
npm run build
```
Expected: `dist/` folder created, no TypeScript errors.

- [ ] **Step 4: Create deployment instructions**

Create `DEPLOY.md`:
```markdown
# Deployment Guide

## VPS Setup (one-time)

1. Install Nginx on VPS:
   ```bash
   apt install nginx certbot python3-certbot-nginx
   ```

2. Copy nginx config:
   ```bash
   scp nginx.conf user@your.vps:/etc/nginx/sites-available/home-dashboard
   ssh user@your.vps "ln -s /etc/nginx/sites-available/home-dashboard /etc/nginx/sites-enabled/ && mkdir -p /var/www/home-dashboard && nginx -t && systemctl reload nginx"
   ```

3. Set up SSL:
   ```bash
   ssh user@your.vps "certbot --nginx -d yourdomain.com"
   ```

## Deploy

```bash
export DEPLOY_HOST=your.vps.ip.or.domain
export DEPLOY_USER=root
VITE_WEATHER_API_KEY=your_key_here npm run build && ./deploy.sh
```

## OpenWeatherMap API Key

Get a free key at https://openweathermap.org/api — the "Current Weather Data" free tier is sufficient.
```

- [ ] **Step 5: Commit**

```bash
git add nginx.conf deploy.sh DEPLOY.md
git commit -m "feat: add Nginx config and deploy script"
```

---

## Parallelization Summary

| Task | Depends On | Can Run In Parallel With |
|------|-----------|--------------------------|
| Task 1: Project Setup | — | nothing (must be first) |
| Task 2: Config & Types | Task 1 | nothing (must be second) |
| Task 3: ClockWidget + Navbar | Task 2 | Tasks 4, 5, 6, 7 |
| Task 4: CharacterPanel | Task 2 | Tasks 3, 5, 6, 7 |
| Task 5: WeatherWidget | Task 2 | Tasks 3, 4, 6, 7 |
| Task 6: CalendarWidget | Task 2 | Tasks 3, 4, 5, 7 |
| Task 7: QuickLinks | Task 2 | Tasks 3, 4, 5, 6 |
| Task 8: App Assembly | Tasks 3–7 | nothing (needs all done) |
| Task 9: Deployment Config | Task 8 | nothing (needs Task 8 done) |
