import axios from "axios";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import ActionButton from "./ActionButton";
import { useAuth } from "../../contexts/auth";
import formatNumber from "../../lib/formatNumber";
import QueryVideo from "../../interfaces/queries/Video";
import { ReactComponent as LikeIcon } from "../../icons/like.svg";
import { ReactComponent as DislikeIcon } from "../../icons/dislike.svg";

interface Props {
  data: QueryVideo;
}

const Ratings: FC<Props> = ({ data }) => {
  const [rating, setRating] = useState(data.rating);
  const { authenticatedAction } = useAuth();

  const ratingMutation = useMutation(async (type: string) => {
    const res = await axios.post(`/api/ratings/videos/${data.id}/${type}`);
    setRating(res.data);
  });

  const hightlightLikeButton = rating.userRatingStatus === "LIKED";
  const hightlightDisLikeButton = rating.userRatingStatus === "DISLIKED";

  return (
    <div className="flex border-b-2 border-gray-500 space-x-5 pb-4">
      <ActionButton
        icon={LikeIcon}
        highlight={hightlightLikeButton}
        disabled={ratingMutation.isLoading}
        onClick={authenticatedAction(() => ratingMutation.mutate("like"))}
      >
        {formatNumber(rating.likes)}
      </ActionButton>
      <ActionButton
        icon={DislikeIcon}
        disabled={ratingMutation.isLoading}
        highlight={hightlightDisLikeButton}
        onClick={authenticatedAction(() => ratingMutation.mutate("dislike"))}
      >
        {formatNumber(rating.dislikes)}
      </ActionButton>
    </div>
  );
};

export default Ratings;
