import { describe, it, expect } from 'vitest'
import { config } from './config'

describe('config', () => {
  it('has character with required fields', () => {
    expect(config.character.name).toBeTruthy()
    expect(config.character.subtitle).toBeTruthy()
    expect(config.character.description).toBeTruthy()
    expect(config.character.imagePath).toBeTruthy()
    expect(config.character.readMoreContent).toBeTruthy()
  })

  it('has weather config with city', () => {
    expect(config.weather.city).toBeTruthy()
  })

  it('has at least one quick link with label and url', () => {
    expect(config.quickLinks.length).toBeGreaterThan(0)
    expect(config.quickLinks[0].label).toBeTruthy()
    expect(config.quickLinks[0].url).toBeTruthy()
  })

  it('has site config with title and nav links', () => {
    expect(config.site.title).toBeTruthy()
    expect(config.site.navLinks.length).toBeGreaterThan(0)
    config.site.navLinks.forEach(link => {
      expect(link.label).toBeTruthy()
      expect(link.href).toBeTruthy()
    })
  })
})
