import Layout from "../components/Layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/data").then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <Layout>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && data.map((item) => <VideoCard data={item} />)}
    </Layout>
  );
}
