import Link from "next/link";
import React, { FC } from "react";
import { AppBar, Toolbar, IconButton, makeStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SignInButton from "../SignInButton";
import { useAuth } from "../../contexts/Auth";
import Avatar from "@material-ui/core/Avatar";
import Profile from "./Profile";

const useStyles = makeStyles((theme) => ({
  root: { boxShadow: "none", backgroundColor: "white", borderRight: "none" },
  innerRoot: { justifyContent: "space-between" },
  offset: theme.mixins.toolbar,
}));

const Header: FC<{ toggleSidebar: Function }> = ({ toggleSidebar }) => {
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const classes = useStyles();

  return (
    <>
      <AppBar
        classes={{ root: classes.root }}
        position="fixed"
        variant="outlined"
      >
        <Toolbar className={classes.innerRoot + " text-primary"}>
          <div className="flex items-center space-x-3">
            <IconButton
              onClick={() => toggleSidebar()}
              edge="start"
              color="default"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Link href="/">
              <a>
                <img className="h-5" src="/jstube_logo.svg" alt="JsTube" />
              </a>
            </Link>
          </div>
          {isAuthLoading ? null : isAuthenticated ? (
            <Profile />
          ) : (
            <SignInButton />
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default Header;
