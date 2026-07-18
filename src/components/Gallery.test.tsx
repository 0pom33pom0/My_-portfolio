import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { galleryItems } from '../data/gallery.ts'
import { Gallery } from './Gallery.tsx'

const enCaptions = en.gallery.items as Record<string, { caption: string }>
const thCaptions = th.gallery.items as Record<string, { caption: string }>

describe('Gallery (FR-017, auto-discovered photos)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders one image per discovered photo, each with an accessible name', () => {
    render(<Gallery />)
    expect(galleryItems.length).toBeGreaterThan(0)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(galleryItems.length)
    for (const image of images) {
      expect(image).toHaveAccessibleName()
    }
  })

  it('uses the localized caption when the filename has one', () => {
    render(<Gallery />)
    const keyed = galleryItems.filter((item) => enCaptions[item.id])
    expect(keyed.length).toBeGreaterThan(0)
    for (const item of keyed) {
      expect(
        screen.getByAltText(enCaptions[item.id].caption),
      ).toBeInTheDocument()
    }
  })

  it('localizes captions in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Gallery />)
    for (const item of galleryItems.filter((item) => thCaptions[item.id])) {
      expect(
        screen.getByAltText(thCaptions[item.id].caption),
      ).toBeInTheDocument()
    }
  })
})
