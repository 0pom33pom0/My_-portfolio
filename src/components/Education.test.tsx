import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { Education } from './Education.tsx'

describe('Education section', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders the degree, school, period, and honors in English', () => {
    render(<Education />)
    const item = en.education.items.kku
    expect(
      screen.getByRole('heading', { level: 3, name: item.degree }),
    ).toBeInTheDocument()
    expect(screen.getByText(item.school)).toBeInTheDocument()
    expect(screen.getByText(item.field)).toBeInTheDocument()
    expect(screen.getByText(item.period)).toBeInTheDocument()
    expect(screen.getByText(item.honor)).toBeInTheDocument()
    expect(screen.getByAltText(item.imageAlt)).toBeInTheDocument()
  })

  it('renders the senior high school entry with its GPA badge', () => {
    render(<Education />)
    const item = en.education.items.kamphaeng
    expect(
      screen.getByRole('heading', { level: 3, name: item.degree }),
    ).toBeInTheDocument()
    expect(screen.getByText(item.school)).toBeInTheDocument()
    expect(screen.getByText(item.honor)).toBeInTheDocument()
    expect(screen.getByAltText(item.imageAlt)).toBeInTheDocument()
  })

  it('renders localized content in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Education />)
    const item = th.education.items.kku
    expect(
      screen.getByRole('heading', { level: 3, name: item.degree }),
    ).toBeInTheDocument()
    expect(screen.getByText(item.honor)).toBeInTheDocument()
    expect(
      screen.getByText(th.education.items.kamphaeng.school),
    ).toBeInTheDocument()
  })
})
