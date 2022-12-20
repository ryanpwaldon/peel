import { useRef } from 'react'
import { useButton } from 'react-aria'
import { motion, useAnimation, TargetAndTransition, AnimatePresence } from 'framer-motion'

interface ButtonBaseProps {
  type: 'button' | 'submit'
  isDisabled: boolean
  onPress: () => void
  defaultStyles: string
  initialStyles: TargetAndTransition
  pressedStyles: TargetAndTransition
  children: React.ReactNode
}

export default function ButtonBase({ type, isDisabled, onPress, defaultStyles, initialStyles, pressedStyles, children }: ButtonBaseProps) {
  const ref = useRef<HTMLButtonElement>(null)

  const controls = useAnimation()
  const variants = { initial: initialStyles, pressed: pressedStyles }

  const useButtonValue = useButton({
    type,
    isDisabled,
    onPress,
    onPressEnd: () => controls.start('initial'),
    onPressStart: () => controls.start('pressed'),
  }, ref) // prettier-ignore

  // Remove incompatible props (incompatible with framer-motion)
  const { onDrag, onDragEnd, onDragStart, onAnimationStart, ...buttonProps } = useButtonValue.buttonProps

  return (
    <AnimatePresence>
      <motion.button
        {...buttonProps}
        ref={ref}
        initial="initial"
        animate={controls}
        variants={variants}
        className={`outline-none ${defaultStyles}`}
        transition={{ ease: 'easeOut', duration: 0.256 }}
      >
        {children}
      </motion.button>
    </AnimatePresence>
  ) // prettier-ignore
}
