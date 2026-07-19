import { fireEvent, render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { projects } from '../data/projects.ts'
import { Projects } from './Projects.tsx'

describe('Projects marquee (FR-015, FR-024)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders every project card inside a labeled carousel region', () => {
    render(<Projects />)
    for (const project of projects) {
      const { title, description } = en.projects.items[project.id]
      // Clones are aria-hidden, so role queries only see the real set.
      expect(
        screen.getByRole('heading', { level: 3, name: title }),
      ).toBeInTheDocument()
      expect(screen.getAllByText(description).length).toBeGreaterThan(0)
    }
    expect(
      screen.getByRole('region', { name: en.a11y.projectsCarousel }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: en.a11y.nextProject }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: en.a11y.prevProject }),
    ).toBeInTheDocument()
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
    const [image] = screen.getAllByAltText(title)

    fireEvent.error(image)

    // The visible card now shows the styled fallback block instead.
    expect(screen.getByRole('img', { name: title })).toBeInTheDocument()
    // Only the aria-hidden clone keeps the original <img>.
    expect(screen.getAllByAltText(title)).toHaveLength(1)
  })
})
