import React, { FC } from 'react'
import Link from 'next/link'
import Subscriptions from './Subscriptions'
import Footer from './Footer'
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  SwipeableDrawer,
  Typography,
  useTheme,
} from '@mui/material'
import Image from 'next/image'

interface Props {
  isOpen: boolean
  toggleIsOpen(): void
}

function Item({
  href,
  icon,
  text,
}: {
  href: string
  icon: string
  text: string
}) {
  return (
    <Link href={href}>
      <ListItem>
        <ListItemIcon>
          <span className='material-symbols-outlined'>{icon}</span>
        </ListItemIcon>
        <Typography variant='body2'>{text}</Typography>
      </ListItem>
    </Link>
  )
}

const Sidebar: FC<Props> = ({ isOpen, toggleIsOpen }) => {
  const theme = useTheme()

  return (
    <SwipeableDrawer
      anchor='left'
      open={isOpen}
      onOpen={toggleIsOpen}
      onClose={toggleIsOpen}
    >
      <div className='w-60 h-screen flex flex-col'>
        <div className='flex items-center p-6 pt-2 pb-0 shrink-0 sticky top-0 z-10 bg-white'>
          <IconButton
            onClick={() => toggleIsOpen()}
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
        <div className='overflow-y-auto flex-1 themed-scrollbar'>
          <List>
            <Item href='/' icon='home' text='Home' />
            <Item href='/' icon='subscriptions' text='Subscriptions' />
          </List>
          <Divider />
          <List>
            <Link href='/' className='px-4'>
              <Button
                variant='text'
                color='inherit'
                sx={{ textTransform: 'none', justifyContent: 'start' }}
              >
                <Typography
                  style={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  You
                </Typography>
                <span className='material-symbols-outlined'>chevron_right</span>
              </Button>
            </Link>
            <Item href='/history' icon='history' text='History' />
            <Item href='/playlists' icon='playlist_play' text='Playlists' />
            <Item href='/my-videos' icon='smart_display' text='Your Videos' />
            <Item
              href='/playlists/watch-later'
              icon='watch_later'
              text='Watch Later'
            />
            <Item href='/playlists/liked' icon='thumb_up' text='Liked Videos' />
          </List>
          <Divider />

          <Subscriptions />
          <Divider />
          <div className='py-4'>
            <Typography
              className='px-4'
              style={{ fontWeight: theme.typography.fontWeightBold }}
            >
              Explore
            </Typography>
            <List>
              <Item href='/' icon='trending_up' text='Trending' />
              <Item href='/' icon='shopping_bag' text='Shopping' />
              <Item href='/' icon='music_note' text='Music' />
              <Item href='/' icon='movie' text='Movies' />
              <Item href='/' icon='live_tv' text='Live' />
              <Item href='/' icon='sports_esports' text='Gaming' />
              <Item href='/' icon='article' text='News' />
              <Item href='/' icon='sports_soccer' text='Sports' />
              <Item href='/' icon='school' text='Courses' />
              <Item href='/' icon='styler' text='Fashion & Beauty' />
              <Item href='/' icon='podcasts' text='Podcasts' />
            </List>
            <Divider />
            <List>
              <Item href='/' icon='settings' text='Settings' />
              <Item href='/' icon='flag' text='Report history' />
              <Item href='/' icon='help' text='Help' />
              <Item href='/' icon='feedback' text='Send feedback' />
            </List>
            <Divider />
          </div>
          <Footer />
        </div>
      </div>
    </SwipeableDrawer>
  )
}

export default Sidebar
