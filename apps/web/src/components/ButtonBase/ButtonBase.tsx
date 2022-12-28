import Link from 'next/link'
import { UrlObject } from 'url'
import { useState } from 'react'
import { usePress } from 'react-aria'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/Page/PageTransitionProvider'

interface ButtonBaseProps {
  url?: UrlObject
  pageTransition?: PageTransition
  type?: 'button' | 'submit'
  isDisabled?: boolean
  defaultClasses?: string
  initialClasses?: string
  pressedClasses?: string
  onClick?: () => void
  children: React.ReactNode
}

export default function ButtonBase({
  url,
  pageTransition = 'slideForward',
  type = 'button',
  isDisabled = false,
  defaultClasses = '',
  initialClasses = '',
  pressedClasses = '',
  onClick,
  children,
}: ButtonBaseProps) {
  const [isPressed, setIsPressed] = useState(false)
  const { setPageTransition } = useContextOrThrow(PageTransitionContext)
  const classList = `block outline-none transition-all ${defaultClasses} ${isPressed ? pressedClasses : initialClasses}`

  const { pressProps } = usePress({
    onPressEnd: () => setIsPressed(false),
    onPressStart: () => setIsPressed(true),
    onPress: () => {
      url && setPageTransition(pageTransition)
      onClick && onClick()
    },
  })

  return url ? (
    <Link {...pressProps} href={url} draggable={false} className={classList}>
      {children}
    </Link>
  ) : (
    <button {...pressProps} type={type} disabled={isDisabled} className={classList}>
      {children}
    </button>
  )
}
