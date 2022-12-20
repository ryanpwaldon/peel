import NavigationLink, { type NavigationLinkProps } from '@/components/Navigation/NavigationLink'

const navigationLinks: NavigationLinkProps[] = [
  { symbol: 'home', path: '/' },
  { symbol: 'map', path: '/map' },
  { symbol: 'calendar_month', path: '/sessions' },
  { symbol: 'add_box', path: '/sessions/create' },
]

export default function Navigation() {
  return (
    <div className="flex w-full flex-shrink-0 justify-center border-t-hairline border-gray-200 bg-white">
      {navigationLinks.map((item, i) => (
        <NavigationLink symbol={item.symbol} path={item.path} key={i} />
      ))}
    </div>
  )
}
