import { useLink } from '@/components/Link/Link'
import ButtonRect from '@/components/Button/ButtonRect'
import { PageTransition } from '@/components/Page/PageTransitionProvider'

interface InfoLinkProps {
  message: string
  linkText: string
  linkPath: string
  linkTransition: PageTransition
  className?: string
}

export default function InfoLink({ message, linkText, linkPath, linkTransition, className }: InfoLinkProps) {
  const link = useLink()
  const onPress = () => link.push({ pageTransition: linkTransition, pathname: linkPath })

  return (
    <div className={className}>
      <div className="w-full space-y-3 rounded-lg border-hairline border-gray-200 bg-gray-50 p-4 pt-6 text-center">
        <div>{message}</div>
        <ButtonRect text={linkText} onPress={onPress} theme="white" />
      </div>
    </div>
  )
}
