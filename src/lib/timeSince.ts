import { formatDistanceToNow } from 'date-fns'

export default function timeSince(date: string) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
