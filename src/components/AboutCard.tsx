import { useState } from 'react'
import { config } from '../config'

export default function AboutCard() {
  const [expanded, setExpanded] = useState(false)
  const { character } = config

  return (
    <section className="card reveal p-5" style={{ animationDelay: '120ms' }} aria-label="About">
      <h2 className="font-display text-base font-bold text-ink">{character.name}</h2>
      <p className="text-xs text-mute">{character.subtitle}</p>

      <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-mute">{character.description}</p>

      {expanded && (
        <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-mute">{character.readMoreContent}</p>
      )}

      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
        className="mt-3 text-xs font-semibold text-crimson underline-offset-4 hover:underline"
      >
        {expanded ? 'Show less' : 'Read more'}
      </button>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
        <div>
          <dt className="text-2xs text-faint">Signature spell</dt>
          <dd className="text-xs font-semibold text-ink">Explosion</dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">Clan</dt>
          <dd className="text-xs font-semibold text-ink">Crimson Demons</dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">Familiar</dt>
          <dd className="text-xs font-semibold text-ink">Chomusuke</dd>
        </div>
        <div>
          <dt className="text-2xs text-faint">Series</dt>
          <dd className="text-xs font-semibold text-ink">KonoSuba</dd>
        </div>
      </dl>
    </section>
  )
}
