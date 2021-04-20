import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import Layout from "../../components/Layout";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { API_URL } from "../../config";
import axios from "axios";
import numberWithCommas from "../../lib/numberWithCommas";
import { ReactComponent as LikeIcon } from "../../assets/like.svg";

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
        <title>{data.title} | JS Tube</title>
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
            <div className="flex justify-between mt-2 text-secondary text-sm">
              <div>
                <span>{numberWithCommas(data.views)} views</span>
                <span className="mx-1 font-bold text-md">·</span>
                <span>{new Date(data.createdAt).toDateString()}</span>
              </div>
              <div className="space-x-8">
                <span>
                  <LikeIcon />
                  <span className="uppercase font-bold text-base">879</span>
                </span>
                <span>
                  <i className="fa fa-thumbs-down text-2xl mr-2" />
                  <span className="uppercase font-bold text-base">149</span>
                </span>
              </div>
            </div>
          </div>
          <hr />
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
