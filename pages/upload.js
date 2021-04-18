import Layout from "../components/Layout";
import Head from "next/head";
import { useRef } from "react";
import { Button } from "@material-ui/core";
import { siteName } from "../config";
import axios from "axios";
import { useState } from "react";

export default function Upload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const file = fileInputRef.current.files[0];
    formData.append("file", file);

    axios.post("/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) =>
        setUploadProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        ),
    });
  }

  return (
    <Layout>
      <Head>
        <title>Upload | {siteName}</title>
      </Head>
      <h1>Upload a video</h1>
      <p>{uploadProgress} % uploaded</p>
      <form onSubmit={handleSubmit}>
        <input type="file" ref={fileInputRef} />
        <Button type="submit">Upload</Button>
      </form>
    </Layout>
  );
}
