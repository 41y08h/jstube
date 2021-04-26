import Action from "./Action";
import { useState } from "react";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useMutation } from "react-query";
import axios from "axios";
import formatNumber from "../../../lib/formatNumber";

export default function Rating() {
  const { video } = useVideo();
  const { authAction } = useAuth();
  const [rating, setRating] = useState(video.rating);

  const ratingMutation = useMutation(
    (type) => {
      const slug = `/api/rating/video/${video._id}`;
      const needToRemoveRating = type === rating.userRating;

      if (needToRemoveRating) return axios.delete(slug);
      return axios.patch(`${slug}/${type}`);
    },
    { onSuccess: (res) => setRating(res.data) }
  );

  const like = () => authAction(() => ratingMutation.mutate("LIKE"));
  const dislike = () => authAction(() => ratingMutation.mutate("DISLIKE"));

  return (
    <div className="relative">
      <div className="space-x-5 pb-4">
        <Action
          className={rating.userRating === "LIKE" ? "text-blue-700" : ""}
          onClick={like}
          disabled={ratingMutation.isLoading}
          text={formatNumber(rating.likes)}
          icon={<ThumbUpIcon />}
        />
        <Action
          className={rating.userRating === "DISLIKE" ? "text-blue-700" : ""}
          onClick={dislike}
          disabled={ratingMutation.isLoading}
          text={formatNumber(rating.dislikes)}
          icon={<ThumbUpIcon className="transform rotate-180" />}
        />
      </div>
      <div className="absolute bg-gray-300 w-full overflow-hidden">
        <div
          style={{
            width: `${(rating.likes / (rating.dislikes || 1)) * 100}%`,
          }}
          className="bg-gray-500 h-0.5 w-full transition-all "
        />
      </div>
    </div>
  );
}
