import Head from "next/head";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import axios from "axios";
import numberWithCommas from "../lib/numberWithCommas";
import VideoChannelInfo from "../components/VideoChannelInfo";
import VideoChannelAvatar from "../components/VideoChannelAvatar";
import Description from "../components/Video/Description";
import dateFormat from "dateformat";
import Actions from "../components/Video/Actions";
import { VideoContext } from "../contexts/video";
import { useState } from "react";

export default function VideoPage({ data }) {
  const [video, setVideo] = useState(data);

  return (
    <Layout>
      <VideoContext.Provider value={{ video, setVideo }}>
        <Head>
          <title>{data.title} - JS Tube</title>
        </Head>
        <div className="px-4 flex">
          <div className="w-2/3">
            <video
              style={{ width: "853px", height: "480px" }}
              autoPlay
              controls
              src={data.source}
            />
            <div className="mt-4">
              <h1 className="text-xl font-normal">{data.title}</h1>
              <div
                style={{
                  borderBottom: "1px solid #dbdbdb",
                }}
                className="flex justify-between mt-3 text-secondary text-sm"
              >
                <div>
                  <span>{numberWithCommas(data.views)} views</span>
                  <span className="mx-1 font-bold text-md">·</span>
                  <span>
                    {dateFormat(new Date(data.createdAt), "mmm d, yyyy")}
                  </span>
                </div>
                <Actions />
              </div>
              <div className="space-x-4 flex w-full mt-6">
                <div>
                  <VideoChannelAvatar
                    picture={data._user.picture}
                    name={data._user.name}
                  />
                </div>
                <div className="mt-2 space-y-2">
                  <VideoChannelInfo data={data._user} />
                  <div className="pr-60">
                    <Description text={data.description} />
                  </div>
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

export async function getServerSideProps(context) {
  try {
    if (!context.query.v) throw new Error("Wrong url");
    const { data } = await axios(`${API_URL}/videos/${context.query.v}`);
    return { props: { data } };
  } catch (error) {
    return { redirect: { destination: "/", permanent: false } };
  }
}
