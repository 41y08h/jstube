import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    path: '/',
    maxAge: -1,
  })

  const referer = req.headers.get('referer') ?? '/'
  const url = new URL(referer, req.url) // Use req.url as the base
  url.searchParams.set('action', 'logout')

  return NextResponse.redirect(url)
}
