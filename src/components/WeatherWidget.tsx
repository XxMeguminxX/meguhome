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
    temp: Math.floor(data.main.temp),
    icon: data.weather[0].icon,
    city: data.name,
  }
}

export default function WeatherWidget({ city, apiKey }: Props) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [isNightMode, setIsNightMode] = useState(false)

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

  const displayCity = status === 'ok' && weather ? weather.city : city
  const displayTemp = status === 'ok' && weather ? weather.temp : 30
  const displayDesc = status === 'ok' && weather ? weather.description : ''

  return (
    <div className={`card p-5 animate-fade-up ${isNightMode ? 'bg-gradient-to-br from-blush-900 to-blush-800' : 'bg-white'}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className={`text-[22px] font-black font-display leading-none ${isNightMode ? 'text-white' : 'text-ink'}`}>
            Weather.
          </p>
          {status === 'loading' && (
            <p className="text-[12px] font-semibold mt-0.5 text-blush-400">Loading...</p>
          )}
          {status === 'error' && (
            <p className="text-[12px] font-semibold mt-0.5 text-crimson">Cuaca tidak tersedia</p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isNightMode ? 'bg-white/[0.08]' : 'bg-blush-100'}`}>
          {isNightMode ? '🌙' : '☁️'}
        </div>
      </div>

      <p className={`text-[44px] font-black font-display leading-none mb-1 ${isNightMode ? 'text-white' : 'text-ink'}`}>
        {displayTemp}°c
      </p>

      <div className="flex items-center gap-1 mb-0.5">
        <svg className={`w-3.5 h-3.5 flex-shrink-0 ${isNightMode ? 'text-blush-300' : 'text-blush-400'}`} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p className={`text-[12px] font-bold ${isNightMode ? 'text-blush-300' : 'text-blush-400'}`}>
          {displayCity}
        </p>
      </div>
      {displayDesc && (
        <p className={`text-[11px] font-medium mb-1 capitalize ${isNightMode ? 'text-blush-500' : 'text-blush-300'}`}>
          {displayDesc}
        </p>
      )}

      <div className="flex items-center gap-2 mt-3">
        <button
          onClick={() => setIsNightMode(false)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black transition-all ${
            !isNightMode
              ? 'bg-gradient-to-br from-ember-light to-ember text-blush-700 shadow-[0_3px_10px_rgba(247,201,100,0.5)]'
              : 'bg-white/[0.08] text-blush-300'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          light mode
        </button>

        <button
          onClick={() => setIsNightMode(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black transition-all ${
            isNightMode
              ? 'bg-gradient-to-br from-blush-700 to-blush-800 text-white shadow-[0_3px_10px_rgba(95,79,93,0.5)]'
              : 'bg-blush-100 text-blush-400'
          }`}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          Night mode
        </button>
      </div>
    </div>
  )
}
