import axios from "axios";
import Head from "next/head";
import { FC, useState } from "react";
import { API_URL } from "../config";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import ChannelBar from "../components/ChannelBar";
import VideoPlayer from "../components/VideoPlayer";
import VideoDescription from "../components/VideoDescription";
import { QVideoDetailed } from "../interfaces/Video";
import Comments from "../components/Comments";
import Typography from "@material-ui/core/Typography";
import numberWithCommas from "../lib/numberWithCommas";
import dateformat from "dateformat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ReplyIcon from "@material-ui/icons/Reply";
import { Button } from "@material-ui/core";

interface Props {
  data: QVideoDetailed;
}

const Watch: FC<Props> = ({ data }) => {
  return (
    <Layout>
      <Head>
        <title>{data.title} - JS Tube</title>
      </Head>
      <div className="flex flex-col">
        <VideoPlayer src={data.src} />
        <Typography
          variant="subtitle1"
          component="h1"
          className="pb-4 pt-5 px-5"
        >
          {data.title}
        </Typography>
        <div className="flex flex-col px-5 space-y-3">
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
        <div className="px-5">
          <VideoDescription text={data.description} />
        </div>
        <hr className="h-2 my-4" />
        <Comments videoId={data.id} />
      </div>
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
