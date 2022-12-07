import { createPortal } from 'react-dom'
import { motion as Motion, type PanInfo, useAnimation } from 'framer-motion'

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
        <div className="w-full h-full fixed top-0 left-0 pointer-events-none z-10">
          <Motion.div
            initial="hidden"
            animate={animation}
            onClick={controls.close}
            className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-60 z-0"
            variants={{ visible: { opacity: 1, pointerEvents: 'all' }, hidden: { opacity: 0, pointerEvents: 'none' } }}
          />
          <div className="w-full h-full relative pt-device-bar-top z-10">
            <Motion.div
              drag="y"
              initial="hidden"
              dragElastic={0.1}
              animate={animation}
              onDragEnd={onDragEnd}
              dragConstraints={{ top: 0 }}
              variants={{ visible: { y: 0 }, hidden: { y: '100%' } }}
              transition={{ type: 'spring', duration: 0.48, bounce: 0.0 }}
              className="w-full h-full bg-gray-100 shadow-lg rounded-t-2xl pointer-events-auto"
            >
              {children}
              <div className="absolute top-1/2 h-full w-full bg-gray-100" />
            </Motion.div>
          </div>
        </div>,
        document.querySelector('#app') as Element,
      )}
    </div>
  )
}
