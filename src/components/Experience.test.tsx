import { render, screen } from '@testing-library/react'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { Experience } from './Experience.tsx'

describe('Experience section', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders every position with role, company, period, and duties', () => {
    render(<Experience />)
    for (const item of Object.values(en.experience.items)) {
      expect(
        screen.getByRole('heading', { level: 3, name: item.role }),
      ).toBeInTheDocument()
      expect(screen.getByText(item.company)).toBeInTheDocument()
      expect(screen.getByText(item.period)).toBeInTheDocument()
      for (const duty of Object.values(item.duties)) {
        expect(screen.getByText(duty)).toBeInTheDocument()
      }
    }
  })

  it('renders localized content in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Experience />)
    const bms = th.experience.items.bms
    expect(
      screen.getByRole('heading', { level: 3, name: bms.role }),
    ).toBeInTheDocument()
    expect(screen.getByText(bms.company)).toBeInTheDocument()
    expect(screen.getByText(bms.duties.d1)).toBeInTheDocument()
    expect(
      screen.getByText(th.experience.items.winnertutor.company),
    ).toBeInTheDocument()
  })
})
