import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles({
  children: {
    marginTop: 50,
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Container className={classes.children}>{children}</Container>
    </>
  );
}
