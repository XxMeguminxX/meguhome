import { useState } from 'react'
import { config } from '../config'

export default function EventCard() {
  const [imgError, setImgError] = useState(false)
  const { character } = config

  return (
    <div className="card overflow-hidden animate-fade-up delay-300" style={{ minHeight: 220 }}>
      {/* Header */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black tracking-widest uppercase text-blush-400">
            {character.subtitle}
          </p>
          <p className="text-[13px] font-black text-ink">
            {character.name} · KonoSuba
          </p>
        </div>
        <button className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black transition-all hover:scale-105 bg-gradient-to-br from-crimson to-crimson-dark">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Character area */}
      <div className="relative mx-3 min-h-[140px] rounded-[16px] overflow-hidden flex items-end justify-center bg-gradient-to-b from-blush-600 via-blush-800 to-blush-900">
        {/* Decorative sparkle circles */}
        <div className="absolute top-3 right-4 w-8 h-8 rounded-full bg-ember/15" />
        <div className="absolute top-7 right-10 w-4 h-4 rounded-full bg-ember/10" />
        <div className="absolute bottom-6 left-4 w-5 h-5 rounded-full bg-crimson/20" />

        {imgError ? (
          <div className="w-24 h-24 flex items-center justify-center text-5xl pb-2 animate-float">💥</div>
        ) : (
          <img
            src={character.imagePath}
            alt={character.name}
            onError={() => setImgError(true)}
            className="h-32 object-contain object-top animate-float drop-shadow-[0_4px_16px_rgba(194,68,72,0.4)]"
          />
        )}

        {/* Name tag */}
        <div className="absolute top-2 left-3 px-2 py-0.5 rounded-full bg-crimson/40 backdrop-blur-sm">
          <p className="text-white text-[10px] font-black">{character.name}</p>
        </div>

        {/* Gold accent tag */}
        <div className="absolute bottom-2 right-3 px-2 py-0.5 rounded-full bg-ember/25 backdrop-blur-sm">
          <p className="text-[10px] font-black text-ember-light">Arch Wizard ✦</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mx-3 mb-3 mt-2 rounded-[14px] p-3 flex items-center gap-3 bg-gradient-to-br from-crimson to-blush-600">
        <div className="flex flex-col items-center leading-none flex-shrink-0">
          <span className="text-white text-[18px] font-black">💥</span>
          <span className="text-white/70 text-[9px] font-bold uppercase tracking-wide mt-0.5">Explosion</span>
        </div>
        <div className="w-px h-8 bg-white/25" />
        <div>
          <p className="text-white text-[12px] font-black">Crimson Demons Clan</p>
          <p className="text-white/75 text-[10px] font-medium">Owner of Chomusuke · KonoSuba</p>
        </div>
      </div>
    </div>
  )
}
