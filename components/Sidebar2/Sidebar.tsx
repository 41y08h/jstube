import React, { FC } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  IconButton,
  Divider,
} from "@material-ui/core";
import items from "./items";
import Link from "next/link";
import Subscriptions from "./Subscriptions";
import { useAuth } from "../../contexts/Auth";
import MenuIcon from "@material-ui/icons/Menu";

interface Props {
  isOpen: boolean;
  toggleIsOpen(): void;
}

const useStyles = makeStyles((theme) => ({
  text: theme.typography.body2,
  divider: { margin: "12px 0" },
  icon: { width: 46, minWidth: "unset" },
  root: { width: 243, overflowX: "hidden" },
  item: { paddingLeft: 24, paddingRight: 24 },
  topbar: { display: "flex", alignItems: "center", padding: "8px 14px" },
}));

const Sidebar: FC<Props> = ({ isOpen, toggleIsOpen }) => {
  const { user: isLoggedIn } = useAuth();
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={toggleIsOpen}
      onClose={toggleIsOpen}
      classes={{ paper: `themed-scrollbar ${classes.root}` }}
    >
      <div className={classes.topbar}>
        <IconButton onClick={toggleIsOpen}>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <a>
            <img className="h-5 pl-4" src="/jstube_logo.svg" alt="JsTube" />
          </a>
        </Link>
      </div>
      <List>
        {items.map((Item, i) => {
          if (Item === "divider")
            return <Divider classes={{ root: classes.divider }} />;
          else {
            const Component = (
              <Link key={i} href={Item.link}>
                <a>
                  <ListItem button classes={{ root: classes.item }}>
                    <ListItemIcon classes={{ root: classes.icon }}>
                      <Item.Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={Item.text}
                      classes={{ primary: classes.text }}
                    />
                  </ListItem>
                </a>
              </Link>
            );

            return Item.isAuthRequired ? isLoggedIn && Component : Component;
          }
        })}
      </List>
      <Subscriptions />
    </SwipeableDrawer>
  );
};

export default Sidebar;
