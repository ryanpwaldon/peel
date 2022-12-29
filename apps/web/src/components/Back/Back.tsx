import { useRouter } from 'next/router'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/Page/PageTransitionProvider'

interface BackProps {
  pageTransition?: PageTransition
  content: (onClick: () => void) => React.ReactNode
}

export default function Back({ pageTransition = 'slideBack', content }: BackProps) {
  const router = useRouter()
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)

  const onClick = () => {
    setPageTransition(pageTransition)
    router.back()
  }

  return <>{content(onClick)}</>
}

export const useBack = () => {
  const router = useRouter()
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)

  return {
    go: (pageTransition: PageTransition = 'slideBack') => {
      setPageTransition(pageTransition)
      return router.back()
    },
  }
}
