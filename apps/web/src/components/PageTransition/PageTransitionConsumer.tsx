import { AnimationProps, motion } from 'framer-motion'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/PageTransition/PageTransitionProvider'

interface PageProps {
  children: React.ReactNode
}

interface PageTransitionSettings {
  initial: AnimationProps['initial']
  animate: AnimationProps['animate']
  exit: AnimationProps['exit']
}

export default function PageTransitionConsumer({ children }: PageProps) {
  const { pageTransition } = useContextOrThrow(PageTransitionContext)

  const transitions: Record<PageTransition, PageTransitionSettings> = {
    slideForward: {
      initial: { x: '100%' },
      animate: { x: 0, transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } },
      exit: { x: '-25%', transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } },
    },
    slideBack: {
      initial: { x: '-25%', zIndex: 0 },
      animate: { x: 0, transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } },
      exit: { x: '100%', zIndex: 10, transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } },
    },
    none: {
      initial: {},
      animate: {},
      exit: {},
    },
  }

  return (
    <motion.div
      initial={transitions[pageTransition].initial}
      animate={transitions[pageTransition].animate}
      exit={transitions[pageTransition].exit}
      className="absolute top-0 left-0 h-full w-full border-x-hairline border-gray-200 bg-gray-100"
    >
      {children}
    </motion.div>
  )
}
