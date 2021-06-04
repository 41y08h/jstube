import axios from "axios";
import { FC, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "react-query";
import { ICommentPage } from "../../interfaces/Comment";
import Comment from "./Comment";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const comments = useInfiniteQuery(
    "comments",
    async ({ pageParam = 1 }) => {
      const { data } = await axios.get<ICommentPage>(
        `/api/comments/${videoId}`,
        { params: { page: pageParam } }
      );
      return data;
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
    }
  );
  const [bottomRef, isScrolledToBottom] = useInView();

  useEffect(() => {
    // Terminate early if already fetching
    if (comments.isFetchingNextPage) return;

    if (isScrolledToBottom) comments.fetchNextPage();
  }, [isScrolledToBottom, comments.isFetchingNextPage, comments.fetchNextPage]);

  if (comments.isLoading) return <>Loading...</>;
  return (
    <div>
      {comments.data?.pages.map((page) =>
        page.items.map((comment) => <Comment data={comment} />)
      )}
      <div ref={bottomRef} />
      {comments.isFetchingNextPage && <div>...</div>}
    </div>
  );
};

export default Comments;
