import type { ContactFormErrors, ContactFormValues } from '../data/types.ts'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MESSAGE_MIN_LENGTH = 10

/**
 * Pure validation returning i18n error KEYS (never display text);
 * the form translates them at render time.
 */
export function validateContact(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'contact.form.errors.nameRequired'
  }

  if (!email) {
    errors.email = 'contact.form.errors.emailRequired'
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'contact.form.errors.emailInvalid'
  }

  if (!message) {
    errors.message = 'contact.form.errors.messageRequired'
  } else if (message.length < MESSAGE_MIN_LENGTH) {
    errors.message = 'contact.form.errors.messageTooShort'
  }

  return errors
}
