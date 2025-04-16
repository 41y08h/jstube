import { FC } from 'react'
import Link from 'next/link'
import VideoMenu from './VideoMenu'
import timeSince from '../../lib/timeSince'
import formatTime from '../../lib/formatTime'
import { QVideo } from '../../interfaces/Video'
import formatNumber from '../../lib/formatNumber'

import { Avatar, ButtonBase, Typography, useTheme } from '@mui/material'
import Image from 'next/image'
import { CheckCircle } from '@mui/icons-material'

const VideoCard: FC<{ data: QVideo; updateIsInWL(videoId: number): void }> = ({
  data,
  updateIsInWL,
}) => {
  const theme = useTheme()

  const links = {
    video: `/watch?v=${data.id}`,
    channel: `/channel/${data.channel.id}`,
  }

  return (
    <ButtonBase component='div' className='overflow-hidden'>
      <div className='w-full space-y-3 pb-6'>
        <div className='relative'>
          <Link href={links.video}>
            <div className='aspect-ratio'>
              <Image
                fill
                src={data.thumbnail}
                alt={data.title}
                className='rounded-lg'
              />
            </div>
          </Link>
          <Typography
            variant='caption'
            className='absolute bottom-1 right-1 text-white px-1 py-0 rounded font-medium'
            style={{ backgroundColor: 'rgb(0, 0, 0, 0.8)', fontWeight: 500 }}
          >
            {formatTime(data.duration)}
          </Typography>
        </div>
        <div className='flex items-start relative w-full pt-0 pb-2'>
          <Link href={links.channel}>
            <Avatar
              style={{ width: '2.25rem', height: '2.25rem' }}
              src={data.channel.picture ?? ''}
              alt={data.channel.name}
            />
          </Link>
          <div className='flex flex-col pl-4 space-y-0.5 text-md leading-tight pr-8 w-full'>
            <div className='pl-1 absolute -top-2 right-3'>
              <VideoMenu
                id={data.id}
                isInWL={data.isInWL}
                updateIsInWL={updateIsInWL}
              />
            </div>
            <Link href={links.video}>
              <Typography
                className='line-clamp-2'
                variant='subtitle1'
                sx={{ fontWeight: theme.typography.fontWeightMedium }}
              >
                {data.title}
              </Typography>
            </Link>

            <div className='text-secondary flex lg:flex-col lg:items-start flex-wrap items-center w-full '>
              <Link
                href={links.channel}
                className='flex items-center space-x-2 pr-2'
              >
                <Typography variant='body2'>{data.channel.name}</Typography>
                <CheckCircle className='ml-1' style={{ width: '12px' }} />
              </Link>
              <div className='flex items-center flex-wrap'>
                <Typography variant='body2' component='span'>
                  {data.views
                    ? `${formatNumber(data.views)} views`
                    : 'No views'}
                </Typography>
                <span className='mx-1.5 text-xl font-bold leading-none'>·</span>
                <Typography variant='body2' component='span'>
                  {timeSince(data.uploadedAt)}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ButtonBase>
  )
}

export default VideoCard
