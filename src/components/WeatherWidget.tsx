import { useState, useEffect } from 'react'

interface WeatherData {
  description: string
  temp: number
  feelsLike: number
  humidity: number | null
  wind: number | null
  icon: string
  city: string
}

interface Props {
  city: string
  apiKey: string
}

type Status = 'loading' | 'ok' | 'error' | 'unconfigured'

const REFRESH_MS = 10 * 60 * 1000

async function fetchWeather(city: string, apiKey: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
  const res = await fetch(url)
  if (!res.ok) throw new Error('fetch failed')
  const data = await res.json()
  return {
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like ?? data.main.temp),
    humidity: data.main.humidity ?? null,
    wind: data.wind?.speed != null ? Math.round(data.wind.speed * 3.6) : null,
    city: data.name,
  }
}

/** OpenWeather icon codes share a two-digit prefix per condition group. */
function WeatherGlyph({ code }: { code: string }) {
  const group = code.slice(0, 2)
  const night = code.endsWith('n')
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-6 w-6',
    'aria-hidden': true,
  }
  const cloud = <path d="M7 19a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17.3 11 3.8 3.8 0 0 1 17 19Z" />

  if (group === '01')
    return night ? (
      <svg {...common}>
        <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5Z" />
      </svg>
    ) : (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>
    )
  if (group === '02' || group === '03' || group === '04') return <svg {...common}>{cloud}</svg>
  if (group === '09' || group === '10')
    return (
      <svg {...common}>
        {cloud}
        <path d="M9 21.5l.8-1.8M13 21.5l.8-1.8M17 21.5l.8-1.8" />
      </svg>
    )
  if (group === '11')
    return (
      <svg {...common}>
        {cloud}
        <path d="M13.5 13.5 10 19h3.5L11 23.5" />
      </svg>
    )
  if (group === '13')
    return (
      <svg {...common}>
        {cloud}
        <path d="M9.5 21h.01M13 21.8h.01M16.5 21h.01" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M3 9h13M3 13h17M3 17h11" />
    </svg>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xs text-faint">{label}</p>
      <p className="text-xs font-semibold text-ink">{value}</p>
    </div>
  )
}

/** Keeps the forecast in sync with `city`/`apiKey` and refreshes it on a timer. */
function useWeather(city: string, apiKey: string) {
  const initial = () => ({ status: (apiKey ? 'loading' : 'unconfigured') as Status, data: null as WeatherData | null })
  const [state, setState] = useState(initial)
  const [request, setRequest] = useState(`${city}|${apiKey}`)

  // Reset during render rather than in an effect, so a prop change never shows stale data.
  if (request !== `${city}|${apiKey}`) {
    setRequest(`${city}|${apiKey}`)
    setState(initial)
  }

  useEffect(() => {
    if (!apiKey) return
    let cancelled = false

    async function load() {
      try {
        const data = await fetchWeather(city, apiKey)
        if (!cancelled) setState({ status: 'ok', data })
      } catch {
        if (!cancelled) setState(prev => ({ status: 'error', data: prev.data }))
      }
    }

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [city, apiKey])

  return state
}

export default function WeatherWidget({ city, apiKey }: Props) {
  const { status, data: weather } = useWeather(city, apiKey)

  return (
    <section className="card reveal p-5" style={{ animationDelay: '60ms' }} aria-label="Weather">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-base font-bold text-ink">Weather</h2>
          <p className="truncate text-xs text-mute">{weather?.city ?? city}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ember-tint text-ember-deep">
          <WeatherGlyph code={weather?.icon ?? '03d'} />
        </span>
      </div>

      {status === 'loading' && <p className="mt-5 text-sm text-mute">Loading forecast…</p>}

      {status === 'error' && (
        <p className="mt-5 text-sm text-crimson">Weather unavailable. Check your connection and it will retry shortly.</p>
      )}

      {status === 'unconfigured' && (
        <p className="mt-5 text-sm text-mute">
          Add <code className="rounded bg-paper px-1 py-0.5 text-2xs text-ink">VITE_WEATHER_API_KEY</code> to your{' '}
          <code className="rounded bg-paper px-1 py-0.5 text-2xs text-ink">.env</code> to show the forecast.
        </p>
      )}

      {status === 'ok' && weather && (
        <>
          <p className="mt-3 font-display text-3xl font-bold tabular-nums text-ink">
            {weather.temp}
            <span className="align-top text-lg text-crimson">°C</span>
          </p>
          <p className="text-sm text-mute first-letter:uppercase">{weather.description}</p>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
            <Stat label="Feels like" value={`${weather.feelsLike}°`} />
            <Stat label="Humidity" value={weather.humidity != null ? `${weather.humidity}%` : '—'} />
            <Stat label="Wind" value={weather.wind != null ? `${weather.wind} km/h` : '—'} />
          </div>
        </>
      )}
    </section>
  )
}
