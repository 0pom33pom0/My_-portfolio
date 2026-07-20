import type { SiteConfig } from '../data/types.ts'

export const site: SiteConfig = {
  name: 'Suracha Hanthongchai',
  email: 'suracha.h@kkumail.com',
  phone: '0927403227',
  lineId: '33120pom',
  githubUrl: 'https://github.com/0pom33pom0',
  linkedinUrl: 'https://www.linkedin.com/in/suracha-hanthongchai-885647420/',
  facebookUrl: 'https://www.facebook.com/suracha.hanthongchai',
  instagramUrl: 'https://www.instagram.com/manmini_pom',
  w3profileUrl: 'https://www.w3profile.com/pomdev/',
  resumeUrl: '/suracha_hanthongchai_resume.pdf',
  resumeUrlEn: '/suracha_hanthongchai_resume_en.pdf',
}

/** Brand names are data, not translations (FR-002). */
export const socialLinks = [
  { id: 'github', label: 'GitHub', href: site.githubUrl },
  { id: 'linkedin', label: 'LinkedIn', href: site.linkedinUrl },
  { id: 'w3profile', label: 'W3Profile', href: site.w3profileUrl },
  { id: 'facebook', label: 'Facebook', href: site.facebookUrl },
  { id: 'instagram', label: 'Instagram', href: site.instagramUrl },
] as const
