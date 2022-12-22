import Spinner from '@/components/Spinner/Spinner'
import ButtonBase from '@/components/ButtonBase/ButtonBase'

const themes = {
  black: {
    default: 'text-white',
    initial: 'bg-gray-800',
    pressed: 'bg-gray-900',
  },
  blackOnWhite: {
    default: 'text-gray-800 border-hairline border-gray-200',
    initial: 'bg-white',
    pressed: 'bg-gray-100',
  },
  blueOnWhite: {
    default: 'text-blue-600 border-hairline border-gray-200',
    initial: 'bg-white',
    pressed: 'bg-gray-100',
  },
}

interface ButtonRectProps {
  text?: string
  loading?: boolean
  isDisabled?: boolean
  type?: 'button' | 'submit'
  theme?: keyof typeof themes
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}

// prettier-ignore
export default function ButtonBaseRect({
  onClick,
  text = 'Text',
  type = 'button',
  theme = 'black',
  loading = false,
  isDisabled = false,
  children,
  className,
}: ButtonRectProps) {
  return (
    <ButtonBase
      type={type}
      onClick={onClick}
      isDisabled={isDisabled}
      initialClasses={themes[theme].initial}
      pressedClasses={themes[theme].pressed}
      defaultClasses={`flex h-11 w-full items-center justify-center rounded-md font-medium ${themes[theme].default} ${className ?? ''}`}
    >
      {loading ? <Spinner /> : children || text}
    </ButtonBase>
  )
}
