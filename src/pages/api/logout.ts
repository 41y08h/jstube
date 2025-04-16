import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

const logout = (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', '', {
      path: '/',
      maxAge: -1,
    })
  )
  res.redirect('/')
}

export default logout
