'use client'
import Link from 'next/link'
import React, { FC, useMemo } from 'react'
import {
  IconButton,
  Toolbar,
  AppBar,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material'
import SignInButton from '../SignInButton'
import { useAuth } from '../../contexts/auth'
import Profile from './Profile'
import { useTheme } from '@mui/material/styles'
import Image from 'next/image'

const Header: FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth()
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
          borderBottom: 'none',
        }}
      >
        <Toolbar className='text-primary justify-between'>
          <div className='flex justify-between w-full px-2'>
            <div className='flex items-center'>
              <IconButton
                onClick={() => toggleSidebar()}
                edge='start'
                color='default'
                aria-label='menu'
              >
                <span className='material-symbols-outlined'>menu</span>
              </IconButton>
              <Link href='/' className='block ml-3'>
                <div className='relative h-5 aspect-[421.384/109.2]'>
                  <Image
                    src='/jstube_logo.svg'
                    alt='JsTube'
                    fill
                    className='object-contain'
                  />
                </div>
              </Link>
            </div>

            <div className='flex'>
              <TextField
                size='small'
                variant='outlined'
                placeholder='Search'
                className='w-lg'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '20px 0 0 20px',
                    minHeight: '100%',
                  },
                }}
              />
              <Button
                variant='outlined'
                color='secondary'
                sx={{
                  borderRadius: '0 20px 20px 0',
                  borderLeft: 'none',
                  minHeight: '100%',
                  padding: '0 20px',
                }}
              >
                <span className='material-symbols-outlined'>search</span>
              </Button>
            </div>
            <div className='flex items-center'>
              <Link href='/upload' className='h-full'>
                <Button
                  color='inherit'
                  sx={{
                    borderRadius: '20px',
                    padding: '0 20px',
                    marginLeft: '10px',
                    height: '95%',
                    backgroundColor: theme.palette.grey[200],
                    textTransform: 'none',
                  }}
                >
                  <span className='material-symbols-outlined mr-1'>add</span>
                  <Typography
                    variant='subtitle2'
                    fontWeight={theme.typography.fontWeightBold}
                  >
                    Create
                  </Typography>
                </Button>
              </Link>
              <div className='ml-3'>
                {isAuthLoading ? null : isAuthenticated ? (
                  <Profile />
                ) : (
                  <SignInButton />
                )}
              </div>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box component='div' sx={styles.offset} />
    </>
  )
}

export default Header
