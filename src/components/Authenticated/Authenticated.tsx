'use client'

import { useAuth } from '@/contexts/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  children?: React.ReactNode
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const auth = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const hasLoggedOut = params.get('action') === 'logout'

  useEffect(() => {
    if (auth.isLoading) return
    if (auth.isAuthenticated) return
    if (hasLoggedOut) return router.replace('/')
    else router.replace(`/api/auth/google?state=${window.location}`)
  }, [auth.isAuthenticated, auth.isLoading, hasLoggedOut, router])

  if (auth.isLoading) return null
  if (auth.isAuthenticated) return children

  return null
}

export default Authenticated
