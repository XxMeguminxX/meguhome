import type { QuickLink } from '../types'

interface Props {
  links: QuickLink[]
}

const PILL_COLORS = [
  'bg-[#FFE66D]',
  'bg-[#FF6B6B]',
  'bg-[#4ECDC4]',
  'bg-[#a29bfe]',
  'bg-[#fd79a8]',
  'bg-[#55efc4]',
]

export default function QuickLinks({ links }: Props) {
  return (
    <div className="flex flex-wrap gap-4">
      {links.map((link, index) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#1a1a2e] text-base font-black text-[#1a1a2e] shadow-[4px_4px_0px_#1a1a2e] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[1px_1px_0px_#1a1a2e] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${PILL_COLORS[index % PILL_COLORS.length]}`}
        >
          {link.icon && <span>{link.icon}</span>}
          {link.label}
        </a>
      ))}
    </div>
  )
}
