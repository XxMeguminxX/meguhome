const THUMBNAILS = [
  { bg: 'linear-gradient(135deg, #C24448, #7D585D)' },
  { bg: 'linear-gradient(135deg, #F7C964, #F0A830)' },
  { bg: 'linear-gradient(135deg, #5F4F5D, #3D2F3A)' },
  { bg: 'linear-gradient(135deg, #7D585D, #5F4F5D)' },
  { bg: 'linear-gradient(135deg, #A03038, #C24448)' },
]

export default function CollectionCard() {
  return (
    <div className="card p-4 animate-fade-up delay-150">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[40px] font-black leading-none font-display" style={{ color: '#1a2a3a' }}>
            01.
          </p>
          <p className="text-[13px] font-black" style={{ color: '#1a2a3a' }}>Megu Collection</p>
          <p className="text-[11px] font-semibold" style={{ color: '#B07878' }}>Arch Wizard Album</p>
        </div>

        <button
          className="w-8 h-8 rounded-full flex items-center justify-center text-[#5F4F5D] transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #F7C964, #F5D048)',
            boxShadow: '0 3px 10px rgba(247,201,100,0.45)',
          }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Thumbnails grid */}
      <div className="grid grid-cols-3 gap-2">
        {THUMBNAILS.map((t, i) => (
          <div
            key={i}
            className="aspect-square rounded-[10px] cursor-pointer transition-all hover:scale-[1.04] hover:shadow-md overflow-hidden"
            style={{ background: t.bg }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white/50" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h4l1.5-2h5L17 5h2a2 2 0 012 2z" />
                <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" />
              </svg>
            </div>
          </div>
        ))}

        {/* Plus button */}
        <button
          className="aspect-square rounded-[10px] flex items-center justify-center transition-all hover:scale-[1.04] border-2 border-dashed"
          style={{ borderColor: '#EDD8D4' }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#C24448'; (e.currentTarget as HTMLButtonElement).style.background = '#fdf0f0' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#EDD8D4'; (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
        >
          <svg className="w-5 h-5" style={{ color: '#C8A0A0' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
