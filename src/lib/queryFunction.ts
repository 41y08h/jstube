import axios from 'axios'
import { QueryFunctionContext } from '@tanstack/react-query'

export default async function queryFn(context: QueryFunctionContext) {
  const url = context.queryKey[0]
  if (typeof url !== 'string') {
    throw new Error('Invalid URL')
  }
  const { data } = await axios(url)
  return data
}
