import en from './locales/en.json'
import th from './locales/th.json'
import i18n from './index.ts'

type Dict = Record<string, unknown>

function collectLeaves(obj: Dict, prefix = ''): Array<[path: string, value: unknown]> {
  return Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object') {
      return collectLeaves(value as Dict, path)
    }
    return [[path, value] as [string, unknown]]
  })
}

const keyPaths = (obj: Dict) =>
  collectLeaves(obj)
    .map(([path]) => path)
    .sort()

describe('locale dictionaries (FR-003)', () => {
  it('en.json and th.json have identical key structure', () => {
    expect(keyPaths(th as Dict)).toEqual(keyPaths(en as Dict))
  })

  it('every leaf in both locales is a non-empty string', () => {
    for (const [name, dict] of [
      ['en', en],
      ['th', th],
    ] as const) {
      for (const [path, value] of collectLeaves(dict as Dict)) {
        expect(typeof value, `${name}:${path} must be a string`).toBe('string')
        expect(
          (value as string).trim().length,
          `${name}:${path} must not be empty`,
        ).toBeGreaterThan(0)
      }
    }
  })
})

describe('i18n configuration (FR-004)', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('falls back to en and supports exactly en and th', () => {
    const fallback = i18n.options.fallbackLng
    expect(Array.isArray(fallback) ? fallback : [fallback]).toEqual(['en'])

    const supported = (i18n.options.supportedLngs || []) as string[]
    expect(supported).toEqual(expect.arrayContaining(['en', 'th']))
    expect(supported.filter((lng) => lng !== 'cimode')).toHaveLength(2)
  })

  it('detects from localStorage before navigator and caches to localStorage', () => {
    const detection = i18n.options.detection as {
      order: string[]
      caches: string[]
    }
    expect(detection.order).toEqual(['localStorage', 'navigator'])
    expect(detection.caches).toEqual(['localStorage'])
  })

  it('resolves the jsdom navigator language (en-US) to en and syncs <html lang>', () => {
    expect(i18n.resolvedLanguage).toBe('en')
    expect(document.documentElement.lang).toBe('en')
  })

  it('updates <html lang> and the localStorage cache on language change (FR-006)', async () => {
    await i18n.changeLanguage('th')
    expect(i18n.resolvedLanguage).toBe('th')
    expect(document.documentElement.lang).toBe('th')
    expect(window.localStorage.getItem('i18nextLng')).toBe('th')
  })
})
