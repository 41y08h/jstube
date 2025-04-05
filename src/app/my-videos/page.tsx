'use client'
import { LinearProgress } from '@material-ui/core'
import { useQuery } from '@tanstack/react-query'
import { Card } from 'react-bootstrap'
import Link from 'next/link'
import Layout from '@/components/Layout'

function VideoCard({ data: video }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant='top' src={video.thumbnail} />
      <Card.Body>
        <Card.Title>{video.title}</Card.Title>
      </Card.Body>
    </Card>
  )
}

export default function MyVideos() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['/api/videos/mine'],
  })

  if (isLoading) return <>...</>
  return (
    <Layout>
      <div>
        {isFetching && <LinearProgress />}
        <Link href='/'>back</Link>
        {data.map(video => (
          <VideoCard data={video} />
        ))}
      </div>
    </Layout>
  )
}
