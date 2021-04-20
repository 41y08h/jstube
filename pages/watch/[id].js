import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import Layout from "../../components/Layout";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { API_URL } from "../../config";
import axios from "axios";

const useStyles = makeStyles({
  video: {
    width: 500,
  },
});

export default function VideoPage({ error, data }) {
  const classes = useStyles();

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
      <video className={classes.video} autoPlay controls src={data.source} />
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography component="h1" variant="h4">
            {data.title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{data.description}</Typography>
        </AccordionDetails>
      </Accordion>
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
