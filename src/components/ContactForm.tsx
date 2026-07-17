import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import type {
  ContactFormErrors,
  ContactFormValues,
  FormStatus,
} from '../data/types.ts'
import { validateContact } from '../lib/validateContact.ts'

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', message: '' }

/**
 * Simulated transport — no backend is in scope. Extension point: replace
 * this with a real POST (Formspree, EmailJS, own API) and keep the same
 * resolve/reject contract; nothing else in the form needs to change.
 * Deterministic failure for demos/tests: reject when the message contains
 * the word "error".
 */
function simulateSubmit(
  values: ContactFormValues,
  delayMs: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.message.toLowerCase().includes('error')) {
        reject(new Error('Simulated submission failure'))
      } else {
        resolve()
      }
    }, delayMs)
  })
}

interface ContactFormProps {
  /** Simulated network delay in ms; tests pass a small value. */
  submitDelayMs?: number
}

const fieldClass =
  'w-full rounded-xl bg-white/[0.04] px-4 py-3 text-zinc-100 ring-1 ring-white/10 transition placeholder:text-zinc-500 focus:ring-teal-300/50 focus:outline-none aria-[invalid]:ring-rose-400/60'

export function ContactForm({ submitDelayMs = 900 }: ContactFormProps) {
  const { t } = useTranslation()
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleChange =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')
    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setStatus('submitting')
    try {
      await simulateSubmit(values, submitDelayMs)
      setStatus('success')
      setValues(INITIAL_VALUES)
    } catch {
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  const renderError = (fieldId: string, errorKey?: string) =>
    errorKey ? (
      <p
        id={`${fieldId}-error`}
        role="alert"
        className="mt-1.5 text-sm text-rose-300"
      >
        {t(errorKey)}
      </p>
    ) : null

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-5">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-semibold text-zinc-200"
          >
            {t('contact.form.labels.name')}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={handleChange('name')}
            placeholder={t('contact.form.placeholders.name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            disabled={isSubmitting}
            className={fieldClass}
          />
          {renderError('contact-name', errors.name)}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-semibold text-zinc-200"
          >
            {t('contact.form.labels.email')}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange('email')}
            placeholder={t('contact.form.placeholders.email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            disabled={isSubmitting}
            className={fieldClass}
          />
          {renderError('contact-email', errors.email)}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-1.5 block text-sm font-semibold text-zinc-200"
          >
            {t('contact.form.labels.message')}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange('message')}
            placeholder={t('contact.form.placeholders.message')}
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={
              errors.message ? 'contact-message-error' : undefined
            }
            disabled={isSubmitting}
            className={fieldClass}
          />
          {renderError('contact-message', errors.message)}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 items-center rounded-full bg-gradient-to-r from-teal-400 to-sky-500 px-7 font-semibold text-zinc-950 shadow-lg shadow-teal-500/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
        </button>

        {status === 'success' && (
          <p role="status" className="text-sm font-medium text-teal-300">
            {t('contact.form.success')}
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="text-sm font-medium text-rose-300">
            {t('contact.form.error')}
          </p>
        )}
      </div>
    </form>
  )
}
