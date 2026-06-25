import { useState } from 'react'

const FILTERS = ['BUY', 'TRADE', 'SWAP', 'GO']

const FEED_ITEMS = [
  {
    id: 1,
    title: 'Trending Collection',
    subtitle: 'View top picks today',
    gradient: 'linear-gradient(135deg, #C24448 0%, #7D585D 100%)',
    avatar: 'T',
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Fresh drops this week',
    gradient: 'linear-gradient(135deg, #7D585D 0%, #5F4F5D 100%)',
    avatar: 'N',
  },
]

export default function FilterCard() {
  const [active, setActive] = useState('TRADE')

  return (
    <div className="card p-4 flex flex-col gap-3 animate-fade-up delay-100">
      {/* Filter pills */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className="px-4 py-1.5 rounded-full text-[12px] font-black transition-all"
            style={
              active === f
                ? {
                    background: 'linear-gradient(135deg, #C24448, #7D585D)',
                    color: '#fff',
                    boxShadow: '0 3px 10px rgba(194,68,72,0.35)',
                  }
                : {
                    background: '#fdf0f0',
                    color: '#B07878',
                    border: '1.5px solid #EDD8D4',
                  }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Feed items */}
      <div className="flex flex-col gap-2">
        {FEED_ITEMS.map(item => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-[14px] cursor-pointer transition-all hover:scale-[1.01]"
            style={{ background: item.gradient }}
          >
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-base text-white flex-shrink-0">
              {item.avatar}
            </div>
            <div>
              <p className="text-white text-[13px] font-black leading-tight">{item.title}</p>
              <p className="text-white/75 text-[11px] font-medium">{item.subtitle}</p>
            </div>
            <div className="ml-auto">
              <svg className="w-4 h-4 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
