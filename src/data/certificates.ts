import type { Certificate } from './types.ts'

// Every image dropped into src/assets/certificates/ appears in the carousel
// automatically. Filename convention: "YYYY-MM Certificate name.jpg" — the
// prefix becomes the locale-formatted issue date and the rest the displayed
// name (a translation under certificates.items.<id>.name overrides it).
// Files without a date prefix are shown name-only, after the dated ones.
const imageModules = import.meta.glob(
  '../assets/certificates/*.{jpg,jpeg,png,webp,gif,avif,svg}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const DATE_PREFIX_PATTERN = /^(\d{4}-(?:0[1-9]|1[0-2]))[ _-]+(.+)$/

export interface ParsedCertificateFilename {
  id: string
  date?: string
  fallbackName: string
}

export function parseCertificateFilename(
  fileName: string,
): ParsedCertificateFilename {
  const stem = fileName.replace(/\.[^.]+$/, '')
  const match = DATE_PREFIX_PATTERN.exec(stem)
  const rawName = (match ? match[2] : stem).trim()
  return {
    id: rawName.toLowerCase().replace(/\s+/g, '-'),
    date: match?.[1],
    fallbackName: rawName.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim(),
  }
}

export const certificates: Certificate[] = Object.entries(imageModules)
  .map(([path, url]) => {
    const fileName = path.split('/').pop() ?? path
    return { ...parseCertificateFilename(fileName), image: url }
  })
  .sort(
    (a, b) =>
      (b.date ?? '').localeCompare(a.date ?? '') ||
      a.fallbackName.localeCompare(b.fallbackName),
  )
