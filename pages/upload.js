import Layout from "../components/Layout";
import Head from "next/head";
import { useRef } from "react";
import { Button } from "@material-ui/core";
import { siteName } from "../config";
import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";

export default function Upload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();
  const videoUpload = useMutation((formData) =>
    axios.post("/api/videos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (progressEvent) =>
        setUploadProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        ),
    })
  );

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    const file = fileInputRef.current.files[0];
    formData.append("file", file);
    formData.append("title", "title is here");

    videoUpload.mutate(formData);
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
