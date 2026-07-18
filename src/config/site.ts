import type { SiteConfig } from '../data/types.ts'

export const site: SiteConfig = {
  name: 'Suracha Hanthongchai',
  email: 'niponyochram@gmail.com',
  githubUrl: 'https://github.com/0pom33pom0',
  linkedinUrl: 'https://www.linkedin.com/in/suracha-hanthongchai-885647420/',
  resumeUrl: '/resume.pdf',
}

/** Brand names are data, not translations (FR-002). */
export const socialLinks = [
  { id: 'github', label: 'GitHub', href: site.githubUrl },
  { id: 'linkedin', label: 'LinkedIn', href: site.linkedinUrl },
  { id: 'w3profile', label: 'W3Profile', href: 'https://www.w3profile.com/pomdev/' },
] as const
