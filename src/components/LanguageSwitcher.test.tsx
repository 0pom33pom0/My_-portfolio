import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '../i18n/index.ts'
import { LanguageSwitcher } from './LanguageSwitcher.tsx'

describe('LanguageSwitcher (FR-004/005/006)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('renders both options inside a labeled group, active one pressed', () => {
    render(<LanguageSwitcher />)
    const group = screen.getByRole('group', { name: 'Language' })
    const enButton = screen.getByRole('button', { name: 'Switch to English' })
    const thButton = screen.getByRole('button', { name: 'Switch to Thai' })
    expect(group).toContainElement(enButton)
    expect(enButton).toHaveAttribute('aria-pressed', 'true')
    expect(thButton).toHaveAttribute('aria-pressed', 'false')
  })

  it('switching to Thai updates i18n, <html lang>, localStorage, and its own labels', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByRole('button', { name: 'Switch to Thai' }))

    expect(i18n.resolvedLanguage).toBe('th')
    expect(document.documentElement.lang).toBe('th')
    expect(window.localStorage.getItem('i18nextLng')).toBe('th')
    expect(
      screen.getByRole('button', { name: 'เปลี่ยนเป็นภาษาไทย' }),
    ).toHaveAttribute('aria-pressed', 'true')
    expect(
      screen.getByRole('button', { name: 'เปลี่ยนเป็นภาษาอังกฤษ' }),
    ).toHaveAttribute('aria-pressed', 'false')
  })

  it('switches back to English without a reload', async () => {
    const user = userEvent.setup()
    render(<LanguageSwitcher />)

    await user.click(screen.getByRole('button', { name: 'Switch to Thai' }))
    await user.click(
      screen.getByRole('button', { name: 'เปลี่ยนเป็นภาษาอังกฤษ' }),
    )

    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.lang).toBe('en')
    expect(window.localStorage.getItem('i18nextLng')).toBe('en')
  })
})
