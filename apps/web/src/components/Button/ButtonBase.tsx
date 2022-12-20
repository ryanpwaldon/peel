import { useButton } from 'react-aria'
import { useRef, useState } from 'react'

interface ButtonBaseProps {
  type: 'button' | 'submit'
  isDisabled: boolean
  onClick?: () => void
  defaultClasses: string
  initialClasses: string
  pressedClasses: string
  children: React.ReactNode
}

export default function ButtonBase({ type, isDisabled, onClick, defaultClasses, initialClasses, pressedClasses, children }: ButtonBaseProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isPressed, setIsPressed] = useState(false)

  const { buttonProps } = useButton({
    type,
    isDisabled,
    onPress: onClick,
    onPressEnd: () => setIsPressed(false),
    onPressStart: () => setIsPressed(true),
  }, ref) // prettier-ignore

  return (
    <button {...buttonProps} ref={ref} className={`outline-none transition-all ${defaultClasses} ${isPressed ? pressedClasses : initialClasses}`}>
      {children}
    </button>
  ) // prettier-ignore
}
