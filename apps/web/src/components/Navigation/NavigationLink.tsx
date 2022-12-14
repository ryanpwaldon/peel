import { useRouter } from 'next/router'
import { vibrate } from '@/utils/vibrate'
import Link from '@/components/Link/Link'
import Symbol from '@/components/Symbol/Symbol'

export interface NavigationLinkProps {
  symbol: string
  path: string
}

export default function NavigationLink({ symbol, path }: NavigationLinkProps) {
  const router = useRouter()
  const isActive = path === router.pathname

  return (
    <Link
      href={path}
      onClick={vibrate}
      pageTransition="none"
      className={`flex w-1/5 items-center justify-center py-4 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}
    >
      <Symbol symbol={symbol} className="block pb-device-bar-bottom text-[28px] font-medium leading-8" />
    </Link>
  )
}
