import axios, { AxiosError } from 'axios'
import { FC } from 'react'
import Comment from '../Comments/Comment'
import IRatings from '../../interfaces/Ratings'
import CenteredSpinner from '../CenteredSpinner'
import IComment, {
  ICommentPage,
  IReply,
  IReplyPage,
} from '../../interfaces/Comment'
import {
  useInfiniteQuery,
  useQueryClient,
  InfiniteData,
} from '@tanstack/react-query'
import { makeStyles } from '@material-ui/styles'
import blue from '@material-ui/core/colors/blue'
import { Button } from '@mui/material'
import { useComments } from '@/contexts/comments'

const useStyles = makeStyles({
  blueTextbutton: { color: blue[700], textTransform: 'unset' },
})

interface Props {
  commentId: number
}

type CommentsQueryData = InfiniteData<ICommentPage>

const Replies: FC<Props> = ({ commentId }) => {
  const queryKey = [`/api/comments/${commentId}/replies`]
  const queryClient = useQueryClient()
  const classes = useStyles()

  const { videoId, updateTotalCommentsCount } = useComments()

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<
      ICommentPage,
      AxiosError,
      CommentsQueryData,
      string[],
      number | null
    >({
      queryKey,
      queryFn: ({ pageParam }) =>
        axios
          .get<ICommentPage>(queryKey[0], { params: { beforeId: pageParam } })
          .then(res => res.data),
      initialPageParam: null,
      getNextPageParam: lastPage =>
        lastPage.hasMore
          ? lastPage.items[lastPage.items.length - 1].id
          : undefined,
    })

  function handleCommentDeleted(id: number) {
    // Remove from the replies data
    queryClient.setQueryData<CommentsQueryData>(queryKey, data => ({
      pages:
        data?.pages.map(page => {
          const items = page.items.filter(item => item.id !== id)
          return { ...page, items, total: page.total - 1 }
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }))

    // Decrease the `replyCount` of the original commentId
    queryClient.setQueryData<CommentsQueryData>(
      [`/api/comments/${videoId}`],
      data => ({
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
      })
    )

    updateTotalCommentsCount(total => total - 1)
  }

  function handleCommentEdited(editedComment: IComment) {
    queryClient.setQueryData<CommentsQueryData>(queryKey, data => ({
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
    queryClient.setQueryData<CommentsQueryData>(queryKey, data => ({
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

  function handleOnReplied(replyComment: IReply) {
    queryClient.setQueryData<CommentsQueryData>(
      [`/api/comments/${videoId}`],
      data => ({
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
      })
    )

    // Insert reply comment to the original comment replies
    queryClient.setQueryData<InfiniteData<IReplyPage>>(
      [`/api/comments/${replyComment.originalCommentId}/replies`],
      data => ({
        pages:
          data?.pages.map(page => ({
            ...page,
            items: [replyComment, ...page.items],
          })) ?? [],
        pageParams: data?.pageParams ?? [],
      })
    )

    updateTotalCommentsCount(total => total + 1)
  }

  if (isLoading) return <CenteredSpinner />

  return (
    <div className='space-y-5 py-4'>
      {data?.pages.map(page =>
        page.items.map(comment => (
          <Comment
            key={comment.id}
            commentData={comment}
            onDeleted={handleCommentDeleted}
            onEdited={handleCommentEdited}
            onRated={handleCommentRated}
            onReplied={handleOnReplied}
          />
        ))
      )}
      {isFetchingNextPage ? (
        <CenteredSpinner />
      ) : (
        Boolean(data?.pages[data?.pages.length - 1]?.hasMore) && (
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
