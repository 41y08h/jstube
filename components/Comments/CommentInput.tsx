import axios from "axios";
import { Dispatch, FC, FormEventHandler, SetStateAction, useRef } from "react";
import { useMutation } from "react-query";
import IComment from "../../interfaces/Comment";

interface Props {
  videoId: number;
  setComments: Dispatch<SetStateAction<IComment[]>>;
}

const CommentInput: FC<Props> = ({ videoId, setComments }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const commentsMutation = useMutation(
    (text: string) =>
      axios
        .post<IComment>(`/api/comments/${videoId}`, { text })
        .then((res) => res.data),
    { onSuccess: (newComment) => setComments((prev) => [newComment, ...prev]) }
  );

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    const input = inputRef.current;
    if (!input?.value) return;
    await commentsMutation.mutateAsync(input?.value);
    input.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} />
    </form>
  );
};

export default CommentInput;
