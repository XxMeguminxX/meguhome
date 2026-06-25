import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import FilterCard from './components/FilterCard'
import WeatherWidget from './components/WeatherWidget'
import ProfileCard from './components/ProfileCard'
import EventCard from './components/EventCard'
import CollectionCard from './components/CollectionCard'
import { config } from './config'

export default function App() {
  const [search, setSearch] = useState('')

  return (
    <div className="h-screen flex overflow-hidden p-4 gap-4">
      {/* Sidebar — fixed height, no scroll */}
      <Sidebar />

      {/* Main content — scrollable */}
      <main className="flex-1 flex flex-col gap-4 min-w-0 overflow-y-auto pr-1">
        <DashboardHeader search={search} onSearchChange={setSearch} />

        {/* Card grid — 2 equal columns */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-4">
            <FilterCard />
            <ProfileCard />
            <EventCard />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            <WeatherWidget city={config.weather.city} apiKey={config.weather.apiKey} />
            <CollectionCard />
          </div>
        </div>

        {/* Quick links */}
        <div id="links" className="pb-4">
          <p className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-2">Quick Access</p>
          <div className="flex flex-wrap gap-2">
            {config.quickLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-black text-gray-600 bg-white transition-all hover:scale-[1.03] hover:shadow-md"
                style={{ boxShadow: '0 2px 10px rgba(79,195,247,0.1)' }}
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
    <div
      className="flex-shrink-0 flex items-end justify-center pointer-events-none"
      style={{ width: 220 }}
    >
      {imgError ? (
        <div
          className="text-[100px] select-none animate-float mb-8"
          style={{ filter: 'drop-shadow(0 10px 40px rgba(79,195,247,0.3))' }}
        >
          ✦
        </div>
      ) : (
        <img
          src={config.character.imagePath}
          alt=""
          onError={() => setImgError(true)}
          className="w-full h-auto object-contain animate-float"
          style={{
            maxHeight: '80vh',
            filter: 'drop-shadow(0 12px 40px rgba(79,195,247,0.3))',
          }}
        />
      )}
    </div>
  )
}
