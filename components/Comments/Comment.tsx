import { Edit } from "@material-ui/icons";
import axios from "axios";
import { FC, FormEventHandler, forwardRef, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../../contexts/Auth";
import { useComments } from "../../contexts/Comments";
import IComment from "../../interfaces/Comment";
import IRatings from "../../interfaces/Ratings";

interface Props {
  data: IComment;
}

const Comment: FC<Props> = ({ data }) => {
  const { setComments } = useComments();
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const { authenticate, user } = useAuth();

  const ratingsMutation = useMutation(
    async (type: "like" | "dislike" | "remove") => {
      const url = `/api/ratings/comments/${data.id}`;
      switch (type) {
        case "like":
          return axios.post<IRatings>(`${url}/like`).then((res) => res.data);
        case "dislike":
          return axios.post<IRatings>(`${url}/dislike`).then((res) => res.data);
        case "dislike":
          return axios.delete<IRatings>(url).then((res) => res.data);
      }
    }
  );
  const like = authenticate(() => ratingsMutation.mutate("like"));
  const dislike = authenticate(() => ratingsMutation.mutate("dislike"));
  const removeRating = authenticate(() => ratingsMutation.mutate("remove"));

  const editMutation = useMutation(async (text: string) =>
    axios.patch<IComment>(`/api/comments/${data.id}`, { text })
  );

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const handleEditSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const editInput = editInputRef.current;
    if (!editInput) return;
    const { data } = await editMutation.mutateAsync(editInput.value);
    setComments((previousComments) =>
      previousComments.map((comment) =>
        comment.id === data.id ? data : comment
      )
    );
  };

  const hasLiked = data.ratings.userRatingStatus === "LIKED";
  const hasDisliked = data.ratings.userRatingStatus === "DISLIKED";
  const isAuthorUser = user.id === data.author.id;

  return (
    <div>
      <img className="w-8" src={data.author.picture} alt={data.author.name} />
      {isAuthorUser && (
        <button className="bg-gray-200 p-2" onClick={toggleEdit}>
          edit
        </button>
      )}
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input autoFocus ref={editInputRef} defaultValue={data.text} />
          <button onClick={toggleEdit}>discard</button>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <span>{data.text}</span>
      )}
      <button
        onClick={hasLiked ? removeRating : like}
        disabled={ratingsMutation.isLoading}
        className={"p-4 " + (hasLiked ? "bg-gray-700" : "bg-gray-200")}
      >
        {data.ratings.count.likes} Likes
      </button>
      <button
        onClick={hasDisliked ? removeRating : dislike}
        disabled={ratingsMutation.isLoading}
        className={"p-4 " + (hasDisliked ? "bg-gray-700" : "bg-gray-200")}
      >
        {data.ratings.count.dislikes} Dislikes
      </button>
    </div>
  );
};

export default Comment;
