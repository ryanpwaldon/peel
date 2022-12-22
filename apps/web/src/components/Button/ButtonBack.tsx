import ButtonBaseText from '@/components/ButtonBase/ButtonBaseText'

interface ButtonBackProps {
  onClick?: () => void
}

export default function ButtonBack({ onClick }: ButtonBackProps) {
  return <ButtonBaseText text="Back" symbol="arrow_back_ios" symbolClassName="font-bold" onClick={onClick} />
}
