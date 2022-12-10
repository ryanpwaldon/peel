import { createPortal } from 'react-dom'
import { motion, type PanInfo, useAnimation, AnimatePresence } from 'framer-motion'

interface BottomSheetProps {
  trigger: React.ReactNode
  children: React.ReactNode
}

export function Sheet({ trigger, children }: BottomSheetProps) {
  const animation = useAnimation()

  const controls = {
    open: () => animation.start('visible'),
    close: () => animation.start('hidden'),
  }

  function onDragEnd(_: any, info: PanInfo) {
    const shouldClose = info.velocity.y > 200 || (info.velocity.y >= 0 && info.point.y > 400)
    shouldClose ? controls.close() : controls.open()
  }

  return (
    <div className="contents">
      <div className="contents" onClick={controls.open}>
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          <div className="pointer-events-none fixed top-0 left-0 z-10 h-full w-full">
            <motion.div
              initial="hidden"
              animate={animation}
              onClick={controls.close}
              className="absolute top-0 left-0 z-0 h-full w-full bg-black bg-opacity-60"
              variants={{ visible: { opacity: 1, pointerEvents: 'all' }, hidden: { opacity: 0, pointerEvents: 'none' } }}
            />
            <div className="relative z-10 h-full w-full pt-device-bar-top">
              <motion.div
                drag="y"
                initial="hidden"
                dragElastic={0.1}
                animate={animation}
                onDragEnd={onDragEnd}
                dragConstraints={{ top: 0 }}
                variants={{ visible: { y: 0 }, hidden: { y: '100%' } }}
                transition={{ type: 'spring', duration: 0.48, bounce: 0.0 }}
                className="pointer-events-auto h-full w-full rounded-t-2xl bg-gray-100 shadow-lg"
              >
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
