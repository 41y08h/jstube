import axios from "axios";
import { forwardRef, useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../../contexts/auth";
import IComment from "../../interfaces/Comment";
import IRatings from "../../interfaces/Ratings";

interface Props {
  data: IComment;
}

const Comment = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const [ratings, setRatings] = useState(data.ratings);
  const { authenticatedAction } = useAuth();

  const ratingMutation = useMutation(
    async (type: "LIKE" | "DISLIKE" | "REMOVE") => {
      const url = `/api/ratings/comments/${data.id}`;

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
    { onSuccess: setRatings }
  );

  const onLike = authenticatedAction(() =>
    ratings.userRatingStatus === "LIKED"
      ? ratingMutation.mutate("REMOVE")
      : ratingMutation.mutate("LIKE")
  );

  const onDislike = authenticatedAction(() =>
    ratings.userRatingStatus === "DISLIKED"
      ? ratingMutation.mutate("REMOVE")
      : ratingMutation.mutate("DISLIKE")
  );
  return (
    <div ref={ref}>
      <img src={data.author.picture} alt={data.author.name} />
      <span>{data.text}</span>
      <button
        onClick={onLike}
        disabled={ratingMutation.isLoading}
        className={
          "p-4 " +
          (ratings.userRatingStatus === "LIKED" ? "bg-gray-700" : "bg-gray-200")
        }
      >
        {ratings.count.likes} Likes
      </button>
      <button
        onClick={onDislike}
        disabled={ratingMutation.isLoading}
        className={
          "p-4 " +
          (ratings.userRatingStatus === "DISLIKED"
            ? "bg-gray-700"
            : "bg-gray-200")
        }
      >
        {ratings.count.dislikes} Dislikes
      </button>
    </div>
  );
});

export default Comment;
