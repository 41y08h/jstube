import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import axios from 'axios'
import Comment from './Comment'
import CommentForm from './CommentForm'
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
  const { authenticate } = useAuth()
  const queryKey = `/api/comments/${videoId}`

  // Data query
  const [bottomRef, isAtBottom] = useInView()
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam }) => {
        const { data } = await axios.get<ICommentPage>(
          `/api/comments/${videoId}`,
          { params: { beforeId: pageParam } }
        )
        return data
      },
      {
        getNextPageParam: lastPage =>
          lastPage.hasMore
            ? lastPage.items[lastPage.items.length - 1].id
            : undefined,
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

  const setPages = (updater: (pages: ICommentPage[]) => ICommentPage[]) => {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages: updater(data?.pages ?? []),
      pageParams: data?.pageParams ?? [],
    }))
  }

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const commentsMutation = useMutation((text: string) =>
    axios.post<IComment>(`/api/comments/${videoId}`, { text })
  )

  const handleCommentFormSubmit: FormEventHandler = event => {
    event.preventDefault()

    const submit = authenticate(async () => {
      const input = inputRef.current as HTMLTextAreaElement
      const { data: newComment } = await commentsMutation.mutateAsync(
        input.value
      )

      setPages(pages =>
        pages.map((page, i) => {
          // Insert new comment at first page
          const isFirstPage = i === 0
          return isFirstPage
            ? { ...page, items: [newComment, ...page.items] }
            : page
        })
      )
    })

    submit()
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

  function handleCommentReplied(id: number) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === id ? { ...item, replyCount: item.replyCount + 1 } : item
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
      <div className='mt-5 mb-8'>
        {commentsMutation.isLoading ? (
          <CenteredSpinner spacing={0} />
        ) : (
          <CommentForm onSubmit={handleCommentFormSubmit} inputRef={inputRef} />
        )}
      </div>
      <div className='space-y-5'>
        {data.pages.map(page =>
          page.items.map(comment => (
            <Comment
              key={comment.id}
              data={comment}
              onDeleted={handleCommentDeleted}
              onEdited={handleCommentEdited}
              onRated={handleCommentRated}
              onReplied={handleCommentReplied}
              videoId={videoId}
            />
          ))
        )}
      </div>
      {isFetchingNextPage && <CenteredSpinner />}
      <div ref={bottomRef} />
    </div>
  )
}

export default Comments
