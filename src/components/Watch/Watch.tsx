'use client'

import axios from 'axios'
import { FC, useState } from 'react'
import dateformat from 'dateformat'
import { useAuth } from '@/contexts/auth'
import IRatings from '@/interfaces/Ratings'
import Comments from '@/components/Comments'
import ChannelBar from '@/components/ChannelBar'
import VideoPlayer from '@/components/VideoPlayer'
import VideoDescription from '@/components/VideoDescription'
import { Button, Divider, Typography } from '@mui/material'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ReplyIcon from '@mui/icons-material/Reply'
import { blue } from '@mui/material/colors'
import numberWithCommas from '@/lib/numberWithCommas'
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { getVideo } from '@/lib/api' // Fetch video data in a separate function
import { CommentsProvider } from '@/contexts/comments'

interface Props {
  video: any
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
    <div className='p-6 px-18 flex'>
      <div className='w-[70%]'>
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
      <div>Suggestions will go here</div>
    </div>
  )
}

export default Watch
