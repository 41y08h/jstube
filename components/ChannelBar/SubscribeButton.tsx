import axios from "axios";
import { FC } from "react";
import { useMutation } from "react-query";
import { Channel } from "../../interfaces/User";
import Subscribers from "../../interfaces/Subscribers";

interface Props {
  channel: Channel;
  subscribers: Subscribers;
  setSubscribers: Function;
}

const SubscribeButton: FC<Props> = (props) => {
  const { channel, subscribers, setSubscribers } = props;
  const { isUserSubscribed } = subscribers;

  const subscribersMutation = useMutation(
    (toUnsubscribe: boolean) => {
      const url = `/api/subscription/${channel.id}`;
      return toUnsubscribe
        ? axios.delete<Subscribers>(url)
        : axios.post<Subscribers>(url);
    },
    { onSuccess: (data) => setSubscribers(data) }
  );

  const onClick = () => subscribersMutation.mutate(isUserSubscribed);

  const conditionalCName = isUserSubscribed
    ? "bg-gray-200 text-secondary"
    : "bg-red-700 text-white";

  const className =
    "uppercase px-4 py-0 h-9 font-medium text-sm rounded-sm " +
    conditionalCName;

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={subscribersMutation.isLoading}
    >
      {subscribers.isUserSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
