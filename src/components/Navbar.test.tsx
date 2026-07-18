import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { Navbar } from './Navbar.tsx'

const SECTION_IDS = [
  'about',
  'education',
  'skills',
  'projects',
  'certificates',
  'gallery',
  'contact',
] as const

describe('Navbar (FR-007/008)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders brand plus the six section links with correct hrefs (EN)', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: en.a11y.primaryNav })
    for (const id of SECTION_IDS) {
      expect(
        within(nav).getByRole('link', { name: en.nav[id] }),
      ).toHaveAttribute('href', `#${id}`)
    }
    expect(screen.getByRole('link', { name: en.nav.brand })).toBeInTheDocument()
  })

  it('renders localized links after switching to Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Navbar />)
    const nav = screen.getByRole('navigation', { name: th.a11y.primaryNav })
    for (const id of SECTION_IDS) {
      expect(
        within(nav).getByRole('link', { name: th.nav[id] }),
      ).toHaveAttribute('href', `#${id}`)
    }
  })

  it('hamburger opens the mobile panel, reflects aria-expanded, and closes on link click', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: en.a11y.openMenu })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    // Only the desktop link exists while the panel is closed.
    expect(screen.getAllByRole('link', { name: en.nav.about })).toHaveLength(1)

    await user.click(toggle)
    const closeButton = screen.getByRole('button', { name: en.a11y.closeMenu })
    expect(closeButton).toHaveAttribute('aria-expanded', 'true')
    const aboutLinks = screen.getAllByRole('link', { name: en.nav.about })
    expect(aboutLinks).toHaveLength(2)

    // Tapping a panel link closes the menu again.
    await user.click(aboutLinks[1])
    expect(
      screen.getByRole('button', { name: en.a11y.openMenu }),
    ).toHaveAttribute('aria-expanded', 'false')
    await waitFor(() =>
      expect(screen.getAllByRole('link', { name: en.nav.about })).toHaveLength(1),
    )
  })
})
