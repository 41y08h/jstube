'use client'

import { useAuth } from '@/contexts/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface Props {
  children?: React.ReactNode
}

const Authenticated: React.FC<Props> = ({ children }) => {
  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      const authURL = `/api/auth/google?state=${window.location}`
      router.replace(authURL)
    }
  }, [auth.isAuthenticated, auth.isLoading, router])

  if (auth.isLoading) return null
  if (auth.isAuthenticated) return children

  return null
}

export default Authenticated
