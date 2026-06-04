import type { AppConfig } from './types'

export const config: AppConfig = {
  site: {
    title: 'Home Dashboard',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'Links', href: '#links' },
      { label: 'About', href: '#about' },
    ],
  },
  character: {
    name: 'Osaka',
    subtitle: 'Character Info',
    description:
      'Ayumu Kasuga, nicknamed "Osaka", is a transfer student from Osaka known for her dreamy, slow-paced personality and unique way of thinking.',
    imagePath: '/character.svg',
    tenorPostId: '13422167952658823729',
    readMoreContent:
      'Osaka may seem out of it, but she often surprises everyone with unexpectedly deep observations. She daydreams constantly, speaks at her own pace, and has a talent for tongue twisters. Despite her airheaded reputation, she is sincere, kind, and quietly hilarious.',
  },
  weather: {
    city: 'Jakarta',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY ?? '',
  },
  quickLinks: [
    { label: 'GitHub', url: 'https://github.com', icon: '⌨️' },
    { label: 'Notion', url: 'https://notion.so', icon: '📝' },
    { label: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ],
}
