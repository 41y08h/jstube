import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { useInfiniteQuery, useQuery } from "react-query";
import axios, { AxiosError } from "axios";
import VideoLoadingGrid from "../components/VideoLoadingGrid";
import { QVideos } from "../interfaces/Video";
import VideosList from "../components/VideosList";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const { data, isLoading, error, isError, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<QVideos, AxiosError>(
      "/api/videos",
      async ({ pageParam = 1 }) =>
        axios(`/api/videos`, {
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

  if (isLoading)
    return (
      <Layout>
        <VideoLoadingGrid />
      </Layout>
    );

  if (error)
    return (
      <Layout>
        <p>{error.message}</p>
      </Layout>
    );

  return (
    <Layout>
      {data && data.pages.map((page) => <VideosList videos={page.items} />)}
      <div className="h-2" ref={bottomRef} />
    </Layout>
  );
}
