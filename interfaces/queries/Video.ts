import Channel from "../Channel";
import Rating from "../Rating";
import Video from "../Video";

export default interface QueryVideo extends Video {
  channel: Channel;
  rating: Rating;
}
