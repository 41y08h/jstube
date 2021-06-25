import { FC } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import List from "@material-ui/core/List";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles((theme) => ({
  text: theme.typography.body2,
  icon: { width: 46, minWidth: "unset" },
  item: { paddingLeft: 24, paddingRight: 24 },
}));

const Subscriptions: FC = () => {
  const { data } = useQuery("/api/subscribers/subscriptions");
  const classes = useStyles();

  return (
    <>
      <Typography component="span" variant="button" className="px-7">
        Subscriptions
      </Typography>
      <List component="nav">
        {data?.map((subscription) => (
          <Link
            key={subscription.channel.id}
            href={`/channel/${subscription.channel.id}`}
          >
            <a>
              <ListItem button className={classes.item}>
                <ListItemIcon className={classes.icon}>
                  <Avatar
                    style={{ height: "28px", width: "28px" }}
                    src={subscription.channel.picture}
                    alt={subscription.channel.name}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={subscription.channel.name}
                  classes={{ primary: classes.text }}
                />
              </ListItem>
            </a>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Subscriptions;
