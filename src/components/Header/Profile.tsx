'use client'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { useState, FC } from 'react'
import { useAuth } from '../../contexts/auth'
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  SvgIconProps,
  Typography,
} from '@mui/material'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import HelpIcon from '@mui/icons-material/Help'

interface Props {
  Icon: FC<SvgIconProps>
  text: string
}

const MenuItemContent: FC<Props> = ({ Icon, text }) => {
  return (
    <>
      <Icon className='mr-3 text-secondary' fontSize='small' />
      <Typography variant='inherit'>{text}</Typography>
    </>
  )
}

export default function Profile() {
  const { user } = useAuth()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMenuOpen = Boolean(anchorEl)

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget)
  const closeMenu = () => setAnchorEl(null)

  return (
    <div className='flex items-center'>
      <button onClick={openMenu}>
        <Avatar
          style={{ width: '2rem', height: '2rem' }}
          src={user?.picture ?? ''}
          alt={user?.name}
        />
      </button>
      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={closeMenu}
        elevation={1}
        sx={{ width: '220px' }}
      >
        <div className='p-4 pb-2 flex items-center space-x-4'>
          <Avatar src={user?.picture ?? ''} alt={user?.name} />
          <Typography variant='h6' className='truncate'>
            {user?.name}
          </Typography>
        </div>
        <Divider sx={{ margin: '12px 0' }} />
        <Link href={`/channel/${user?.id}`}>
          <MenuItem onClick={closeMenu}>
            <MenuItemContent Icon={AccountBoxIcon} text='Your channel' />
          </MenuItem>
        </Link>
        <Link href='/api/logout'>
          <MenuItem onClick={closeMenu}>
            <MenuItemContent Icon={ExitToAppIcon} text='Sign out' />
          </MenuItem>
        </Link>
        <Divider sx={{ margin: '12px 0' }} />
        <MenuItem onClick={closeMenu}>
          <MenuItemContent Icon={SettingsIcon} text='Settings' />
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <MenuItemContent Icon={HelpIcon} text='Help' />
        </MenuItem>
      </Menu>
    </div>
  )
}
