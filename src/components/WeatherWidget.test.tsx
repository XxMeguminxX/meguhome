import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import WeatherWidget from './WeatherWidget'

const mockWeatherResponse = {
  weather: [{ description: 'clear sky', icon: '01d' }],
  main: { temp: 30.5 },
  name: 'Jakarta',
}

describe('WeatherWidget', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('shows loading state initially', () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => new Promise(() => {}))
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('renders weather data on success', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse,
    } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText('Jakarta')).toBeInTheDocument()
      expect(screen.getByText(/30/)).toBeInTheDocument()
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    })
  })

  it('shows error state when fetch throws', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'))
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/cuaca tidak tersedia/i)).toBeInTheDocument()
    })
  })

  it('shows error state when response is not ok', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/cuaca tidak tersedia/i)).toBeInTheDocument()
    })
  })
})
