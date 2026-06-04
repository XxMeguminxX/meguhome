import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { config } from './config'

vi.spyOn(global, 'fetch').mockResolvedValue({
  ok: true,
  json: async () => ({
    weather: [{ description: 'clear sky', icon: '01d' }],
    main: { temp: 28 },
    name: 'Jakarta',
  }),
} as Response)

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.body).toBeTruthy()
  })

  it('renders character name from config', () => {
    render(<App />)
    expect(screen.getByText(config.character.name)).toBeInTheDocument()
  })

  it('renders nav link from config', () => {
    render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('renders quick links section', () => {
    render(<App />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
  })
})
