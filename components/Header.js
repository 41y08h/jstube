import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import Link from "next/link";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/auth";
import { API_URL } from "../config";

const useStyles = makeStyles({
  root: {
    boxShadow: "none",
    backgroundColor: "white",
    color: "#000",
    borderBottom: "1px solid #eeeeee",
    position: "fixed",
    top: 0,
    left: 0,
  },
  bar: {
    justifyContent: "space-between",
  },
  small: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 92,
  },
});

export default function Header() {
  const classes = useStyles();
  const { user, isLoading } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  function renderContent() {
    if (isLoading) return null;
    if (user)
      return (
        <div>
          <Link href="/upload">
            <IconButton>
              <VideoCallIcon />
            </IconButton>
          </Link>
          <IconButton
            ref={anchorRef}
            aria-label="account of current user"
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            color="inherit"
            onClick={handleToggle}
          >
            <Avatar
              className={classes.small}
              alt={user.name}
              src={user.picture}
            />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                      className={classes.menuBox}
                    >
                      <MenuItem>
                        <a href="/api/auth/logout">Logout</a>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      );
    return (
      <Link href="/login">
        <Button color="inherit">Login</Button>
      </Link>
    );
  }

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.bar}>
        <Link href="/">
          <img
            className={classes.logo}
            src="/jstube_logo.svg"
            alt="jstube logo"
          />
        </Link>
        {renderContent()}
      </Toolbar>
    </AppBar>
  );
}
