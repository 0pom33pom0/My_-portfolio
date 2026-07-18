import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { site } from '../config/site.ts'
import { Contact } from './Contact.tsx'

describe('Contact channels (FR-022, AC-8.5)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders every channel with a localized label', () => {
    render(<Contact />)
    for (const label of Object.values(en.contact.channels)) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('links email and phone directly (no new tab)', () => {
    render(<Contact />)
    const email = screen.getByRole('link', { name: new RegExp(site.email) })
    expect(email).toHaveAttribute('href', `mailto:${site.email}`)
    expect(email).not.toHaveAttribute('target')

    const phone = screen.getByRole('link', { name: /092-740-3227/ })
    expect(phone).toHaveAttribute('href', 'tel:+66927403227')
  })

  it('links LINE and socials externally with noopener', () => {
    render(<Contact />)
    const line = screen.getByRole('link', { name: /33120pom/ })
    expect(line).toHaveAttribute(
      'href',
      `https://line.me/ti/p/~${site.lineId}`,
    )

    const expectations: Array<[RegExp, string]> = [
      [/suracha\.hanthongchai/, site.facebookUrl],
      [/@manmini_pom/, site.instagramUrl],
      [/0pom33pom0/, site.githubUrl],
      [/suracha-hanthongchai/, site.linkedinUrl],
      [/pomdev/, site.w3profileUrl],
    ]
    for (const [name, href] of expectations) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('localizes the section in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Contact />)
    expect(
      screen.getByRole('heading', { name: th.contact.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(th.contact.intro)).toBeInTheDocument()
    expect(screen.getByText(th.contact.channels.phone)).toBeInTheDocument()
  })
})
