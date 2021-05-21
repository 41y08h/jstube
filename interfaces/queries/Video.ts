import Rating from "../Rating";
import User from "../User";
import Video from "../Video";

export default interface QueryVideo extends Video {
  channel: User;
  rating: Rating;
}
