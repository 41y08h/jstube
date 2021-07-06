import axios from "axios";
import Link from "next/link";
import { FC, useState } from "react";
import { Button } from "@material-ui/core";
import { useAuth } from "../../contexts/Auth";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";
import { IChannel } from "../../interfaces/User";
import formatNumber from "../../lib/formatNumber";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ISubscribers from "../../interfaces/Subscribers";
import { useMutation, useQueryClient } from "react-query";

const useStyles = makeStyles((theme) => ({
  button: {
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  buttonUnsubscribed: {
    backgroundColor: red[500],
    color: theme.palette.getContrastText(red[500]),
    "&:hover": { backgroundColor: red[700] },
  },
  buttonSubscribed: {
    backgroundColor: grey[200],
    color: grey[600],
  },
}));

interface Props {
  channel: IChannel;
}

const ChannelBar: FC<Props> = ({ channel }) => {
  const [subscribers, setSubscribers] = useState(channel.subscribers);

  const classes = useStyles();
  const { authenticate } = useAuth();
  const queryClient = useQueryClient();
  const subscribersMutation = useMutation(
    (unsubscribe: boolean) => {
      const url = `/api/subscribers/${channel.id}`;
      return unsubscribe
        ? axios.delete<ISubscribers>(url).then((res) => res.data)
        : axios.post<ISubscribers>(url).then((res) => res.data);
    },
    {
      onSuccess(data) {
        setSubscribers(data);
        queryClient.invalidateQueries("/api/subscribers/subscriptions");
      },
    }
  );

  const subscribe = authenticate(() =>
    subscribersMutation.mutate(subscribers.isUserSubscribed)
  );

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href={`/channel/${channel.id}`}>
          <a>
            <Avatar src={channel.picture} alt={channel.name} />
          </a>
        </Link>
        <div className="flex flex-col">
          <Link href={`/channel/${channel.id}`}>
            <Typography component="a" variant="subtitle2">
              {channel.name}
            </Typography>
          </Link>
          <Typography variant="caption" color="secondary">
            {formatNumber(subscribers.count)} subscriber
            {subscribers.count === 1 ? "" : "s"}
          </Typography>
        </div>
      </div>
      <Button
        disableElevation
        variant="contained"
        className={`${classes.button} ${
          subscribers.isUserSubscribed
            ? classes.buttonSubscribed
            : classes.buttonUnsubscribed
        }`}
        onClick={subscribe}
        disabled={subscribersMutation.isLoading}
      >
        {subscribers.isUserSubscribed ? "Subscribed" : "Subscribe"}
      </Button>
    </div>
  );
};

export default ChannelBar;
