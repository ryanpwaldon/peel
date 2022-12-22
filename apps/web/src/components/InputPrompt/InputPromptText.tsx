import Symbol from '@/components/Symbol/Symbol'
import ButtonBase from '@/components/ButtonBase/ButtonBase'

interface InputPromptTextProps {
  title: string
  placeholder: string
  onClick?: () => void
  className?: string
}

export default function InputPromptText({ title, placeholder, onClick, className }: InputPromptTextProps) {
  return (
    <ButtonBase
      onClick={onClick}
      initialClasses="bg-white"
      pressedClasses="bg-gray-100"
      defaultClasses={`flex h-12 w-full items-center justify-center rounded-lg font-medium border border-hairline border-gray-200 px-4 ${className ?? ''}`}
    >
      <div className="flex w-full items-center justify-between font-normal">
        <span>{title}</span>
        <div className="flex items-center space-x-1 text-gray-400">
          <span>{placeholder}</span>
          <Symbol symbol="chevron_right" className="text-2xl text-gray-400" />
        </div>
      </div>
    </ButtonBase>
  )
}
