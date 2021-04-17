import Layout from "../components/Layout";
import Head from "next/head";
import VideoCard from "../components/VideoCard";
import { useQuery } from "react-query";
import { siteName } from "../config";

export default function Home() {
  const { isLoading, error, data } = useQuery("/api/videos");

  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
      </Head>
      {isLoading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <div className="flex gap-4 mx-auto w-max">
          {data.map((item) => (
            <div>
              <VideoCard key={item.id} data={item} />
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}
