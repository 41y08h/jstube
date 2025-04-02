'use client'
import axios from 'axios'
import Link from 'next/link'
import Replies from '../Replies'
import CommentMenu from './CommentMenu'
import {
  Button,
  Avatar,
  Typography,
  CircularProgress,
  MenuItem,
} from '@mui/material'
import { useAuth } from '../../contexts/Auth'
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
import IComment, { ICommentPage } from '../../interfaces/Comment'
import {
  useMutation,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query'

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
  const queryClient = useQueryClient()
  const { authenticate, user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const editInputRef = useRef<HTMLTextAreaElement | undefined>(undefined)
  const toggleIsEditing = () => setIsEditing(old => !old)

  const editMutation = useMutation({
    mutationFn: (text: string) =>
      axios.patch<IComment>(`/api/comments/${data.id}`, { text }),
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
    mutationFn: () => axios.delete(`/api/comments/${data.id}`),
    onSuccess: () => onDeleted(data.id),
  })

  type RatingType = 'like' | 'dislike' | 'remove'

  const { mutate: rate, isPending: isRating } = useMutation({
    mutationFn: (type: RatingType) => {
      switch (type) {
        case 'like':
          return axios.post<IRatings>(`/api/ratings/comments/${data.id}/like`)
        case 'dislike':
          return axios.post<IRatings>(
            `/api/ratings/comments/${data.id}/dislike`
          )
        case 'remove':
          return axios.delete<IRatings>(`/api/ratings/comments/${data.id}`)
      }
    },
    onSuccess: res => onRated(data.id, res.data),
  })

  const { mutate: reply, isPending: isReplying } = useMutation({
    mutationFn: (text: string) =>
      axios.post<IComment>(`/api/comments/${data.id}/replies`, { text }),
    onSuccess: res => {
      toggleReplyingMode()
      onReplied(data.id, res.data)
      addNewReply(res.data)
    },
  })

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
    const queryKey = [`/api/comments/${data.id}/replies`]
    queryClient.setQueryData<InfiniteData<ICommentPage>>(queryKey, data => ({
      pages: data?.pages.map((page, i) =>
        i === 0
          ? {
              ...page,
              total: page.total + 1,
              items: [replyComment, ...page.items],
            }
          : page
      ) ?? [{ total: 1, hasMore: false, items: [replyComment] }],
      pageParams: data?.pageParams ?? [],
    }))
  }

  const hasUserLiked = data.ratings.userRatingStatus === 'LIKED'
  const hasUserDisliked = data.ratings.userRatingStatus === 'DISLIKED'
  const isAuthoredByUser = data.author.id === user?.id

  return isDeleting ? (
    <CenteredSpinner />
  ) : (
    <div className='flex relative w-full space-x-4'>
      <Link href={`/channel/${data.author.id}`}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={data.author.picture}
          alt={data.author.name}
        />
      </Link>
      {isEditing ? (
        <CommentEditForm
          inputRef={editInputRef}
          defaultValue={data.text}
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
          <div className='flex space-x-2'>
            <Link href={`/channel/${data.author.id}`}>
              <Typography variant='body2'>{data.author.name}</Typography>
            </Link>
            <Typography variant='body2' color='text.secondary'>
              {new Date(data.createdAt).toLocaleDateString()}
            </Typography>
          </div>
          <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
            {data.text}
          </Typography>
          <div className='flex mt-2'>
            <Button
              startIcon={
                <ThumbUpAltIcon color={hasUserLiked ? 'primary' : 'inherit'} />
              }
              disabled={isRating}
              onClick={authenticate(() =>
                rate(hasUserLiked ? 'remove' : 'like')
              )}
            >
              {data.ratings.count.likes}
            </Button>
            <Button
              startIcon={
                <ThumbDownIcon
                  color={hasUserDisliked ? 'primary' : 'inherit'}
                />
              }
              disabled={isRating}
              onClick={authenticate(() =>
                rate(hasUserDisliked ? 'remove' : 'dislike')
              )}
            >
              {data.ratings.count.dislikes}
            </Button>
            <Button onClick={toggleReplyingMode}>Reply</Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Comment
