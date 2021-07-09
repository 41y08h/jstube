import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import axios from 'axios'
import Comment from './Comment'
import { useAuth } from '../../contexts/Auth'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import MultilineInput from '../MultilineInput'
import IRatings from '../../interfaces/Ratings'
import CenteredSpinner from '../CenteredSpinner'
import grey from '@material-ui/core/colors/grey'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { useInView } from 'react-intersection-observer'
import IComment, { ICommentPage } from '../../interfaces/Comment'
import { FC, FormEventHandler, useEffect, useRef, useState } from 'react'

const useStyles = makeStyles(theme => ({
  heading: { margin: '0.5rem 0' },
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
  const queryClient = useQueryClient()
  const { authenticate, user } = useAuth()
  const queryKey = `/api/comments/${videoId}`

  // Data query
  const [bottomRef, isAtBottom] = useInView()
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get<ICommentPage>(
          `/api/comments/${videoId}`,
          { params: { page: pageParam } }
        )
        return data
      },
      {
        getNextPageParam: lastPage =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    )

  const latestPage = data?.pages[data?.pages.length - 1]

  function setTotal(updater: (total: number) => number) {
    const total = updater(latestPage.total)

    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages: data?.pages.map(page => ({ ...page, total })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  useEffect(() => {
    if (isAtBottom) fetchNextPage()
  }, [isAtBottom, fetchNextPage])
  // ---

  // Add new comment functionality
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [isCommentingMode, setIsCommentingMode] = useState(false)
  const { mutate: comment, isLoading: isCommenting } = useMutation(
    (text: string) =>
      axios.post<IComment>(`/api/comments/${videoId}`, { text }),
    { onSuccess: res => handleCommented(res.data) }
  )

  function toggleCommentingMode() {
    if (inputRef.current) inputRef.current.value = ''
    setIsCommentingMode(old => !old)
  }

  function handleCommented(newComment: IComment) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map((page, i) => {
          const isFirstPage = i === 0
          return isFirstPage
            ? { ...page, items: [newComment, ...page.items] }
            : page
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
    setTotal(old => old + 1)
    toggleCommentingMode()
  }
  // -----

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault()

    authenticate(async () => {
      const text = inputRef?.current?.value
      if (text) comment(text)
    })()
  }

  function handleCommentDeleted(id: number) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => {
          const items = page.items.filter(item => item.id !== id)
          return { ...page, items }
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))

    // Decrease total
    setTotal(total => total - 1)
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

  function handleCommentRated(id: number, ratings: IRatings) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === id ? { ...item, ratings } : item
          ),
        })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  if (!data || isLoading) return <CenteredSpinner spacing={8} />

  return (
    <div>
      <Typography variant='body1' className={classes.heading}>
        {latestPage?.total} Comments
      </Typography>
      <form className='relative mt-5 mb-8' onSubmit={handleSubmit}>
        {isCommenting ? (
          <CenteredSpinner spacing={0} />
        ) : (
          <div>
            <div className='flex space-x-4'>
              <Avatar
                style={{ width: '2rem', height: '2rem' }}
                src={user?.picture}
                alt={user?.name}
              />
              <MultilineInput
                required
                inputRef={inputRef}
                className={classes.input}
                onClick={toggleCommentingMode}
                placeholder='Add a public comment...'
              />
            </div>
            {isCommentingMode && (
              <div className='flex justify-end pt-3 space-x-2'>
                <Button color='secondary' onClick={toggleCommentingMode}>
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
        {data.pages.map(page =>
          page.items.map(comment => (
            <Comment
              key={comment.id}
              data={comment}
              onDeleted={handleCommentDeleted}
              onEdited={handleCommentEdited}
              onRated={handleCommentRated}
            />
          ))
        )}
      </div>
      <div ref={bottomRef} />
      {isFetchingNextPage && <CenteredSpinner />}
    </div>
  )
}

export default Comments
