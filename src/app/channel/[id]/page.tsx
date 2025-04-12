'use client'
import ChannelTabs from '../../../components/ChannelTabs'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Videos from '@/components/Videos'
import { useParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { Avatar, Button, Divider, Typography, useTheme } from '@mui/material'
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
      <div className='py-6'>
        <div className='px-32'>
          <div className='relative w-full pt-[15.625%]'>
            {/* 250 / 1600 = 0.15625 */}
            <img
              src='https://picsum.photos/1600/250'
              alt='cover image'
              className='absolute top-0 left-0 w-full h-full object-cover rounded-2xl'
            />
          </div>
          <div className='flex justify-between items-center w-full py-4'>
            <div className='flex space-x-4'>
              <Avatar
                src={channel.picture}
                alt={channel.name}
                sx={{ width: 140, height: 140 }}
              />
              <div className='flex flex-col py-5'>
                <Typography
                  variant='h4'
                  sx={{ fontWeight: theme.typography.fontWeightBold }}
                >
                  {channel.name}
                </Typography>

                <div className='flex items-center mt-2'>
                  <Button
                    disableElevation
                    variant='contained'
                    sx={{
                      px: 2,
                      backgroundColor: subscribers.isUserSubscribed
                        ? grey[300]
                        : 'black',
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
                  <Typography color='secondary' variant='body2' sx={{ ml: 2 }}>
                    {channel.subscribers.count} subscribers
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <ChannelTabs />
        </div>
        <Divider />
        <div className='px-32 mt-2'>
          <Videos url={`/api/channel/${channel.id}/videos`} />
        </div>
      </div>
    </Layout>
  )
}
