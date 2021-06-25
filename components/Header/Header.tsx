import Link from "next/link";
import React, { FC } from "react";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SignInButton from "../SignInButton";

const useStyles = makeStyles((theme) => ({
  root: { boxShadow: "none", backgroundColor: "white" },
  innerRoot: { justifyContent: "space-between" },
  offset: theme.mixins.toolbar,
}));

const Header: FC<{ toggleSidebar: Function }> = ({ toggleSidebar }) => {
  const classes = useStyles();

  return (
    <>
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
          <SignInButton />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
