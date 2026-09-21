import { config } from '../config'

export default function ProfileCard() {
  const { profile } = config

  return (
    <section className="card reveal p-5" style={{ animationDelay: '30ms' }} aria-label="Profile">
      <div className="flex items-center gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-base font-bold text-white"
          style={{ background: `linear-gradient(140deg, ${profile.avatarColor ?? '#C1394A'}, #8E2333)` }}
          aria-hidden="true"
        >
          {profile.username[0]}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display text-base font-bold text-ink">{profile.username}</p>
          <p className="truncate text-xs text-mute">{profile.handle}</p>
        </div>
      </div>

      <p className="mt-3 max-w-[48ch] text-sm text-mute">{profile.bio}</p>

      <a
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-crimson px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-crimson-deep"
      >
        View profile
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-8.5 8.5" />
          <path d="M18 14v5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 19V8a1.5 1.5 0 0 1 1.5-1.5H10" />
        </svg>
      </a>
    </section>
  )
}
