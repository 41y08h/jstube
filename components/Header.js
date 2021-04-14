import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useAuth } from "../contexts/auth";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "white",
    color: "#000",
  },
  bar: {
    justifyContent: "space-between",
  },
});

export default function Header({ hello }) {
  const classes = useStyles();
  const { user, error, loading } = useAuth();

  function renderContent() {
    if (user)
      return (
        <>
          <Typography>{user.name}</Typography>
          <a href="http://localhost:5000/auth/logout">Logout</a>
        </>
      );
    return (
      <Link href="/login">
        <Button color="inherit">Login</Button>
      </Link>
    );
  }

  return (
    <AppBar className={classes.root} position="fixed">
      <Container>
        <Toolbar className={classes.bar}>
          <Link href="/">
            <Typography component="a" variant="h6">
              JS Tube {hello}
            </Typography>
          </Link>
          {!loading && renderContent()}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
