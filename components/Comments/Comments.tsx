import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axios from "axios";
import Comment from "./Comment";
import { useAuth } from "../../contexts/Auth";
import { useInView } from "react-intersection-observer";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import { FC, FormEventHandler, useEffect, useRef, useState } from "react";
import Button from "../Button";
import Avatar from "../Avatar";
import Input from "../Input";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const { authenticate, user } = useAuth();
  const queryClient = useQueryClient();
  const [bottomRef, isAtBottom] = useInView();
  const inputRef = useRef<HTMLInputElement>(null);
  const [total, setTotal] = useState<number | undefined>();
  const [isCommenting, setIsCommenting] = useState(false);

  const queryKey = `/api/comments/${videoId}`;
  const [newComments, setnewComments] = useState<IComment[]>([]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) =>
        axios
          .get<ICommentPage>(`/api/comments/${videoId}`, {
            params: { page: pageParam },
          })
          .then((res) => res.data),
      {
        staleTime: Infinity,
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
        onSuccess: (data) => setTotal(data.pages[data.pages.length - 1].total),
      }
    );
  const commentsMutation = useMutation(async (text: string) =>
    axios.post<IComment>(queryKey, { text }).then((res) => res.data)
  );

  useEffect(() => {
    if (isAtBottom) fetchNextPage();
  }, [isAtBottom, fetchNextPage]);

  const increaseTotal = () => setTotal((old) => old && old + 1);
  const decreaseTotal = () => setTotal((old) => old && old - 1);
  const toggleIsCommenting = () => setIsCommenting((old) => !old);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    const submit = authenticate(async () => {
      const text = inputRef?.current?.value;
      if (!text) return;

      const newComment = await commentsMutation.mutateAsync(text);
      setnewComments((old) => [newComment, ...old]);

      increaseTotal();
      toggleIsCommenting();
    });

    submit();
  };

  function onDeleted(id: number) {
    // Remove from pages cache
    type T = InfiniteData<ICommentPage>;
    queryClient.setQueryData<T>(queryKey, (data) => ({
      pages:
        data?.pages.map((page) => {
          const items = page.items.filter((c) => c.id !== id);
          return { ...page, items };
        }) ?? [],
      pageParams: data?.pageParams ?? [],
    }));

    decreaseTotal();
  }

  if (isLoading) return <>Loading...</>;

  return (
    <div className="p-4">
      {total && <p className="block">{total} Comments</p>}

      <form className="h-20 relative" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <Avatar src={user?.picture} alt={user?.name} />
          <Input
            required
            ref={inputRef}
            onClick={() => setIsCommenting(true)}
            placeholder="Add a public comment..."
          />
        </div>
        {isCommenting && (
          <div>
            <Button onClick={toggleIsCommenting}>Cancel</Button>
            <Button type="submit">Comment</Button>
          </div>
        )}
      </form>
      {newComments.map((newComment) => (
        <Comment key={newComment.id} data={newComment} onDeleted={onDeleted} />
      ))}
      {data?.pages.map((page) =>
        page.items.map((comment) =>
          newComments.find(
            (newComment) => newComment.id === comment.id
          ) ? null : (
            <Comment key={comment.id} data={comment} onDeleted={onDeleted} />
          )
        )
      )}
      <div ref={bottomRef} />
      {isFetchingNextPage && <div>Loading...</div>}
    </div>
  );
};

export default Comments;
