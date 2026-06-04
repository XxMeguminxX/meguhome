import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Navbar from './Navbar'
import { config } from '../config'

describe('Navbar', () => {
  it('renders site title', () => {
    render(<Navbar />)
    expect(screen.getByText(config.site.title)).toBeInTheDocument()
  })

  it('renders all nav links', () => {
    render(<Navbar />)
    config.site.navLinks.forEach(link => {
      expect(screen.getByText(link.label)).toBeInTheDocument()
    })
  })

  it('renders clock (font-mono element)', () => {
    render(<Navbar />)
    expect(document.querySelector('.font-mono')).toBeInTheDocument()
  })
})
