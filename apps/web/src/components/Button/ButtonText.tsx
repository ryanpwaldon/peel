import ButtonBase from '@/components/Button/ButtonBase'

const themes = {
  black: {
    initial: 'bg-gray-800',
    pressed: 'bg-gray-600',
  },
  blue: {
    initial: 'text-blue-600',
    pressed: 'text-blue-400',
  },
}

interface ButtonTextProps {
  text: string
  isDisabled?: boolean
  type?: 'button' | 'submit'
  theme?: keyof typeof themes
  onClick?: () => void
  className?: string
}

// prettier-ignore
export default function ButtonText({
  onClick,
  text,
  type = 'button',
  theme = 'blue',
  isDisabled = false,
  className,
}: ButtonTextProps) {
  return (
    <ButtonBase
      type={type}
      onClick={onClick}
      isDisabled={isDisabled}
      initialClasses={themes[theme].initial}
      pressedClasses={themes[theme].pressed}
      defaultClasses={`text-sm ${className ?? ''}`}
    >
      {text}
    </ButtonBase>
  )
}
