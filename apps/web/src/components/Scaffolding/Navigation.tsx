import NavigationLink, { type NavigationLinkProps } from '@/components/Scaffolding/NavigationLink'

const navigationLinks: NavigationLinkProps[] = [
  { symbol: 'home', path: '/' },
  { symbol: 'map', path: '/map' },
  { symbol: 'calendar_month', path: '/sessions' },
  { symbol: 'add_box', path: '/sessions/create' },
]

export default function Navigation() {
  return (
    <div className="w-full border-t-hairline border-gray-200 bg-white flex justify-center flex-shrink-0">
      {navigationLinks.map((item, i) => (
        <NavigationLink symbol={item.symbol} path={item.path} key={i} />
      ))}
    </div>
  )
}
