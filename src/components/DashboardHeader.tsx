import { config } from '../config'

function greetingFor(hour: number) {
  if (hour < 5) return 'Still up'
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardHeader() {
  const now = new Date()

  return (
    <header className="reveal">
      <h1 className="font-display text-xl font-bold text-ink sm:text-2xl">
        {greetingFor(now.getHours())}, {config.profile.username}
      </h1>
      <p className="mt-0.5 text-sm text-mute">
        {now.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
    </header>
  )
}
