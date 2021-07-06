import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#606060",
    },
    red: {
      main: red[500],
      contrastText: "#fff",
    },
  },
});

export default theme;
