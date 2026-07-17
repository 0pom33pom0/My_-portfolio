import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { galleryItems } from '../data/gallery.ts'
import { Gallery } from './Gallery.tsx'

describe('Gallery (FR-017)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders six activity images with localized alt text and captions', () => {
    render(<Gallery />)
    expect(screen.getAllByRole('img')).toHaveLength(6)
    for (const item of galleryItems) {
      expect(
        screen.getByAltText(en.gallery.items[item.id].caption),
      ).toBeInTheDocument()
    }
  })

  it('localizes alt text in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Gallery />)
    for (const item of galleryItems) {
      expect(
        screen.getByAltText(th.gallery.items[item.id].caption),
      ).toBeInTheDocument()
    }
  })
})
