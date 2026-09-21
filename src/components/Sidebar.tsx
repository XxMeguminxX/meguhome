import { useState } from 'react'
import type { ReactNode } from 'react'
import { config } from '../config'
import type { NavIcon } from '../types'

const NAV_ICONS: Record<NavIcon, ReactNode> = {
  home: (
    <>
      <path d="M3 9.5 12 3l9 6.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20Z" />
      <path d="M9.5 21.5v-7h5v7" />
    </>
  ),
  collection: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="m21 15-4.5-4.5L6 21" />
    </>
  ),
  links: (
    <>
      <path d="M10 13a4.5 4.5 0 0 0 6.5.3l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4l-1.4 1.4" />
      <path d="M14 11a4.5 4.5 0 0 0-6.5-.3l-2.6 2.6a4.5 4.5 0 0 0 6.4 6.4l1.4-1.4" />
    </>
  ),
}

function NavGlyph({ icon }: { icon: NavIcon }) {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {NAV_ICONS[icon]}
    </svg>
  )
}

export default function Sidebar() {
  const [active, setActive] = useState(config.site.navLinks[0].label)
  const [imgError, setImgError] = useState(false)
  const { character, site } = config

  return (
    <aside className="card reveal flex shrink-0 flex-col rounded-panel p-4 lg:w-[212px] lg:p-5">
      <div className="flex items-center gap-3 lg:flex-col lg:gap-2.5 lg:pb-5 lg:text-center">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-crimson-tint ring-2 ring-crimson/25 lg:h-16 lg:w-16">
          {imgError ? (
            <span className="flex h-full w-full items-center justify-center font-display text-lg font-bold text-crimson">
              {character.name[0]}
            </span>
          ) : (
            <img
              src={character.imagePath}
              alt=""
              onError={() => setImgError(true)}
              className="h-full w-full object-cover object-top"
            />
          )}
        </div>

        <div className="min-w-0 lg:w-full">
          <p className="truncate font-display text-base font-bold text-ink">{character.name}</p>
          <p className="flex items-center gap-1.5 text-2xs text-mute lg:justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            Online
          </p>
        </div>
      </div>

      <nav aria-label="Sections" className="mt-4 flex gap-1 overflow-x-auto lg:mt-0 lg:flex-col lg:overflow-visible lg:border-t lg:border-line lg:pt-4">
        {site.navLinks.map(item => {
          const isActive = active === item.label
          return (
            <a
              key={item.label}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-2.5 whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                isActive ? 'bg-crimson text-white' : 'text-mute hover:bg-paper hover:text-ink'
              }`}
            >
              <NavGlyph icon={item.icon} />
              {item.label}
            </a>
          )
        })}
      </nav>

      <p className="mt-auto hidden border-t border-line pt-4 text-2xs leading-relaxed text-faint lg:block">
        {character.subtitle}
      </p>
    </aside>
  )
}
