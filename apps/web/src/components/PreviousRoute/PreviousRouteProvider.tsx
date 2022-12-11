import { useRouter } from 'next/router'
import { createContext, useEffect, useRef } from 'react'

interface PreviousRouteProps {
  children: React.ReactNode
}

export const PreviousRouteContext = createContext<string | undefined>(undefined)

export default function PreviousRouteProvider({ children }: PreviousRouteProps) {
  const { asPath } = useRouter()
  const firstRender = useRef(true)
  const previousRoute = useRef<string | undefined>()

  useEffect(() => {
    if (firstRender.current) previousRoute.current = '/'
    else previousRoute.current = asPath
  }, [asPath])

  return <PreviousRouteContext.Provider value={previousRoute.current}>{children}</PreviousRouteContext.Provider>
}
