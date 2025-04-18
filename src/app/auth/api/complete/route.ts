import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  const state = req.nextUrl.searchParams.get('state')
  const redirectUrl = state ?? '/'

  if (!token) return redirect(redirectUrl)
  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
  })

  redirect(redirectUrl) // Send for client side page redirect
}
