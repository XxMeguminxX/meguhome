import { config } from '../config'
import ClockWidget from './ClockWidget'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white/20 backdrop-blur-md border-b border-white/30">
      <span className="font-black text-white drop-shadow text-xl">
        {config.site.title}
      </span>

      <ul className="flex gap-6">
        {config.site.navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-bold text-white/90 hover:text-yellow-300 transition-colors drop-shadow"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <ClockWidget />
    </nav>
  )
}
