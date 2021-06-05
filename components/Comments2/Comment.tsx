import axios from "axios";
import { FC, FormEventHandler, useRef, useState } from "react";
import { useInfiniteQuery, useMutation } from "react-query";
import { useAuth } from "../../contexts/Auth";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import IRatings from "../../interfaces/Ratings";

interface Props {
  data: IComment;
  onDeleted: (id: number) => void;
  isReply?: boolean;
}

type RType = "like" | "dislike" | "remove";

const Comment: FC<Props> = ({ isReply = false, ...props }) => {
  const { authenticate, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isViewingReplies, setIsViewingReplies] = useState(false);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState(props.data);
  const repliesQuery = useInfiniteQuery(
    `comments/${data.id}/replies`,
    async ({ pageParam = 1 }) =>
      axios
        .get<ICommentPage>(`/api/comments/${data.id}/replies`, {
          params: { page: pageParam },
        })
        .then((res) => res.data),
    {
      staleTime: Infinity,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      enabled: isViewingReplies,
    }
  );
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
    { onSuccess: () => props.onDeleted(data.id) }
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
  const toggleRepliesView = () => setIsViewingReplies((e) => !e);
  const onEditFormSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    console.log("hey");
    const inputValue = editInputRef.current?.value;
    if (!inputValue) return;

    const data = await editMutation.mutateAsync(inputValue);
    setData(data);
    setIsEditing(false);
  };

  return (
    <div className="border border-black my-2">
      <div className="flex">
        {isEditing ? (
          <form onSubmit={onEditFormSubmit}>
            <input ref={editInputRef} required defaultValue={data.text} />
            <button
              disabled={editMutation.isLoading}
              className="bg-gray-200 p-1"
              type="submit"
            >
              save
            </button>
          </form>
        ) : (
          <span className="p-2">
            {data.text} - {data.replyCount} replies
          </span>
        )}
        <div className="ml-auto">
          <button
            disabled={ratingsMutation.isLoading}
            className="bg-gray-200 p-2"
            onClick={onLike}
          >
            {data.ratings.count.likes} {hasUserLiked ? "👍🏽" : "👍"}
          </button>
          <button
            disabled={ratingsMutation.isLoading}
            className="bg-gray-200 p-2"
            onClick={onDislike}
          >
            {data.ratings.count.dislikes} {hasUserDisliked ? "👎🏽" : "👎"}
          </button>
        </div>
      </div>
      <div>
        {isAuthorUser && (
          <div>
            <button onClick={toggleEdit} className="bg-gray-200 p-2">
              ✏
            </button>
            <button
              disabled={deleteMutation.isLoading}
              onClick={() => deleteMutation.mutate()}
              className="bg-gray-200 p-2"
            >
              ❌
            </button>
          </div>
        )}
        {!isReply && Boolean(data.replyCount) && (
          <div>
            <button onClick={toggleRepliesView}>
              {isViewingReplies
                ? `Hide ${data.replyCount} replies`
                : `View ${data.replyCount} replies`}
            </button>
            {isViewingReplies && (
              <div className="pl-20">
                {repliesQuery.data?.pages.map((page) =>
                  page.items.map((reply) => (
                    <Comment
                      isReply
                      key={reply.id}
                      data={reply}
                      onDeleted={() => {}}
                    />
                  ))
                )}
                {/* {repliesQuery.} */}
                {repliesQuery.isFetchingNextPage && <div>...</div>}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
