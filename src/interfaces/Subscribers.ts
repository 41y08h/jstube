import { IChannel } from './User'

export default interface ISubscribers {
  count: number
  isUserSubscribed: boolean
}

export interface ISubscription {
  channel: IChannel
}
