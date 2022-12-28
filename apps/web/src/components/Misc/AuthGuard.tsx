import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Spinner from '@/components/Spinner/Spinner'

interface AuthGuardProps {
  children: React.ReactNode
}

const publicRoutes = ['/login', '/verify']

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const session = useSession()
  const isPublicRoute = publicRoutes.includes(router.pathname)
  const isLoggedIn = !!session.data
  const isLoading = session.status === 'loading'

  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )
  if (isPublicRoute) return <>{children}</>
  if (isLoggedIn) return <>{children}</>

  // Redirect to login page
  router.push('/login')
  return null
}
