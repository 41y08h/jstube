import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteData, useInfiniteQuery, useQuery } from "react-query";
import useOnScreen from "../../hooks/useOnScreen";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "comments",
      ({ pageParam = 1 }) =>
        axios
          .get<ICommentPage>(`/api/comments/${videoId}`, {
            params: { page: pageParam },
          })
          .then((res) => res.data),
      {
        staleTime: Infinity,
        getNextPageParam: (latestPage) =>
          latestPage.hasMore ? latestPage.page + 1 : undefined,
      }
    );
  const [bottomRef, scrolledToBottom] = useInView();
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (scrolledToBottom) fetchNextPage();
  }, [scrolledToBottom, fetchNextPage]);

  // Keep comments in sync with pages items
  useEffect(() => {
    // Terminate early if no page has been loaded
    if (!data) return;

    // Exactract comment items from each page and
    // push it to comments array
    const { pages } = data;
    pages.map((page) => setComments((prev) => [...prev, ...page.items]));
  }, [data]);

  if (isLoading) return <>Loading...</>;

  const { pages } = data as InfiniteData<ICommentPage>;
  const latestPage = pages[pages.length - 1];

  return (
    <div>
      <CommentInput videoId={videoId} setComments={setComments} />
      <span>{latestPage.total} Comments</span>
      {comments.map((comment) => (
        <Comment data={comment} />
      ))}
      <div ref={bottomRef} />
      {isFetchingNextPage && <p className="text-5xl">...</p>}
    </div>
  );
};

export default Comments;
