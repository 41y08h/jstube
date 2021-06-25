import { IChannel } from "./User";

export default interface ISubscribers {
  count: number;
  isUserSubscribed: boolean;
}

export interface ISubscription {
  channelId: number;
  userId: number;
  channel: IChannel;
}
