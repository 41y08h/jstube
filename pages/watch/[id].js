import Head from "next/head";
import Layout from "../../components/Layout";
import { API_URL } from "../../config";
import axios from "axios";
import numberWithCommas from "../../lib/numberWithCommas";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ReplyIcon from "@material-ui/icons/Reply";
import VideoAction from "../../components/VideoAction";
import VideoChannelInfo from "../../components/VideoChannelInfo";

export default function VideoPage({ error, data }) {
  if (error)
    return (
      <Layout>
        <Head>
          <title>{error.response.data.message}</title>
        </Head>
        <p>{error.response.data.message}</p>
      </Layout>
    );

  return (
    <Layout>
      <Head>
        <title>{data.title} - JS Tube</title>
      </Head>
      <div className="px-4 flex">
        <div className="flex-2">
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
                <span>{new Date(data.createdAt).toDateString()}</span>
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
            <VideoChannelInfo data={data._user} />
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  console.log(`${API_URL}/videos/${context.params.id}`);
  try {
    const { data } = await axios(`${API_URL}/videos/${context.params.id}`);
    return { props: { data } };
  } catch (error) {
    if (error.response.status === 404) return { notFound: true };
    return { props: { error: error } };
  }
}
