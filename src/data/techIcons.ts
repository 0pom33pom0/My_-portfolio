import {
  siClaude,
  siCplusplus,
  siDart,
  siDelphi,
  siDocker,
  siDotnet,
  siExpo,
  siFlutter,
  siGit,
  siGithub,
  siGitlab,
  siGo,
  siExpress,
  siMarkdown,
  siGooglegemini,
  siLua,
  siLuau,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siRobloxstudio,
  siSwagger,
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
const INFINITY_PATH =
  'M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L12 10.66 10.48 12h.01L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l2.83-2.5.01.01L13.52 12h-.01l2.69-2.39c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.38-5.4-5.38Z'
const MOUNTAIN_PATH =
  'M14.2 6.2 21.8 20H2.2L8.6 8.4l2.5 4.5 3.1-6.7ZM8.6 12.6 5.6 18h11.9l-3.4-6.2-1.6 3.4-1.5-2.6-2.4 0Z'
const CHAT_SPARKLE_PATH =
  'M12 3C6.5 3 2 6.9 2 11.7c0 2.8 1.5 5.3 3.9 6.9L5 22l4.3-1.9c.9.2 1.8.3 2.7.3 5.5 0 10-3.9 10-8.7S17.5 3 12 3Zm0 3.2 1.5 3.9 3.9 1.5-3.9 1.5-1.5 3.9-1.5-3.9-3.9-1.5 3.9-1.5L12 6.2Z'
const STARBURST_PATH =
  'M11 2h2v6.6l4.7-4.7 1.4 1.4L14.4 10H21v2h-6.6l4.7 4.7-1.4 1.4L13 13.4V20h-2v-6.6l-4.7 4.7-1.4-1.4L9.6 12H3v-2h6.6L4.9 5.3l1.4-1.4L11 8.6V2Z'

/**
 * Brand icons keyed by the EXACT badge strings used in src/data.
 * Badges without an entry simply render as text.
 */
export const techIcons: Record<string, TechIcon> = {
  React: { path: siReact.path, color: `#${siReact.hex}` },
  'React Native': { path: siReact.path, color: `#${siReact.hex}` },
  Expo: { path: siExpo.path, color: '#ffffff' },
  NativeWind: { path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
  'Next.js': { path: siNextdotjs.path, color: '#ffffff' },
  'Tailwind CSS': { path: siTailwindcss.path, color: `#${siTailwindcss.hex}` },
  Flutter: { path: siFlutter.path, color: '#54C5F8' },
  Go: { path: siGo.path, color: `#${siGo.hex}` },
  'Node.js': { path: siNodedotjs.path, color: `#${siNodedotjs.hex}` },
  'Express.js': { path: siExpress.path, color: '#ffffff' },
  SQL: { path: DATABASE_PATH, color: '#38BDF8' },
  MongoDB: { path: siMongodb.path, color: `#${siMongodb.hex}` },
  MySQL: { path: siMysql.path, color: '#5C93C4' },
  Docker: { path: siDocker.path, color: `#${siDocker.hex}` },
  Swagger: { path: siSwagger.path, color: `#${siSwagger.hex}` },
  'Object Pascal (Delphi)': { path: siDelphi.path, color: `#${siDelphi.hex}` },
  Claude: { path: siClaude.path, color: `#${siClaude.hex}` },
  Gemini: { path: siGooglegemini.path, color: `#${siGooglegemini.hex}` },
  MedGemma: { path: SPARKLE_PATH, color: '#4285F4' },
  // No OpenAI/Zhipu marks in simple-icons (brand policy) — generic marks.
  ChatGPT: { path: CHAT_SPARKLE_PATH, color: '#74AA9C' },
  GLM: { path: STARBURST_PATH, color: '#5B8CFF' },
  GitHub: { path: siGithub.path, color: '#ffffff' },
  GitLab: { path: siGitlab.path, color: `#${siGitlab.hex}` },
  Git: { path: siGit.path, color: `#${siGit.hex}` },
  Markdown: { path: siMarkdown.path, color: '#ffffff' },
  Taiga: { path: MOUNTAIN_PATH, color: '#9DCE0A' },
  'CI/CD': { path: INFINITY_PATH, color: '#2DD4BF' },
  Dart: { path: siDart.path, color: '#41C4FF' },
  Python: { path: siPython.path, color: `#${siPython.hex}` },
  'C++': { path: siCplusplus.path, color: '#659AD2' },
  // simple-icons has no C# mark; the .NET logo is the closest recognizable one.
  'C#': { path: siDotnet.path, color: '#A489F5' },
  Lua: { path: siLua.path, color: '#7E9BFF' },
  'Roblox Studio': { path: siRobloxstudio.path, color: `#${siRobloxstudio.hex}` },
  Luau: { path: siLuau.path, color: `#${siLuau.hex}` },
}
