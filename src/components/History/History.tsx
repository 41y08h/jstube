'use client'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { LinearProgress } from '@mui/material'

export default function History({ data: initialData }) {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['/api/history'],
    initialData,
  })

  if (isLoading) return <>...</>

  return (
    <div>
      {isFetching && <LinearProgress />}
      <Link href='/'>back</Link>
      {data.map(history => (
        <p>{history.video.title}</p>
      ))}
    </div>
  )
}
