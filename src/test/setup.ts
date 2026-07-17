import '@testing-library/jest-dom/vitest'

// jsdom does not implement these browser APIs; framer-motion and the
// carousel need them to exist before any component module is imported.
class ObserverStub {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

globalThis.IntersectionObserver =
  ObserverStub as unknown as typeof IntersectionObserver
globalThis.ResizeObserver = ObserverStub as unknown as typeof ResizeObserver

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList,
})

Element.prototype.scrollBy =
  Element.prototype.scrollBy ?? ((() => {}) as Element['scrollBy'])

beforeEach(() => {
  window.localStorage.clear()
})
