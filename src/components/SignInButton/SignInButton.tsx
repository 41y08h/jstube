'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Button } from '@mui/material'

const SignInButton = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const url = `${pathname}${
    searchParams.toString() ? '?' + searchParams.toString() : ''
  }`
  const state = encodeURIComponent(window.location.origin + url)

  return (
    <Button
      variant='outlined'
      color='primary'
      startIcon={<AccountCircleIcon />}
      href={`/api/auth/google?state=${state}`}
    >
      Sign in
    </Button>
  )
}

export default SignInButton
