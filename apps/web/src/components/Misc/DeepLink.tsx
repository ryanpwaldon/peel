import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { App, type URLOpenListenerEvent } from '@peel/native/src/app'

export default function DeepLink() {
  const router = useRouter()
  useEffect(() => {
    App.addListener('appUrlOpen', async (event: URLOpenListenerEvent) => {
      const { pathname, search } = new URL(event.url)
      router.push(`${pathname}${search}`)
    })
  }, [router])
  return null
}
