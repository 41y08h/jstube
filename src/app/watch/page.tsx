import Layout from '@/components/Layout'
import Watch from '@/components/Watch'
import { getVideo } from '@/lib/api'

export function generateMetadata() {
  return { title: `Watch - JS Tube` }
}

export default async function WatchPage({ searchParams }) {
  const { v: videoId } = await searchParams
  const video = await getVideo(videoId)
  return (
    <Layout>
      <Watch video={video} />
    </Layout>
  )
}
