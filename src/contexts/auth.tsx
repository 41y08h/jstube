'use client'
import { AxiosError } from 'axios'
import User from '../interfaces/User'
import { useQuery } from '@tanstack/react-query'
import LoginModal from '../components/LoginModal'
import React, { createContext, FC, useContext, useState } from 'react'

interface AuthContext {
  isLoading: boolean
  error: AxiosError<{ code: number; message: string }> | null
  user?: User
  authenticate<T extends (...args: unknown[]) => unknown>(
    fn: T
  ): (...fnArgs: Parameters<T>) => ReturnType<T> | void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContext | undefined>(undefined)

export function useAuth(): AuthContext {
  const t = useContext(AuthContext)
  if (t === undefined) throw Error('AuthProvider missing')
  return t
}

interface Props {
  children: React.ReactNode
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const { isLoading, error, data } = useQuery<
    User,
    AxiosError<{ code: number; message: string }>
  >({
    queryKey: ['/api/auth/user'],
    retry: false,
    refetchOnWindowFocus: false,
  })

  const user = data

  function authenticate<T extends (...args: unknown[]) => unknown>(
    fn: T
  ): (...fnArgs: Parameters<T>) => ReturnType<T> | void {
    return (...args: Parameters<T>): ReturnType<T> | void => {
      // The auth status is loading
      if (isLoading) return

      // The user is authenticated
      const isUserAuthenticated = Boolean(user)
      if (isUserAuthenticated) fn(...args)
      // The user is not authenticated
      else setIsLoginModalOpen(true)
    }
  }

  const value = {
    user,
    error,
    isLoading,
    authenticate,
    isAuthenticated: Boolean(user),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </AuthContext.Provider>
  )
}
