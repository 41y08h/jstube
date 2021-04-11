import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Typography,
} from "@material-ui/core";
import Head from "next/head";
import fetch from "node-fetch";
import Layout from "../../components/Layout";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles({
  video: {
    width: 500,
  },
});

export default function VideoPage({ error, data }) {
  if (error) return <p>{error}</p>;

  const classes = useStyles();
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
  try {
    const result = await fetch(
      `${process.env.API_URL}/video/${context.params.id}`
    );
    const data = await result.json();

    return { props: { data } };
  } catch (error) {
    return { props: { error: error.message } };
  }
}
