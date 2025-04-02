export const __DEV__ = process.env.NODE_ENV === 'development'
export const __PROD__ = process.env.NODE_ENV === 'production'

export const API_URL = __DEV__
  ? 'http://localhost:5000'
  : 'https://jstube-api.herokuapp.com'

export const siteName = 'JsTube'
