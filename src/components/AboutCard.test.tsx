import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AboutCard from './AboutCard'
import { config } from '../config'

describe('AboutCard', () => {
  it('reveals the extra description behind Read more', async () => {
    const user = userEvent.setup()
    render(<AboutCard />)

    expect(screen.queryByText(config.character.readMoreContent)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /read more/i }))
    expect(screen.getByText(config.character.readMoreContent)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /show less/i }))
    expect(screen.queryByText(config.character.readMoreContent)).not.toBeInTheDocument()
  })
})
