import axios from "axios";
import { FC, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { IReply, IReplyPage } from "../../interfaces/Comment";
import Reply from "./Reply";
import Loading from "../Loading";

interface Props {
  commentId: number;
  total: number;
  newReplies: IReply[];
  increaseTotal(): any;
  decreaseTotal(): any;
}

const Replies: FC<Props> = ({
  commentId,
  total,
  newReplies,
  increaseTotal,
  decreaseTotal,
}) => {
  const [isViewingReplies, setIsViewingReplies] = useState(false);
  const toggleRepliesView = () => setIsViewingReplies((prev) => !prev);
  const { isLoading, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      `comments/${commentId}/replies`,
      async ({ pageParam = 1 }) =>
        axios
          .get<IReplyPage>(`/api/comments/${commentId}/replies`, {
            params: { page: pageParam },
          })
          .then((res) => res.data),
      {
        staleTime: Infinity,
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
        enabled: !!total,
      }
    );

  function onReplied() {
    increaseTotal();
  }

  return (
    <div>
      {!!total && (
        <button
          className="text-blue-600 text-sm font-medium tracking-wide"
          onClick={() => toggleRepliesView()}
        >
          {isViewingReplies
            ? `◤ Hide ${total} replies`
            : `◢ View ${total} replies`}
        </button>
      )}
      {isViewingReplies &&
        (isLoading ? (
          <Loading align="left" className="my-4" />
        ) : (
          <div className="space-y-5 my-4">
            {newReplies.map((reply) => (
              <Reply
                key={reply.id}
                data={reply}
                onDeleted={() => {}}
                onReplied={onReplied}
              />
            ))}
            {data?.pages.map((page) =>
              page.items.map((reply) =>
                newReplies.find(
                  (newReply) => newReply.id === reply.id
                ) ? null : (
                  <Reply
                    key={reply.id}
                    data={reply}
                    onDeleted={() => {}}
                    onReplied={onReplied}
                  />
                )
              )
            )}

            {isFetchingNextPage ? (
              <div>...</div>
            ) : (
              hasNextPage && (
                <button onClick={() => fetchNextPage()}>
                  Show more replies
                </button>
              )
            )}
          </div>
        ))}
    </div>
  );
};

export default Replies;
