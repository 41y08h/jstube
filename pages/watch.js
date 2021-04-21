import Head from "next/head";
import Layout from "../components/Layout";
import { API_URL } from "../config";
import axios from "axios";
import numberWithCommas from "../lib/numberWithCommas";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ReplyIcon from "@material-ui/icons/Reply";
import VideoAction from "../components/VideoAction";
import VideoChannelInfo from "../components/VideoChannelInfo";
import VideoChannelAvatar from "../components/VideoChannelAvatar";
import Description from "../components/video/Description";
import dateFormat from "dateformat";

export default function VideoPage({ data }) {
  return (
    <Layout>
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
              <div className="flex space-x-5 items-center justify-center">
                <div className="space-x-5 border-b-2 border-gray-500 pb-4">
                  <VideoAction icon={<ThumbUpIcon />} text="879" />
                  <VideoAction
                    icon={<ThumbUpIcon className="transform rotate-180" />}
                    text="149"
                  />
                </div>
                <VideoAction
                  className="-mt-4"
                  icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
                  text="Share"
                />
              </div>
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
