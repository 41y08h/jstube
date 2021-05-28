import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import VideoLoadingGrid from "../components/VideoLoadingGrid";
import { QVideo } from "../interfaces/Video";

export default function Home() {
  const { isLoading, error, data } =
    useQuery<QVideo[], AxiosError>("/api/videos");

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
      <div className="py-4 px-6 flex flex-wrap justify-evenly">
        {data.map((video) => (
          <VideoCard key={video.id} data={video} />
        ))}
      </div>
    </Layout>
  );
}
