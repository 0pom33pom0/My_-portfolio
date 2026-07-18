import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { skillCategories } from '../data/skills.ts'
import { Skills } from './Skills.tsx'

describe('Skills (FR-014, AC-4.2)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders every category with localized titles and the exact badges', () => {
    render(<Skills />)

    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
      skillCategories.length,
    )
    for (const category of skillCategories) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: en.skills.categories[category.id],
        }),
      ).toBeInTheDocument()
      for (const skill of category.skills) {
        expect(screen.getByText(skill)).toBeInTheDocument()
      }
    }
  })

  it('localizes category titles in Thai while badge names stay untranslated', async () => {
    await i18n.changeLanguage('th')
    render(<Skills />)

    for (const category of skillCategories) {
      expect(
        screen.getByRole('heading', {
          level: 3,
          name: th.skills.categories[category.id],
        }),
      ).toBeInTheDocument()
    }
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('MedGemma')).toBeInTheDocument()
  })
})
