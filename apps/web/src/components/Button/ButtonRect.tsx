import Spinner from '@/components/Spinner/Spinner'
import ButtonBase from '@/components/Button/ButtonBase'

const themes = {
  black: {
    default: `text-white`,
    initial: { backgroundColor: 'rgb(38, 38, 38)' },
    pressed: { backgroundColor: 'rgb(23, 23, 23)' },
  },
  white: {
    default: `text-blue-600 border-hairline border-gray-200`,
    initial: { backgroundColor: 'rgb(255, 255, 255)' },
    pressed: { backgroundColor: 'rgb(245, 245, 245)' },
  },
}

interface ButtonRectProps {
  text?: string
  icon?: string
  loading?: boolean
  isDisabled?: boolean
  onPress: () => void
  type?: 'button' | 'submit'
  theme?: keyof typeof themes
  children?: React.ReactNode
  className?: string
}

// prettier-ignore
export default function ButtonRect({
  text,
  onPress,
  type = 'button',
  theme = 'black',
  loading = false,
  isDisabled = false,
  className,
}: ButtonRectProps) {
  return (
    <ButtonBase
      type={type}
      onPress={onPress}
      isDisabled={isDisabled}
      initialStyles={themes[theme].initial}
      pressedStyles={themes[theme].pressed}
      defaultStyles={`flex h-12 w-full items-center justify-center rounded-md font-medium ${themes[theme].default} ${className ?? ''}`}
    >
      {loading ? <Spinner /> : text}
    </ButtonBase>
  )
}
