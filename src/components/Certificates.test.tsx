import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { certificates } from '../data/certificates.ts'
import { Certificates } from './Certificates.tsx'

describe('Certificates carousel (FR-016)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders three certificate slides with localized names', () => {
    render(<Certificates />)
    for (const certificate of certificates) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: en.certificates.items[certificate.id].name,
        }),
      ).toBeInTheDocument()
    }
    expect(
      screen.getByRole('region', { name: en.a11y.certificatesCarousel }),
    ).toBeInTheDocument()
  })

  it('formats issue dates for the active locale (Gregorian EN, Buddhist-era TH)', async () => {
    render(<Certificates />)
    expect(screen.getByText(/August 2023/)).toBeInTheDocument()

    await i18n.changeLanguage('th')
    expect(await screen.findByText(/สิงหาคม 2566/)).toBeInTheDocument()
  })

  it('arrow buttons scroll the region by one card with snap alignment', async () => {
    const user = userEvent.setup()
    render(<Certificates />)
    const region = screen.getByRole('region', {
      name: en.a11y.certificatesCarousel,
    })
    const scrollSpy = vi.fn()
    region.scrollBy = scrollSpy as HTMLElement['scrollBy']

    await user.click(
      screen.getByRole('button', { name: en.a11y.nextCertificate }),
    )
    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({ left: 320 }),
    )

    await user.click(
      screen.getByRole('button', { name: en.a11y.prevCertificate }),
    )
    expect(scrollSpy).toHaveBeenCalledWith(
      expect.objectContaining({ left: -320 }),
    )
  })

  it('localizes carousel controls in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Certificates />)
    expect(
      screen.getByRole('button', { name: th.a11y.nextCertificate }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('region', { name: th.a11y.certificatesCarousel }),
    ).toBeInTheDocument()
  })
})
