import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Avatar from "@material-ui/core/Avatar";
import formatNumber from "../../lib/formatNumber";
import SubscribeButton from "./SubscribeButton";
import { IChannel } from "../../interfaces/User";
import Typography from "@material-ui/core/Typography";

interface Props {
  channel: IChannel;
}

const ChannelBar: FC<Props> = ({ channel }) => {
  const [subscribers, setSubscribers] = useState(channel.subscribers);

  return (
    <div className="flex justify-between items-center border-t border-b px-4 py-3 my-4">
      <div className="flex items-center space-x-4">
        <Avatar src={channel.picture} alt={channel.name} />
        <div className="flex flex-col">
          <Link href={`/channel/${channel.id}`}>
            <a className="text-sm font-medium">{channel.name}</a>
          </Link>
          <Typography variant="caption" color="secondary">
            {formatNumber(subscribers.count)} subscriber
            {subscribers.count === 1 ? "" : "s"}
          </Typography>
        </div>
      </div>
      <SubscribeButton
        channelId={channel.id}
        subscribers={subscribers}
        setSubscribers={setSubscribers}
      />
    </div>
  );
};

export default ChannelBar;
