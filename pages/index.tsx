import Videos from "../components/Videos";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <Layout>
      <Videos url="/api/videos" />
    </Layout>
  );
}
