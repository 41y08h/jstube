import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header";

const useStyles = makeStyles({
  wrapper: {
    padding: "40px 20px",
    paddingTop: 90,
  },
});

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Header />
      <div className={classes.wrapper}>{children}</div>
    </>
  );
}
