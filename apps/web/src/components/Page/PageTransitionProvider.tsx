import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

export type PageTransition = 'slideForward' | 'slideBack' | 'slideUp' | 'slideDown' | 'none'

interface PageTransitionContext {
  pageTransition: PageTransition
  setPageTransition: Dispatch<SetStateAction<PageTransition>>
}

export const PageTransitionContext = createContext<PageTransitionContext | undefined>(undefined)

export default function PageTransition({ children }: PageTransitionProps) {
  const [pageTransition, setPageTransition] = useState<PageTransition>('none')
  return <PageTransitionContext.Provider value={{ pageTransition, setPageTransition }}>{children}</PageTransitionContext.Provider>
}
