import ISubscribers from "./Subscribers";

export default interface IUser {
  id: number;
  name: string;
  picture: string;
}

export interface IChannel extends IUser {
  subscribers: ISubscribers;
}
