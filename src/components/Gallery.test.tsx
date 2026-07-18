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

  it('uses the localized caption when the filename has one', () => {
    render(<Gallery />)
    const keyed = galleryItems.filter((item) => enCaptions[item.id])
    expect(keyed.length).toBeGreaterThan(0)
    for (const item of keyed) {
      expect(
        screen.getAllByAltText(enCaptions[item.id].caption).length,
      ).toBeGreaterThan(0)
    }
  })

  it('localizes captions and controls in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Gallery />)
    for (const item of galleryItems.filter((item) => thCaptions[item.id])) {
      expect(
        screen.getAllByAltText(thCaptions[item.id].caption).length,
      ).toBeGreaterThan(0)
    }
    expect(
      screen.getByRole('region', { name: th.a11y.galleryCarousel }),
    ).toBeInTheDocument()
  })
})
