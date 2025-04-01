import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie' // Helps set cookies in API routes

export default async function authComplete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { token } = req.query // Correctly extract token from query params
  console.log('Token:', token)

  if (typeof token === 'string') {
    // Set the token in an HTTP-Only cookie
    res.setHeader(
      'Set-Cookie',
      serialize('token', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'strict',
      })
    )

    return res.redirect(307, '/') // Use 307 for temporary redirect
  }

  return res.status(400).json({ error: 'Token missing or invalid' })
}
