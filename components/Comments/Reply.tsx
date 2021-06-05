import { FC } from "react";
import Button from "../Button";
import EditForm from "./EditForm";
import EditInput from "./EditInput";
import CommentText from "./CommentText";
import useComment from "../../hooks/useComment";
import CommentProps from "../../types/CommentProps";

const Reply: FC<CommentProps> = (props) => {
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Reply;
