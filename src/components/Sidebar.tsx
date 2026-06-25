import { useState } from 'react'
import { config } from '../config'

const NAV_ITEMS = [
  {
    label: 'Home',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    label: 'Liked',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
        <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
      </svg>
    ),
    defaultActive: true,
  },
  {
    label: 'Comment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: 'Share',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    label: 'Favorite',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
  },
  {
    label: 'Save',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
      </svg>
    ),
  },
]

export default function Sidebar() {
  const [active, setActive] = useState('Liked')
  const [imgError, setImgError] = useState(false)

  return (
    <aside
      className="w-[200px] shrink-0 bg-white rounded-[24px] flex flex-col py-5 px-3 animate-slide-in"
      style={{ boxShadow: '0 4px 32px rgba(194,68,72,0.12), 0 1px 6px rgba(0,0,0,0.05)' }}
    >
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 pb-4 mb-2">
        <div
          className="w-14 h-14 rounded-full overflow-hidden border-[3px] flex items-center justify-center"
          style={{ borderColor: '#C24448', background: 'linear-gradient(135deg, #C24448, #7D585D)' }}
        >
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
          <h2 className="font-black text-[#1a2a3a] text-base leading-tight font-display">
            {config.character.name}.
          </h2>
          <div className="flex items-center justify-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <p className="text-[10px] text-gray-400 font-semibold">Online</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 flex-1">
        {NAV_ITEMS.map((item, i) => {
          const isActive = active === item.label
          return (
            <button
              key={item.label}
              onClick={() => setActive(item.label)}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-full text-[13px] font-bold transition-all duration-200 animate-fade-up"
              style={{
                animationDelay: `${i * 0.06}s`,
                background: isActive ? 'linear-gradient(135deg, #C24448, #A03038)' : 'transparent',
                color: isActive ? '#fff' : '#7D585D',
                boxShadow: isActive ? '0 4px 14px rgba(194,68,72,0.35)' : 'none',
              }}
            >
              <span className="w-[18px] h-[18px] flex-shrink-0" style={{ color: isActive ? '#fff' : '#B07878' }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Bottom controls */}
      <div className="mt-3 flex flex-col gap-2">
        <button
          className="w-full py-2.5 rounded-full text-[#5F4F5D] text-[12px] font-black flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, #F7C964, #F5D048)',
            boxShadow: '0 4px 14px rgba(247,201,100,0.45)',
          }}
        >
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
              className="w-9 h-9 rounded-[10px] flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              style={
                i === 2
                  ? { background: 'linear-gradient(135deg, #C24448, #A03038)', color: '#fff', boxShadow: '0 3px 10px rgba(194,68,72,0.4)' }
                  : { background: '#fdf0f0', color: '#B07878' }
              }
            >
              <span className="w-4 h-4">{icon}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
