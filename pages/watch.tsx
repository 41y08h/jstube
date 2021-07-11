import axios from 'axios'
import { FC } from 'react'
import Head from 'next/head'
import dateformat from 'dateformat'
import { API_URL } from '../config'
import Layout from '../components/Layout'
import { GetServerSideProps } from 'next'
import { useAuth } from '../contexts/Auth'
import IRatings from '../interfaces/Ratings'
import Comments from '../components/Comments'
import { makeStyles } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import ReplyIcon from '@material-ui/icons/Reply'
import ChannelBar from '../components/ChannelBar'
import VideoPlayer from '../components/VideoPlayer'
import { Button, Divider } from '@material-ui/core'
import { QVideoDetailed } from '../interfaces/Video'
import Typography from '@material-ui/core/Typography'
import numberWithCommas from '../lib/numberWithCommas'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import VideoDescription from '../components/VideoDescription'
import { useMutation, useQueryClient, useQuery } from 'react-query'

const useStyles = makeStyles({ highlightedButton: { color: blue[700] } })

interface Props {
  data?: QVideoDetailed
}

const Watch: FC<Props> = props => {
  const classes = useStyles()
  const { authenticate } = useAuth()
  const queryClient = useQueryClient()
  const queryKey = `/api/videos/${props.data?.id}`
  const { data } = useQuery(queryKey, { initialData: props.data })

  type RatingType = 'like' | 'dislike' | 'remove'

  const { mutate: rate, isLoading: isRating } = useMutation(
    (type: RatingType) => {
      type T = IRatings

      switch (type) {
        case 'like':
          return axios.post<T>(`/api/ratings/videos/${data?.id}/like`)
        case 'dislike':
          return axios.post<T>(`/api/ratings/videos/${data?.id}/dislike`)
        case 'remove':
          return axios.delete<T>(`/api/ratings/videos/${data?.id}`)
      }
    },
    {
      onSuccess: res => {
        queryClient.setQueryData<QVideoDetailed | undefined>(
          queryKey,
          data => ({
            ...data,
            ratings: res.data,
          })
        )
      },
    }
  )

  const hasUserLiked = data?.ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = data?.ratings.userRatingStatus === 'DISLIKED'

  return (
    <Layout>
      <Head>
        <title>{data?.title} - JS Tube</title>
      </Head>
      <div>
        <div className='flex flex-col md:flex-row'>
          <div className='flex flex-col'>
            <VideoPlayer src={data?.src} />
            <Typography
              variant='subtitle1'
              component='h1'
              className='pb-4 pt-5 px-5'
            >
              {data?.title}
            </Typography>
            <div className='flex flex-col px-5 space-y-3'>
              <div className='flex items-start space-x-2'>
                <Typography color='secondary' variant='body2' component='span'>
                  {numberWithCommas(data?.views)} views
                </Typography>
                <span className='mx-1.5 text-xl text-secondary font-bold leading-none'>
                  ·
                </span>
                <Typography color='secondary' variant='body2' component='span'>
                  {dateformat(new Date(data?.uploadedAt), 'dd-mmm-yyyy')}
                </Typography>
              </div>
              <div className='flex items-center justify-start'>
                <Button
                  color='secondary'
                  startIcon={
                    <ThumbUpAltIcon
                      className={hasUserLiked ? classes.highlightedButton : ''}
                    />
                  }
                  onClick={authenticate(() =>
                    rate(hasUserLiked ? 'remove' : 'like')
                  )}
                >
                  {data?.ratings.count.likes}
                </Button>
                <Button
                  color='secondary'
                  startIcon={
                    <ThumbDownIcon
                      className={
                        hasUserDisliked ? classes.highlightedButton : ''
                      }
                    />
                  }
                  disabled={isRating}
                  onClick={authenticate(() =>
                    rate(hasUserDisliked ? 'remove' : 'dislike')
                  )}
                >
                  {data?.ratings.count.dislikes}
                </Button>
                <Button
                  color='secondary'
                  startIcon={<ReplyIcon style={{ transform: 'scaleX(-1)' }} />}
                  disabled={isRating}
                >
                  Share
                </Button>
              </div>
            </div>
            <div className='my-4'>
              <Divider />
              <div className='px-5 py-3'>
                <ChannelBar channel={data?.channel} />
              </div>
              <Divider />
            </div>
            <div className='px-5 pb-2'>
              <VideoDescription text={data?.description} />
            </div>
            <Divider />
          </div>
        </div>
        <div className='px-5 my-4 max-w-4xl'>
          <Comments videoId={data?.id} />
        </div>
      </div>
    </Layout>
  )
}

export default Watch

export const getServerSideProps: GetServerSideProps = async context => {
  try {
    const videoId = context.query.v
    if (!Boolean(videoId)) throw new Error()

    const headers = { cookie: context.req.headers.cookie || '' }
    const config = { headers: context.req ? headers : undefined }
    const { data } = await axios(`${API_URL}/videos/${videoId}`, config)

    return { props: { data } }
  } catch (error) {
    return { redirect: { destination: '/', permanent: false } }
  }
}
