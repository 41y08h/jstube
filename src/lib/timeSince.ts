import { formatDistanceToNow } from 'date-fns'

export default function timeSince(date: string) {
  console.log(new Date(date))
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
