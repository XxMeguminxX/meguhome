import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import ClockWidget from './ClockWidget'

describe('ClockWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-04T14:30:45'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders current time in HH:MM:SS format', () => {
    render(<ClockWidget />)
    expect(screen.getByText('14:30:45')).toBeInTheDocument()
  })

  it('renders current date with weekday and month', () => {
    render(<ClockWidget />)
    expect(screen.getByText(/Thursday/)).toBeInTheDocument()
    expect(screen.getByText(/June/)).toBeInTheDocument()
  })

  it('updates time every second', () => {
    render(<ClockWidget />)
    expect(screen.getByText('14:30:45')).toBeInTheDocument()
    act(() => { vi.advanceTimersByTime(1000) })
    expect(screen.getByText('14:30:46')).toBeInTheDocument()
  })
})
