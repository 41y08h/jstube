import Action from "./Action";
import { useState } from "react";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import { useMutation } from "react-query";
import axios from "axios";

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
    <>
      <Action
        className={rating.userRating === "LIKE" ? "text-blue-700" : ""}
        onClick={like}
        disabled={ratingMutation.isLoading}
        text={rating.likes}
        icon={<ThumbUpIcon />}
      />
      <Action
        className={rating.userRating === "DISLIKE" ? "text-blue-700" : ""}
        onClick={dislike}
        disabled={ratingMutation.isLoading}
        text={rating.dislikes}
        icon={<ThumbUpIcon className="transform rotate-180" />}
      />
    </>
  );
}
