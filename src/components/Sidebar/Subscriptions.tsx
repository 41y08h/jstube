import { FC } from 'react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../../contexts/auth'
import { ISubscription } from '../../interfaces/Subscribers'

import {
  Avatar,
  Button,
  CircularProgress,
  Fade,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  useTheme,
} from '@mui/material'

const Subscriptions: FC = () => {
  const theme = useTheme()
  const { user } = useAuth()
  const isLoggedIn = Boolean(user)
  const subscriptionsQuery = useQuery<ISubscription[]>({
    queryKey: ['/api/subscribers/subscriptions'],
    enabled: isLoggedIn,
  })

  if (subscriptionsQuery.isLoading)
    return (
      <Fade
        in={subscriptionsQuery.isLoading}
        style={{
          transitionDelay: subscriptionsQuery.isLoading ? '800ms' : '0ms',
        }}
        unmountOnExit
      >
        <CircularProgress className='mx-auto my-7' />
      </Fade>
    )

  if (subscriptionsQuery.isSuccess && subscriptionsQuery.data.length > 0)
    return (
      <div className='py-4'>
        <Typography
          className='px-4'
          style={{ fontWeight: theme.typography.fontWeightBold }}
        >
          Subscriptions
        </Typography>
        <List component='nav'>
          {subscriptionsQuery.data.map(subscription => (
            <Link
              key={subscription.channel.id}
              href={`/channel/${subscription.channel.id}`}
            >
              <ListItem sx={{ paddingLeft: '24px', paddingRight: '24px' }}>
                <ListItemIcon sx={{ minWidth: 'unset', width: '46px' }}>
                  <Avatar
                    style={{ height: '28px', width: '28px' }}
                    src={subscription.channel.picture ?? ''}
                    alt={subscription.channel.name}
                  />
                </ListItemIcon>
                <Typography variant='body2'>
                  {subscription.channel.name}
                </Typography>
              </ListItem>
            </Link>
          ))}
        </List>
      </div>
    )

  if (subscriptionsQuery.isSuccess && subscriptionsQuery.data.length === 0)
    return null

  return (
    <div className='px-7 space-y-3 py-4'>
      <Typography variant='body2'>
        Sign in to like videos, comment, and subscribe.
      </Typography>
      <Button
        variant='outlined'
        color='primary'
        href='/api/auth/google'
        sx={{
          borderRadius: '20px',
          borderColor: theme.palette.grey[300],
          textTransform: 'none',

          marginTop: '10px',
        }}
      >
        <span className='material-symbols-outlined mr-1'>account_circle</span>
        <Typography variant='subtitle2'>Sign in</Typography>
      </Button>
    </div>
  )
}

export default Subscriptions
