import { UrlObject } from 'url'
import { Sheet } from '@/components/Sheet/Sheet'
import { useLink } from '@/components/Link/Link'
import ListButton from '@/components/ListButton/ListButton'
import { PageTransition } from '@/components/Page/PageTransitionProvider'

interface SheetOption {
  label: string
  symbol: string
  url?: UrlObject
  pageTransition?: PageTransition
  onClick?: () => void
}

interface SheetOptionsProps {
  trigger: React.ReactNode
  options: SheetOption[]
}

export default function SheetOptions({ trigger, options }: SheetOptionsProps) {
  const link = useLink()

  const onClick = async (option: SheetOption, close: () => Promise<void>) => {
    await close()
    if (option.url) link.push({ ...option.url, pageTransition: option.pageTransition ?? 'slideForward' })
    if (option.onClick) option.onClick()
  }

  return (
    <Sheet
      trigger={trigger}
      content={(close) => (
        <div className="w-full px-5 pt-5">
          {options.map((option, i) => (
            <ListButton key={i} symbol={option.symbol} text={option.label} onClick={() => onClick(option, close)} />
          ))}
        </div>
      )}
    />
  )
}
