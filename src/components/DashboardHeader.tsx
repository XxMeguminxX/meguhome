import { useState } from 'react'

const PAGES = ['PAGE 1', 'PAGE 2', 'PAGE 3', 'PAGE 4', 'PAGE 5', 'PAGE 6']

interface Props {
  search: string
  onSearchChange: (v: string) => void
}

export default function DashboardHeader({ search, onSearchChange }: Props) {
  const [activePage, setActivePage] = useState('PAGE 2')

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      {/* Breadcrumb + page tabs */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold text-[#7D585D] tracking-widest uppercase opacity-70">
          DASHBOARD /&nbsp;
          <span style={{ color: '#C24448' }}>Megumin.</span>
        </p>

        <div className="flex items-center gap-1">
          {PAGES.map(page => (
            <button
              key={page}
              onClick={() => setActivePage(page)}
              className="relative px-2 py-1 text-[11px] font-bold transition-all"
              style={{ color: activePage === page ? '#C24448' : '#B07878' }}
            >
              {page}
              {activePage === page && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                  style={{ background: '#C24448' }}
                />
              )}
            </button>
          ))}

          <button className="ml-1 w-7 h-7 flex flex-col items-center justify-center gap-[4px] rounded-lg hover:bg-[#fdf0f0] transition-all">
            {[0, 1, 2].map(i => (
              <span key={i} className="w-4 h-[2px] rounded-full" style={{ background: '#B07878' }} />
            ))}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: '#C8A0A0' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-full text-[13px] font-semibold placeholder-[#C8A0A0] outline-none border transition-all"
          style={{
            background: '#fdf8f6',
            borderColor: '#EDD8D4',
            color: '#5F4F5D',
          }}
          onFocus={e => (e.target.style.borderColor = '#C24448')}
          onBlur={e => (e.target.style.borderColor = '#EDD8D4')}
        />
      </div>
    </div>
  )
}
