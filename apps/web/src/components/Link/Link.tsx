import { UrlObject } from 'url'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/Page/PageTransitionProvider'

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

type PushProps = UrlObject & {
  pageTransition: PageTransition
}

export const useLink = () => {
  const router = useRouter()
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)

  return {
    push: ({ pageTransition, ...pushProps }: PushProps) => {
      setPageTransition(pageTransition)
      return router.push(pushProps)
    },
  }
}
