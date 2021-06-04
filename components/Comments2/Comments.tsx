import axios from "axios";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { ICommentPage } from "../../interfaces/Comment";
import Comment from "./Comment";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const queryClient = useQueryClient();
  const { data, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      "comments",
      async ({ pageParam = 1 }) => {
        const { data } = await axios.get<ICommentPage>(
          `/api/comments/${videoId}`,
          { params: { page: pageParam } }
        );
        return data;
      },
      {
        staleTime: Infinity,
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    );
  const [bottomRef, isScrolledToBottom] = useInView();

  useEffect(() => {
    if (isScrolledToBottom) fetchNextPage();
  }, [isScrolledToBottom, fetchNextPage]);

  const onDeleted = (deletedCommentId: number) => {
    queryClient.invalidateQueries("comments");
  };

  if (isLoading) return <>Loading...</>;

  const lastPage = data?.pages[data.pages.length - 1];

  return (
    <div>
      {lastPage && <span>{lastPage.total} Comments</span>}
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
