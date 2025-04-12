'use client'

import axios, { AxiosError } from 'axios'
import { FC, useState } from 'react'
import dateformat from 'dateformat'
import { useAuth } from '@/contexts/auth'
import IRatings from '@/interfaces/Ratings'
import Comments from '@/components/Comments'
import ChannelBar from '@/components/ChannelBar'
import VideoPlayer from '@/components/VideoPlayer'
import VideoDescription from '@/components/VideoDescription'
import {
  Button,
  ButtonBase,
  Divider,
  Typography,
  useTheme,
} from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ReplyIcon from '@mui/icons-material/Reply'
import { blue } from '@mui/material/colors'
import numberWithCommas from '@/lib/numberWithCommas'
import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getVideo } from '@/lib/api' // Fetch video data in a separate function
import { CommentsProvider } from '@/contexts/comments'
import Videos from '../Videos'
import CenteredSpinner from '../CenteredSpinner'
import { QVideos } from '@/interfaces/Video'
import Link from 'next/link'
import formatTime from '@/lib/formatTime'
import formatNumber from '@/lib/formatNumber'
import timeSince from '@/lib/timeSince'
import VideoMenu from '../VideoCard/VideoMenu'

interface Props {
  video: any
}

const Suggestions = () => {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const suggestionsQuery = useInfiniteQuery<QVideos, AxiosError>({
    queryKey: ['/api/videos'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      axios('/api/videos', {
        params: { page: pageParam },
      }).then(res => res.data),
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
  })

  if (suggestionsQuery.isLoading) return <CenteredSpinner />

  if (suggestionsQuery.isError) return <div>Error loading suggestions</div>

  return (
    <div className='flex flex-col space-y-2'>
      {suggestionsQuery.data?.pages.map(page =>
        page.items.map(video => {
          const links = {
            video: `/watch?v=${video.id}`,
            channel: `/channel/${video.channel.id}`,
          }

          function updateIsInWL() {
            queryClient.setQueryData<InfiniteData<QVideos>>(
              ['/api/videos'],
              data => ({
                pages:
                  data?.pages.map(page => ({
                    ...page,
                    items: page.items.map(t =>
                      t.id === video.id ? { ...t, isInWL: !video.isInWL } : t
                    ),
                  })) ?? [],
                pageParams: data?.pageParams ?? [],
              })
            )
          }

          return (
            <ButtonBase
              key={video.id}
              component='div'
              className='overflow-hidden'
              sx={{ mb: 1 }}
            >
              <div className='flex w-full pr-6'>
                <div className='absolute -top-2 right-3'>
                  <VideoMenu
                    id={video.id}
                    isInWL={video.isInWL}
                    updateIsInWL={updateIsInWL}
                  />
                </div>
                <div className='relative min-w-[200px] mr-2'>
                  <Link href={links.video}>
                    <div className='aspect-ratio'>
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className='rounded-lg'
                      />
                    </div>
                  </Link>
                  <Typography
                    variant='caption'
                    className='absolute bottom-1 right-1 text-white px-1 py-0 rounded font-medium'
                    style={{
                      backgroundColor: 'rgb(0, 0, 0, 0.8)',
                      fontWeight: 500,
                    }}
                  >
                    {formatTime(video.duration)}
                  </Typography>
                </div>
                <div className='flex flex-col'>
                  <Link href={links.video}>
                    <Typography
                      className='line-clamp-2'
                      variant='subtitle2'
                      sx={{ fontWeight: theme.typography.fontWeightMedium }}
                    >
                      {video.title}
                    </Typography>
                  </Link>

                  <div className='text-secondary flex lg:flex-col lg:items-start flex-wrap items-center w-full '>
                    <Link
                      href={links.channel}
                      className='flex items-center space-x-2 pr-2'
                    >
                      <Typography variant='caption'>
                        {video.channel.name}
                      </Typography>

                      <span
                        className='material-symbols-outlined ml-1 w-3'
                        style={{
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 20",
                          fontSize: '1rem',
                        }}
                      >
                        verified
                      </span>
                    </Link>
                    <div className='flex items-center flex-wrap'>
                      <Typography variant='caption' component='span'>
                        {video.views
                          ? `${formatNumber(video.views)} views`
                          : 'No views'}
                      </Typography>
                      <span className='mx-1.5 text-xl font-bold leading-none'>
                        ·
                      </span>
                      <Typography variant='caption' component='span'>
                        {timeSince(video.uploadedAt)}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </ButtonBase>
          )
        })
      )}
    </div>
  )
}

const Watch: FC<Props> = ({ video }) => {
  const { authenticate, user } = useAuth()
  const queryClient = useQueryClient()
  const queryKey = [`/api/videos/${video.id}`]

  const { data } = useQuery({
    queryKey,
    queryFn: () => getVideo(video.id),
    initialData: video,
    refetchOnMount: false,
    gcTime: 0,
  })

  return (
    <div className='p-6 px-8 2xl:px-18 flex justify-center space-x-8'>
      <div className='w-[74.25%]'>
        <VideoPlayer src={data.src} />
        <Typography variant='h6' sx={{ pb: 1.5, pt: 2 }}>
          {data.title}
        </Typography>
        <ChannelBar
          videoId={data.id}
          channel={data.channel}
          ratings={data.ratings}
        />
        <div className='mt-2'>
          <VideoDescription
            text={data.description}
            views={data.views}
            uploadedAt={data.uploadedAt}
          />
        </div>
        <div className='mt-4'>
          <CommentsProvider videoId={data.id}>
            <Comments />
          </CommentsProvider>
        </div>
      </div>
      <div className='w-[25.75%]'>
        <Suggestions />
      </div>
    </div>
  )
}

export default Watch
