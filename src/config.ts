import type { AppConfig } from './types'

export const config: AppConfig = {
  site: {
    title: 'Mihome',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'Links', href: '#links' },
      { label: 'About', href: '#about' },
    ],
  },
  character: {
    name: 'Megumin',
    subtitle: 'Arch Wizard · Crimson Demons',
    description:
      'Megumin (めぐみん) is an Arch Wizard of the Crimson Demons in the Parallel World, and was the first person to join Kazuma\'s party. She is one of the main heroines of KonoSuba and protagonist of the Explosion spinoff series.',
    imagePath: '/megumin.png',
    readMoreContent:
      'Megumin is also Chomusuke\'s owner. Despite being an Arch Wizard, she only uses Explosion magic — the most powerful spell — which leaves her completely drained after a single cast. Her obsession with explosions is legendary, and she refuses to learn any other magic.',
  },
  profile: {
    username: 'Megumin',
    handle: '@archmegumin',
    bio: 'Frontend developer & anime enthusiast. Building things that spark joy ✨',
    avatarColor: '#C24448',
  },
  weather: {
    city: 'Ngawi',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY ?? '',
  },
  quickLinks: [
    { label: 'GitHub', url: 'https://github.com', icon: '⌨️' },
    { label: 'Notion', url: 'https://notion.so', icon: '📝' },
    { label: 'YouTube', url: 'https://youtube.com', icon: '▶️' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
  ],
}
