import type { Project } from './types.ts'

export const projects: Project[] = [
  {
    // Confidential company work — no public destination, so no link.
    id: 'ehp',
    image: '/images/projects/project-ehp.jpg',
    tech: ['Object Pascal (Delphi)', 'Node.js', 'Express.js', 'MongoDB', 'SQL'],
  },
  {
    id: 'metaherb',
    image: '/images/projects/project-metaherb.jpg',
    tech: ['React', 'Go', 'Docker'],
    link: 'https://metaherb.co.th/',
    linkType: 'website',
  },
  {
    // In active development — no public destination yet, so no link.
    id: 'metaherbMobile',
    image: '/images/projects/project-metaherb-mobile.jpg',
    tech: ['React Native', 'Expo', 'NativeWind'],
  },
  {
    id: 'roblox',
    image: '/images/projects/project-roblox.jpg',
    tech: ['Roblox Studio', 'Luau'],
    link: 'https://www.roblox.com/th/games/12874932794/unnamed',
    linkType: 'play',
  },
  {
    id: 'jo',
    image: '/images/projects/project-jo.jpg',
    tech: ['C#', 'WinForms', 'MySQL'],
    link: 'https://github.com/0pom33pom0/project_jo-C',
    linkType: 'code',
  },
]
