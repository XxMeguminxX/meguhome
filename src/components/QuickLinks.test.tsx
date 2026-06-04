import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import QuickLinks from './QuickLinks'
import type { QuickLink } from '../types'

const links: QuickLink[] = [
  { label: 'GitHub', url: 'https://github.com', icon: '⌨️' },
  { label: 'Notion', url: 'https://notion.so', icon: '📝' },
]

describe('QuickLinks', () => {
  it('renders all link labels', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Notion')).toBeInTheDocument()
  })

  it('renders correct hrefs', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
      'href',
      'https://github.com'
    )
    expect(screen.getByRole('link', { name: /notion/i })).toHaveAttribute(
      'href',
      'https://notion.so'
    )
  })

  it('opens links in new tab with rel safety attributes', () => {
    render(<QuickLinks links={links} />)
    screen.getAllByRole('link').forEach(a => {
      expect(a).toHaveAttribute('target', '_blank')
      expect(a).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('renders icons when provided', () => {
    render(<QuickLinks links={links} />)
    expect(screen.getByText('⌨️')).toBeInTheDocument()
    expect(screen.getByText('📝')).toBeInTheDocument()
  })
})
