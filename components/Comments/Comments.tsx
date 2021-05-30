import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import useOnScreen from "../../hooks/useOnScreen";
import IComment, { ICommentPage } from "../../interfaces/Comment";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface Props {
  videoId: number;
}

const Comments: FC<Props> = ({ videoId }) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { isLoading, data, fetchNextPage } = useInfiniteQuery(
    "comments",
    ({ pageParam = 1 }) =>
      axios
        .get<ICommentPage>(`/api/comments/${videoId}`, {
          params: { page: pageParam },
        })
        .then((res) => res.data),
    { staleTime: Infinity, getNextPageParam: (lastPage) => lastPage.page + 1 }
  );

  const latestPage = data?.pages[data.pages.length - 1];
  useOnScreen({
    target: bottomRef,
    onIntersect: fetchNextPage,
    enabled: latestPage?.hasMore,
  });

  if (!data || isLoading) return null;

  return (
    <div>
      <span>{data.pages[0].total} Comments</span>
      {data.pages.map((page) =>
        page.items.map((comment) => <Comment key={comment.id} data={comment} />)
      )}
      <div ref={bottomRef}>Loading...</div>
    </div>
  );
};

export default Comments;
