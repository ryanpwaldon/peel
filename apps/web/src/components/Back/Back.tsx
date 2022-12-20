import { useRouter } from 'next/router'
import Symbol from '@/components/Symbol/Symbol'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/Page/PageTransitionProvider'

interface BackProps {
  children?: React.ReactNode
  pageTransition?: PageTransition
}

export default function Back({ children, pageTransition = 'slideBack' }: BackProps) {
  const router = useRouter()
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)

  const onClick = () => {
    setPageTransition(pageTransition)
    router.back()
  }

  return (
    <button type="button" onClick={onClick}>
      {children ?? (
        <div className="flex items-center text-base text-blue-600">
          <Symbol className="font-bold" symbol="arrow_back_ios" />
          <span>Back</span>
        </div>
      )}
    </button>
  )
}
