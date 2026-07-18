import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { galleryItems } from '../data/gallery.ts'
import { Gallery } from './Gallery.tsx'

const enCaptions = en.gallery.items as Record<string, { caption: string }>
const thCaptions = th.gallery.items as Record<string, { caption: string }>

describe('Gallery marquee (FR-017, auto-discovered photos)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders one visible slide per discovered photo inside a labeled region', () => {
    render(<Gallery />)
    expect(galleryItems.length).toBeGreaterThan(0)
    // Clones are aria-hidden, so role queries only see the real set.
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(galleryItems.length)
    for (const image of images) {
      expect(image).toHaveAccessibleName()
    }
    expect(
      screen.getByRole('region', { name: en.a11y.galleryCarousel }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: en.a11y.nextPhoto }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: en.a11y.prevPhoto }),
    ).toBeInTheDocument()
  })

  it('uses a per-file caption when one exists, else the generic localized alt', () => {
    render(<Gallery />)
    for (const item of galleryItems.filter((item) => enCaptions[item.id])) {
      expect(
        screen.getAllByAltText(enCaptions[item.id].caption).length,
      ).toBeGreaterThan(0)
    }
    const uncaptioned = galleryItems.filter((item) => !enCaptions[item.id])
    if (uncaptioned.length > 0) {
      const pattern = new RegExp(
        `^${en.gallery.defaultCaption.replace('{{number}}', '\\d+')}$`,
      )
      expect(screen.getAllByAltText(pattern).length).toBeGreaterThanOrEqual(
        uncaptioned.length,
      )
    }
  })

  it('localizes generic alts and controls in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Gallery />)
    const uncaptioned = galleryItems.filter((item) => !thCaptions[item.id])
    if (uncaptioned.length > 0) {
      const pattern = new RegExp(
        `^${th.gallery.defaultCaption.replace('{{number}}', '\\d+')}$`,
      )
      expect(screen.getAllByAltText(pattern).length).toBeGreaterThanOrEqual(
        uncaptioned.length,
      )
    }
    expect(
      screen.getByRole('region', { name: th.a11y.galleryCarousel }),
    ).toBeInTheDocument()
  })
})
