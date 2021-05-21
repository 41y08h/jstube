import axios from "axios";
import Head from "next/head";
import { FC, useState } from "react";
import { API_URL } from "../config";
import Layout from "../components/Layout";
import VideoContext from "../contexts/video";
import ChannelBar from "../components/ChannelBar";
import VideoPlayer from "../components/VideoPlayer";
import VideoDescription from "../components/VideoDescription";
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
        <div className="p-6 px-8 flex">
          <div className="w-2/3">
            <VideoPlayer src={video.src} />
            <h1 className="mt-4 text-xl font-normal">{video.title}</h1>
            <div className="flex justify-between mt-3 text-secondary text-sm border-b">
              <VideoDetail
                exactDate
                views={video.views}
                uploadedAt={video.updatedAt}
              />
              <VideoActions data={video} />
            </div>
            <ChannelBar channel={video.channel} />
            <div className="pl-16">
              <VideoDescription text={video.description} />
            </div>
          </div>
          <div className="w-1/3">Suggestions will go here</div>
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
