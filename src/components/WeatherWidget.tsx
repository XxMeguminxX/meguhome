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
      <div className="bg-[#74B9FF] border-2 border-[#1a1a2e] rounded-2xl p-4 shadow-[4px_4px_0px_#1a1a2e]">
        <span className="text-[#1a1a2e]/70 text-sm font-medium">Loading...</span>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="bg-[#74B9FF] border-2 border-[#1a1a2e] rounded-2xl p-4 shadow-[4px_4px_0px_#1a1a2e]">
        <span className="text-[#1a1a2e]/70 text-sm font-medium">Cuaca tidak tersedia</span>
      </div>
    )
  }

  return (
    <div className="bg-[#74B9FF] border-2 border-[#1a1a2e] rounded-2xl p-4 shadow-[4px_4px_0px_#1a1a2e] flex items-center gap-3">
      <img
        src={`https://openweathermap.org/img/wn/${weather!.icon}@2x.png`}
        alt={weather!.description}
        className="w-12 h-12"
      />
      <div>
        <div className="text-2xl font-black text-[#1a1a2e]">{weather!.temp}°C</div>
        <div className="text-xs text-[#1a1a2e]/70 font-medium capitalize">{weather!.description}</div>
        <div className="text-xs text-violet-700 font-bold">{weather!.city}</div>
      </div>
    </div>
  )
}
