import { config } from '../config'
import ClockWidget from './ClockWidget'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 bg-white/40 backdrop-blur-md border-b border-white/30">
      <span className="font-serif font-bold text-lavender-500 text-lg">
        {config.site.title}
      </span>

      <ul className="flex gap-6">
        {config.site.navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-gray-600 hover:text-lavender-500 transition-colors"
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
