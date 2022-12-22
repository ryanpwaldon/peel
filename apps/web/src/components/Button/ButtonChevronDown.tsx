import Symbol from '@/components/Symbol/Symbol'
import ButtonBase from '@/components/Button/ButtonBase'

interface ButtonChevronDownProps {
  onClick?: () => void
}

export default function ButtonChevronDown({ onClick }: ButtonChevronDownProps) {
  return (
    <ButtonBase onClick={onClick} pressedClasses="text-gray-600" defaultClasses="transition">
      <Symbol symbol="expand_more" className="text-3xl font-semibold" />
    </ButtonBase>
  )
}
