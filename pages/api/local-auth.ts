import cookie from 'cookie'
import { __PROD__ } from '../../config'
import { NextApiRequest, NextApiResponse } from 'next'

export default function localAuth(req: NextApiRequest, res: NextApiResponse) {
  if (__PROD__) return
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', process.env.LOCAL_AUTH_TOKEN as string, {
      path: '/',
    })
  )
  res.redirect('/')
}
