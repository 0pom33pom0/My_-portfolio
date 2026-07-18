import {
  siClaude,
  siDelphi,
  siFlutter,
  siGithub,
  siGitlab,
  siGo,
  siGooglegemini,
  siLuau,
  siNextdotjs,
  siReact,
  siRobloxstudio,
  siTailwindcss,
} from 'simple-icons'

export interface TechIcon {
  path: string
  /** Display color tuned for the dark theme (dark brand marks -> light). */
  color: string
}

// Generic marks for techs without a usable brand icon.
const DATABASE_PATH =
  'M12 2C7.58 2 4 3.35 4 5v14c0 1.65 3.58 3 8 3s8-1.35 8-3V5c0-1.65-3.58-3-8-3Zm6 17c0 .5-2.13 1.5-6 1.5S6 19.5 6 19v-2.32C7.45 17.5 9.6 18 12 18s4.55-.5 6-1.32V19Zm0-4.5c0 .5-2.13 1.5-6 1.5s-6-1-6-1.5v-2.82C7.45 13 9.6 13.5 12 13.5s4.55-.5 6-1.32v2.32Zm0-4.5c0 .5-2.13 1.5-6 1.5S6 10.5 6 10V7.18C7.45 8 9.6 8.5 12 8.5s4.55-.5 6-1.32V10Zm-6-3C8.13 7 6 6 6 5.5S8.13 4 12 4s6 1 6 1.5S15.87 7 12 7Z'
const SPARKLE_PATH =
  'M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2L12 2Zm7 12 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z'
const MOUNTAIN_PATH =
  'M14.2 6.2 21.8 20H2.2L8.6 8.4l2.5 4.5 3.1-6.7ZM8.6 12.6 5.6 18h11.9l-3.4-6.2-1.6 3.4-1.5-2.6-2.4 0Z'

/**
 * Brand icons keyed by the EXACT badge strings used in src/data.
 * Badges without an entry simply render as text.
 */
export const techIcons: Record<string, TechIcon> = {
  React: { path: siReact.path, color: `#${siReact.hex}` },
  'Next.js': { path: siNextdotjs.path, color: '#ffffff' },
  'Tailwind CSS': { path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
  Flutter: { path: siFlutter.path, color: '#54C5F8' },
  Go: { path: siGo.path, color: `#${siGo.hex}` },
  SQL: { path: DATABASE_PATH, color: '#38BDF8' },
  'Object Pascal (Delphi)': { path: siDelphi.path, color: `#${siDelphi.hex}` },
  Claude: { path: siClaude.path, color: `#${siClaude.hex}` },
  Gemini: { path: siGooglegemini.path, color: `#${siGooglegemini.hex}` },
  MedGemma: { path: SPARKLE_PATH, color: '#4285F4' },
  GitHub: { path: siGithub.path, color: '#ffffff' },
  GitLab: { path: siGitlab.path, color: `#${siGitlab.hex}` },
  Taiga: { path: MOUNTAIN_PATH, color: '#9DCE0A' },
  'Roblox Studio': { path: siRobloxstudio.path, color: `#${siRobloxstudio.hex}` },
  Luau: { path: siLuau.path, color: `#${siLuau.hex}` },
}
