import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import VideoLoadingGrid from "../components/VideoLoadingGrid";
import { QVideo } from "../interfaces/Video";
import VideosList from "../components/VideosList";

export default function Home() {
  const { isLoading, error, data } = useQuery<QVideo[], AxiosError>(
    "/api/videos",
    {
      staleTime: 5000,
    }
  );

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

  return <Layout>{data && <VideosList videos={data} />}</Layout>;
}
