'use client'
import { LinearProgress } from '@material-ui/core'
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Card } from 'react-bootstrap'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { ButtonBase, Typography, useTheme } from '@mui/material'
import VideoMenu from '@/components/VideoCard/VideoMenu'
import { QVideosPage } from '@/interfaces/Video'
import axios from 'axios'
import formatTime from '@/lib/formatTime'
import formatNumber from '@/lib/formatNumber'
import timeSince from '@/lib/timeSince'

function VideoCard({ data: video }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={video.thumbnail} />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default function MyVideos() {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const { data, isLoading, isFetching } = useInfiniteQuery<QVideosPage>({
    queryKey: ['/api/videos/mine'],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      axios('/api/videos/mine', {
        params: { page: pageParam },
      }).then(res => res.data),
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.pageNumber + 1 : undefined,
  })

  function updateIsInWL(videoId: number) {
    queryClient.setQueryData<InfiniteData<QVideosPage>>(
      ['/api/videos/mine'],
      data => {
        if (!data) return data
        const newData = { ...data }
        const pages = newData.pages.map(page => {
          const videos = page.items.map(video => {
            if (video.id === videoId) {
              return { ...video, isInWL: !video.isInWL }
            }
            return video
          })
          return { ...page, items: videos }
        })
        return { ...newData, pages }
      }
    )
  }

  if (isLoading) return null

  return (
    <Layout>
      <div className='px-18 py-6'>
        <Typography
          variant='h4'
          sx={{ fontWeight: theme.typography.fontWeightBold }}
        >
          Your videos
        </Typography>
        <div className='flex flex-col mt-8'>
          {data?.pages.map(page =>
            page.items.map(video => {
              const links = {
                video: `/watch?v=${video.id}`,
                channel: `/channel/${video.channel.id}`,
              }

              return (
                <ButtonBase
                  key={video.id}
                  component='div'
                  className='overflow-hidden'
                  sx={{ mb: 2 }}
                >
                  <div className='flex w-full pr-6'>
                    <div className='absolute -top-2 right-3'>
                      <VideoMenu
                        id={video.id}
                        isInWL={video.isInWL}
                        updateIsInWL={updateIsInWL}
                      />
                    </div>
                    <div className='relative min-w-[260px] mr-4'>
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
                          sx={{
                            fontSize: '1.125rem',
                            fontWeight: theme.typography.fontWeightMedium,
                          }}
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
                        <Typography
                          variant='caption'
                          className='line-clamp-3'
                          sx={{ mt: 1 }}
                        >
                          {video.description}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </ButtonBase>
              )
            })
          )}
        </div>
      </div>
    </Layout>
  )
}
