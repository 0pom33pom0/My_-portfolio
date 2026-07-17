import { useTranslation } from 'react-i18next'
import { skillCategories } from '../data/skills.ts'
import { Badge } from './ui/Badge.tsx'
import { Reveal } from './ui/Reveal.tsx'
import { SectionHeading } from './ui/SectionHeading.tsx'

export function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <Reveal>
          <SectionHeading
            headingId="skills-title"
            eyebrow={t('skills.eyebrow')}
            title={t('skills.heading')}
          />
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.1}>
              <div className="h-full rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10">
                <h3 className="font-heading mb-4 text-lg font-medium text-zinc-100">
                  {t(`skills.categories.${category.id}`)}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li key={skill}>
                      <Badge>{skill}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
