import { Button } from "@material-ui/core";
import Layout from "../components/Layout";
import ProtectedPage from "../components/ProtectedPage";

export default function Login() {
  return (
    <ProtectedPage>
      <Layout>
        <a href="http://localhost:5000/auth/google">
          <Button>Login with Google</Button>
        </a>
      </Layout>
    </ProtectedPage>
  );
}
