import Symbol from '@/components/Symbol/Symbol'
import ButtonBase from '@/components/ButtonBase/ButtonBase'
import { UrlObject } from 'url'

interface ListButtonGroupProps {
  items: ListButton[]
}

interface ListButton {
  label: string
  value?: string
  url: UrlObject
}

export default function ListButtonGroup({ items }: ListButtonGroupProps) {
  return (
    <div className="overflow-hidden rounded-xl border-hairline border-gray-200">
      {items.map((item, i) => (
        <ButtonBase key={i} initialClasses="bg-white" pressedClasses="bg-gray-100" defaultClasses="h-11 w-full pl-5" url={item.url}>
          <div className="flex h-full w-full items-center justify-between border-b-hairline border-gray-200 pr-4 text-base">
            <span>{item.label}</span>
            <div className="flex items-center space-x-2">
              {item.value && <span className="text-gray-400">{item.value}</span>}
              <Symbol className="font-bold text-gray-300" symbol="arrow_forward_ios" />
            </div>
          </div>
        </ButtonBase>
      ))}
    </div>
  )
}
