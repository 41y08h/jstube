'use client'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import axios from 'axios'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { useAuth } from '../../contexts/auth'
import IRatings from '../../interfaces/Ratings'
import CenteredSpinner from '../CenteredSpinner'
import { useInView } from 'react-intersection-observer'
import IComment, {
  ICommentPage,
  IReply,
  IReplyPage,
} from '../../interfaces/Comment'
import { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import { useComments } from '@/contexts/comments'
import { Typography, useTheme } from '@mui/material'

type CommentsQueryData = InfiniteData<ICommentPage>

const Comments: FC = () => {
  const theme = useTheme()
  const { authenticate } = useAuth()
  const queryClient = useQueryClient()
  const { commentsQuery, commentsQueryKey, updateTotalCommentsCount } =
    useComments()

  const [bottomIntersectionRef, isScrollbarAtBottom] = useInView()
  const [isCommentFormActive, setIsCommentFormActive] = useState(false)
  const commentInputRef = useRef<HTMLTextAreaElement | undefined>(undefined)

  const commentsMutation = useMutation({
    mutationFn: (text: string) =>
      axios.post<IComment>(commentsQueryKey[0], { text }),
  })

  useEffect(() => {
    if (isScrollbarAtBottom) commentsQuery.fetchNextPage()
  }, [isScrollbarAtBottom, commentsQuery])

  const handleCommentFormSubmit: FormEventHandler = event => {
    event.preventDefault()

    const submit = authenticate(async () => {
      const text = commentInputRef.current?.value
      if (!text) return
      const { data: newComment } = await commentsMutation.mutateAsync(text)

      queryClient.setQueryData<CommentsQueryData>(
        commentsQueryKey,
        comments => {
          const pages = comments?.pages.map((page, idx) => {
            if (idx != 0) return page
            const items = [newComment, ...page.items]
            const total = page.total + 1
            return { ...page, items, total }
          })
          return { pages: pages ?? [], pageParams: comments?.pageParams ?? [] }
        }
      )

      setIsCommentFormActive(false)
      updateTotalCommentsCount(total => total + 1)
    })

    submit()
  }

  function handleCommentDeleted(id: number) {
    const repliesCount =
      queryClient
        .getQueryData<CommentsQueryData>(commentsQueryKey)
        ?.pages.find(page => page.items.find(t => t.id === id))
        ?.items.find(t => t.id === id)?.replyCount ?? 0

    queryClient.setQueryData<CommentsQueryData>(commentsQueryKey, comments => ({
      pages:
        comments?.pages.map(page => {
          const items = page.items.filter(item => item.id !== id)
          return { ...page, items }
        }) ?? [],
      pageParams: comments?.pageParams ?? [],
    }))

    updateTotalCommentsCount(total => total - 1 - repliesCount)
  }

  function handleCommentEdited(editedComment: IComment) {
    queryClient.setQueryData<CommentsQueryData>(commentsQueryKey, comments => ({
      pages:
        comments?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === editedComment.id ? editedComment : item
          ),
        })) ?? [],
      pageParams: comments?.pageParams ?? [],
    }))
  }

  function handleCommentRated(id: number, ratings: IRatings) {
    queryClient.setQueryData<CommentsQueryData>(commentsQueryKey, comments => ({
      pages:
        comments?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === id ? { ...item, ratings } : item
          ),
        })) ?? [],
      pageParams: comments?.pageParams ?? [],
    }))
  }

  function handleCommentReplied(replyComment: IReply) {
    // Increase reply count
    queryClient.setQueryData<CommentsQueryData>(commentsQueryKey, comments => ({
      pages:
        comments?.pages.map(page => ({
          ...page,
          items: page.items.map(item =>
            item.id === replyComment.originalCommentId
              ? { ...item, replyCount: item.replyCount + 1 }
              : item
          ),
        })) ?? [],
      pageParams: comments?.pageParams ?? [],
    }))

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

  if (commentsQuery.isLoading) return <CenteredSpinner spacing={8} />
  const commentsPages = commentsQuery.data?.pages
  const latestCommentsPage = commentsPages?.at(commentsPages?.length - 1)

  return (
    <div>
      <Typography
        variant='h6'
        style={{ fontWeight: theme.typography.fontWeightBold }}
      >
        {latestCommentsPage?.total} Comments
      </Typography>
      <div className='mt-5 mb-8'>
        {commentsMutation.isPending ? (
          <CenteredSpinner spacing={0} />
        ) : (
          <CommentForm
            inputRef={commentInputRef}
            onSubmit={handleCommentFormSubmit}
            isFormActive={isCommentFormActive}
            toggleForm={setIsCommentFormActive}
          />
        )}
      </div>
      <div className='space-y-5'>
        {commentsQuery.data?.pages.map(page =>
          page.items.map(comment => (
            <Comment
              key={comment.id}
              commentData={comment}
              onRated={handleCommentRated}
              onEdited={handleCommentEdited}
              onDeleted={handleCommentDeleted}
              onReplied={handleCommentReplied}
            />
          ))
        )}
      </div>
      {commentsQuery.isFetchingNextPage && <CenteredSpinner />}
      <div ref={bottomIntersectionRef} />
    </div>
  )
}

export default Comments
