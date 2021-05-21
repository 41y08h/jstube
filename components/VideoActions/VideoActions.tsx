import { FC } from "react";
import ActionButton from "./ActionButton";
import Rating from "../../interfaces/Rating";
import { ReactComponent as LikeIcon } from "../../icons/like.svg";
import { ReactComponent as DislikeIcon } from "../../icons/dislike.svg";
import { ReactComponent as ShareIcon } from "../../icons/share.svg";
import formatNumber from "../../lib/formatNumber";

interface Props {
  rating: Rating;
}

const VideoActions: FC<Props> = ({ rating }) => (
  <div className="flex space-x-5 items-center justify-center pb-4">
    <ActionButton icon={LikeIcon}>{formatNumber(rating.likes)}</ActionButton>
    <ActionButton icon={DislikeIcon}>
      {formatNumber(rating.dislikes)}
    </ActionButton>
    <ActionButton icon={ShareIcon}>Share</ActionButton>
  </div>
);

export default VideoActions;
