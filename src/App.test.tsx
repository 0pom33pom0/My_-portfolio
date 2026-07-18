import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from './i18n/index.ts'
import en from './i18n/locales/en.json'
import th from './i18n/locales/th.json'
import App from './App.tsx'

const SECTION_IDS = [
  'about',
  'education',
  'skills',
  'projects',
  'certificates',
  'gallery',
  'contact',
] as const

const SECTION_HEADINGS = [
  'about',
  'education',
  'skills',
  'projects',
  'certificates',
  'gallery',
  'contact',
] as const

describe('App smoke (FR-001/002/009/013/023)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders all landmarks and exactly one h1', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getAllByRole('navigation').length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
    expect(container.querySelectorAll('h1')).toHaveLength(1)
  })

  it('renders every section id with localized headings and content in English', () => {
    const { container } = render(<App />)

    for (const id of SECTION_IDS) {
      expect(container.querySelector(`#${id}`)).not.toBeNull()
    }
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `${en.hero.greeting} ${en.hero.name}`,
      }),
    ).toBeInTheDocument()
    for (const section of SECTION_HEADINGS) {
      expect(
        screen.getByRole('heading', { level: 2, name: en[section].heading }),
      ).toBeInTheDocument()
    }
    expect(screen.getByText(en.about.bio1)).toBeInTheDocument()
    expect(screen.getByText(en.about.quote, { exact: false })).toBeInTheDocument()
    expect(
      screen.getByText(
        new RegExp(`© ${new Date().getFullYear()} Suracha Hanthongchai`),
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: en.footer.backToTop }),
    ).toHaveAttribute('href', '#top')
  })

  it('switches the entire page to Thai via the navbar toggle (FR-002/006)', async () => {
    render(<App />)
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: en.a11y.switchToThai }))

    expect(document.documentElement.lang).toBe('th')
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: `${th.hero.greeting} ${th.hero.name}`,
      }),
    ).toBeInTheDocument()
    for (const section of SECTION_HEADINGS) {
      expect(
        screen.getByRole('heading', { level: 2, name: th[section].heading }),
      ).toBeInTheDocument()
    }
    expect(screen.getByText(th.about.bio1)).toBeInTheDocument()
  })
})
