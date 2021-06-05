import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axios from "axios";
import Comment from "./Comment";
import { useInView } from "react-intersection-observer";
import { FC, FormEventHandler, useEffect, useRef } from "react";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import { useAuth } from "../../contexts/Auth";

interface Props {
  videoId: number;
}

const queryKey = "comments";

const Comments: FC<Props> = ({ videoId }) => {
  const queryClient = useQueryClient();
  const { authenticate } = useAuth();
  const commentInputRef = useRef<HTMLInputElement>(null);
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
      }
    );
  const commentsMutation = useMutation(
    async (text: string) => {
      const { data } = await axios.post<IComment>(`/api/comments/${videoId}`, {
        text,
      });
      return data;
    },
    {
      onSuccess(newComment) {
        queryClient.setQueryData<InfiniteData<ICommentPage>>(
          queryKey,
          (data) => {
            const oldPages = data?.pages ?? [];
            const firstPage = oldPages[0];
            const lastPage = oldPages[oldPages.length - 1];

            const items = [newComment, ...firstPage.items];
            const updatedFirstPage: ICommentPage = {
              ...firstPage,
              items,
              count: items.length,
            };

            const updatedPages = [updatedFirstPage, ...oldPages.slice(1)].map(
              (page) => ({ ...page, total: lastPage.total - 1 })
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
      {lastPage && <p className="block">{lastPage.total} Comments</p>}
      <form onSubmit={handleCommentSubmit}>
        <input
          required
          ref={commentInputRef}
          placeholder="Add a public comment..."
        />
        <button type="submit">Comment</button>
      </form>
      {data?.pages.map((page) =>
        page.items.map((comment) => (
          <Comment key={comment.id} data={comment} onDeleted={onDeleted} />
        ))
      )}
      <div ref={bottomRef} />
      {isFetchingNextPage && <div>...</div>}
    </div>
  );
};

export default Comments;
