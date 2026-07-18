import type { SkillCategory } from './types.ts'

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Flutter'],
  },
  {
    id: 'backend',
    skills: ['Go', 'SQL'],
  },
  {
    id: 'languages',
    skills: ['Dart', 'Python', 'C++', 'C#', 'Lua', 'Object Pascal (Delphi)'],
  },
  {
    id: 'ai',
    skills: ['Claude', 'Gemini', 'MedGemma', 'ChatGPT', 'GLM'],
  },
  {
    id: 'tools',
    skills: ['GitHub', 'GitLab', 'Taiga'],
  },
]
