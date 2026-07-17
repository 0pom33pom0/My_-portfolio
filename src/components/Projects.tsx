import { useTranslation } from 'react-i18next'
import { projects } from '../data/projects.ts'
import { ProjectCard } from './ProjectCard.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

export function Projects() {
  const { t } = useTranslation()

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="projects-title"
            eyebrow={t('projects.eyebrow')}
            title={t('projects.heading')}
          />
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
