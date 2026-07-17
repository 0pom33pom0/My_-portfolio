import type { SiteConfig } from '../data/types.ts'

export const site: SiteConfig = {
  name: 'Suracha Hanthongchai',
  email: 'niponyochram@gmail.com',
  githubUrl: 'https://github.com/0pom33pom0',
  // Placeholder until the owner supplies the real profile URL (spec assumption 6).
  linkedinUrl: 'https://www.linkedin.com/in/your-profile',
  resumeUrl: '/resume.pdf',
}

/** Brand names are data, not translations (FR-002). */
export const socialLinks = [
  { id: 'github', label: 'GitHub', href: site.githubUrl },
  { id: 'linkedin', label: 'LinkedIn', href: site.linkedinUrl },
] as const
