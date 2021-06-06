import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axios from "axios";
import Comment from "./Comment";
import { useInView } from "react-intersection-observer";
import { FC, FormEventHandler, useEffect, useRef, useState } from "react";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import { useAuth } from "../../contexts/Auth";

interface Props {
  videoId: number;
}

const queryKey = "comments";

const Comments: FC<Props> = ({ videoId }) => {
  const { authenticate } = useAuth();
  const queryClient = useQueryClient();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [total, setTotal] = useState<number | undefined>();
  const [addedComments, setAddedComments] = useState<IComment[]>([]);
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
  const commentsMutation = useMutation(
    async (text: string) =>
      axios
        .post<IComment>(`/api/comments/${videoId}`, { text })
        .then((res) => res.data),

    {
      onSuccess: (newComment) =>
        setAddedComments((prev) => [newComment, ...prev]),
    }
  );
  const [bottomRef, isScrolledToBottom] = useInView();

  useEffect(() => {
    if (isScrolledToBottom) fetchNextPage();
  }, [isScrolledToBottom, fetchNextPage]);

  const onDeleted = (deletedCommentId: number) => {
    const pages: ICommentPage[] =
      data?.pages.map((page) => {
        const items = page.items.filter(
          (comment) => comment.id !== deletedCommentId
        );
        return {
          ...page,
          total: data?.pages[data?.pages.length - 1].total - 1,
          items: items,
          count: items.length,
        };
      }) ?? [];

    queryClient.setQueryData<InfiniteData<ICommentPage>>(queryKey, (data) => ({
      pages,
      pageParams: data?.pageParams ?? [],
    }));
  };

  const handleCommentSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    authenticate(() => {
      const text = commentInputRef?.current?.value;
      if (text) commentsMutation.mutate(text);
    })();
  };

  if (isLoading) return <>Loading...</>;

  const lastPage = data?.pages[data.pages.length - 1];

  return (
    <div>
      {total && <p className="block">{total} Comments</p>}
      <form onSubmit={handleCommentSubmit}>
        <input
          required
          ref={commentInputRef}
          placeholder="Add a public comment..."
        />
        <button type="submit">Comment</button>
      </form>
      {addedComments.map((addedComment) => (
        <Comment
          key={addedComment.id}
          data={addedComment}
          onDeleted={onDeleted}
        />
      ))}
      {data?.pages.map((page) =>
        page.items.map((comment) =>
          addedComments.find(
            (addedComment) => addedComment.id === comment.id
          ) ? null : (
            <Comment key={comment.id} data={comment} onDeleted={onDeleted} />
          )
        )
      )}
      <div ref={bottomRef} />
      {isFetchingNextPage && <div>...</div>}
    </div>
  );
};

export default Comments;
