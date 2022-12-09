import { useDomEvent } from 'framer-motion'
import { RefObject, useRef, useState } from 'react'

const isTouchEvent = (event: Event): event is TouchEvent => {
  return event instanceof TouchEvent
}

interface UseWhileLongPressProps {
  elementRef: RefObject<HTMLDivElement>
  onLongPressMove: (x: number, y: number) => void
  onLongPressCancel: () => void
}

export const useWhileLongPress = ({ elementRef, onLongPressMove, onLongPressCancel }: UseWhileLongPressProps) => {
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)
  const [longPressActive, setLongPressActive] = useState(false)

  const cancelLongPress = () => {
    onLongPressCancel()
    setLongPressActive(false)
    longPressTimer.current && clearTimeout(longPressTimer.current)
  }

  const onLongPress = (event: TouchEvent) => {
    setLongPressActive(true)
    const touch = event.touches[0]
    if (touch) onLongPressMove(touch.clientX, touch.clientY)
  }

  const onPressStart = (event: Event) => {
    if (isTouchEvent(event)) longPressTimer.current = setTimeout(() => onLongPress(event), 500)
  }

  const onPressEnd = () => {
    console.log('onPressEnd')
    cancelLongPress()
  }

  const onPressMove = (event: Event) => {
    if (longPressActive) {
      event.preventDefault()
      if (isTouchEvent(event)) {
        const touch = event.touches[0]
        if (touch) onLongPressMove(touch.clientX, touch.clientY)
      }
    } else cancelLongPress()
  }

  useDomEvent(elementRef, 'touchmove', onPressMove, { passive: false })
  useDomEvent(elementRef, 'touchstart', onPressStart)
  useDomEvent(elementRef, 'touchend', onPressEnd)
}
