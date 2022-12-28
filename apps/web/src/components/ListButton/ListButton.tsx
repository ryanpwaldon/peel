import Symbol from '@/components/Symbol/Symbol'
import ButtonBase from '@/components/ButtonBase/ButtonBase'

interface ListButtonProps {
  text: string
  symbol: string
  onClick?: () => void
}

export default function ListButton({ text, symbol, onClick }: ListButtonProps) {
  return (
    <ButtonBase
      onClick={onClick}
      initialClasses="bg-white"
      pressedClasses="bg-gray-100"
      defaultClasses="h-11 w-full rounded-lg border-hairline border-gray-200 px-4 flex items-center"
    >
      <div className="flex w-full items-center space-x-3">
        <Symbol symbol={symbol} className="text-lg font-bold" />
        <span className="text-base">{text}</span>
      </div>
    </ButtonBase>
  )
}
