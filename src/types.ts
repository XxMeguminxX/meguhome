export interface CharacterConfig {
  name: string
  subtitle: string
  description: string
  imagePath: string
  readMoreContent: string
}

export interface WeatherConfig {
  city: string
  apiKey: string
}

export interface QuickLink {
  label: string
  url: string
  icon?: string
}

/** `icon` selects one of the glyphs defined in Sidebar. */
export type NavIcon = 'home' | 'collection' | 'links'

export interface NavLink {
  label: string
  href: string
  icon: NavIcon
}

export interface SiteConfig {
  title: string
  navLinks: NavLink[]
}

export interface ProfileConfig {
  username: string
  handle: string
  bio: string
  url: string
  avatarColor?: string
}

export interface AppConfig {
  character: CharacterConfig
  weather: WeatherConfig
  quickLinks: QuickLink[]
  site: SiteConfig
  profile: ProfileConfig
}
