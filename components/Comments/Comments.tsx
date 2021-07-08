import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import axios from 'axios'
import Comment from './Comment'
import { useAuth } from '../../contexts/Auth'
import { useInView } from 'react-intersection-observer'
import IComment, { ICommentPage } from '../../interfaces/Comment'
import { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Loading from '../Loading'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { InputBase } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
  heading: {
    margin: '0.5rem 0',
  },
  input: {
    ...theme.typography.body2,
    backgroundColor: grey[200],
    padding: '0.8rem',
    width: '100%',
    borderRadius: 6,
  },
}))

interface Props {
  videoId: number
}

type QueryData = InfiniteData<ICommentPage>

const Comments: FC<Props> = ({ videoId }) => {
  const classes = useStyles()
  const { authenticate, user } = useAuth()
  const queryClient = useQueryClient()
  const [bottomRef, isAtBottom] = useInView()
  const inputRef = useRef<HTMLDivElement>(null)
  const [isCommenting, setIsCommenting] = useState(false)

  const queryKey = `/api/comments/${videoId}`
  const [newComments, setNewComments] = useState<IComment[]>([])

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) =>
        axios
          .get<ICommentPage>(`/api/comments/${videoId}`, {
            params: { page: pageParam },
          })
          .then(res => res.data),
      {
        getNextPageParam: lastPage =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    )
  const commentsMutation = useMutation(async (text: string) =>
    axios.post<IComment>(queryKey, { text }).then(res => res.data)
  )

  useEffect(() => {
    if (isAtBottom) fetchNextPage()
  }, [isAtBottom, fetchNextPage])

  if (isLoading)
    return (
      <div className='grid justify-center py-8'>
        <CircularProgress />
      </div>
    )

  if (!data) return null

  const latestPage = data.pages[data.pages.length - 1]

  const toggleIsCommenting = () => {
    if (inputRef.current) inputRef.current.value = ''
    setIsCommenting(old => !old)
  }

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault()

    const submit = authenticate(async () => {
      const text = inputRef?.current?.value
      if (!text) return

      const newComment = await commentsMutation.mutateAsync(text)
      setNewComments(old => [newComment, ...old])

      setTotal(total => total + 1)

      toggleIsCommenting()
    })

    submit()
  }

  function onDeleted(id: number) {
    // Remove from pages cache
    queryClient.setQueryData<T>(queryKey, data => ({
      pages:
        data?.pages.map(page => {
          const items = page.items.filter(c => c.id !== id)
          return { ...page, items }
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))

    setNewComments(comments => comments.filter(comment => comment.id !== id))

    // Decrease total
    setTotal(total => total - 1)
  }

  function setTotal(updater: (total: number) => number) {
    const total = updater(latestPage.total)

    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages: data?.pages.map(page => ({ ...page, total })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  function handleCommentEdited(editedComment: IComment) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === editedComment.id ? editedComment : item
          ),
        })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  return (
    <div>
      <Typography variant='body1' className={classes.heading}>
        {latestPage.total} Comments
      </Typography>
      <form className='relative mt-5 mb-8' onSubmit={handleSubmit}>
        {commentsMutation.isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <div className='flex space-x-4'>
              <Avatar
                style={{ width: '2rem', height: '2rem' }}
                src={user?.picture}
                alt={user?.name}
              />
              <InputBase
                multiline
                required
                className={classes.input}
                inputRef={inputRef}
                onClick={() => setIsCommenting(true)}
                placeholder='Add a public comment...'
              />
            </div>
            {isCommenting && (
              <div className='flex justify-end pt-3 space-x-2'>
                <Button color='secondary' onClick={toggleIsCommenting}>
                  Cancel
                </Button>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  disableElevation
                >
                  Comment
                </Button>
              </div>
            )}
          </div>
        )}
      </form>

      <div className='space-y-5'>
        {newComments.map(newComment => (
          <Comment
            key={newComment.id}
            data={newComment}
            onDeleted={onDeleted}
            onEdited={handleCommentEdited}
          />
        ))}
        {data?.pages.map(page =>
          page.items.map(comment =>
            newComments.find(
              newComment => newComment.id === comment.id
            ) ? null : (
              <Comment
                key={comment.id}
                data={comment}
                onDeleted={onDeleted}
                onEdited={handleCommentEdited}
              />
            )
          )
        )}
      </div>
      <div ref={bottomRef} />
      {isFetchingNextPage && <Loading className='my-4' />}
    </div>
  )
}

export default Comments
