import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Button } from "@material-ui/core";

const SignInButton = () => (
  <Button
    variant="outlined"
    color="primary"
    startIcon={<AccountCircleIcon />}
    href="/api/auth/google"
  >
    Sign in
  </Button>
);

export default SignInButton;
