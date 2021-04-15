import Layout from "../components/Layout";
import Head from "next/head";
import { useRef } from "react";
import { Button } from "@material-ui/core";

export default function Upload() {
  const fileInputRef = useRef();

  function handleSubmit() {
    const formData = new FormData();
  }

  return (
    <Layout>
      <Head>
        <title>Upload | JS Tube</title>
      </Head>
      <h1>Upload a video</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".mp4" ref={fileInputRef} />
        <Button type="submit">Upload</Button>
      </form>
    </Layout>
  );
}
