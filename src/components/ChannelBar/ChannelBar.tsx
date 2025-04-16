'use client'
import axios from 'axios'
import Link from 'next/link'
import { FC } from 'react'
import { Avatar, Button, Divider, Typography, useTheme } from '@mui/material'
import { red, grey } from '@mui/material/colors'
import { useAuth } from '../../contexts/auth'
import ISubscribers from '../../interfaces/Subscribers'
import { IChannel } from '../../interfaces/User'
import formatNumber from '../../lib/formatNumber'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import IRatings from '@/interfaces/Ratings'
import { QVideo } from '@/interfaces/Video'

interface Props {
  videoId: number
  channel: IChannel
  ratings: IRatings
}

const ChannelBar: FC<Props> = ({ videoId, channel, ratings }) => {
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
      queryClient.invalidateQueries({
        queryKey: ['/api/subscribers/subscriptions'],
      })
      queryClient.setQueryData<QVideo>(
        [`/api/videos/${videoId}`],
        prevData => ({
          ...prevData!,
          channel: {
            ...prevData!.channel,
            subscribers: data,
          },
        })
      )
    },
  })

  type RatingType = 'like' | 'dislike' | 'remove'
  const ratingMutation = useMutation({
    mutationFn: (type: RatingType) => {
      type T = IRatings
      const url = `/api/ratings/videos/${videoId}`
      return type === 'like'
        ? axios.post<T>(`${url}/like`)
        : type === 'dislike'
        ? axios.post<T>(`${url}/dislike`)
        : axios.delete<T>(url)
    },
    onSuccess: res => {
      queryClient.setQueryData<QVideo>(
        [`/api/videos/${videoId}`],
        prevData => ({
          ...prevData!,
          ratings: res.data,
        })
      )
    },
  })

  const hasUserLiked = ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = ratings.userRatingStatus === 'DISLIKED'

  const subscribe = authenticate(() =>
    subscribersMutation.mutate(channel.subscribers.isUserSubscribed)
  )
  const subscribers = channel.subscribers

  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-4 mr-10'>
          <Link href={`/channel/${channel.id}`}>
            <Avatar src={channel.picture ?? ''} alt={channel.name} />
          </Link>
          <div className='flex flex-col'>
            <Link href={`/channel/${channel.id}`}>
              <Typography
                variant='body1'
                style={{
                  fontWeight: theme.typography.fontWeightBold,
                }}
              >
                {channel.name}
              </Typography>
            </Link>
            <Typography variant='caption' color='secondary'>
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
            backgroundColor: subscribers.isUserSubscribed ? grey[300] : 'black',
            borderRadius: '20px',
            textTransform: 'none',
            color: subscribers.isUserSubscribed
              ? theme.palette.text.primary
              : theme.palette.getContrastText(red[500]),
          }}
          onClick={subscribe}
          disabled={subscribersMutation.isPending}
        >
          {subscribers.isUserSubscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
      </div>
      <div className='flex items-center justify-start h-9'>
        <Button
          variant='text'
          onClick={() =>
            hasUserLiked
              ? ratingMutation.mutate('remove')
              : ratingMutation.mutate('like')
          }
          disabled={ratingMutation.isPending}
          sx={{
            borderRadius: '20px 0 0 20px',
            borderRight: 'none',
            minHeight: '100%',
            padding: '0 20px',
            backgroundColor: theme.palette.grey[200],
            color: 'black',
            '&.Mui-disabled': {
              opacity: 1, // Keep full opacity when disabled
              color: 'black', // Ensure text and icons stay black
              cursor: 'not-allowed',
            },
          }}
        >
          <span
            className='mr-2 material-symbols-outlined'
            style={
              hasUserLiked
                ? {
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48",
                  }
                : {}
            }
          >
            thumb_up
          </span>
          <Typography variant='button'>{ratings.count.likes}</Typography>
        </Button>
        <Divider orientation='vertical' />
        <Button
          variant='text'
          onClick={() =>
            hasUserDisliked
              ? ratingMutation.mutate('remove')
              : ratingMutation.mutate('dislike')
          }
          disabled={ratingMutation.isPending}
          sx={{
            borderRadius: '0 20px 20px 0',
            borderLeft: 'none',
            minHeight: '100%',
            padding: '0 20px',
            backgroundColor: theme.palette.grey[200],
            color: 'black',
            '&.Mui-disabled': {
              opacity: 1, // Keep full opacity when disabled
              color: 'black', // Ensure text and icons stay black
              cursor: 'not-allowed',
            },
          }}
        >
          <span
            className='material-symbols-outlined'
            style={
              hasUserDisliked
                ? {
                    fontVariationSettings:
                      "'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48",
                  }
                : {}
            }
          >
            thumb_down
          </span>
        </Button>
        <Button
          color='inherit'
          sx={{
            borderRadius: '20px',
            padding: '0 20px',
            marginLeft: '10px',
            minHeight: '100%',
            backgroundColor: theme.palette.grey[200],
            textTransform: 'none',
          }}
        >
          <span className='material-symbols-outlined mr-2'>share</span>
          <Typography
            variant='subtitle2'
            fontWeight={theme.typography.fontWeightBold}
          >
            Share
          </Typography>
        </Button>
        <Button
          color='inherit'
          sx={{
            borderRadius: '20px',
            padding: '0 20px',
            marginLeft: '10px',
            minHeight: '100%',
            backgroundColor: theme.palette.grey[200],
            textTransform: 'none',
          }}
        >
          <span className='material-symbols-outlined mr-2'>download</span>
          <Typography
            variant='subtitle2'
            fontWeight={theme.typography.fontWeightBold}
          >
            Download
          </Typography>
        </Button>
      </div>
    </div>
  )
}

export default ChannelBar
