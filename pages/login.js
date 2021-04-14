import { Button } from "@material-ui/core";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";
import { API_URL } from "../config";
import Head from "next/head";

export default function Login() {
  return (
    <ProtectedPage>
      <Layout>
        <Head>
          <title>Login | JS Tube</title>
        </Head>
        <a href={`${API_URL}/auth/google`}>
          <Button>Login with Google</Button>
        </a>
      </Layout>
    </ProtectedPage>
  );
}
