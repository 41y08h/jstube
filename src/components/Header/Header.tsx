'use client'
import Link from 'next/link'
import React, { FC } from 'react'
import { IconButton, Toolbar, AppBar } from '@mui/material'
import MenuIcon from '@material-ui/icons/Menu'
import SignInButton from '../SignInButton'
import { useAuth } from '../../contexts/Auth'
import Profile from './Profile'
import Search from './Search'

const Header: FC<{ toggleSidebar: Function }> = ({ toggleSidebar }) => {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth()

  return (
    <>
      <AppBar position='fixed' variant='outlined'>
        <Toolbar className={' text-primary'}>
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
    </>
  )
}

export default Header
