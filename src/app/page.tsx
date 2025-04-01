import Layout from '@/components/Layout'
import Videos from '@/components/Videos'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - JsTube',
}

export default function Home() {
  return (
    <Layout>
      <Videos url='/api/videos' />
    </Layout>
  )
}
