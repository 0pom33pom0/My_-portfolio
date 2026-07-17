import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/[0.04] px-3 py-1 font-mono text-[13px] leading-6 text-zinc-300 ring-1 ring-white/10">
      {children}
    </span>
  )
}
