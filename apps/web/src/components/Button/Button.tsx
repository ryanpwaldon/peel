import Spinner from '@/components/Spinner/Spinner'

const themes = {
  naked: 'text-gray-800 bg-none',
  black: 'text-white bg-gray-800 active:bg-gray-800',
  white: 'text-gray-800 bg-white !border-[0.5px] !border-gray-200 active:bg-gray-50',
}

interface ButtonProps {
  text?: string
  icon?: string
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  theme?: keyof typeof themes
  children?: React.ReactNode
}

export default function Button({ text, children, disabled, type = 'button', theme = 'black', loading = false, onClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center rounded-lg border border-transparent transition focus:outline-none focus:ring-0 focus:ring-offset-0 h-12 font-medium flex-shrink-0 ${themes[theme]}`}
    >
      {loading ? <Spinner /> : children || text}
    </button>
  )
}
