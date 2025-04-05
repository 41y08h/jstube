'use client'
import axios from 'axios'
import Link from 'next/link'
import { FC, useState } from 'react'
import { Avatar, Button, Typography, useTheme } from '@mui/material'
import { red, grey } from '@mui/material/colors'
import { useAuth } from '../../contexts/auth'
import ISubscribers from '../../interfaces/Subscribers'
import { IChannel } from '../../interfaces/User'
import formatNumber from '../../lib/formatNumber'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface Props {
  channel: IChannel
}

const ChannelBar: FC<Props> = ({ channel }) => {
  const [subscribers, setSubscribers] = useState(channel.subscribers)
  const { authenticate } = useAuth()
  const queryClient = useQueryClient()
  const theme = useTheme()

  const subscribersMutation = useMutation({
    mutationFn: (unsubscribe: boolean) => {
      const url = `/api/subscribers/${channel.id}`
      return unsubscribe
        ? axios.delete<ISubscribers>(url).then(res => res.data)
        : axios.post<ISubscribers>(url).then(res => res.data)
    },
    onSuccess: data => {
      setSubscribers(data)
      queryClient.invalidateQueries({
        queryKey: ['/api/subscribers/subscriptions'],
      })
    },
  })

  const subscribe = authenticate(() =>
    subscribersMutation.mutate(subscribers.isUserSubscribed)
  )

  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center space-x-4'>
        <Link href={`/channel/${channel.id}`}>
          <Avatar src={channel.picture} alt={channel.name} />
        </Link>
        <div className='flex flex-col'>
          <Link href={`/channel/${channel.id}`}>
            <Typography variant='subtitle2'>{channel.name}</Typography>
          </Link>
          <Typography variant='caption' color='text.secondary'>
            {formatNumber(subscribers.count)} subscriber
            {subscribers.count === 1 ? '' : 's'}
          </Typography>
        </div>
      </div>

      <Button
        disableElevation
        variant='contained'
        sx={{
          px: 2,
          backgroundColor: subscribers.isUserSubscribed ? grey[200] : red[500],
          color: subscribers.isUserSubscribed
            ? theme.palette.text.primary
            : theme.palette.getContrastText(red[500]),
          '&:hover': {
            backgroundColor: subscribers.isUserSubscribed
              ? grey[300]
              : red[700],
          },
        }}
        onClick={subscribe}
        disabled={subscribersMutation.isPending}
      >
        {subscribers.isUserSubscribed ? 'Subscribed' : 'Subscribe'}
      </Button>
    </div>
  )
}

export default ChannelBar
