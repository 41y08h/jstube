'use client'

import axios from 'axios'
import { FC, useState } from 'react'
import dateformat from 'dateformat'
import { useAuth } from '@/contexts/Auth'
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

  type RatingType = 'like' | 'dislike' | 'remove'

  const { mutate: rate, isPending: isRating } = useMutation({
    mutationFn: (type: RatingType) => {
      type T = IRatings
      const url = `/api/ratings/videos/${data.id}`
      return type === 'like'
        ? axios.post<T>(`${url}/like`)
        : type === 'dislike'
        ? axios.post<T>(`${url}/dislike`)
        : axios.delete<T>(url)
    },
    onSuccess: res => {
      queryClient.setQueryData(queryKey, (prevData: any) => ({
        ...prevData,
        ratings: res.data,
      }))
    },
  })

  const hasUserLiked = data.ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = data.ratings.userRatingStatus === 'DISLIKED'

  return (
    <div>
      <VideoPlayer src={data.src} />
      <Typography variant='h6' sx={{ pb: 2, pt: 4, px: 2 }}>
        {data.title}
      </Typography>
      <div className='flex flex-col px-5 space-y-3'>
        <div className='flex items-start space-x-2'>
          <Typography color='textSecondary' variant='body2'>
            {numberWithCommas(data.views)} views
          </Typography>
          <span className='mx-1.5 text-xl text-secondary font-bold leading-none'>
            ·
          </span>
          <Typography color='textSecondary' variant='body2'>
            {dateformat(new Date(data.uploadedAt), 'dd-mmm-yyyy')}
          </Typography>
        </div>
        <div className='flex items-center justify-start'>
          <Button
            color='secondary'
            startIcon={
              <ThumbUpAltIcon
                sx={{ color: hasUserLiked ? blue[700] : 'inherit' }}
              />
            }
            onClick={authenticate(() => rate(hasUserLiked ? 'remove' : 'like'))}
          >
            {data.ratings.count.likes}
          </Button>
          <Button
            color='secondary'
            startIcon={
              <ThumbDownIcon
                sx={{ color: hasUserDisliked ? blue[700] : 'inherit' }}
              />
            }
            disabled={isRating}
            onClick={authenticate(() =>
              rate(hasUserDisliked ? 'remove' : 'dislike')
            )}
          >
            {data.ratings.count.dislikes}
          </Button>
          <Button
            color='secondary'
            startIcon={<ReplyIcon sx={{ transform: 'scaleX(-1)' }} />}
          >
            Share
          </Button>
        </div>
      </div>
      <Divider sx={{ my: 2 }} />
      <div className='px-5 py-3'>
        <ChannelBar channel={data.channel} />
      </div>
      <Divider />
      <div className='px-5 pb-2'>
        <VideoDescription text={data.description} />
      </div>
      <Divider />
      <div className='px-5 my-4'>
        <Comments videoId={data.id} />
      </div>
    </div>
  )
}

export default Watch
