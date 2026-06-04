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
