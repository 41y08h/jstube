import axios from 'axios'
import Link from 'next/link'
import Replies from '../Replies'
import CommentMenu from './CommentMenu'
import { Button } from '@material-ui/core'
import { useAuth } from '../../contexts/Auth'
import Avatar from '@material-ui/core/Avatar'
import EditIcon from '@material-ui/icons/Edit'
import MultilineInput from '../MultilineInput'
import IRatings from '../../interfaces/Ratings'
import { makeStyles } from '@material-ui/styles'
import CenteredSpinner from '../CenteredSpinner'
import blue from '@material-ui/core/colors/blue'
import grey from '@material-ui/core/colors/grey'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import { FC, FormEventHandler, useState, useRef } from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import IComment, { ICommentPage } from '../../interfaces/Comment'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useMutation, useQueryClient, InfiniteData } from 'react-query'
import moment from 'moment'

const useStyles = makeStyles(theme => ({
  input: {
    ...theme.typography.body2,
    width: '100%',
    borderRadius: 6,
    padding: '0.8rem',
    backgroundColor: grey[200],
  },
  button: {
    width: 'auto',
    minWidth: 'unset',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  highlightedButton: { color: blue[700] },
  blueTextbutton: { color: blue[700], textTransform: 'unset' },
}))

interface Props {
  data: IComment
  onDeleted(id: number): any
  onEdited(editedComment: IComment): any
  onRated(id: number, ratings: IRatings): any
  onReplied(id: number, replyComment: IComment): any
  videoId: number
}

const Comment: FC<Props> = ({
  data,
  onDeleted,
  onEdited,
  onRated,
  onReplied,
  videoId,
}) => {
  const classes = useStyles()
  const queryClient = useQueryClient()
  const { authenticate, user } = useAuth()

  // Edit Mutation
  const editInputRef = useRef<HTMLTextAreaElement>(null)
  const [isEditingMode, setIsEditingMode] = useState(false)
  const toggleEditingMode = () => setIsEditingMode(old => !old)

  const { isLoading: isEditing, ...editMutation } = useMutation(
    (text: string) =>
      axios.patch<IComment>(`/api/comments/${data.id}`, { text }),
    {
      onSuccess: res => {
        onEdited(res.data)
        toggleEditingMode()
      },
    }
  )

  const editComment = authenticate(() => {
    const text = editInputRef.current?.value
    if (text) editMutation.mutate(text)
  })

  // Delete Mutation
  const { isLoading: isDeleting, ...deleteMutation } = useMutation(
    () => axios.delete(`/api/comments/${data.id}`),
    { onSuccess: () => onDeleted(data.id) }
  )
  const deleteComment = authenticate(() => deleteMutation.mutate())
  // ~deleteMutation.mutate~ --> () => deleteMutation.mutate() here is important
  // otherwise we'll get type errors
  // when attaching event handler
  type RatingType = 'like' | 'dislike' | 'remove'

  const { mutate: rate, isLoading: isRating } = useMutation(
    (type: RatingType) => {
      type T = IRatings

      switch (type) {
        case 'like':
          return axios.post<T>(`/api/ratings/comments/${data.id}/like`)
        case 'dislike':
          return axios.post<T>(`/api/ratings/comments/${data.id}/dislike`)
        case 'remove':
          return axios.delete<T>(`/api/ratings/comments/${data.id}`)
      }
    },
    { onSuccess: res => onRated(data.id, res.data) }
  )

  const { mutate: reply, isLoading: isReplying } = useMutation(
    (text: string) =>
      axios.post<IComment>(`/api/comments/${data.id}/replies`, { text }),
    {
      onSuccess: res => {
        toggleReplyingMode()
        onReplied(data.id, res.data)
        addNewReply(res.data)
      },
    }
  )

  const replyInputRef = useRef<HTMLTextAreaElement>(null)
  const [isReplyingMode, setIsReplyingMode] = useState(false)
  const toggleReplyingMode = () => setIsReplyingMode(old => !old)

  const [isViewingReplies, setIsViewingReplies] = useState(false)
  const toggleRepliesView = () => setIsViewingReplies(old => !old)

  const handleReplySubmit: FormEventHandler = event => {
    event.preventDefault()
    authenticate(() => {
      const text = replyInputRef?.current?.value
      if (text) reply(text)
    })()
  }

  function addNewReply(replyComment: IComment) {
    type QueryData = InfiniteData<ICommentPage>
    const queryKey = `/api/comments/${data.id}/replies`

    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages: data?.pages.map((page, i) => {
        const isFirstPage = i === 0
        return isFirstPage
          ? {
              ...page,
              total: page.total + 1,
              items: [replyComment, ...page.items],
            }
          : page
      }) ?? [{ total: 1, hasMore: false, items: [replyComment] }],
      pageParams: data?.pageParams ?? [],
    }))
  }

  const hasUserLiked = data.ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = data.ratings.userRatingStatus === 'DISLIKED'
  const isAuthoredByUser = data.author.id === user?.id

  return isDeleting ? (
    <div className='grid justify-center py-5'>
      <CircularProgress />
    </div>
  ) : (
    <div className='flex relative w-full space-x-4'>
      <Link href={`/channel/${data.author.id}`}>
        <a>
          <Avatar
            style={{ width: '2rem', height: '2rem' }}
            src={data.author.picture}
            alt={data.author.name}
          />
        </a>
      </Link>
      {isEditingMode ? (
        <div className='w-full'>
          {isEditing ? (
            <div className='grid justify-center py-5'>
              <CircularProgress />
            </div>
          ) : (
            <form className='flex flex-col' onSubmit={editComment}>
              <MultilineInput
                required
                autoFocus
                inputRef={editInputRef}
                defaultValue={data.text}
                className={classes.input}
                placeholder='Keep writing...'
              />
              <div className='flex justify-end pt-3 space-x-2'>
                <Button color='secondary' onClick={toggleEditingMode}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  disableElevation
                >
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className='flex flex-col w-full'>
          <div className='absolute -top-2 right-1'>
            {isAuthoredByUser && (
              <CommentMenu>
                <MenuItem onClick={toggleEditingMode}>
                  <EditIcon className='mr-3' fontSize='small' />
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={deleteComment} disabled={isDeleting}>
                  <DeleteIcon className='mr-3' fontSize='small' />
                  <Typography>Delete</Typography>
                </MenuItem>
              </CommentMenu>
            )}
          </div>
          <div className='flex space-x-2'>
            <Link href={`/channel/${data.author.id}`}>
              <a>
                <Typography variant='body2'>{data.author.name}</Typography>
              </a>
            </Link>
            <Typography variant='body2' color='secondary'>
              {moment(data.createdAt).fromNow()}
            </Typography>
            {data.updatedAt !== data.createdAt && (
              <Typography variant='body2' color='secondary'>
                (edited)
              </Typography>
            )}
          </div>
          <div className='mt-2'>
            <Typography
              variant='body1'
              className='whitespace-pre-wrap break-words w-full'
            >
              {data.text}
            </Typography>
          </div>
          <div className='flex mt-2'>
            <Button
              size='small'
              color='secondary'
              className={classes.button}
              startIcon={
                <ThumbUpAltIcon
                  className={hasUserLiked ? classes.highlightedButton : ''}
                />
              }
              disabled={isRating}
              onClick={authenticate(() =>
                rate(hasUserLiked ? 'remove' : 'like')
              )}
              disableRipple
            >
              {!!data.ratings.count.likes && data.ratings.count.likes}
            </Button>
            <Button
              className={classes.button}
              size='small'
              color='secondary'
              startIcon={
                <ThumbDownIcon
                  className={hasUserDisliked ? classes.highlightedButton : ''}
                />
              }
              disabled={isRating}
              onClick={authenticate(() =>
                rate(hasUserDisliked ? 'remove' : 'dislike')
              )}
              disableRipple
            >
              {!!data.ratings.count.dislikes && data.ratings.count.dislikes}
            </Button>
            <Button
              className={classes.button}
              size='small'
              disableRipple
              type='submit'
              color='secondary'
              onClick={toggleReplyingMode}
            >
              Reply
            </Button>
          </div>
          {isReplyingMode &&
            (isReplying ? (
              <CenteredSpinner />
            ) : (
              <form
                className='flex space-x-3 w-full mt-2'
                onSubmit={handleReplySubmit}
              >
                <Avatar
                  style={{ width: '2rem', height: '2rem' }}
                  src={user?.picture}
                  alt={user?.name}
                />
                <div className='flex flex-col w-full space-y-3'>
                  <MultilineInput
                    required
                    autoFocus
                    inputRef={replyInputRef}
                    className={classes.input}
                    placeholder='Add a public reply...'
                  />
                  <div className='flex justify-end space-x-2'>
                    <Button onClick={toggleReplyingMode}>Cancel</Button>
                    <Button
                      type='submit'
                      color='primary'
                      disableElevation
                      variant='contained'
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </form>
            ))}
          {Boolean(data.replyCount) && (
            <div>
              <Button
                className={classes.blueTextbutton}
                onClick={() => toggleRepliesView()}
                disableRipple
              >
                {isViewingReplies ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                {isViewingReplies
                  ? `Hide ${data.replyCount} replies`
                  : `View ${data.replyCount} replies`}
              </Button>
              {isViewingReplies && (
                <Replies commentId={data.id} videoId={videoId} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Comment
