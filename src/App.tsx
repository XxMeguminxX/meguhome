import Navbar from './components/Navbar'
import CharacterPanel from './components/CharacterPanel'
import WeatherWidget from './components/WeatherWidget'
import CalendarWidget from './components/CalendarWidget'
import QuickLinks from './components/QuickLinks'
import { config } from './config'

export default function App() {
  return (
    <div className="bg-gradient-to-br from-violet-400 via-fuchsia-300 to-amber-200 relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-yellow-300 opacity-50 blur-3xl" style={{ animation: 'float-slow 9s ease-in-out infinite' }} />
        <div className="absolute top-1/3 -right-16 w-64 h-64 rounded-full bg-cyan-300 opacity-40 blur-3xl" style={{ animation: 'float-mid 11s ease-in-out infinite' }} />
        <div className="absolute bottom-0 left-1/3 w-56 h-56 rounded-full bg-pink-300 opacity-40 blur-3xl" style={{ animation: 'float-fast 7s ease-in-out infinite' }} />
      </div>

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
