import Button from "../Button";
import Replies from "./Replies";
import EditForm from "./EditForm";
import EditInput from "./EditInput";
import { FC, FormEventHandler, useState, useRef } from "react";
import CommentText from "./CommentText";
import useComment from "../../hooks/useComment";
import { InfiniteData, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import IComment, {
  ICommentPage,
  IReply,
  IReplyPage,
} from "../../interfaces/Comment";
import { useAuth } from "../../contexts/Auth";

interface Props {
  data: IComment;
  onDeleted(id: number): any;
}

const Comment: FC<Props> = (props) => {
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
          `comments/${data.id}/replies`,
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
  const [isViewingReplies, setIsViewingReplies] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const toggleRepliesView = () => setIsViewingReplies((prev) => !prev);
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
        {Boolean(data.replyCount) && (
          <div>
            <Button onClick={() => toggleRepliesView()}>
              {isViewingReplies
                ? `Hide ${data.replyCount} replies`
                : `View ${data.replyCount} replies`}
            </Button>
            {isViewingReplies && (
              <Replies key={props.data.id} commentId={props.data.id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
