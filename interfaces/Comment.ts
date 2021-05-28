import IRatings from "./Ratings";
import User from "./User";

export default interface IComment {
  text: string;
  author: User;
  ratings: IRatings;
}

export interface IComments {
  count: number;
  items: IComment[];
}
