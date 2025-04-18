import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    path: '/',
    maxAge: -1,
  })

  return NextResponse.redirect(
    (req.headers.get('referer') ?? '/') + '?action=logout'
  )
}
