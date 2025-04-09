'use client'
import axios, { AxiosError, AxiosResponse } from 'axios'
import Link from 'next/link'
import Replies from '../Replies'
import CommentMenu from './CommentMenu'
import {
  Button,
  Avatar,
  Typography,
  CircularProgress,
  MenuItem,
  IconButton,
  useTheme,
} from '@mui/material'
import { useAuth } from '../../contexts/auth'
import EditIcon from '@mui/icons-material/Edit'
import MultilineInput from '../MultilineInput'
import IRatings from '../../interfaces/Ratings'
import CommentEditForm from './CommentEditForm'
import CenteredSpinner from '../CenteredSpinner'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { FC, FormEventHandler, useState, useRef } from 'react'
import IComment, { ICommentPage, IReply } from '../../interfaces/Comment'
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query'
import { blue, grey } from '@mui/material/colors'
import { useComments } from '@/contexts/comments'

interface Props {
  commentData: IComment
  onDeleted(id: number): any
  onEdited(editedComment: IComment): any
  onRated(id: number, ratings: IRatings): any
  onReplied(replyComment: IReply): any
}

const Comment: FC<Props> = ({
  commentData,
  onDeleted,
  onEdited,
  onRated,
  onReplied,
}) => {
  const theme = useTheme()
  const [replyText, setReplyText] = useState('')
  const { authenticate, user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const editInputRef = useRef<HTMLTextAreaElement | undefined>(undefined)
  const toggleIsEditing = () => setIsEditing(old => !old)

  const editMutation = useMutation({
    mutationFn: (text: string) =>
      axios.patch<IComment>(`/api/comments/${commentData.id}`, { text }),
  })

  const handleEditFormSubmit: FormEventHandler = event => {
    event.preventDefault()
    const submit = authenticate(async () => {
      const input = editInputRef.current as HTMLTextAreaElement
      const { data: editedComment } = await editMutation.mutateAsync(
        input.value
      )
      onEdited(editedComment)
      toggleIsEditing()
    })

    submit()
  }

  const { isPending: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: () => axios.delete(`/api/comments/${commentData.id}`),
    onSuccess: () => onDeleted(commentData.id),
  })

  type RatingType = 'like' | 'dislike' | 'remove'
  const ratingMutationFn = {
    like: () => axios.post(`/api/ratings/comments/${commentData.id}/like`),
    dislike: () =>
      axios.post(`/api/ratings/comments/${commentData.id}/dislike`),
    remove: () => axios.delete(`/api/ratings/comments/${commentData.id}`),
  }
  const ratingMutation = useMutation<IRatings, AxiosError, RatingType>({
    mutationFn: type => ratingMutationFn[type]().then(res => res.data),
    onSuccess: ratings => onRated(commentData.id, ratings),
  })

  const replyMutation = useMutation<IComment, AxiosError, string>({
    mutationFn: text =>
      axios
        .post(`/api/comments/${commentData.id}/replies`, { text })
        .then(res => res.data),
    onSuccess: replyComment => {
      onReplied(replyComment)
      toggleReplyingMode()
    },
  })

  const replyInputRef = useRef<HTMLTextAreaElement | undefined>(undefined)
  const [isReplyingMode, setIsReplyingMode] = useState(false)
  const toggleReplyingMode = () => setIsReplyingMode(old => !old)

  const [isViewingReplies, setIsViewingReplies] = useState(false)
  const toggleRepliesView = () => setIsViewingReplies(old => !old)

  const handleReplySubmit: FormEventHandler = event => {
    event.preventDefault()
    authenticate(() => {
      const text = replyInputRef?.current?.value
      if (text) replyMutation.mutate(text)
    })()
  }

  const hasUserLiked = commentData.ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = commentData.ratings.userRatingStatus === 'DISLIKED'
  const isAuthoredByUser = commentData.author.id === user?.id

  // Show replies only if it is top level comment
  const isFirstLevelComment = commentData.originalCommentId === null
  const isThirdLevelComment =
    !isFirstLevelComment &&
    commentData.originalCommentId != commentData.replyToCommentId
  const hasReplies = Boolean(commentData.replyCount)

  return isDeleting ? (
    <CenteredSpinner />
  ) : (
    <div className='flex relative w-full space-x-4'>
      <Link href={`/channel/${commentData.author.id}`}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={commentData.author.picture}
          alt={commentData.author.name}
        />
      </Link>
      {isEditing ? (
        <CommentEditForm
          inputRef={editInputRef}
          defaultValue={commentData.text}
          onCancel={toggleIsEditing}
          onSubmit={handleEditFormSubmit}
        />
      ) : (
        <div className='flex flex-col w-full'>
          <div className='absolute -top-2 right-1'>
            {isAuthoredByUser && (
              <CommentMenu>
                <MenuItem onClick={toggleIsEditing}>
                  <EditIcon className='mr-3' fontSize='small' />
                  <Typography>Edit</Typography>
                </MenuItem>
                <MenuItem onClick={() => deleteComment()} disabled={isDeleting}>
                  <DeleteIcon className='mr-3' fontSize='small' />
                  <Typography>Delete</Typography>
                </MenuItem>
              </CommentMenu>
            )}
          </div>
          <div className='flex space-x-2 items-center mb-1'>
            <Link href={`/channel/${commentData.author.id}`}>
              <Typography variant='subtitle2'>
                {commentData.author.name}
              </Typography>
            </Link>
            <Typography variant='caption' color='secondary'>
              {new Date(commentData.createdAt).toLocaleDateString()}
            </Typography>
          </div>
          <Typography
            variant='body2'
            sx={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {commentData.text}
          </Typography>
          <div
            className='flex items-center mt-1'
            style={{ marginLeft: '-8px' }}
          >
            <div>
              <IconButton
                color='inherit'
                disabled={ratingMutation.isPending}
                onClick={authenticate(() =>
                  ratingMutation.mutate(hasUserLiked ? 'remove' : 'like')
                )}
                className='flex items-center'
                sx={{
                  height: '36px',
                  width: '36px',
                  '&.Mui-disabled': {
                    opacity: 1, // Keep full opacity when disabled
                    color: 'black', // Ensure text and icons stay black
                    cursor: 'not-allowed',
                  },
                }}
              >
                <span
                  className='material-symbols-outlined'
                  style={{
                    ...(hasUserLiked
                      ? {
                          fontVariationSettings:
                            "'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48",
                        }
                      : {}),
                    fontSize: '1.25rem',
                  }}
                >
                  thumb_up
                </span>
              </IconButton>
              <Typography variant='overline'>
                {commentData.ratings.count.likes}
              </Typography>
            </div>
            <IconButton
              color='inherit'
              disabled={ratingMutation.isPending}
              onClick={authenticate(() =>
                ratingMutation.mutate(hasUserDisliked ? 'remove' : 'dislike')
              )}
              className='flex items-center'
              sx={{
                '&.Mui-disabled': {
                  opacity: 1, // Keep full opacity when disabled
                  color: 'black', // Ensure text and icons stay black
                  cursor: 'not-allowed',
                },
              }}
            >
              <span
                className='material-symbols-outlined'
                style={{
                  ...(hasUserDisliked
                    ? {
                        fontVariationSettings:
                          "'FILL' 1, 'wght' 200, 'GRAD' 200, 'opsz' 48",
                      }
                    : {}),
                  fontSize: '1.25rem',
                }}
              >
                thumb_down
              </span>
            </IconButton>
            <Button
              variant='text'
              color='inherit'
              aria-pressed
              sx={{
                textTransform: 'none',
                borderRadius: '20px',
                maxHeight: 'fit-content',
                fontSize: theme.typography.caption.fontSize,
              }}
              onClick={toggleReplyingMode}
            >
              Reply
            </Button>
          </div>
          {isReplyingMode &&
            (replyMutation.isPending ? (
              <CenteredSpinner />
            ) : (
              <form
                className='flex space-x-3 w-full'
                onSubmit={handleReplySubmit}
              >
                <Avatar
                  src={user?.picture}
                  alt={user?.name}
                  sx={{ width: 24, height: 24 }}
                />
                <div className='flex flex-col w-full space-y-3'>
                  <MultilineInput
                    required
                    autoFocus
                    inputRef={replyInputRef}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    placeholder='Add a public reply...'
                  />
                  <div className='flex justify-end mt-3'>
                    <Button
                      variant='text'
                      color='inherit'
                      sx={{
                        borderRadius: '20px',
                        padding: '0.5rem 1rem',
                        textTransform: 'none',
                        color: grey[600],
                        '&:hover': {
                          backgroundColor: grey[200],
                        },
                        marginRight: '12px',
                      }}
                      onClick={() => {
                        setReplyText('')
                        toggleReplyingMode()
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      disableElevation
                      disabled={!replyText}
                      variant='contained'
                      color='primary'
                      type='submit'
                      sx={{
                        borderRadius: '20px',
                        textTransform: 'none',
                      }}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </form>
            ))}
          {isFirstLevelComment && hasReplies && (
            <div>
              <Button onClick={() => toggleRepliesView()} disableRipple>
                <Button
                  variant='text'
                  color='primary'
                  sx={{
                    borderRadius: '20px',
                    borderColor: theme.palette.grey[300],
                    textTransform: 'none',
                  }}
                >
                  <span className='material-symbols-outlined mr-1'>
                    keyboard_arrow_{isViewingReplies ? 'up' : 'down'}
                  </span>
                  <Typography variant='subtitle2'>
                    {commentData.replyCount} replies
                  </Typography>
                </Button>
              </Button>
              {isViewingReplies && <Replies commentId={commentData.id} />}
            </div>
          )}
          {isThirdLevelComment && (
            <small>replied to {commentData.repliedToAuthorName}</small>
          )}
        </div>
      )}
    </div>
  )
}

export default Comment
