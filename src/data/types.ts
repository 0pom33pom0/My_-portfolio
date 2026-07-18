export interface SkillCategory {
  id: 'frontend' | 'backend' | 'ai' | 'tools'
  skills: string[]
}

export interface Project {
  id: 'ehp' | 'metaherb' | 'roblox'
  image: string
  tech: string[]
  link: string
}

export interface Certificate {
  /** Derived from the filename; matches certificates.items.<id> when translated. */
  id: string
  image: string
  /** ISO year-month, e.g. "2023-08", parsed from a "YYYY-MM " filename prefix. */
  date?: string
  /** Display name derived from the filename; a translation key overrides it. */
  fallbackName: string
}

export interface GalleryItem {
  /** Filename without extension; matches gallery.items.<id> when captioned. */
  id: string
  image: string
}

export interface SiteConfig {
  name: string
  email: string
  githubUrl: string
  linkedinUrl: string
  resumeUrl: string
}

export interface ContactFormValues {
  name: string
  email: string
  message: string
}

export type ContactErrorKey =
  | 'contact.form.errors.nameRequired'
  | 'contact.form.errors.emailRequired'
  | 'contact.form.errors.emailInvalid'
  | 'contact.form.errors.messageRequired'
  | 'contact.form.errors.messageTooShort'

export interface ContactFormErrors {
  name?: ContactErrorKey
  email?: ContactErrorKey
  message?: ContactErrorKey
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
