import axios from 'axios'
import { FC } from 'react'
import Comment from '../Comments/Comment'
import Button from '@material-ui/core/Button'
import IRatings from '../../interfaces/Ratings'
import CenteredSpinner from '../CenteredSpinner'
import IComment, { ICommentPage } from '../../interfaces/Comment'
import { useInfiniteQuery, useQueryClient, InfiniteData } from 'react-query'
import { makeStyles } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'

const useStyles = makeStyles({
  blueTextbutton: { color: blue[700], textTransform: 'unset' },
})

interface Props {
  commentId: number
  videoId: number
}

type QueryData = InfiniteData<ICommentPage>

const Replies: FC<Props> = ({ commentId, videoId }) => {
  const queryKey = `/api/comments/${commentId}/replies`
  const queryClient = useQueryClient()
  const classes = useStyles()

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      queryKey,
      ({ pageParam }) =>
        axios
          .get<ICommentPage>(queryKey, { params: { beforeId: pageParam } })
          .then(res => res.data),
      {
        getNextPageParam: lastPage =>
          lastPage.hasMore
            ? lastPage.items[lastPage.items.length - 1].id
            : undefined,
      }
    )

  function handleCommentDeleted(id: number) {
    // Remove from the replies data
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => {
          const items = page.items.filter(item => item.id !== id)
          return { ...page, items, total: page.total - 1 }
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))

    // Decrease the `replyCount` of the original commentId
    queryClient.setQueryData<QueryData>(`/api/comments/${videoId}`, data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(comment =>
            comment.id === commentId
              ? { ...comment, replyCount: comment.replyCount - 1 }
              : comment
          ),
        })) ?? [],
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

  function handleOnReplied(id: number, replyComment: IComment) {
    queryClient.setQueryData<QueryData>(queryKey, data => ({
      pages:
        data?.pages.map((page, i) => {
          const isFirstPage = i === 0
          return isFirstPage
            ? {
                ...page,
                total: page.total + 1,
                items: [replyComment, ...page.items],
              }
            : page
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))

    queryClient.setQueryData<QueryData>(`/api/comments/${videoId}`, data => ({
      pages:
        data?.pages.map(page => ({
          ...page,
          items: page.items.map(comment =>
            comment.id === commentId
              ? { ...comment, replyCount: comment.replyCount + 1 }
              : comment
          ),
        })) ?? [],
      pageParams: data?.pageParams ?? [],
    }))
  }

  if (isLoading) return <CenteredSpinner />

  return (
    <div className='space-y-5 py-4'>
      {data?.pages.map(page =>
        page.items.map(comment => (
          <Comment
            key={comment.id}
            data={comment}
            onDeleted={handleCommentDeleted}
            onEdited={handleCommentEdited}
            onRated={handleCommentRated}
            onReplied={handleOnReplied}
            videoId={videoId}
          />
        ))
      )}
      {isFetchingNextPage ? (
        <CenteredSpinner />
      ) : (
        Boolean(data?.pages[data?.pages.length - 1].hasMore) && (
          <Button
            className={classes.blueTextbutton}
            onClick={() => fetchNextPage()}
            color='primary'
          >
            Show more replies
          </Button>
        )
      )}
    </div>
  )
}

export default Replies
