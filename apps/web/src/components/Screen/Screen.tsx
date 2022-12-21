import { createPortal } from 'react-dom'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'

interface ScreenProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function Screen({ trigger, children }: ScreenProps) {
  const animation = useAnimation()

  const controls = {
    open: () => animation.start('visible'),
    close: () => animation.start('hidden'),
  }

  return (
    <div className="contents">
      <div className="contents" onClick={controls.open}>
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ x: '100%', zIndex: 10 }}
            animate={{ x: 0, transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } }}
            exit={{ x: '-25%', transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } }}
            className="absolute top-0 left-0 h-full w-full border-x-hairline border-gray-200 bg-gray-100"
          >
            {children}
          </motion.div>
        </AnimatePresence>,
        document.querySelector('#app') as Element,
      )}
    </div>
  )
}
