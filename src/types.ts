export interface CharacterConfig {
  name: string
  subtitle: string
  description: string
  imagePath: string
  readMoreContent: string
  tenorPostId?: string
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

export interface NavLink {
  label: string
  href: string
}

export interface SiteConfig {
  title: string
  navLinks: NavLink[]
}

export interface ProfileConfig {
  username: string
  handle: string
  bio: string
  avatarColor?: string
}

export interface AppConfig {
  character: CharacterConfig
  weather: WeatherConfig
  quickLinks: QuickLink[]
  site: SiteConfig
  profile: ProfileConfig
}
