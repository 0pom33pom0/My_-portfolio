import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { site } from '../config/site.ts'
import { Hero } from './Hero.tsx'

describe('Hero (FR-010/011/012)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders the exact localized headline, role line, and subtitle', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `${en.hero.greeting} ${en.hero.name}`,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(en.hero.role)).toBeInTheDocument()
    expect(screen.getByText(en.hero.subtitle)).toBeInTheDocument()
    expect(screen.getByAltText(en.hero.imageAlt)).toBeInTheDocument()
  })

  it('renders Thai strings after a language switch', async () => {
    await i18n.changeLanguage('th')
    render(<Hero />)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `${th.hero.greeting} ${th.hero.name}`,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(th.hero.role)).toBeInTheDocument()
  })

  it('links Download Resume to the English PDF in English mode', () => {
    render(<Hero />)
    const download = screen.getByRole('link', { name: en.hero.downloadResume })
    expect(download).toHaveAttribute('href', site.resumeUrlEn)
    expect(download).toHaveAttribute('download')
  })

  it('links Download Resume to the Thai PDF in Thai mode', async () => {
    await i18n.changeLanguage('th')
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: th.hero.downloadResume }),
    ).toHaveAttribute('href', site.resumeUrl)
  })

  it('links View Projects to the #projects anchor', () => {
    render(<Hero />)
    expect(
      screen.getByRole('link', { name: en.hero.viewProjects }),
    ).toHaveAttribute('href', '#projects')
  })
})
