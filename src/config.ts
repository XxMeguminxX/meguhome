import type { AppConfig } from './types'

export const config: AppConfig = {
  site: {
    title: 'Meguhome',
    navLinks: [
      { label: 'Home', href: '#home', icon: 'home' },
      { label: 'Collection', href: '#collection', icon: 'collection' },
      { label: 'Links', href: '#links', icon: 'links' },
    ],
  },
  character: {
    name: 'Megumin',
    subtitle: 'Arch Wizard of the Crimson Demons',
    description:
      "Megumin (めぐみん) is an Arch Wizard of the Crimson Demons in the Parallel World, and the first person to join Kazuma's party. She is one of the main heroines of KonoSuba and the protagonist of the Explosion spinoff series.",
    imagePath: '/megumin.png',
    readMoreContent:
      'She is also Chomusuke’s owner. Despite being an Arch Wizard, she casts only Explosion — the single most powerful spell — which leaves her completely drained after one use. She refuses to learn anything else.',
  },
  profile: {
    username: 'Megumin',
    handle: '@archmegumin',
    bio: 'Frontend developer and anime enthusiast. Building things that spark joy.',
    url: 'https://github.com',
    avatarColor: '#C1394A',
  },
  weather: {
    city: 'Ngawi',
    apiKey: import.meta.env.VITE_WEATHER_API_KEY ?? '',
  },
  quickLinks: [
    { label: 'GitHub', url: 'https://github.com', icon: '⌨' },
    { label: 'Notion', url: 'https://notion.so', icon: '✎' },
    { label: 'YouTube', url: 'https://youtube.com', icon: '▷' },
    { label: 'Twitter', url: 'https://twitter.com', icon: '✳' },
  ],
}
