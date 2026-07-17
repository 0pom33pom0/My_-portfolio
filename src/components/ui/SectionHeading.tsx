interface SectionHeadingProps {
  /** id for the h2 so sections can reference it via aria-labelledby. */
  headingId: string
  eyebrow: string
  title: string
}

export function SectionHeading({ headingId, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 md:mb-14">
      <p className="mb-2 flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-teal-300 uppercase">
        <span aria-hidden="true" className="h-px w-6 bg-gradient-to-r from-teal-300 to-sky-400" />
        {eyebrow}
      </p>
      <h2 id={headingId} className="text-3xl font-semibold md:text-4xl">
        {title}
      </h2>
    </div>
  )
}
