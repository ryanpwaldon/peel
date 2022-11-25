import Symbol from '@/components/Symbol/Symbol'
import Link from 'next/link'

interface ListItem {
  title: string
  subtext: string
  path: string
}

interface ListProps {
  items: ListItem[]
  className?: string
}

export default function List({ items, className }: ListProps) {
  return (
    <div className={`w-full divide-y-hairline divide-gray-200 border-y-hairline border-gray-200 bg-white ${className}`}>
      {items.map((item, i) => (
        <Link className="flex w-full items-center justify-between px-4 py-3" key={i} href={item.path}>
          <div className="flex flex-col">
            <span className="font-medium">{item.title}</span>
            <span className="text-xs text-gray-500">{item.subtext}</span>
          </div>
          <Symbol symbol="arrow_forward_ios" className="font-medium text-gray-400" />
        </Link>
      ))}
      <div />
    </div>
  )
}
