import ButtonText from '@/components/Button/ButtonText'

interface ButtonBackProps {
  onClick?: () => void
}

export default function ButtonBack({ onClick }: ButtonBackProps) {
  return <ButtonText text="Back" symbol="arrow_back_ios" symbolClassName="font-bold" onClick={onClick} />
}
