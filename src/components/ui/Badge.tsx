import type { ReactNode } from 'react'
import { techIcons } from '../../data/techIcons.ts'

export function Badge({ children }: { children: ReactNode }) {
  const icon = typeof children === 'string' ? techIcons[children] : undefined

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[13px] leading-6 text-zinc-300 ring-1 ring-white/10">
      {icon && (
        <svg
          aria-hidden="true"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={icon.color}
        >
          <path d={icon.path} />
        </svg>
      )}
      {children}
    </span>
  )
}
