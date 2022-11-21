import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

interface AuthGuardProps {
  children: React.ReactNode
}

const publicRoutes = ['/login']

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const session = useSession()
  const isPublicRoute = publicRoutes.includes(router.pathname)
  const isLoggedIn = !!session.data
  const isLoading = session.status === 'loading'

  if (isLoading) return <>Loading...</>
  if (isPublicRoute) return <>{children}</>
  if (isLoggedIn) return <>{children}</>

  // Redirect to login page
  router.push('/login')
  return null
}
