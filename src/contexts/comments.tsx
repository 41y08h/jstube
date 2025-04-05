'use client'
import IComment, { ICommentPage } from '@/interfaces/Comment'
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQueryClient,
} from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import React, { createContext, FC, useContext } from 'react'

interface AuthContext {
  updateTotalCommentsCount: (updater: (total: number) => number) => void
  commentsQueryKey: string[]
  commentsQuery: UseInfiniteQueryResult<
    CommentsQueryData,
    AxiosError<unknown, any>
  >
  videoId: number
}

const CommentsContext = createContext<any>(undefined)

export function useComments(): AuthContext {
  return useContext(CommentsContext)
}

interface Props {
  videoId: number
  children: React.ReactNode
}

type CommentsQueryData = InfiniteData<ICommentPage>

export const CommentsProvider: FC<Props> = ({ videoId, children }) => {
  const queryClient = useQueryClient()
  const commentsQueryKey = [`/api/comments/${videoId}`]
  const commentsQuery = useInfiniteQuery<
    ICommentPage,
    AxiosError,
    CommentsQueryData,
    string[],
    number | null
  >({
    queryKey: commentsQueryKey,
    queryFn: async ({ pageParam: beforeId }) =>
      await axios
        .get(commentsQueryKey[0], {
          params: { beforeId },
        })
        .then(res => res.data),
    initialPageParam: null,
    getNextPageParam: lastPage =>
      lastPage.hasMore
        ? lastPage.items[lastPage.items.length - 1].id
        : undefined,
  })

  const commentsPages = commentsQuery.data?.pages
  const latestCommentsPage = commentsPages?.at(commentsPages?.length - 1)
  function updateTotalCommentsCount(updater: (total: number) => number) {
    if (!latestCommentsPage) return
    const total = updater(latestCommentsPage.total)

    queryClient.setQueryData<CommentsQueryData>(commentsQueryKey, lastPage => ({
      pages: lastPage?.pages.map(page => ({ ...page, total })) ?? [],
      pageParams: lastPage?.pageParams ?? [],
    }))
  }

  const value = {
    updateTotalCommentsCount,
    commentsQueryKey,
    commentsQuery,
    videoId,
  }

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  )
}
