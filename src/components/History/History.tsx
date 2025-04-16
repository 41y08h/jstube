'use client'
import Link from 'next/link'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ButtonBase, Typography, useTheme } from '@mui/material'
import { QVideo } from '@/interfaces/Video'
import VideoMenu from '../VideoCard/VideoMenu'
import formatTime from '@/lib/formatTime'
import formatNumber from '@/lib/formatNumber'
import timeSince from '@/lib/timeSince'
import Image from 'next/image'

interface IHistory extends QVideo {
  viewedAt: string
}

type QHistory = IHistory[]

export default function History({ data: initialData }: { data: QHistory }) {
  const theme = useTheme()
  const queryClient = useQueryClient()
  const { data, isLoading } = useQuery({
    queryKey: ['/api/history'],
    initialData,
  })

  function updateIsInWL(videoId: number) {
    queryClient.setQueryData<QHistory>(['/api/history'], data =>
      data?.map(video =>
        video.id === videoId ? { ...video, isInWL: !video.isInWL } : video
      )
    )
  }

  if (isLoading) return null

  return (
    <div className='px-18 py-6'>
      <Typography
        variant='h4'
        sx={{ fontWeight: theme.typography.fontWeightBold }}
      >
        Watch history
      </Typography>
      <div className='flex flex-col mt-8'>
        {data.map(video => {
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
                      <Image
                        fill
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
        })}
      </div>
    </div>
  )
}
