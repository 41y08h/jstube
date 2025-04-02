import axios from 'axios'
import Head from 'next/head'
import dateformat from 'dateformat'
import Layout from '../../components/Layout'
import { useAuth } from '../../contexts/Auth'
import IRatings from '../../interfaces/Ratings'
import Comments from '../../components/Comments'
import { blue } from '@mui/material/colors'
import ReplyIcon from '@mui/icons-material/Reply'
import ChannelBar from '../../components/ChannelBar'
import VideoPlayer from '../../components/VideoPlayer'
import { Button, Divider, Typography } from '@mui/material'
import { QVideoDetailed } from '../../interfaces/Video'
import numberWithCommas from '../../lib/numberWithCommas'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import VideoDescription from '../../components/VideoDescription'
import { API_URL } from '@/config'

async function getVideo(videoId: string): Promise<QVideoDetailed | null> {
  try {
    const res = await fetch(`${API_URL}/videos/${videoId}`, {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('Failed to fetch video')
    return res.json()
  } catch (error) {
    console.error('Error fetching video:', error)
    return null
  }
}

export default async function Watch({ searchParams }) {
  const { v: videoId } = await searchParams

  if (!videoId) return <div>Video not found</div>

  const data = await getVideo(videoId)
  if (!data) return <div>Failed to load video</div>

  return (
    <Layout>
      <Head>
        <title>{data?.title} - JS Tube</title>
      </Head>
      <div className='flex flex-col'>
        <VideoPlayer src={data?.src} />
        <Typography
          variant='subtitle1'
          component='h1'
          sx={{ pb: 4, pt: 5, px: 5 }}
        >
          {data?.title}
        </Typography>
        <div className='flex flex-col px-5 space-y-3'>
          <div className='flex items-start space-x-2'>
            <Typography color='text.secondary' variant='body2' component='span'>
              {numberWithCommas(data?.views)} views
            </Typography>
            <span className='mx-1.5 text-xl text-secondary font-bold leading-none'>
              ·
            </span>
            <Typography color='text.secondary' variant='body2' component='span'>
              {dateformat(new Date(data?.uploadedAt), 'dd-mmm-yyyy')}
            </Typography>
          </div>
        </div>
        <Divider />
        <div className='px-5 py-3'>
          <ChannelBar channel={data?.channel} />
        </div>
        <Divider />
        <div className='px-5 pb-2'>
          <VideoDescription text={data?.description} />
        </div>
        <Divider />
        <div className='px-5 my-4'>
          <Comments videoId={data?.id} />
        </div>
      </div>
    </Layout>
  )
}
