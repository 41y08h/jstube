import IRatings from "./Ratings";
import User from "./User";

export default interface IComment {
  id: number;
  text: string;
  author: User;
  ratings: IRatings;
  replyCount: number;
  originalCommentId: null;
  replyToCommentId: null;
}

export interface IReply {
  id: number;
  text: string;
  author: User;
  ratings: IRatings;
  replyCount: number;
  originalCommentId: number;
  replyToCommentId: number;
}

export interface ICommentPage {
  total: number;
  count: number;
  page: number;
  hasMore: boolean;
  items: IComment[];
}

export interface IReplyPage {
  total: number;
  count: number;
  page: number;
  hasMore: boolean;
  items: IReply[];
}
