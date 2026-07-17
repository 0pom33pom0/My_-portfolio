import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../data/types.ts'
import { Badge } from './ui/Badge.tsx'

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  const [imageFailed, setImageFailed] = useState(false)
  const title = t(`projects.items.${project.id}.title`)

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white/[0.03] ring-1 ring-white/10 transition hover:ring-teal-300/30">
      <div className="aspect-[16/10] overflow-hidden">
        {imageFailed ? (
          <div
            role="img"
            aria-label={title}
            className="h-full w-full bg-zinc-900"
          />
        ) : (
          <img
            src={project.image}
            alt={title}
            width={1200}
            height={750}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="font-heading text-xl font-medium text-zinc-100">
          {title}
        </h3>
        <p className="flex-1 text-zinc-400">
          {t(`projects.items.${project.id}.description`)}
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.tech.map((techName) => (
            <li key={techName}>
              <Badge>{techName}</Badge>
            </li>
          ))}
        </ul>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 self-start font-medium text-teal-300 transition hover:text-teal-200"
        >
          {t('projects.viewDetails')}
          <span className="sr-only"> — {title}</span>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </article>
  )
}
