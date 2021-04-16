import Layout from "../components/Layout";
import Head from "next/head";
import VideoCard from "../components/VideoCard";
import { useQuery } from "react-query";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { siteName } from "../config";

const useStyles = makeStyles({
  gridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default function Home() {
  const { isLoading, error, data } = useQuery("/api/videos");
  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>{siteName}</title>
      </Head>
      {isLoading && <p>Loading...</p>}
      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
      {data && (
        <>
          <hr />
          <Grid container spacing={1}>
            {data.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className={classes.gridItem}
              >
                <VideoCard key={item.id} data={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  );
}
