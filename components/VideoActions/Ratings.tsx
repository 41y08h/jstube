import axios from "axios";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import ActionButton from "./ActionButton";
import { useAuth } from "../../contexts/auth";
import formatNumber from "../../lib/formatNumber";
import { ReactComponent as LikeIcon } from "../../icons/like.svg";
import { ReactComponent as DislikeIcon } from "../../icons/dislike.svg";
import { QVideoDetailed } from "../../interfaces/Video";
import Ratings from "../../interfaces/Ratings";

interface Props {
  data: QVideoDetailed;
}

const RatingActions: FC<Props> = ({ data }) => {
  const [ratings, setRatings] = useState(data.ratings);
  const { authenticatedAction } = useAuth();

  const ratingMutation = useMutation(
    (type: string) =>
      axios
        .post<Ratings>(`/api/ratings/videos/${data.id}/${type}`)
        .then((res) => res.data),
    { onSuccess: setRatings }
  );

  const hightlightLikeButton = ratings.userRatingStatus === "LIKED";
  const hightlightDisLikeButton = ratings.userRatingStatus === "DISLIKED";

  return (
    <div className="flex border-b-2 border-gray-500 space-x-5 pb-4">
      <ActionButton
        icon={LikeIcon}
        highlight={hightlightLikeButton}
        disabled={ratingMutation.isLoading}
        onClick={authenticatedAction(() => ratingMutation.mutate("like"))}
      >
        {formatNumber(ratings.count.likes)}
      </ActionButton>
      <ActionButton
        icon={DislikeIcon}
        disabled={ratingMutation.isLoading}
        highlight={hightlightDisLikeButton}
        onClick={authenticatedAction(() => ratingMutation.mutate("dislike"))}
      >
        {formatNumber(ratings.count.dislikes)}
      </ActionButton>
    </div>
  );
};

export default RatingActions;
