import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import WeatherWidget from './WeatherWidget'

const mockWeatherResponse = {
  weather: [{ description: 'clear sky', icon: '01d' }],
  main: { temp: 30.5, feels_like: 33.2, humidity: 74 },
  wind: { speed: 3 },
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
      expect(screen.getByText('31')).toBeInTheDocument()
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
    })
    expect(screen.getByText('33°')).toBeInTheDocument()
    expect(screen.getByText('74%')).toBeInTheDocument()
    expect(screen.getByText('11 km/h')).toBeInTheDocument()
  })

  it('falls back to a dash when the response omits optional fields', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        weather: [{ description: 'clear sky', icon: '01d' }],
        main: { temp: 28 },
        name: 'Jakarta',
      }),
    } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => expect(screen.getByText('28')).toBeInTheDocument())
    expect(screen.getAllByText('—')).toHaveLength(2)
  })

  it('shows error state when fetch throws', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'))
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/weather unavailable/i)).toBeInTheDocument()
    })
  })

  it('shows error state when response is not ok', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({ ok: false } as Response)
    render(<WeatherWidget city="Jakarta" apiKey="test-key" />)
    await waitFor(() => {
      expect(screen.getByText(/weather unavailable/i)).toBeInTheDocument()
    })
  })

  it('asks for an API key instead of fetching when none is configured', () => {
    const fetchSpy = vi.spyOn(global, 'fetch')
    render(<WeatherWidget city="Jakarta" apiKey="" />)
    expect(screen.getByText(/VITE_WEATHER_API_KEY/)).toBeInTheDocument()
    expect(fetchSpy).not.toHaveBeenCalled()
  })
})
