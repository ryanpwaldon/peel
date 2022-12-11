import { AnimationProps, motion } from 'framer-motion'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/PageTransition/PageTransitionProvider'

interface PageProps {
  children: React.ReactNode
}

export default function PageTransitionConsumer({ children }: PageProps) {
  const { pageTransition } = useContextOrThrow(PageTransitionContext)

  const initial: Record<PageTransition, AnimationProps['initial']> = {
    forward: { x: '100%' },
    back: { x: '-100%' },
    none: {},
  }

  const animate: Record<PageTransition, AnimationProps['animate']> = {
    forward: { x: 0 },
    back: { x: 0 },
    none: {},
  }

  const exit: Record<PageTransition, AnimationProps['exit']> = {
    forward: { x: '-25%' },
    back: { x: '25%' },
    none: {},
  }

  return (
    <motion.div
      initial={initial[pageTransition]}
      animate={animate[pageTransition]}
      exit={exit[pageTransition]}
      transition={{ ease: [0.23, 0.71, 0.36, 1], duration: 0.448 }}
      className="absolute top-0 left-0 h-full w-full bg-gray-100"
    >
      {children}
    </motion.div>
  )
}
