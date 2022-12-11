import { useRouter } from 'next/router'
import { createContext, useEffect, useRef } from 'react'

interface PreviousRouteProps {
  children: React.ReactNode
}

export const PreviousRouteContext = createContext('/')

export default function PreviousRoute({ children }: PreviousRouteProps) {
  const { asPath } = useRouter()

  const previousRoute = useRef('/')

  useEffect(() => {
    previousRoute.current = asPath
  }, [asPath])

  return <PreviousRouteContext.Provider value={previousRoute.current}>{children}</PreviousRouteContext.Provider>
}
