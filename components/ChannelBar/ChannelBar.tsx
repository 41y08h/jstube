import Link from "next/link";
import { FC } from "react";
import User from "../../interfaces/User";
import formatNumber from "../../lib/formatNumber";
import ChannelAvatar from "./ChannelAvatar";

interface Props {
  channel: User;
}

const ChannelBar: FC<Props> = ({ channel }) => {
  return (
    <div className="flex justify-between items-center my-4">
      <div className="flex items-center space-x-3">
        <ChannelAvatar channel={channel} />
        <div className="flex flex-col">
          <Link href={`/channel/${channel.id}`}>
            <a className="text-sm font-medium">{channel.name}</a>
          </Link>
          <span className="text-xs text-secondary">
            {formatNumber(5154)} subscribers
          </span>
        </div>
      </div>
      <button className="uppercase bg-red-700 px-4 py-0 text-white h-9 font-medium text-sm">
        Subscribe
      </button>
    </div>
  );
};

export default ChannelBar;
