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
import { ReactComponent as TridotIcon } from "../../icons/tridot.svg";
import { ReactComponent as EditIcon } from "../../icons/edit.svg";
import { ReactComponent as DeleteIcon } from "../../icons/delete.svg";
import { Menu } from "@headlessui/react";
import Input from "../Input";
import Loading from "../Loading";

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

  return deleteMutation.isLoading ? (
    <Loading className="my-6" />
  ) : (
    <div className="my-6">
      <div className="flex relative w-full">
        <div className="flex space-x-4">
          <Avatar src={data.author.picture} alt={data.author.name} />
          {isEditing ? (
            <EditForm
              className="flex flex-col w-full"
              onSubmit={onEditFormSubmit}
            >
              {editMutation.isLoading ? (
                <Loading className="my-4" />
              ) : (
                <div>
                  <Input
                    autoFocus
                    className="w-full"
                    required
                    ref={editInputRef}
                    defaultValue={data.text}
                  />
                  <div className="flex  justify-end pt-3 space-x-2">
                    <Button
                      size="sm"
                      appearance="none"
                      className="uppercase font-medium text-secondary"
                      onClick={toggleEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      type="submit"
                      appearance="primary"
                      className="uppercase font-medium"
                    >
                      Save
                    </Button>
                  </div>
                </div>
              )}
            </EditForm>
          ) : (
            <div className="flex flex-col">
              <Menu as="div" className="absolute top-0 right-0 text-right">
                <Menu.Button>
                  <TridotIcon className="w-5 h-5 text-secondary" />
                </Menu.Button>
                <Menu.Items as="div" className="py-2 shadow rounded bg-white">
                  <Menu.Item as="div" className="flex flex-col">
                    {({ active }) => (
                      <button
                        onClick={toggleEdit}
                        className={`${
                          active && "bg-gray-200"
                        } w-full text-left px-6 pr-8 py-2 flex space-x-3`}
                      >
                        <EditIcon className="w-6 h-6 text-secondary" />
                        <span>Edit</span>
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => deleteMutation.mutate()}
                        className={`${
                          active && "bg-gray-200"
                        } w-full text-left px-6 pr-8 py-2 flex space-x-3`}
                      >
                        <DeleteIcon className="w-6 h-6 text-secondary" />
                        <span>Delete</span>
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
              <div className="space-x-2">
                <span className="text-bold text-sm">{data.author.name}</span>
                <span className="text-bold text-sm text-secondary">
                  {timeSince(new Date(data.createdAt))}
                </span>
                {data.updatedAt !== data.createdAt && (
                  <span className="text-bold text-sm text-secondary">
                    (edited)
                  </span>
                )}
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
          )}
        </div>
      </div>
      <div>
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
