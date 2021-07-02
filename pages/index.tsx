import Videos from "../components/Videos";
import Layout from "../components/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home - JsTube</title>
      </Head>
      <Videos url="/api/videos" />
    </Layout>
  );
}
