import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import WeatherWidget from './components/WeatherWidget'
import ProfileCard from './components/ProfileCard'
import EventCard from './components/EventCard'
import CollectionCard from './components/CollectionCard'
import { config } from './config'

export default function App() {
  return (
    <div className="h-screen flex overflow-hidden p-4 gap-4">
      {/* Sidebar — fixed height, no scroll */}
      <Sidebar />

      {/* Main content — scrollable */}
      <main className="flex-1 flex flex-col gap-4 min-w-0 overflow-y-auto pr-1">
        <div id="home">
          <DashboardHeader />
        </div>

        {/* Card grid — 2 equal columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <ProfileCard />
            <EventCard />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <WeatherWidget city={config.weather.city} apiKey={config.weather.apiKey} />
            <div id="collection">
              <CollectionCard />
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div id="links" className="pb-4">
          <p className="text-[10px] font-black text-blush-300 tracking-widest uppercase mb-2">Quick Access</p>
          <div className="flex flex-wrap gap-2">
            {config.quickLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-black text-blush-600 bg-white shadow-glow transition-all hover:scale-[1.03] hover:shadow-glow-lg"
              >
                {link.icon && <span>{link.icon}</span>}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </main>

      {/* Decorative character — right panel */}
      <CharacterDecoration />
    </div>
  )
}

function CharacterDecoration() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex-shrink-0 w-[220px] flex items-end justify-center pointer-events-none">
      {imgError ? (
        <div className="text-[100px] select-none animate-float mb-8 drop-shadow-[0_10px_40px_rgba(194,68,72,0.4)]">
          ✦
        </div>
      ) : (
        <img
          src={config.character.imagePath}
          alt=""
          onError={() => setImgError(true)}
          className="w-full max-h-[80vh] h-auto object-contain animate-float drop-shadow-[0_12px_40px_rgba(194,68,72,0.4)]"
        />
      )}
    </div>
  )
}
