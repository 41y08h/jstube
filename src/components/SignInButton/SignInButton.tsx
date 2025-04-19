'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { Button, Typography, useTheme } from '@mui/material'

const SignInButton = () => {
  const theme = useTheme()
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
      href={`/api/auth/google?state=${state}`}
      sx={{
        borderRadius: '20px',
        borderColor: theme.palette.grey[300],
        textTransform: 'none',
        height: '40px',
        padding: '0 10px',
      }}
    >
      <span className='material-symbols-outlined mr-1'>account_circle</span>
      <Typography variant='subtitle2' className='text-xs'>
        Sign in
      </Typography>
    </Button>
  )
}

export default SignInButton
