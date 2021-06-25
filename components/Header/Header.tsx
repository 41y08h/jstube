import Link from "next/link";
import React, { FC } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles({
  root: { boxShadow: "none", backgroundColor: "white" },
  innerRoot: { justifyContent: "space-between" },
});

const Header: FC<{ toggleSidebar: Function }> = ({ toggleSidebar }) => {
  const classes = useStyles();

  return (
    <AppBar
      classes={{ root: classes.root }}
      position="fixed"
      variant="outlined"
    >
      <Toolbar classes={{ root: classes.innerRoot }}>
        <div className="flex items-center space-x-3">
          <IconButton
            onClick={() => toggleSidebar()}
            edge="start"
            color="default"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img className="h-5" src="/jstube_logo.svg" alt="JsTube" />
        </div>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AccountCircleIcon />}
          href="/api/auth/google"
        >
          Sign in
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
