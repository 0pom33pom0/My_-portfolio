export interface SkillCategory {
  id: 'frontend' | 'backend' | 'ai'
  skills: string[]
}

export interface Project {
  id: 'ehp' | 'metaherb' | 'roblox'
  image: string
  tech: string[]
  link: string
}

export interface Certificate {
  id: 'arduino' | 'esan' | 'webcomp'
  image: string
  /** ISO year-month, e.g. "2023-08". */
  date: string
}

export interface GalleryItem {
  id: 'g1' | 'g2' | 'g3' | 'g4' | 'g5' | 'g6'
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
