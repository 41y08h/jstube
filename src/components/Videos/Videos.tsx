'use client'
import VideoCard from '../VideoCard'
import axios, { AxiosError } from 'axios'
import React, { FC, useEffect } from 'react'
import {
  InfiniteData,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { QVideosPage } from '../../interfaces/Video'
import VideoLoadingGrid from '../VideoLoadingGrid'
import { useInView } from 'react-intersection-observer'
import { CircularProgress, Typography, useTheme } from '@mui/material'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { red } from '@mui/material/colors'

const Videos: FC<{ url: string }> = ({ url }) => {
  const theme = useTheme()
  const {
    data,
    isLoading,
    error,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery<QVideosPage, AxiosError<{ message: string }>>({
    queryKey: [url],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) =>
      axios(url, {
        params: { page: pageParam },
      }).then(res => res.data),
    getNextPageParam: lastPage =>
      lastPage.hasMore ? lastPage.pageNumber + 1 : undefined,
  })
  const queryClient = useQueryClient()
  const [bottomRef, isAtBottom] = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (isAtBottom && !isFetchingNextPage) fetchNextPage()
  }, [isAtBottom, fetchNextPage, isFetchingNextPage])

  function updateIsInWL(videoId: number) {
    queryClient.setQueryData<InfiniteData<QVideosPage>>([url], data => {
      if (!data) return data
      const newData = { ...data }
      const pages = newData.pages.map(page => {
        const videos = page.items.map(video => {
          if (video.id === videoId) {
            return { ...video, isInWL: !video.isInWL }
          }
          return video
        })
        return { ...page, items: videos }
      })
      return { ...newData, pages }
    })
  }

  if (isLoading) return <VideoLoadingGrid />

  if (isError)
    return (
      <div className='py-16 flex flex-col items-center justify-center space-y-4 text-center'>
        <Image
          src='/alien.svg'
          alt='alien'
          height={128}
          width={128}
          className='mx-auto'
        />
        <Typography variant='h5'>An error occurred</Typography>
        <Typography variant='body2'>
          {error?.response?.data?.message}
        </Typography>
        <Button variant='outlined' color='primary' onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    )

  return data!.pages.some(page => page.items.length) ? (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xl:gap-x-4 2xl:gap-x-5 gap-3 gap-y-0 sm:p-4 items-start'>
        {data!.pages.map(page =>
          page.items.map(video => (
            <VideoCard
              key={video.id}
              data={video}
              updateIsInWL={updateIsInWL}
            />
          ))
        )}
      </div>
      <div ref={bottomRef} className='flex justify-center pt-4 pb-8'>
        {isFetchingNextPage && <CircularProgress />}
      </div>
    </>
  ) : (
    <div className='mt-[-40px] h-full flex items-center justify-center text-center'>
      <div className='flex flex-col items-center'>
        <div className='flex items-center justify-center gap-1 text-8xl font-extrabold text-gray-800'>
          <span>4</span>
          <Image
            src='/alien.svg'
            alt='alien'
            width={84}
            height={84}
            className='rounded-full'
          />
          <span>4</span>
        </div>
        <div className='flex flex-col items-center'>
          <Typography
            variant='h6'
            className='py-2'
            sx={{
              fontSize: '1.8rem',
              fontWeight: 100,
            }}
          >
            No videos found
          </Typography>
          <Link
            href='/upload'
            style={{
              width: 'min-content',
            }}
          >
            <Button
              sx={{
                borderRadius: '20px',
                padding: '0 20px',
                height: '40px',
                backgroundColor: red[500],
                textTransform: 'none',
                color: 'white',
              }}
            >
              <span className='material-symbols-outlined mr-1'>add</span>
              <Typography
                variant='subtitle2'
                fontWeight={theme.typography.fontWeightBold}
              >
                Create
              </Typography>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Videos
