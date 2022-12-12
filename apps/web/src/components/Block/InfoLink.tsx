import Button from '@/components/Button/Button'
import { useLink } from '@/components/Link/Link'

interface InfoLinkProps {
  message: string
  linkText: string
  linkPath: string
  className?: string
}

export default function InfoLink({ message, linkText, linkPath, className }: InfoLinkProps) {
  const link = useLink()
  const onClick = () => link.push({ pageTransition: 'forward', pathname: linkPath })

  return (
    <div className={className}>
      <div className="w-full space-y-3 rounded-lg border-hairline border-gray-200 bg-gray-50 p-4 pt-6 text-center">
        <div>{message}</div>
        <Button text={linkText} onClick={onClick} className="!h-11 !text-blue-600" theme="white" />
      </div>
    </div>
  )
}
