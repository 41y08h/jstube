import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { API_URL } from "../config";
import Layout from "../components/Layout";
import Info from "../components/Video/Info";
import { VideoContext } from "../contexts/video";
import ChannelBar from "../components/Video/ChannelBar";
import VideoPlayer from "../components/Video/VideoPlayer";
import Description from "../components/Video/Description";
import ChannelAvatar from "../components/Video/ChannelAvatar";
import Actions from "../components/Video/Actions";

export default function VideoPage({ data }) {
  const [video, setVideo] = useState(data);

  return (
    <Layout>
      <VideoContext.Provider value={{ video, setVideo }}>
        <Head>
          <title>{video.title} - JS Tube</title>
        </Head>
        <div className="px-4 flex">
          <div className="w-2/3">
            <VideoPlayer />
            <div className="mt-4">
              <h1 className="text-xl font-normal">{video.title}</h1>
              <div className="flex justify-between mt-3 text-secondary text-sm border-b">
                <Info />
                <Actions />
              </div>
              <div className="space-x-4 flex w-full mt-6">
                <div>
                  <ChannelAvatar />
                </div>
                <div className="mt-2 space-y-2">
                  <ChannelBar />
                  <Description />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3 px-8">Suggestions will go here</div>
        </div>
      </VideoContext.Provider>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const videoId = ctx.query.v;
    if (!videoId) throw new Error("Wrong url");

    const { data } = await axios(`${API_URL}/videos/${videoId}`, {
      headers: ctx.req ? { cookie: ctx.req.headers.cookie || "" } : undefined,
    });

    return { props: { data } };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
}
