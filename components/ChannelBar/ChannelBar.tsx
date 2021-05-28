import { FC, useState } from "react";
import Link from "next/link";
import ChannelAvatar from "./ChannelAvatar";
import formatNumber from "../../lib/formatNumber";
import SubscribeButton from "./SubscribeButton";
import { Channel } from "../../interfaces/User";

interface Props {
  channel: Channel;
}

const ChannelBar: FC<Props> = ({ channel }) => {
  const [subscribers, setSubscribers] = useState(channel.subscribers);

  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex items-center space-x-4">
        <ChannelAvatar channel={channel} />
        <div className="flex flex-col">
          <Link href={`/channel/${channel.id}`}>
            <a className="text-sm font-medium">{channel.name}</a>
          </Link>
          <span className="text-xs text-secondary">
            {formatNumber(subscribers.count)} subscriber
            {subscribers.count === 1 ? "" : "s"}
          </span>
        </div>
      </div>
      <SubscribeButton {...{ channel, subscribers, setSubscribers }} />
    </div>
  );
};

export default ChannelBar;
