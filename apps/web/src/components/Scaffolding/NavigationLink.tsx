import Link from 'next/link'
import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'

export interface NavigationLinkProps {
  symbol: string
  path: string
}

export default function NavigationLink({ symbol, path }: NavigationLinkProps) {
  const router = useRouter()
  const isActive = path === router.pathname

  return (
    <Link href={path} className={`flex justify-center items-center py-4 w-1/5 ${isActive ? 'text-gray-800' : 'text-gray-400'}`}>
      <Symbol symbol={symbol} className="text-[28px] leading-8 pb-device-bar-bottom block font-medium" />
    </Link>
  )
}
