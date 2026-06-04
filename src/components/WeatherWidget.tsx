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
