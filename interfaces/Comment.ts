import IRatings from "./Ratings";
import User from "./User";

export default interface IComment {
  id: number;
  text: string;
  author: User;
  ratings: IRatings;
}

export interface ICommentPage {
  total: number;
  count: number;
  page: number;
  hasMore: boolean;
  items: IComment[];
}
