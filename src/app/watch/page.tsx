import Layout from '@/components/Layout'
import Watch from '@/components/Watch'
import axios from 'axios'
import { cookies } from 'next/headers'

export function generateMetadata() {
  return { title: `Watch - JS Tube` }
}

export default async function WatchPage({ searchParams }) {
  const { v: videoId } = await searchParams
  const { data: video } = await axios.get(
    `http://localhost:3000/api/videos/${videoId}`,
    {
      headers: {
        cookie: (await cookies()).toString(),
      },
    }
  )

  return (
    <Layout>
      <Watch video={video} />
    </Layout>
  )
}
