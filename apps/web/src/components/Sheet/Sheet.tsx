import { createPortal } from 'react-dom'
import useMeasure from 'react-use-measure'
import { motion, AnimatePresence, DragHandlers, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState } from 'react'

interface BottomSheetProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function Sheet({ trigger, children }: BottomSheetProps) {
  const [sheet, bounds] = useMeasure()

  const y = useMotionValue(0)
  const [isOpen, setIsOpen] = useState(false)
  const opacity = useTransform(y, [0, -bounds.height], [0, 1])

  const open = () => animate(y, -bounds.height, { type: 'spring', duration: 0.48, bounce: 0.0, onPlay: () => setIsOpen(true) })
  const close = () => animate(y, 0, { type: 'spring', duration: 0.48, bounce: 0.0, onPlay: () => setIsOpen(false) })

  const onDragEnd: DragHandlers['onDragEnd'] = (_, info) => {
    const shouldClose = info.velocity.y > 200 || (info.velocity.y >= 0 && info.offset.y > bounds.height / 2)
    shouldClose ? close() : open()
  }

  return (
    <div className="contents">
      <div className="contents" onClick={open}>
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          <div className="pointer-events-none fixed top-0 left-0 z-10 h-full w-full">
            <motion.div
              onClick={close}
              style={{ opacity }}
              className={`absolute top-0 left-0 z-0 h-full w-full bg-black bg-opacity-60 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            />
            <div className="relative z-10 h-full w-full pt-device-bar-top">
              <motion.div
                drag="y"
                style={{ y }}
                dragElastic={0.1}
                onDragEnd={onDragEnd}
                dragConstraints={{ top: -bounds.height }}
                transition={{ type: 'spring', duration: 0.48, bounce: 0.0 }}
                className="pointer-events-auto absolute top-full left-0 w-full rounded-t-2xl bg-gray-100 pb-content-bottom shadow-lg"
                ref={sheet}
              >
                <div className="h-96"></div>
                {children}
                <div className="absolute top-1/2 h-full w-full bg-gray-100" />
              </motion.div>
            </div>
          </div>
        </AnimatePresence>,
        document.querySelector('#app') as Element,
      )}
    </div>
  )
}
