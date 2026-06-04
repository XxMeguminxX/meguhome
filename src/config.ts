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
    name: 'Shima Rin',
    subtitle: 'Character Info',
    description:
      'A young girl who enjoys solo camping in scenic locations. She prefers quiet adventures and the peace of nature over crowds.',
    imagePath: '/character.svg',
    readMoreContent:
      'Shima Rin is known for her love of solitude and the outdoors. She camps alone, brews her own coffee, and finds joy in simple moments under the open sky. Over time, she discovers that sharing these experiences with friends can be just as rewarding.',
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
