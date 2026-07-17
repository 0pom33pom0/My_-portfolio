import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import i18n from '../i18n/index.ts'
import en from '../i18n/locales/en.json'
import th from '../i18n/locales/th.json'
import { site, socialLinks } from '../config/site.ts'
import { Contact } from './Contact.tsx'
import { ContactForm } from './ContactForm.tsx'

const labels = en.contact.form.labels

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(labels.name), 'Somchai')
  await user.type(screen.getByLabelText(labels.email), 'somchai@example.com')
  await user.type(
    screen.getByLabelText(labels.message),
    'I would like to talk about a project.',
  )
}

describe('ContactForm (FR-018/020/021)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('shows localized per-field alerts with aria-invalid on empty submit', async () => {
    const user = userEvent.setup()
    render(<ContactForm submitDelayMs={0} />)

    await user.click(screen.getByRole('button', { name: en.contact.form.submit }))

    expect(screen.getAllByRole('alert')).toHaveLength(3)
    for (const key of ['nameRequired', 'emailRequired', 'messageRequired'] as const) {
      expect(screen.getByText(en.contact.form.errors[key])).toBeInTheDocument()
    }
    expect(screen.getByLabelText(labels.name)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(labels.email)).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByLabelText(labels.message)).toHaveAttribute('aria-invalid', 'true')
    expect(
      screen.queryByText(en.contact.form.success),
    ).not.toBeInTheDocument()
  })

  it('flags a malformed email, then clears errors on a corrected resubmit', async () => {
    const user = userEvent.setup()
    render(<ContactForm submitDelayMs={0} />)

    await user.type(screen.getByLabelText(labels.name), 'Somchai')
    await user.type(screen.getByLabelText(labels.email), 'not-an-email')
    await user.type(
      screen.getByLabelText(labels.message),
      'A perfectly long message.',
    )
    await user.click(screen.getByRole('button', { name: en.contact.form.submit }))

    expect(
      screen.getByText(en.contact.form.errors.emailInvalid),
    ).toBeInTheDocument()
    expect(screen.getByLabelText(labels.email)).toHaveAttribute('aria-invalid', 'true')

    await user.clear(screen.getByLabelText(labels.email))
    await user.type(screen.getByLabelText(labels.email), 'somchai@example.com')
    await user.click(screen.getByRole('button', { name: en.contact.form.submit }))

    expect(await screen.findByText(en.contact.form.success)).toBeInTheDocument()
    expect(screen.queryAllByRole('alert')).toHaveLength(0)
    expect(screen.getByLabelText(labels.email)).not.toHaveAttribute('aria-invalid')
  })

  it('disables the button with a progress label while submitting, then succeeds', async () => {
    const user = userEvent.setup()
    render(<ContactForm submitDelayMs={80} />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: en.contact.form.submit }))

    const submittingButton = await screen.findByRole('button', {
      name: en.contact.form.submitting,
    })
    expect(submittingButton).toBeDisabled()

    expect(await screen.findByText(en.contact.form.success)).toBeInTheDocument()
    // Successful submit clears the form.
    expect(screen.getByLabelText(labels.name)).toHaveValue('')
  })

  it('shows a localized error with retry and preserves input on simulated failure', async () => {
    const user = userEvent.setup()
    render(<ContactForm submitDelayMs={0} />)

    await user.type(screen.getByLabelText(labels.name), 'Somchai')
    await user.type(screen.getByLabelText(labels.email), 'somchai@example.com')
    // The simulated transport rejects when the message contains "error".
    await user.type(
      screen.getByLabelText(labels.message),
      'please error out for the test',
    )
    await user.click(screen.getByRole('button', { name: en.contact.form.submit }))

    const banner = await screen.findByRole('alert')
    expect(banner).toHaveTextContent(en.contact.form.error)
    expect(screen.getByLabelText(labels.name)).toHaveValue('Somchai')

    const retryButton = screen.getByRole('button', { name: en.contact.form.submit })
    expect(retryButton).toBeEnabled()

    await user.clear(screen.getByLabelText(labels.message))
    await user.type(
      screen.getByLabelText(labels.message),
      'All good now, thank you!',
    )
    await user.click(retryButton)
    expect(await screen.findByText(en.contact.form.success)).toBeInTheDocument()
  })

  it('renders localized errors in Thai', async () => {
    await i18n.changeLanguage('th')
    const user = userEvent.setup()
    render(<ContactForm submitDelayMs={0} />)

    await user.click(
      screen.getByRole('button', { name: th.contact.form.submit }),
    )
    expect(
      screen.getByText(th.contact.form.errors.nameRequired),
    ).toBeInTheDocument()
  })
})

describe('Contact section (FR-022, AC-8.5)', () => {
  beforeEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('shows the direct email and social links with safe attributes', () => {
    render(<Contact />)

    const emailLink = screen.getByRole('link', { name: site.email })
    expect(emailLink).toHaveAttribute('href', `mailto:${site.email}`)

    for (const social of socialLinks) {
      const link = screen.getByRole('link', { name: social.label })
      expect(link).toHaveAttribute('href', social.href)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('waits for form and heading to be localized in Thai', async () => {
    await i18n.changeLanguage('th')
    render(<Contact />)
    expect(
      screen.getByRole('heading', { name: th.contact.heading }),
    ).toBeInTheDocument()
    expect(screen.getByText(th.contact.intro)).toBeInTheDocument()
  })
})
