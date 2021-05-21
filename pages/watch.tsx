import axios from "axios";
import Head from "next/head";
import { FC, useState } from "react";
import { API_URL } from "../config";
import Layout from "../components/Layout";
import VideoContext from "../contexts/video";
import ChannelBar from "../components/ChannelBar";
import VideoPlayer from "../components/VideoPlayer";
import VideoDescription from "../components/VideoDescription";
import ChannelAvatar from "../components/ChannelAvatar";
import QueryVideo from "../interfaces/queries/Video";
import { GetServerSideProps } from "next";
import VideoDetail from "../components/VideoCard/VideoDetail";
import VideoActions from "../components/VideoActions";

interface Props {
  data: QueryVideo;
}

const Watch: FC<Props> = ({ data }) => {
  const [video, setVideo] = useState(data);

  return (
    <Layout>
      <VideoContext.Provider value={{ video, setVideo }}>
        <Head>
          <title>{video.title} - JS Tube</title>
        </Head>
        <div className="p-6 px-8">
          <VideoPlayer src={video.src} />
          <div className="mt-4">
            <h1 className="text-xl font-normal">{video.title}</h1>
            <div className="flex justify-between mt-3 text-secondary text-sm border-b">
              <VideoDetail
                exactDate
                views={video.views}
                uploadedAt={video.updatedAt}
              />
              <VideoActions />
            </div>
            <div className="space-x-4 flex w-full mt-6">
              <div>
                <ChannelAvatar
                  picture={video.channel.picture}
                  name={video.channel.name}
                />
              </div>
              <div className="mt-2 space-y-2">
                <ChannelBar />
                <VideoDescription text={video.description} />
              </div>
            </div>
          </div>
        </div>
      </VideoContext.Provider>
    </Layout>
  );
};

export default Watch;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const videoId = context.query.v;
    if (!Boolean(videoId)) throw new Error();

    const headers = { cookie: context.req.headers.cookie || "" };
    const config = { headers: context.req ? headers : undefined };
    const { data } = await axios(`${API_URL}/videos/${videoId}`, config);

    return { props: { data } };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
};
