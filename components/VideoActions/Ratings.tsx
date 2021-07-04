import axios from "axios";
import { FC, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import ActionButton from "./ActionButton";
import { useAuth } from "../../contexts/Auth";
import formatNumber from "../../lib/formatNumber";
import LikeIcon from "../../icons/like.svg";
import DislikeIcon from "../../icons/dislike.svg";
import { QVideoDetailed } from "../../interfaces/Video";
import IRatings from "../../interfaces/Ratings";

interface Props {
  data: QVideoDetailed;
}

const RatingActions: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();
  const [ratings, setRatings] = useState(data.ratings);
  const { authenticate } = useAuth();

  const ratingMutation = useMutation(
    async (type: "LIKE" | "DISLIKE" | "REMOVE") => {
      const url = `/api/ratings/videos/${data.id}`;

      switch (type) {
        case "LIKE":
          const res = await axios.post<IRatings>(`${url}/like`);
          return res.data;
        case "DISLIKE":
          const res_1 = await axios.post<IRatings>(`${url}/dislike`);
          return res_1.data;
        case "REMOVE":
          const res_2 = await axios.delete<IRatings>(url);
          return res_2.data;
      }
    },
    {
      onSuccess(data) {
        setRatings(data);
        queryClient.invalidateQueries("/api/playlists/liked");
      },
    }
  );

  const onLike = authenticate(() =>
    ratings.userRatingStatus === "LIKED"
      ? ratingMutation.mutate("REMOVE")
      : ratingMutation.mutate("LIKE")
  );

  const onDislike = authenticate(() =>
    ratings.userRatingStatus === "DISLIKED"
      ? ratingMutation.mutate("REMOVE")
      : ratingMutation.mutate("DISLIKE")
  );

  return (
    <div className="flex space-x-5 pb-4">
      <ActionButton
        icon={LikeIcon}
        highlight={ratings.userRatingStatus === "LIKED"}
        disabled={ratingMutation.isLoading}
        onClick={onLike}
      >
        {formatNumber(ratings.count.likes)}
      </ActionButton>
      <ActionButton
        icon={DislikeIcon}
        disabled={ratingMutation.isLoading}
        highlight={ratings.userRatingStatus === "DISLIKED"}
        onClick={onDislike}
      >
        {formatNumber(ratings.count.dislikes)}
      </ActionButton>
    </div>
  );
};

export default RatingActions;
