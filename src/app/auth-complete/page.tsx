import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function AuthComplete() {
  return <h1>hi</h1> // No UI needed
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  console.log('token', token)

  if (token) {
    const cookieStore = await cookies()
    cookieStore.set('token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'strict',
    })
  }

  return redirect('/')
}
