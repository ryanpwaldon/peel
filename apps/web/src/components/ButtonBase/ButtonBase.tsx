import Link from 'next/link'
import { useState } from 'react'
import { usePress } from 'react-aria'
import { useContextOrThrow } from '@/utils/useContextOrThrow'
import { PageTransition, PageTransitionContext } from '@/components/Page/PageTransitionProvider'

interface ButtonBaseProps {
  href?: string
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
  href,
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
      href && setPageTransition(pageTransition)
      onClick && onClick()
    },
  })

  return href ? (
    <Link {...pressProps} href={href} draggable={false} className={classList}>
      {children}
    </Link>
  ) : (
    <button {...pressProps} type={type} disabled={isDisabled} className={classList}>
      {children}
    </button>
  )
}
