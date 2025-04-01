import React, { FC } from 'react'

import items from './items'
import Link from 'next/link'
import Subscriptions from './Subscriptions'
import { useAuth } from '../../contexts/Auth'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import moreItems from './moreItems'
import Footer from './Footer'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from '@mui/material'

interface Props {
  isOpen: boolean
  toggleIsOpen(): void
}

const Sidebar: FC<Props> = ({ isOpen, toggleIsOpen }) => {
  const { user: isLoggedIn } = useAuth()

  return (
    <SwipeableDrawer
      anchor='left'
      open={isOpen}
      onOpen={toggleIsOpen}
      onClose={toggleIsOpen}
      sx={{
        width: 245,
        overflowX: 'hidden',
      }}
    >
      <div className='flex items-center pt-2 pr-3.5'>
        <IconButton onClick={toggleIsOpen}>
          <MenuIcon />
        </IconButton>
        <Link href='/'>
          <img className='h-5 pl-4' src='/jstube_logo.svg' alt='JsTube' />
        </Link>
      </div>
      <List>
        {items.map((Item, i) => {
          if (Item === 'divider') return <Divider key={i} />
          else {
            const Component = (
              <Link key={i} href={Item.link}>
                <ListItem>
                  <ListItemIcon>
                    <Item.Icon />
                  </ListItemIcon>
                  <ListItemText primary={Item.text} />
                </ListItem>
              </Link>
            )

            return Item.isAuthRequired ? isLoggedIn && Component : Component
          }
        })}
      </List>
      <Subscriptions />
      <Divider sx={{ margin: '12px 0' }} />
      <Typography component='span' variant='button' className='px-7'>
        More from JsTube
      </Typography>
      <List>
        {moreItems.map((Item, i) => {
          if (Item === 'divider')
            return <Divider key={i} sx={{ margin: '12px 0' }} />
          else {
            const Component = (
              <Link key={i} href={Item.link}>
                <ListItem>
                  <ListItemIcon
                    sx={{
                      width: '46px',
                      minWidth: 'unset',
                    }}
                  >
                    <Item.Icon />
                  </ListItemIcon>
                  <ListItemText primary={Item.text} />
                </ListItem>
              </Link>
            )

            return Item.isAuthRequired ? isLoggedIn && Component : Component
          }
        })}
      </List>
      <Footer />
    </SwipeableDrawer>
  )
}

export default Sidebar
