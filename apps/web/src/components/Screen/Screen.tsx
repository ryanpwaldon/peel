import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

interface ScreenProps {
  trigger: (open: () => void) => React.ReactNode
  content: (close: () => void) => React.ReactNode
}

export function Screen({ content, trigger }: ScreenProps) {
  const [isOpen, setIsOpen] = useState(false)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  return (
    <div className="contents">
      <div className="contents">{trigger(open)}</div>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%', zIndex: 10 }}
              animate={{ x: 0, transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } }}
              exit={{ x: '100%', transition: { ease: [0.23, 0.71, 0.36, 1], duration: 0.448 } }}
              className="absolute top-0 left-0 h-full w-full border-x-hairline border-gray-200 bg-gray-100"
            >
              {content(close)}
            </motion.div>
          )}
        </AnimatePresence>,
        document.querySelector('#app') as Element,
      )}
    </div>
  )
}
