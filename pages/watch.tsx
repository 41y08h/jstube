import axios from "axios";
import Head from "next/head";
import { FC, useState } from "react";
import { API_URL } from "../config";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { VideoContext } from "../contexts/Video";
import ChannelBar from "../components/ChannelBar";
import VideoPlayer from "../components/VideoPlayer";
import VideoActions from "../components/VideoActions";
import VideoDescription from "../components/VideoDescription";
import { QVideoDetailed } from "../interfaces/Video";
import Comments from "../components/Comments";
import Typography from "@material-ui/core/Typography";
import numberWithCommas from "../lib/numberWithCommas";
import dateformat from "dateformat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReplyIcon from "@material-ui/icons/Reply";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "@material-ui/core";

interface Props {
  data: QVideoDetailed;
}

const Watch: FC<Props> = ({ data }) => {
  const [video, setVideo] = useState(data);

  return (
    <Layout>
      <VideoContext.Provider value={{ video, setVideo }}>
        <Head>
          <title>{video.title} - JS Tube</title>
        </Head>
        <div className="flex flex-col">
          <VideoPlayer src={video.src} />
          <Typography variant="body1" component="h1" className="p-3 pt-4">
            {video.title}
          </Typography>
          <div className="flex flex-col px-4 space-y-3">
            <div className="flex items-start space-x-2">
              <Typography color="secondary" variant="body2" component="span">
                {numberWithCommas(data.views)} views
              </Typography>
              <span className="mx-1.5 text-xl text-secondary font-bold leading-none">
                ·
              </span>
              <Typography color="secondary" variant="body2" component="span">
                {dateformat(new Date(data.uploadedAt), "dd-mmm-yyyy")}
              </Typography>
            </div>
            <div className="flex items-center justify-start text-secondary">
              <Button color="secondary" startIcon={<ThumbUpAltIcon />}>
                {data.ratings.count.likes}
              </Button>
              <Button color="secondary" startIcon={<ThumbDownIcon />}>
                {data.ratings.count.dislikes}
              </Button>
              <Button
                color="secondary"
                startIcon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
              >
                Share
              </Button>
            </div>
          </div>
          <ChannelBar channel={data.channel} />
          <div className="pl-16">
            <VideoDescription text={video.description} />
          </div>
          <hr className="h-2 my-4" />
          <Comments videoId={video.id} />
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
