'use client'
import Link from 'next/link'
import React, { FC, useMemo } from 'react'
import { IconButton, Toolbar, AppBar, Box } from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import SignInButton from '../SignInButton'
import { useAuth } from '../../contexts/auth'
import Profile from './Profile'
import Search from './Search'
import { useTheme } from '@mui/material/styles'

const Header: FC<{ toggleSidebar: Function }> = ({ toggleSidebar }) => {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth()
  const theme = useTheme()
  const styles = useMemo(
    () => ({
      offset: theme.mixins.toolbar,
    }),
    [theme]
  )

  return (
    <>
      <AppBar
        position='fixed'
        variant='outlined'
        sx={{
          boxShadow: 'none',
          backgroundColor: 'white',
          borderRight: 'none',
        }}
      >
        <Toolbar className='text-primary justify-between'>
          <div className='flex items-center space-x-3'>
            <IconButton
              onClick={() => toggleSidebar()}
              edge='start'
              color='default'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
            <Link href='/'>
              <img className='h-5' src='/jstube_logo.svg' alt='JsTube' />
            </Link>
          </div>
          <div className='flex items-center space-x-2'>
            <Search />
            {isAuthLoading ? null : isAuthenticated ? (
              <Profile />
            ) : (
              <SignInButton />
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Box component='div' sx={styles.offset} />
    </>
  )
}

export default Header
