import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function GET() {
  const supabase = await createClient()
  const { data } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  })
  if (data.url) {
    redirect(data.url) // use the redirect API for your server framework
  }
}
