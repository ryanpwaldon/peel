import Spinner from '@/components/Spinner/Spinner'

const themes = {
  naked: 'text-gray-800 bg-none',
  black: 'text-white bg-gray-800 active:bg-gray-800',
  white: 'text-gray-800 bg-white !border-hairline !border-gray-200 active:bg-gray-50',
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
  className?: string
}

export default function Button({ text, children, disabled, type = 'button', theme = 'black', loading = false, onClick, className }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-12 w-full flex-shrink-0 items-center justify-center rounded-lg border border-transparent font-medium transition focus:outline-none focus:ring-0 focus:ring-offset-0 ${themes[theme]} ${className}`}
    >
      {loading ? <Spinner /> : children || text}
    </button>
  )
}
