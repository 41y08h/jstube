import axios from "axios";
import { FC } from "react";
import { useInfiniteQuery } from "react-query";
import { ICommentPage } from "../../interfaces/Comment";
import Reply from "./Reply";

interface Props {
  commentId: number;
}

const Replies: FC<Props> = ({ commentId }) => {
  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      `comments/${commentId}/replies`,
      async ({ pageParam = 1 }) =>
        axios
          .get<ICommentPage>(`/api/comments/${commentId}/replies`, {
            params: { page: pageParam },
          })
          .then((res) => res.data),
      {
        staleTime: Infinity,
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    );

  if (isLoading) return <>Loading...</>;

  return (
    <div>
      <div className="pl-20">
        {data?.pages.map((page) =>
          page.items.map((reply) => <Reply data={reply} />)
        )}
        {isFetchingNextPage ? (
          <div>...</div>
        ) : (
          hasNextPage && (
            <button onClick={() => fetchNextPage()}>Show more replies</button>
          )
        )}
      </div>
    </div>
  );
};

export default Replies;