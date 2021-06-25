import { FC } from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import List from "@material-ui/core/List";
import Fade from "@material-ui/core/Fade";
import SignInButton from "../SignInButton";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../../contexts/Auth";
import { makeStyles } from "@material-ui/core";
import AlienImage from "../../images/alien.svg";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  text: theme.typography.body2,
  icon: { width: 46, minWidth: "unset" },
  item: { paddingLeft: 24, paddingRight: 24 },
}));

const Subscriptions: FC = () => {
  const { user: isLoggedIn, isLoading: isAuthLoading } = useAuth();
  const { data, isLoading } = useQuery("/api/subscribers/subscriptions", {
    enabled: Boolean(isLoggedIn),
  });
  const classes = useStyles();

  if (isLoading || isAuthLoading)
    return (
      <Fade
        in={isLoading}
        style={{ transitionDelay: isLoading ? "800ms" : "0ms" }}
        unmountOnExit
      >
        <CircularProgress className="mx-auto my-7" />
      </Fade>
    );

  if (isLoggedIn)
    return (
      <>
        <Typography component="span" variant="button" className="px-7">
          Subscriptions
        </Typography>

        {data && (
          <List component="nav">
            {data.map((subscription) => (
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
        )}
      </>
    );

  return (
    <div className="px-7 space-y-3">
      <div className="flex space-x-4 items-center">
        <AlienImage className="w-14" />
        <SignInButton />
      </div>
      <Typography
        component="p"
        variant="body2"
        className="max-w-full text-secondary"
      >
        Sign in to like videos, comment, and subscribe.
      </Typography>
    </div>
  );
};

export default Subscriptions;
