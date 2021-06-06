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
import timeSince from "../../lib/timeSince";
import Avatar from "../Avatar";
import { ReactComponent as LikeIcon } from "../../icons/like.svg";
import { ReactComponent as DislikeIcon } from "../../icons/dislike.svg";

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
    <div className="my-2">
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
          <div className="flex space-x-4">
            <Avatar src={data.author.picture} alt={data.author.name} />
            <div className="flex flex-col">
              <div className="space-x-2">
                <span className="text-bold text-sm">{data.author.name}</span>
                <span className="text-bold text-sm text-secondary">
                  {timeSince(new Date(data.createdAt))}
                </span>
              </div>
              <CommentText>{data.text}</CommentText>
              <div className="mt-2 flex space-x-4">
                <button
                  className="text-secondary text-xs flex space-x-2 items-center"
                  disabled={ratingsMutation.isLoading}
                  onClick={onLike}
                >
                  <LikeIcon
                    className={`${"w-4 h-4"} ${
                      hasUserLiked ? "text-blue-600" : ""
                    }`}
                  />
                  {!!data.ratings.count.likes && (
                    <span>{data.ratings.count.likes}</span>
                  )}
                </button>
                <button
                  className="text-secondary text-xs flex space-x-2 items-center"
                  disabled={ratingsMutation.isLoading}
                  onClick={onDislike}
                >
                  <DislikeIcon
                    className={`${"w-4 h-4"} ${
                      hasUserDisliked ? "text-blue-600" : ""
                    }`}
                  />
                </button>
                <Button
                  appearance="none"
                  size="xs"
                  className="uppercase text-secondary text-semibold"
                  type="submit"
                  onClick={toggleIsReplying}
                >
                  Reply
                </Button>
              </div>
            </div>
          </div>
        )}
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
