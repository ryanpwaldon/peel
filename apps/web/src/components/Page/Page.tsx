import { useState } from 'react'
import Header from '@/components/Header/Header'
import Navigation from '@/components/Navigation/Navigation'

interface PageProps {
  children: React.ReactNode
  headerLeft?: React.ReactNode
  headerCenter?: React.ReactNode
  headerRight?: React.ReactNode
  headerFill?: boolean
  showNavigation?: boolean
}

export default function Page({ children, headerLeft, headerCenter, headerRight, headerFill = false, showNavigation = true }: PageProps) {
  const [pageScrollY, setPageScrollY] = useState(0)
  const showHeader = headerLeft || headerCenter || headerRight

  return (
    <div className="flex h-full w-full flex-col">
      {showHeader && <Header left={headerLeft} center={headerCenter} right={headerRight} fill={headerFill || pageScrollY !== 0} />}
      <div className={`flex-1 overflow-auto ${showHeader && 'pt-1'}`} onScroll={(event) => setPageScrollY(event.currentTarget.scrollTop)}>
        {children}
      </div>
      {showNavigation && <Navigation />}
    </div>
  )
}
