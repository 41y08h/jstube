import { IComments } from "./Comment";
import IRatings from "./Ratings";
import User, { IChannel } from "./User";

export default interface IVideo {
  id: number;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  duration: number;
  userId: number;
  views: number;
  uploadedAt: Date;
  updatedAt: Date;
}

export interface QVideo extends IVideo {
  channel: User;
}

export interface QVideoDetailed extends IVideo {
  channel: IChannel;
  ratings: IRatings;
  comments: IComments;
}
