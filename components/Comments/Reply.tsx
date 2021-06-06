import axios from "axios";
import { FC, useState, useRef, FormEventHandler } from "react";
import { useQueryClient, useMutation, InfiniteData } from "react-query";
import Button from "../Button";
import EditForm from "./EditForm";
import EditInput from "./EditInput";
import CommentText from "./CommentText";
import useComment from "../../hooks/useComment";
import { IReply, IReplyPage } from "../../interfaces/Comment";
import { useAuth } from "../../contexts/Auth";

interface Props {
  data: IReply;
  onDeleted(id: number): any;
}

const Reply: FC<Props> = (props) => {
  const {
    data,
    onLike,
    onDislike,
    isEditing,
    toggleEdit,
    isAuthorUser,
    editInputRef,
    editMutation,
    hasUserLiked,
    deleteMutation,
    ratingsMutation,
    hasUserDisliked,
    onEditFormSubmit,
  } = useComment({ initialData: props.data, onDeleted: props.onDeleted });
  const queryClient = useQueryClient();
  const { authenticate } = useAuth();
  const replyInputRef = useRef<HTMLInputElement>(null);
  const repliesMutation = useMutation(
    async (text: string) =>
      axios
        .post<IReply>(`/api/comments/${data.id}/replies`, { text })
        .then((res) => res.data),
    {
      onSuccess(newReply) {
        queryClient.setQueryData<InfiniteData<IReplyPage>>(
          `comments/${newReply.originalCommentId}/replies`,
          (data) => {
            const oldPages = data?.pages ?? [];
            const firstPage = oldPages[0];
            const lastPage = oldPages[oldPages.length - 1];

            const items = [newReply, ...firstPage.items];
            const updatedFirstPage: IReplyPage = {
              ...firstPage,
              items,
              count: items.length,
            };

            const updatedPages = [updatedFirstPage, ...oldPages.slice(1)].map(
              (page) => ({ ...page, total: lastPage.total + 1 })
            );

            return {
              pages: updatedPages,
              pageParams: data?.pageParams ?? [],
            };
          }
        );
      },
    }
  );
  const [isReplying, setIsReplying] = useState(false);

  const toggleIsReplying = () => setIsReplying((prev) => !prev);

  const handleReplySubmit: FormEventHandler = (event) => {
    event.preventDefault();
    authenticate(() => {
      const text = replyInputRef?.current?.value;
      if (text) repliesMutation.mutate(text);
    })();
  };

  return (
    <div className="border border-black my-2">
      <div className="flex">
        {isEditing ? (
          <EditForm onSubmit={onEditFormSubmit}>
            <EditInput required ref={editInputRef} defaultValue={data.text} />
            <Button
              type="submit"
              className="bg-gray-200 p-1 uppercase"
              disabled={editMutation.isLoading}
            >
              Save
            </Button>
          </EditForm>
        ) : (
          <CommentText className="p-2">{data.text}</CommentText>
        )}
        <div className="ml-auto">
          <Button
            className="bg-gray-200 p-2"
            disabled={ratingsMutation.isLoading}
            onClick={onLike}
          >
            {data.ratings.count.likes} {hasUserLiked ? "👍🏽" : "👍"}
          </Button>
          <Button
            className="bg-gray-200 p-2"
            disabled={ratingsMutation.isLoading}
            onClick={onDislike}
          >
            {data.ratings.count.dislikes} {hasUserDisliked ? "👎🏽" : "👎"}
          </Button>
        </div>
      </div>
      <div>
        {isAuthorUser && (
          <div>
            <Button className="bg-gray-200 p-2" onClick={toggleEdit}>
              ✏
            </Button>
            <Button
              className="bg-gray-200 p-2"
              disabled={deleteMutation.isLoading}
              onClick={() => deleteMutation.mutate()}
            >
              ❌
            </Button>
            <Button className="bg-gray-200 p-2" onClick={toggleIsReplying}>
              {isReplying ? "⤴" : "⤵"}
            </Button>
          </div>
        )}
        {isReplying && (
          <form onSubmit={handleReplySubmit}>
            <input
              required
              ref={replyInputRef}
              placeholder="Add a public reply..."
            />
            <Button className="bg-gray-200 p-2" type="submit">
              REPLY
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Reply;
