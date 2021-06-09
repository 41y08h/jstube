import axios from "axios";
import { useState, useRef, FormEventHandler } from "react";
import { useMutation } from "react-query";
import { useAuth } from "../contexts/Auth";
import IComment from "../interfaces/Comment";
import IRatings from "../interfaces/Ratings";

type RType = "like" | "dislike" | "remove";
interface Config {
  initialData: IComment;
  onDeleted(deletedCommentId: number): any;
}

export default function useComment({ initialData, onDeleted }: Config) {
  const { authenticate, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const [data, setData] = useState(initialData);
  const ratingsMutation = useMutation(
    async (type: RType) => {
      const baseUrl = `/api/ratings/comments/${data.id}`;
      switch (type) {
        case "like":
          const { data } = await axios.post<IRatings>(`${baseUrl}/like`);
          return data;
        case "dislike":
          const { data: data2 } = await axios.post<IRatings>(
            `${baseUrl}/dislike`
          );
          return data2;
        case "remove":
          const { data: data3 } = await axios.delete<IRatings>(`${baseUrl}`);
          return data3;
      }
    },
    { onSuccess: (ratings) => setData((prev) => ({ ...prev, ratings })) }
  );
  const editMutation = useMutation(async (text: string) => {
    const res = await axios.patch<IComment>(`/api/comments/${data.id}`, {
      text,
    });
    return res.data;
  });
  const deleteMutation = useMutation(
    async () => axios.delete(`/api/comments/${data.id}`),
    { onSuccess: () => onDeleted(data.id) }
  );

  // Derived data
  const hasUserLiked = data.ratings.userRatingStatus === "LIKED";
  const hasUserDisliked = data.ratings.userRatingStatus === "DISLIKED";
  const isAuthorUser = data.author.id === user?.id;

  // User Actions
  const onLike = authenticate(() =>
    ratingsMutation.mutate(hasUserLiked ? "remove" : "like")
  );
  const onDislike = authenticate(() =>
    ratingsMutation.mutate(hasUserDisliked ? "remove" : "dislike")
  );
  const toggleEdit = () => setIsEditing((e) => !e);
  const onEditFormSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const inputValue = editInputRef.current?.value;
    if (!inputValue) return;

    const data = await editMutation.mutateAsync(inputValue);
    setData(data);
    setIsEditing(false);
  };

  return {
    data,
    onLike,
    onDislike,
    isEditing,
    toggleEdit,
    editInputRef,
    editMutation,
    hasUserLiked,
    isAuthorUser,
    deleteMutation,
    ratingsMutation,
    hasUserDisliked,
    onEditFormSubmit,
  };
}
