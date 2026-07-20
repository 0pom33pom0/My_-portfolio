export interface SkillCategory {
  id: 'frontend' | 'backend' | 'languages' | 'ai' | 'tools'
  skills: string[]
}

export interface Project {
  id: 'ehp' | 'metaherb' | 'metaherbMobile' | 'roblox' | 'jo' | 'claudeSkills'
  image: string
  tech: string[]
  /** Omit both for confidential work with no public destination. */
  link?: string
  /** Picks the localized action label: projects.linkLabels.<linkType>. */
  linkType?: 'website' | 'play' | 'code'
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
  phone: string
  lineId: string
  githubUrl: string
  linkedinUrl: string
  facebookUrl: string
  instagramUrl: string
  w3profileUrl: string
  resumeUrl: string
}
