import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { LinearProgress } from '@mui/material'
import axios from 'axios'
import { cookies } from 'next/headers'
import Layout from '@/components/Layout'
import History from '@/components/History'

export default async function HistoryPage({ searchParams }) {
  const { data } = await axios.get(`http://localhost:3000/api/history`, {
    headers: {
      cookie: (await cookies()).toString(),
    },
  })

  return (
    <Layout>
      <History data={data} />
    </Layout>
  )
}
