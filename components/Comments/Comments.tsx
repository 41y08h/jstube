import { AxiosError } from "axios";
import { FC, useState } from "react";
import { useQuery } from "react-query";
import { IComments } from "../../interfaces/Comment";
import Comment from "./Comment";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const {
    data: comments,
    isLoading,
    isError,
  } = useQuery<IComments>(`/api/comments/${videoId}`);

  if (isLoading) return <>Loading...</>;
  if (!comments || isError) return <>Error :(</>;

  return (
    <div>
      <span>{comments.total} Comments</span>
      {comments.items.map((item) => (
        <Comment key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Comments;
