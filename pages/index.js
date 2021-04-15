import Layout from "../components/Layout";
import Head from "next/head";
import VideoCard from "../components/VideoCard";
import { useQuery } from "react-query";

export default function Home() {
  const { isLoading, error, data } = useQuery("/api/videos");

  return (
    <Layout>
      <Head>
        <title>JS Tube </title>
      </Head>
      {isLoading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && data.map((item) => <VideoCard key={item.id} data={item} />)}
    </Layout>
  );
}
