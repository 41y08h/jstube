import Layout from "../Layout";
import VideoCard from "../VideoCard";
import axios, { AxiosError } from "axios";
import React, { FC, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { QVideos } from "../../interfaces/Video";
import VideoLoadingGrid from "../VideoLoadingGrid";
import { useInView } from "react-intersection-observer";

const Videos: FC<{ url: string }> = ({ url }) => {
  const { data, isLoading, error, isError, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<QVideos, AxiosError>(
      url,
      async ({ pageParam = 1 }) =>
        axios(url, {
          params: { page: pageParam },
        }).then((res) => res.data),
      {
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.page + 1 : undefined,
      }
    );
  const [bottomRef, isAtBottom] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (isAtBottom) fetchNextPage();
  }, [isAtBottom, fetchNextPage]);

  if (isLoading) return <VideoLoadingGrid />;

  if (isError) return <p>{error?.message}</p>;

  return data ? (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 2xl:grid-cols-6 2xl:gap-x-5 gap-3 gap-y-0 sm:p-4 items-start">
        {data.pages.map((page) =>
          page.items.map((video) => <VideoCard data={video} />)
        )}
      </div>

      <div className="h-2" ref={bottomRef} />
      {isFetchingNextPage && <p>Loading...</p>}
    </>
  ) : null;
};

export default Videos;
