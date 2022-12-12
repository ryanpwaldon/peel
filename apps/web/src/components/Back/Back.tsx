import Link from '@/components/Link/Link'
import Symbol from '@/components/Symbol/Symbol'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PreviousRouteContext } from '@/components/PreviousRoute/PreviousRouteProvider'

interface BackProps {
  children?: React.ReactNode
}

export default function Back({ children }: BackProps) {
  const previousRoute = useContextOrThrow(PreviousRouteContext)

  return (
    <Link href={previousRoute} pageTransition="back">
      {children ?? (
        <div className="flex items-center text-base text-blue-600">
          <Symbol className="font-bold" symbol="arrow_back_ios" />
          <span>Back</span>
        </div>
      )}
    </Link>
  )
}
