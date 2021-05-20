import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import QueryVideo from "../interfaces/queries/Video";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import VideoLoadingGrid from "../components/VideoLoadingGrid";

export default function Home() {
  const { isLoading, error, data } =
    useQuery<QueryVideo[], AxiosError>("/api/videos");

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
      <div className="p-2 flex flex-wrap justify-evenly">
        {data.map((video) => (
          <VideoCard key={video.id} data={video} />
        ))}
      </div>
    </Layout>
  );
}
