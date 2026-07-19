import { fireEvent, render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { projects } from '../data/projects.ts'
import { Projects } from './Projects.tsx'

describe('Projects (FR-015, FR-024)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders three cards with localized titles and descriptions', () => {
    render(<Projects />)
    for (const project of projects) {
      const { title, description } = en.projects.items[project.id]
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument()
      expect(screen.getByText(description)).toBeInTheDocument()
    }
  })

  it('renders localized titles in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Projects />)
    for (const project of projects) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: th.projects.items[project.id].title,
        }),
      ).toBeInTheDocument()
    }
  })

  it('View Details links open the configured URL in a new tab with noopener', () => {
    render(<Projects />)
    const links = screen.getAllByRole('link', {
      name: new RegExp(en.projects.viewDetails),
    })
    expect(links).toHaveLength(projects.length)
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', projects[index].link)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('swaps a failing image for a neutral fallback (no broken icon)', () => {
    render(<Projects />)
    const title = en.projects.items.ehp.title
    const image = screen.getByAltText(title)

    fireEvent.error(image)

    expect(screen.queryByAltText(title)).not.toBeInTheDocument()
    expect(screen.getByRole('img', { name: title })).toBeInTheDocument()
  })
})
