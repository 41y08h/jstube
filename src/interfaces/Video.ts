import IRatings from './Ratings'
import { IChannel } from './User'

export default interface IVideo {
  id: number
  title: string
  description: string
  src: string
  thumbnail: string
  duration: number
  views: number
  userId: number
  uploadedAt: string
  updatedAt: string
}

export interface QVideo extends IVideo {
  channel: IChannel
  ratings: IRatings
  isInWL: boolean
}

export interface QVideosPage {
  pageNumber: number
  hasMore: boolean
  items: QVideo[]
}
