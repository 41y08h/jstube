import axios, { AxiosRequestConfig } from "axios";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import Channel from "../../interfaces/Channel";
import Subscription from "../../interfaces/Subscription";

interface Props {
  channel: Channel;
  subscription: Subscription;
  setSubscription: Function;
}

const SubscribeButton: FC<Props> = (props) => {
  const { channel, subscription, setSubscription } = props;
  const { hasUserSubscribed } = subscription;

  const subscriptionMutation = useMutation(async (toUnsubscribe: boolean) => {
    const method = toUnsubscribe ? "DELETE" : "POST";
    const res = await axios(`/api/subscription/${channel.id}`, { method });
    setSubscription(res.data);
  });

  const onClick = () => subscriptionMutation.mutate(hasUserSubscribed);

  const conditionalCName = hasUserSubscribed
    ? "bg-gray-200 text-secondary"
    : "bg-red-700 text-white";

  const className =
    "uppercase px-4 py-0 h-9 font-medium text-sm rounded-sm " +
    conditionalCName;

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={subscriptionMutation.isLoading}
    >
      {subscription.hasUserSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
