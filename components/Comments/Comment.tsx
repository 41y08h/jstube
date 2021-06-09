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
import LikeIcon from "../../icons/like.svg";
import DislikeIcon from "../../icons/dislike.svg";
import TridotIcon from "../../icons/tridot.svg";
import EditIcon from "../../icons/edit.svg";
import DeleteIcon from "../../icons/delete.svg";
import { Menu } from "@headlessui/react";
import Loading from "../Loading";
import MultilineInput from "../MultilineInput";

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
  const { authenticate, user } = useAuth();
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const [totalReplies, setTotalReplies] = useState(props.data.replyCount);
  const [newReplies, setNewReplies] = useState<IReply>([]);
  const repliesMutation = useMutation(async (text: string) =>
    axios
      .post<IReply>(`/api/comments/${data.id}/replies`, { text })
      .then((res) => res.data)
  );
  const [isReplying, setIsReplying] = useState(false);
  const toggleIsReplying = () => setIsReplying((prev) => !prev);

  const handleReplySubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const submit = authenticate(async () => {
      const text = replyInputRef?.current?.value;
      if (!text) return;

      const newReply = await repliesMutation.mutateAsync(text);
      setNewReplies((old) => [newReply, ...old]);
      setTotalReplies((old) => old + 1);
    });
    submit();
  };

  return deleteMutation.isLoading ? (
    <Loading className="my-6" />
  ) : (
    <div className="flex relative w-full">
      <div className="flex w-full space-x-4">
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
                <MultilineInput
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
          <div className="flex flex-col w-full">
            {isAuthorUser && (
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
            )}
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
            <CommentText className="whitespace-pre-wrap">
              {data.text.trim()}
            </CommentText>
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
            {isReplying && (
              <form
                className="flex space-x-3 w-full mt-2"
                onSubmit={handleReplySubmit}
              >
                <Avatar size="sm" src={user?.picture} alt={user?.name} />
                <div className="flex flex-col w-full space-y-2">
                  <MultilineInput
                    required
                    autoFocus
                    ref={replyInputRef}
                    placeholder="Add a public reply..."
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      size="sm"
                      appearance="none"
                      className="uppercase font-medium text-secondary"
                      onClick={toggleIsReplying}
                    >
                      Cancel
                    </Button>
                    <Button
                      appearance="primary"
                      size="sm"
                      className="uppercase font-medium"
                      type="submit"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </form>
            )}
            <Replies
              total={totalReplies}
              commentId={props.data.id}
              newReplies={newReplies}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
