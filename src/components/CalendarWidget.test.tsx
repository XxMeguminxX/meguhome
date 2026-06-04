import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CalendarWidget from './CalendarWidget'

describe('CalendarWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-06-04'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders current month and year', () => {
    render(<CalendarWidget />)
    expect(screen.getByText(/June 2026/)).toBeInTheDocument()
  })

  it('renders day name headers', () => {
    render(<CalendarWidget />)
    expect(screen.getByText('Sun')).toBeInTheDocument()
    expect(screen.getByText('Sat')).toBeInTheDocument()
  })

  it('highlights today with lavender background', () => {
    render(<CalendarWidget />)
    // day 4 is today — find the cell with "4" that has the highlight class
    const cells = screen.getAllByText('4')
    const todayCell = cells.find(el => el.className.includes('bg-lavender'))
    expect(todayCell).toBeTruthy()
  })

  it('navigates to next month', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })
    render(<CalendarWidget />)
    fireEvent.click(screen.getByLabelText('Next month'))
    expect(screen.getByText(/July 2026/)).toBeInTheDocument()
  })

  it('navigates to previous month', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime.bind(vi) })
    render(<CalendarWidget />)
    fireEvent.click(screen.getByLabelText('Previous month'))
    expect(screen.getByText(/May 2026/)).toBeInTheDocument()
  })
})
