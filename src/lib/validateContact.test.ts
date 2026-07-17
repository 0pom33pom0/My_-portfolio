import { validateContact } from './validateContact.ts'
import type { ContactFormValues } from '../data/types.ts'

const validValues: ContactFormValues = {
  name: 'Somchai',
  email: 'somchai@example.com',
  message: 'Hello, I would like to talk about a project.',
}

describe('validateContact (FR-019)', () => {
  it('returns no errors for valid input', () => {
    expect(validateContact(validValues)).toEqual({})
  })

  it('requires a name (whitespace counts as empty)', () => {
    expect(validateContact({ ...validValues, name: '' }).name).toBe(
      'contact.form.errors.nameRequired',
    )
    expect(validateContact({ ...validValues, name: '   ' }).name).toBe(
      'contact.form.errors.nameRequired',
    )
  })

  it('requires an email', () => {
    expect(validateContact({ ...validValues, email: '' }).email).toBe(
      'contact.form.errors.emailRequired',
    )
  })

  it('rejects malformed emails', () => {
    for (const bad of ['not-an-email', 'a@b', 'a b@c.com', '@no-user.com']) {
      expect(validateContact({ ...validValues, email: bad }).email).toBe(
        'contact.form.errors.emailInvalid',
      )
    }
  })

  it('requires a message', () => {
    expect(validateContact({ ...validValues, message: '' }).message).toBe(
      'contact.form.errors.messageRequired',
    )
  })

  it('rejects messages shorter than 10 characters (after trimming)', () => {
    expect(validateContact({ ...validValues, message: 'Hi there' }).message).toBe(
      'contact.form.errors.messageTooShort',
    )
    expect(
      validateContact({ ...validValues, message: '  short   ' }).message,
    ).toBe('contact.form.errors.messageTooShort')
  })

  it('reports all invalid fields at once', () => {
    const errors = validateContact({ name: '', email: 'nope', message: '' })
    expect(errors).toEqual({
      name: 'contact.form.errors.nameRequired',
      email: 'contact.form.errors.emailInvalid',
      message: 'contact.form.errors.messageRequired',
    })
  })
})
