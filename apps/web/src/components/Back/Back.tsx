import Link from '@/components/Link/Link'
import Symbol from '@/components/Symbol/Symbol'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PreviousRouteContext } from '@/components/PreviousRoute/PreviousRouteProvider'

export default function Back() {
  const previousRoute = useContextOrThrow(PreviousRouteContext)

  return (
    <Link className="flex items-center text-base text-blue-600" href={previousRoute} pageTransition="back">
      <Symbol className="font-bold" symbol="arrow_back_ios" />
      <span>Back</span>
    </Link>
  )
}
