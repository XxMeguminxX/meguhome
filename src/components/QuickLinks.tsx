import type { QuickLink } from '../types'

interface Props {
  links: QuickLink[]
}

export default function QuickLinks({ links }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {links.map(link => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur border border-white/50 text-sm text-gray-600 hover:bg-lavender-100 hover:text-lavender-500 transition-all shadow-sm"
        >
          {link.icon && <span>{link.icon}</span>}
          {link.label}
        </a>
      ))}
    </div>
  )
}
