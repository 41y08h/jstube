'use client'
import { Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

const Footer: FC = () => (
  <footer className='p-6 pt-0'>
    <div className='text-xs font-medium text-secondary space-y-2'>
      <div className='space-x-3'>
        <Link href='/about'>About</Link>
        <Link target='blank' href='https://github.com/41y08h/jstube'>
          Source
        </Link>
        <Link target='blank' href='https://github.com/41y08h'>
          Developer
        </Link>
      </div>
      <div className='space-x-3'>
        <Link target='blank' href='https://github.com/41y08h/jstube/issues'>
          Report Bug
        </Link>
        <Link target='blank' href='/copyright'>
          Copyright
        </Link>
      </div>
    </div>
    <div className='mt-2'>
      <Typography variant='caption' color='secondary'>
        &copy; {new Date().getFullYear()} JsTube
      </Typography>
    </div>
  </footer>
)

export default Footer
