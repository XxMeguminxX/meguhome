import { useState } from 'react'
import { config } from '../config'

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '#home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    label: 'Collection',
    href: '#collection',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    label: 'Links',
    href: '#links',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07l-1.5 1.5" />
        <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.5-1.5" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const [active, setActive] = useState('Home')
  const [imgError, setImgError] = useState(false)

  return (
    <aside className="w-[200px] shrink-0 bg-white rounded-[24px] flex flex-col py-5 px-3 shadow-[0_4px_32px_rgba(194,68,72,0.12),0_1px_6px_rgba(0,0,0,0.05)] animate-slide-in">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 pb-4 mb-2">
        <div className="w-14 h-14 rounded-full overflow-hidden border-[3px] border-crimson bg-gradient-to-br from-crimson to-blush-600 flex items-center justify-center">
          {imgError ? (
            <span className="text-white text-2xl font-black font-display">
              {config.character.name[0]}
            </span>
          ) : (
            <img
              src={config.character.imagePath}
              alt={config.character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-top"
            />
          )}
        </div>
        <div className="text-center">
          <h2 className="font-black text-ink text-base leading-tight font-display">
            {config.character.name}.
          </h2>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <p className="text-[10px] text-blush-400 font-semibold">Online</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.label
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setActive(item.label)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 animate-fade-up ${
                isActive
                  ? 'bg-gradient-to-br from-crimson to-crimson-dark text-white shadow-[0_4px_14px_rgba(194,68,72,0.35)]'
                  : 'bg-transparent text-blush-600'
              }`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? 'text-white' : 'text-blush-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </a>
          )
        })}
      </nav>

      {/* Bottom controls */}
      <div className="mt-3 flex flex-col gap-2">
        <button className="w-full py-2.5 rounded-full text-blush-700 text-[12px] font-black flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-ember-light to-ember shadow-[0_4px_14px_rgba(247,201,100,0.45)]">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          Notifications
        </button>

        <div className="flex items-center justify-center gap-1.5">
          {[
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>,
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" /><circle cx="12" cy="13" r="4" /></svg>,
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
          ].map((icon, i) => (
            <button
              key={i}
              className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-all hover:scale-105 active:scale-95 ${
                i === 2
                  ? 'bg-gradient-to-br from-crimson to-crimson-dark text-white shadow-[0_3px_10px_rgba(194,68,72,0.4)]'
                  : 'bg-blush-100 text-blush-400'
              }`}
            >
              <span className="w-4 h-4">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
