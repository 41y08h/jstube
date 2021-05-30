import { FC, useState } from "react";
import { useQuery } from "react-query";
import IComment, { IComments } from "../../interfaces/Comment";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const [comments, setComments] = useState<IComment[]>([]);

  const { data, isLoading, isError } = useQuery<IComments>(
    `/api/comments/${videoId}`,
    { onSuccess: (data) => setComments(data.items), staleTime: Infinity }
  );

  if (isLoading) return <>Loading...</>;
  if (!data || isError) return <>Error :(</>;

  return (
    <div>
      <span>{data.total} Comments</span>
      <CommentInput videoId={videoId} setComments={setComments} />
      {comments.map((item) => (
        <Comment key={item.id} data={item} />
      ))}
    </div>
  );
};

export default Comments;
