import { useState } from 'react'
import Header from '@/components/Header/Header'
import Navigation from '@/components/Navigation/Navigation'

interface PageProps {
  children: React.ReactNode
  headerLeft?: React.ReactNode
  headerCenter?: React.ReactNode
  headerRight?: React.ReactNode
  showNavigation?: boolean
}

export default function Page({ children, headerLeft, headerCenter, headerRight, showNavigation = true }: PageProps) {
  const [pageScrollY, setPageScrollY] = useState(0)
  const showHeader = headerLeft || headerCenter || headerRight

  return (
    <div className="flex h-full w-full flex-col">
      {showHeader && <Header left={headerLeft} center={headerCenter} right={headerRight} isScrolled={pageScrollY !== 0} />}
      <div className="flex-1 overflow-auto" onScroll={(event) => setPageScrollY(event.currentTarget.scrollTop)}>
        {showHeader && <div className="mt-1" />}
        {children}
      </div>
      {showNavigation && <Navigation />}
    </div>
  )
}
