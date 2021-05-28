import Ratings from "./Ratings";
import User, { Channel } from "./User";

export default interface Video {
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

export interface QVideo extends Video {
  channel: User;
}

export interface QVideoDetailed extends Video {
  channel: Channel;
  ratings: Ratings;
}
