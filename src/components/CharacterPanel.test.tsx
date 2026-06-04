import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CharacterPanel from './CharacterPanel'
import { config } from '../config'

describe('CharacterPanel', () => {
  it('renders character subtitle', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.subtitle)).toBeInTheDocument()
  })

  it('renders character name', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.name)).toBeInTheDocument()
  })

  it('renders character description', () => {
    render(<CharacterPanel />)
    expect(screen.getByText(config.character.description)).toBeInTheDocument()
  })

  it('renders Read More button', () => {
    render(<CharacterPanel />)
    expect(screen.getByRole('button', { name: /read more/i })).toBeInTheDocument()
  })

  it('opens modal when Read More is clicked', async () => {
    const user = userEvent.setup()
    render(<CharacterPanel />)
    await user.click(screen.getByRole('button', { name: /read more/i }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText(config.character.readMoreContent)).toBeInTheDocument()
  })

  it('closes modal when backdrop is clicked', async () => {
    const user = userEvent.setup()
    render(<CharacterPanel />)
    await user.click(screen.getByRole('button', { name: /read more/i }))
    await user.click(screen.getByTestId('modal-backdrop'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders character image', () => {
    render(<CharacterPanel />)
    expect(screen.getByRole('img', { name: config.character.name })).toBeInTheDocument()
  })
})
