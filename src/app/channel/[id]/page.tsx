'use client'
import ChannelTabs from '../../../components/ChannelTabs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Videos from '@/components/Videos'
import { useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { Avatar, Button, useTheme } from '@mui/material'
import { useAuth } from '@/contexts/auth'
import ISubscribers from '@/interfaces/Subscribers'
import axios from 'axios'
import { grey, red } from '@mui/material/colors'

export default function ChannelPage() {
  const params = useParams<{ id: string }>()
  const { data: channel } = useQuery({
    queryKey: [`/api/channel/${params?.id}`],
  })
  const theme = useTheme()

  const { authenticate } = useAuth()
  const queryClient = useQueryClient()

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

      queryClient.setQueryData(
        [`/api/channel/${params?.id}`],
        (prevData: any) => ({
          ...prevData,
          subscribers: data,
        })
      )
    },
  })

  if (!channel) return <Layout>{null}</Layout>

  const subscribe = authenticate(() =>
    subscribersMutation.mutate(channel.subscribers.isUserSubscribed)
  )
  const subscribers = channel.subscribers

  return (
    <Layout>
      <div>
        <div className='relative w-full pt-[15.625%]'>
          {/* 250 / 1600 = 0.15625 */}
          <img
            src='https://picsum.photos/1600/250'
            alt='cover image'
            className='absolute top-0 left-0 w-full h-full object-cover'
          />
        </div>
        <div className='flex justify-between items-center w-full p-4'>
          <div className='flex space-x-4'>
            <Avatar
              src={channel.picture}
              alt={channel.name}
              style={{ width: '75px', height: '75px' }}
            />
            <div>
              <p className='text-xl'>{channel.name}</p>
              <p className='text-md text-secondary'>
                {channel.subscribers.count} subscribers
              </p>
            </div>
          </div>
          <Button
            disableElevation
            variant='contained'
            sx={{
              px: 2,
              backgroundColor: subscribers.isUserSubscribed
                ? grey[200]
                : red[500],
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
        <ChannelTabs />
        <Videos url={`/api/channel/${channel.id}/videos`} />
      </div>
    </Layout>
  )
}
