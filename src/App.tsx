import { useState } from 'react'
import Sidebar from './components/Sidebar'
import DashboardHeader from './components/DashboardHeader'
import WeatherWidget from './components/WeatherWidget'
import ProfileCard from './components/ProfileCard'
import AboutCard from './components/AboutCard'
import CollectionCard from './components/CollectionCard'
import { config } from './config'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col gap-4 p-4 lg:flex-row xl:h-screen xl:overflow-hidden">
      <Sidebar />

      <main id="home" className="flex min-w-0 flex-1 flex-col gap-4 xl:overflow-y-auto xl:pr-1">
        <DashboardHeader />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <ProfileCard />
            <AboutCard />
          </div>

          <div className="flex flex-col gap-4">
            <WeatherWidget city={config.weather.city} apiKey={config.weather.apiKey} />
            <div id="collection" className="scroll-mt-4">
              <CollectionCard />
            </div>
          </div>
        </div>

        <section id="links" className="reveal scroll-mt-4 pb-2" style={{ animationDelay: '180ms' }}>
          <h2 className="mb-2 font-display text-sm font-bold text-ink">Pinned links</h2>
          <div className="flex flex-wrap gap-2">
            {config.quickLinks.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-mute transition-colors hover:border-crimson/40 hover:text-crimson"
              >
                {link.icon && (
                  <span aria-hidden="true" className="text-faint">
                    {link.icon}
                  </span>
                )}
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>

      <CharacterArt />
    </div>
  )
}

function CharacterArt() {
  const [imgError, setImgError] = useState(false)

  if (imgError) return null

  return (
    <div className="pointer-events-none hidden w-[240px] shrink-0 items-end justify-center xl:flex">
      <img
        src={config.character.imagePath}
        alt=""
        onError={() => setImgError(true)}
        className="drift h-auto max-h-[82vh] w-full object-contain drop-shadow-[0_18px_40px_rgba(193,57,74,0.28)]"
      />
    </div>
  )
}
