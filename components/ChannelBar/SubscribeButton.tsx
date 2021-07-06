import { Button } from "@material-ui/core";
import axios from "axios";
import { Dispatch, FC, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../contexts/Auth";
import ISubscribers from "../../interfaces/Subscribers";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import grey from "@material-ui/core/colors/grey";

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
  channelId: number;
  subscribers: ISubscribers;
  setSubscribers: Dispatch<SetStateAction<ISubscribers>>;
}

const SubscribeButton: FC<Props> = ({
  channelId,
  subscribers,
  setSubscribers,
}) => {
  const classes = useStyles();
  const queryClient = useQueryClient();
  const { authenticate } = useAuth();
  const subscribersMutation = useMutation(
    (unsubscribe: boolean) => {
      const url = `/api/subscribers/${channelId}`;
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

  const onSubscribe = authenticate(() =>
    subscribersMutation.mutate(subscribers.isUserSubscribed)
  );

  return (
    <Button
      variant="contained"
      disableElevation
      className={`${classes.button} ${
        subscribers.isUserSubscribed
          ? classes.buttonSubscribed
          : classes.buttonUnsubscribed
      }`}
      onClick={onSubscribe}
      disabled={subscribersMutation.isLoading}
    >
      {subscribers.isUserSubscribed ? "Subscribed" : "Subscribe"}
    </Button>
  );
};

export default SubscribeButton;
