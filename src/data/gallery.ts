import type { GalleryItem } from './types.ts'

// Every image dropped into src/assets/gallery/ appears on the site
// automatically (no code changes), ordered by filename. Add an optional
// localized caption under gallery.items.<filename-without-extension>.caption
// in BOTH locale files; without one, a generic localized alt is used.
const imageModules = import.meta.glob(
  '../assets/gallery/*.{jpg,jpeg,png,webp,gif,avif,svg}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>

const stemOf = (path: string) =>
  (path.split('/').pop() ?? path).replace(/\.[^.]+$/, '')

export const galleryItems: GalleryItem[] = Object.entries(imageModules)
  .map(([path, url]) => ({ id: stemOf(path), image: url }))
  .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
