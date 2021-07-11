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
  const { authenticate } = useAuth()
  const queryClient = useQueryClient()
  const queryKey = `/api/comments/${videoId}`
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const [bottomRef, isAtBottom] = useInView()
  const commentsQuery = useInfiniteQuery(
    queryKey,
    ({ pageParam }) =>
      axios
        .get<ICommentPage>(`/api/comments/${videoId}`, {
          params: { beforeId: pageParam },
        })
        .then(res => res.data),
    {
      getNextPageParam: lastPage =>
        lastPage.hasMore
          ? lastPage.items[lastPage.items.length - 1].id
          : undefined,
    }
  )
  const commentsMutation = useMutation((text: string) =>
    axios.post<IComment>(`/api/comments/${videoId}`, { text })
  )

  useEffect(() => {
    if (isAtBottom) commentsQuery.fetchNextPage()
  }, [isAtBottom, commentsQuery.fetchNextPage])

  if (commentsQuery.isLoading) return <CenteredSpinner spacing={8} />
  if (commentsQuery.isError) return <p>There was an error</p>
  if (!commentsQuery.isSuccess) return null

  const totalPages = commentsQuery.data.pages.length
  const lastPage = commentsQuery.data.pages[totalPages - 1]

  const setPages = (updater: (pages: ICommentPage[]) => ICommentPage[]) => {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages: updater(data?.pages ?? []),
      pageParams: data?.pageParams ?? [],
    }))
  }

  const setTotalComments = (updater: (total: number) => number) => {
    const total = updater(lastPage.total)
    setPages(pages => pages.map(page => ({ ...page, total })))
  }

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
      setTotalComments(old => old + 1)
    })

    submit()
  }

  function handleCommentDeleted(id: number) {
    setPages(pages =>
      pages.map(page => {
        const items = page.items.filter(comment => comment.id !== id)
        return { ...page, items }
      })
    )
    setTotalComments(total => total - 1)
  }

  function handleCommentEdited(editedComment: IComment) {
    setPages(pages =>
      pages.map(page => ({
        ...page,
        items: page.items.map(item =>
          item.id === editedComment.id ? editedComment : item
        ),
      }))
    )
  }

  function handleCommentRated(id: number, ratings: IRatings) {
    setPages(pages =>
      pages.map(page => ({
        ...page,
        items: page.items.map(item =>
          item.id === id ? { ...item, ratings } : item
        ),
      }))
    )
  }

  function handleCommentReplied(id: number) {
    setPages(pages =>
      pages.map(page => ({
        ...page,
        items: page.items.map(item =>
          item.id === id ? { ...item, replyCount: item.replyCount + 1 } : item
        ),
      }))
    )
  }

  return (
    <div>
      <Typography variant='body1' className={classes.heading}>
        {lastPage.total} Comments
      </Typography>
      <div className='mt-5 mb-8'>
        {commentsMutation.isLoading ? (
          <CenteredSpinner spacing={0} />
        ) : (
          <CommentForm onSubmit={handleCommentFormSubmit} inputRef={inputRef} />
        )}
      </div>
      <div className='space-y-5'>
        {commentsQuery.data.pages.map(page =>
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
      {commentsQuery.isFetchingNextPage && <CenteredSpinner />}
      <div ref={bottomRef} />
    </div>
  )
}

export default Comments
