import Layout from "../components/Layout";
import axios from "axios";
import Head from "next/head";
import { useRef } from "react";
import { siteName } from "../config";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Upload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const router = useRouter();

  const videoUpload = useMutation(
    (formData) =>
      axios.post("/api/videos", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) =>
          setUploadProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          ),
      }),
    {
      onSuccess: () => router.push("/"),
      onError: (err) => toast.error(err.response.data.message),
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", titleInputRef.current.value);
    formData.append("description", descriptionInputRef.current.value);
    videoUpload.mutate(formData);
  }

  return (
    <Layout>
      <Head>
        <title>Upload | {siteName}</title>
      </Head>
      <h1 className="text-2xl">Upload a video</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex w-full my-4 sm:space-x-4 sm:flex-row flex-col-reverse">
          <div className="w-full sm:mt-0 mt-4">
            <label className="h-64 flex flex-col items-center justify-center bg-white text-blue rounded-lg shadow-sm tracking-wide border border-blue cursor-pointer relative text-gray-400">
              <span className="mt-2 text-base leading-normal ">
                <i className="fa fa-file mr-2" />
                {(file && file.name) || "Select a video file"}
              </span>
              <p className="absolute bottom-0 left-0 w-full text-xs p-4 text-gray-400">
                Please only select mp4 files not exceeding 50MB in size
              </p>
              <input
                required
                type="file"
                accept=".mp4"
                className="hidden"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </label>
            {Boolean(uploadProgress) && (
              <div className="relative pt-1">
                <div className="overflow-hidden h-5 mt-2 text-xs flex rounded bg-pink-200">
                  <div
                    style={{ width: `${uploadProgress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="flex flex-col space-y-4">
              <input
                ref={titleInputRef}
                required
                className="w-full p-4 rounded-md shadow-sm"
                placeholder="Title"
              />
              <textarea
                ref={descriptionInputRef}
                required
                className="w-full p-4 rounded-md resize-y h-56 shadow-sm"
                placeholder="Description"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 mt-2 sm:w-auto w-full bg-blue-500 rounded-md text-white text-base cursor-pointer"
            disabled={videoUpload.isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </Layout>
  );
}
