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
import MenuIcon from "@material-ui/icons/Menu";

interface Props {
  isOpen: boolean;
  toggleIsOpen(): void;
}

const useStyles = makeStyles((theme) => ({
  text: theme.typography.body2,
  icon: { width: 46, minWidth: "unset" },
  list: { width: 243 },
  divider: { margin: "16px 0" },
  item: { paddingLeft: 24, paddingRight: 24 },
  topbar: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
  },
}));

const Sidebar: FC<Props> = ({ isOpen, toggleIsOpen }) => {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onOpen={toggleIsOpen}
      onClose={toggleIsOpen}
    >
      <div className={classes.topbar}>
        <IconButton onClick={toggleIsOpen}>
          <MenuIcon />
        </IconButton>
        <img className="h-5 pl-4" src="/jstube_logo.svg" alt="JsTube" />
      </div>
      <List component="div" classes={{ root: classes.list }}>
        {items.map((Item) => {
          if (Item === "divider")
            return <Divider classes={{ root: classes.divider }} />;
          else
            return (
              <ListItem button classes={{ root: classes.item }}>
                <ListItemIcon classes={{ root: classes.icon }}>
                  <Item.Icon />
                </ListItemIcon>
                <ListItemText
                  primary={Item.text}
                  classes={{ primary: classes.text }}
                />
              </ListItem>
            );
        })}
      </List>
    </SwipeableDrawer>
  );
};

export default Sidebar;
