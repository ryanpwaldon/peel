import NextLink from 'next/link'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/PageTransition/PageTransitionProvider'

type LinkProps = Parameters<typeof NextLink>[0] & {
  pageTransition: PageTransition
  children: React.ReactNode
}

export default function Link({ pageTransition, children, ...nextLinkProps }: LinkProps) {
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)

  return (
    <NextLink {...nextLinkProps} onClick={() => setPageTransition(pageTransition)} draggable="false">
      {children}
    </NextLink>
  )
}
