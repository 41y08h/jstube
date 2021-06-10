import axios from "axios";
import { Dispatch, FC, SetStateAction } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuth } from "../../contexts/Auth";
import ISubscribers from "../../interfaces/Subscribers";

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

  const className =
    "uppercase px-4 py-0 h-9 font-medium text-sm rounded-sm " +
    (subscribers.isUserSubscribed
      ? "bg-gray-200 text-secondary"
      : "bg-red-700 text-white");

  const onSubscribe = authenticate(() =>
    subscribersMutation.mutate(subscribers.isUserSubscribed)
  );

  return (
    <button
      className={className}
      disabled={subscribersMutation.isLoading}
      onClick={onSubscribe}
    >
      {subscribers.isUserSubscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
