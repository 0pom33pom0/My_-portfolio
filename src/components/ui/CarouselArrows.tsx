interface CarouselArrowsProps {
  prevLabel: string
  nextLabel: string
  onPrev: () => void
  onNext: () => void
}

const arrowButtonClass =
  'grid h-11 w-11 place-items-center rounded-full text-zinc-200 ring-1 ring-white/15 transition hover:bg-white/5 hover:ring-teal-300/40'

export function CarouselArrows({
  prevLabel,
  nextLabel,
  onPrev,
  onNext,
}: CarouselArrowsProps) {
  return (
    <div className="mb-10 flex gap-2 md:mb-14">
      <button
        type="button"
        aria-label={prevLabel}
        onClick={onPrev}
        className={arrowButtonClass}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>
      <button
        type="button"
        aria-label={nextLabel}
        onClick={onNext}
        className={arrowButtonClass}
      >
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </div>
  )
}
