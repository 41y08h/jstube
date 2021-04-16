import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles({
  wrapper: {
    paddingTop: 40,
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.wrapper}>
        <Container>{children}</Container>
      </div>
    </>
  );
}
