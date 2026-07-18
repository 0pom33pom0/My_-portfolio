import { useTranslation } from 'react-i18next'
import { siFacebook, siGithub, siInstagram, siLine } from 'simple-icons'
import { site } from '../config/site.ts'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

// simple-icons carries no LinkedIn mark (brand policy); generic marks for
// the non-brand channels.
const LINKEDIN_PATH =
  'M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z'
const GLOBE_PATH =
  'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.47a15.6 15.6 0 0 0-2.1-6.53A8.02 8.02 0 0 1 19.93 11ZM12 4.2c1.1 1.55 2.03 3.94 2.44 6.8H9.56c.41-2.86 1.34-5.25 2.44-6.8ZM4.07 13h3.47c.24 2.4.97 4.68 2.1 6.53A8.02 8.02 0 0 1 4.07 13Zm3.47-2H4.07a8.02 8.02 0 0 1 5.57-6.53A15.6 15.6 0 0 0 7.54 11ZM12 19.8c-1.1-1.55-2.03-3.94-2.44-6.8h4.88c-.41 2.86-1.34 5.25-2.44 6.8Zm2.36-.27a15.6 15.6 0 0 0 2.1-6.53h3.47a8.02 8.02 0 0 1-5.57 6.53Z'
const MAIL_PATH =
  'M2 5c0-.55.45-1 1-1h18c.55 0 1 .45 1 1v.35l-10 6.25L2 5.35V5Zm0 2.7V19c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V7.7l-9.47 5.92c-.33.2-.73.2-1.06 0L2 7.7Z'
const PHONE_PATH =
  'M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3.5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z'

const formatPhone = (digits: string) =>
  digits.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')

interface ContactChannel {
  id: string
  href: string
  value: string
  icon: { path: string; color: string }
  external?: boolean
}

const CHANNELS: ContactChannel[] = [
  {
    id: 'email',
    href: `mailto:${site.email}`,
    value: site.email,
    icon: { path: MAIL_PATH, color: '#38BDF8' },
  },
  {
    id: 'phone',
    href: `tel:+66${site.phone.slice(1)}`,
    value: formatPhone(site.phone),
    icon: { path: PHONE_PATH, color: '#2DD4BF' },
  },
  {
    id: 'line',
    href: `https://line.me/ti/p/~${site.lineId}`,
    value: site.lineId,
    icon: { path: siLine.path, color: `#${siLine.hex}` },
    external: true,
  },
  {
    id: 'facebook',
    href: site.facebookUrl,
    value: 'suracha.hanthongchai',
    icon: { path: siFacebook.path, color: `#${siFacebook.hex}` },
    external: true,
  },
  {
    id: 'instagram',
    href: site.instagramUrl,
    value: '@manmini_pom',
    icon: { path: siInstagram.path, color: `#${siInstagram.hex}` },
    external: true,
  },
  {
    id: 'github',
    href: site.githubUrl,
    value: '0pom33pom0',
    icon: { path: siGithub.path, color: '#ffffff' },
    external: true,
  },
  {
    id: 'linkedin',
    href: site.linkedinUrl,
    value: 'suracha-hanthongchai',
    icon: { path: LINKEDIN_PATH, color: '#4E9AE9' },
    external: true,
  },
  {
    id: 'w3profile',
    href: site.w3profileUrl,
    value: 'pomdev',
    icon: { path: GLOBE_PATH, color: '#A5B4FC' },
    external: true,
  },
]

export function Contact() {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="contact-title"
            eyebrow={t('contact.eyebrow')}
            title={t('contact.heading')}
          />
        </Reveal>
        <Reveal>
          <p className="max-w-2xl text-lg text-zinc-400">{t('contact.intro')}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CHANNELS.map((channel) => (
              <li key={channel.id}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/10 transition hover:bg-white/[0.05] hover:ring-teal-300/40"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/[0.04] ring-1 ring-white/10">
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill={channel.icon.color}
                    >
                      <path d={channel.icon.path} />
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-zinc-500">
                      {t(`contact.channels.${channel.id}`)}
                    </span>
                    <span className="block truncate font-medium text-zinc-100">
                      {channel.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
