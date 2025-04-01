import React from "react";
import Slide from "@material-ui/core/Slide";
import Input from "@material-ui/core/Input";
import AppBar from "@material-ui/core/AppBar";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { TransitionProps } from "@material-ui/core/transitions";

const useStyles = makeStyles({
  appBar: { position: "relative", backgroundColor: "white" },
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  isOpen: boolean;
  close(): any;
}

const SearchDialog: React.FC<Props> = ({ isOpen, close }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} elevation={1} color="inherit">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <ArrowBackIcon />
            </IconButton>
            <Input
              autoFocus
              type="search"
              disableUnderline
              placeholder="Search JsTube"
              className="w-full border-b-0"
              inputProps={{ "aria-label": "description" }}
            />
            <IconButton
              edge="end"
              color="inherit"
              onClick={close}
              aria-label="closearchse"
            >
              <SearchIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Dialog>
    </div>
  );
};

export default SearchDialog;
