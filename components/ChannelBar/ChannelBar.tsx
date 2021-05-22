import { FC, useState } from "react";
import Link from "next/link";
import ChannelAvatar from "./ChannelAvatar";
import formatNumber from "../../lib/formatNumber";
import SubscribeButton from "./SubscribeButton";
import Channel from "../../interfaces/Channel";

interface Props {
  channel: Channel;
}

const ChannelBar: FC<Props> = ({ channel }) => {
  const [subscription, setSubscription] = useState(channel.subscription);

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex items-center space-x-4">
        <ChannelAvatar channel={channel} />
        <div className="flex flex-col">
          <Link href={`/channel/${channel.id}`}>
            <a className="text-sm font-medium">{channel.name}</a>
          </Link>
          <span className="text-xs text-secondary">
            {formatNumber(subscription.subscribers)} subscriber
            {subscription.subscribers === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <SubscribeButton {...{ channel, subscription, setSubscription }} />
    </div>
  );
};

export default ChannelBar;
