import { config } from '../config'

export default function ProfileCard() {
  const { profile } = config

  return (
    <div className="card p-4 animate-fade-up delay-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base flex-shrink-0"
            style={{ background: `linear-gradient(135deg, ${profile.avatarColor ?? '#C24448'}, #7D585D)` }}
          >
            {profile.username[0]}
          </div>
          <div>
            <p className="text-ink text-[14px] font-black leading-tight">{profile.username}</p>
            <p className="text-[11px] font-semibold text-blush-400">{profile.handle}</p>
          </div>
        </div>

        <button className="w-7 h-7 flex flex-col items-center justify-center gap-[3px] rounded-lg hover:bg-blush-100 transition-all">
          {[0, 1, 2].map(i => (
            <span key={i} className="w-1 h-1 rounded-full bg-blush-300" />
          ))}
        </button>
      </div>

      <p className="text-[12px] font-medium leading-relaxed mb-3 text-blush-600">
        {profile.bio}
      </p>

      <button className="w-full py-2 rounded-full text-white text-[12px] font-black flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-br from-crimson to-crimson-dark shadow-[0_4px_14px_rgba(194,68,72,0.4)]">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        View Profile
      </button>
    </div>
  )
}
