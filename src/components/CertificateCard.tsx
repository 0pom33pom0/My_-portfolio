import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Certificate } from '../data/types.ts'

function formatIssueDate(isoYearMonth: string, language: string): string {
  const [year, month] = isoYearMonth.split('-').map(Number)
  if (!year || !month) {
    return isoYearMonth
  }
  return new Intl.DateTimeFormat(language === 'th' ? 'th-TH' : 'en-GB', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(year, month - 1, 1))
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { t, i18n } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)
  const name = t(`certificates.items.${certificate.id}.name`)
  const issued = formatIssueDate(
    certificate.date,
    i18n.resolvedLanguage ?? 'en',
  )

  return (
    <article className="h-full overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10 transition hover:ring-teal-300/30">
      <div className="aspect-[4/3] overflow-hidden">
        {imageFailed ? (
          <div
            role="img"
            aria-label={name}
            className="h-full w-full bg-zinc-900"
          />
        ) : (
          <img
            src={certificate.image}
            alt={name}
            width={800}
            height={600}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="space-y-1.5 p-5">
        <h3 className="font-heading text-lg font-medium text-zinc-100">
          {name}
        </h3>
        <p className="font-mono text-sm text-zinc-400">
          {t('certificates.issued', { date: issued })}
        </p>
      </div>
    </article>
  )
}
