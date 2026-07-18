import { useEffect, useRef, type RefObject } from 'react'

const DRIFT_PX_PER_FRAME = 0.6
const INTERACTION_SUSPEND_MS = 4000

/**
 * Slow continuous auto-scroll for a horizontal scroll-snap carousel that
 * contains a cloned slide set (first element marked with [data-clone]) for a
 * seamless wrap. Drifts only while scrolled into view, pauses on
 * hover/focus/touch/wheel and while the tab is hidden, and temporarily lifts
 * mandatory snap while drifting (snap would yank each tiny step back).
 * Call the returned suspendDrift() on manual controls (arrow buttons).
 */
export function useMarqueeDrift(
  scrollerRef: RefObject<HTMLElement | null>,
  { enabled }: { enabled: boolean },
) {
  const suspendUntilRef = useRef(0)

  const suspendDrift = () => {
    suspendUntilRef.current = performance.now() + INTERACTION_SUSPEND_MS
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller || !enabled) return

    let frame = 0
    let wrapAt = 0
    let pointerInside = false
    let focusInside = false
    let inView = false

    const viewObserver = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false
      },
      { threshold: 0.25 },
    )

    const measure = () => {
      const firstClone = scroller.querySelector<HTMLElement>('[data-clone]')
      wrapAt = firstClone ? firstClone.offsetLeft : 0
    }

    const isPaused = () =>
      !inView ||
      pointerInside ||
      focusInside ||
      performance.now() < suspendUntilRef.current ||
      document.visibilityState === 'hidden'

    const tick = () => {
      if (wrapAt > 0 && !isPaused()) {
        if (scroller.style.scrollSnapType !== 'none') {
          scroller.style.scrollSnapType = 'none'
        }
        scroller.scrollLeft += DRIFT_PX_PER_FRAME
        if (scroller.scrollLeft >= wrapAt) {
          scroller.scrollLeft -= wrapAt
        }
      } else if (scroller.style.scrollSnapType) {
        scroller.style.scrollSnapType = ''
      }
      frame = requestAnimationFrame(tick)
    }

    const onPointerEnter = () => {
      pointerInside = true
    }
    const onPointerLeave = () => {
      pointerInside = false
    }
    const onFocusIn = () => {
      focusInside = true
    }
    const onFocusOut = () => {
      focusInside = false
    }
    const onManualScrollIntent = () => {
      suspendUntilRef.current = performance.now() + INTERACTION_SUSPEND_MS
    }

    measure()
    viewObserver.observe(scroller)
    scroller.addEventListener('pointerenter', onPointerEnter)
    scroller.addEventListener('pointerleave', onPointerLeave)
    scroller.addEventListener('focusin', onFocusIn)
    scroller.addEventListener('focusout', onFocusOut)
    scroller.addEventListener('touchstart', onManualScrollIntent, {
      passive: true,
    })
    scroller.addEventListener('wheel', onManualScrollIntent, { passive: true })
    window.addEventListener('resize', measure)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      viewObserver.disconnect()
      scroller.style.scrollSnapType = ''
      scroller.removeEventListener('pointerenter', onPointerEnter)
      scroller.removeEventListener('pointerleave', onPointerLeave)
      scroller.removeEventListener('focusin', onFocusIn)
      scroller.removeEventListener('focusout', onFocusOut)
      scroller.removeEventListener('touchstart', onManualScrollIntent)
      scroller.removeEventListener('wheel', onManualScrollIntent)
      window.removeEventListener('resize', measure)
    }
  }, [enabled, scrollerRef])

  return { suspendDrift }
}
