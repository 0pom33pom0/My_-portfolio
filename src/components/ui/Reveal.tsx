import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Seconds; use for gentle stagger between sibling reveals. */
  delay?: number
}

/**
 * Single fade-up reveal used across all sections. Transform animation is
 * suppressed automatically under prefers-reduced-motion via the app-level
 * <MotionConfig reducedMotion="user">.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}
