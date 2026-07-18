import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { certificates } from '../data/certificates.ts'
import { Certificates } from './Certificates.tsx'

const enNames = en.certificates.items as Record<string, { name: string }>

function expectedDate(isoYearMonth: string, locale: string): string {
  const [year, month] = isoYearMonth.split('-').map(Number)
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, 1))
}

describe('Certificates carousel (FR-016, auto-discovered)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders one slide per discovered certificate inside a labeled region', () => {
    render(<Certificates />)
    expect(certificates.length).toBeGreaterThan(0)
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      certificates.length,
    )
    expect(
      screen.getByRole('region', { name: en.a11y.certificatesCarousel }),
    ).toBeInTheDocument()
  })

  it('shows localized names for certificates that have translation keys', () => {
    render(<Certificates />)
    const keyed = certificates.filter((certificate) => enNames[certificate.id])
    expect(keyed.length).toBeGreaterThan(0)
    for (const certificate of keyed) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: enNames[certificate.id].name,
        }),
      ).toBeInTheDocument()
    }
  })

  it('formats issue dates for the active locale (Gregorian EN, Buddhist-era TH)', async () => {
    const dated = certificates.find((certificate) => certificate.date)
    expect(dated).toBeDefined()
    if (!dated?.date) return

    render(<Certificates />)
    expect(
      screen.getAllByText(new RegExp(expectedDate(dated.date, 'en-GB'))).length,
    ).toBeGreaterThan(0)

    await i18n.changeLanguage('th')
    const thai = await screen.findAllByText(
      new RegExp(expectedDate(dated.date, 'th-TH')),
    )
    expect(thai.length).toBeGreaterThan(0)
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
