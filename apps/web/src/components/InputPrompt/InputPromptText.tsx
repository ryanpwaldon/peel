import Button from '@/components/Button/Button'
import Symbol from '@/components/Symbol/Symbol'
import { useLink } from '@/components/Link/Link'

interface InputPromptTextProps {
  title: string
  href: string
  placeholder: string
  className?: string
}

export default function InputPromptText({ title, placeholder, href, className }: InputPromptTextProps) {
  const link = useLink()

  return (
    <Button theme="white" className={`px-4 ${className}`} onClick={() => link.push({ pageTransition: 'slideForward', pathname: href })}>
      <div className="flex w-full items-center justify-between font-normal">
        <span>{title}</span>
        <div className="flex items-center space-x-1 text-gray-400">
          <span>{placeholder}</span>
          <Symbol symbol="chevron_right" className="text-2xl text-gray-400" />
        </div>
      </div>
    </Button>
  )
}
