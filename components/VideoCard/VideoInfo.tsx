import { FC } from "react";
import formatNumber from "../../lib/formatNumber";
import timeSince from "../../lib/timeSince";

interface Props {
  title: string;
  channelName: string;
  views: number;
  uploadedAt: Date;
}

const VideoInfo: FC<Props> = ({ title, channelName, views, uploadedAt }) => (
  <div>
    <p className="max-h-10 pr-4 text-sm font-medium text-primary line-clamp-2 overflow-ellipsis whitespace-normal overflow-hidden">
      {title}
    </p>
    <div className="flex flex-col text-secondary text-sm mt-2">
      <span>{channelName}</span>
      <div>
        <span>{formatNumber(views)} views</span>
        <span className="mx-1 font-bold text-md">·</span>
        <span>{timeSince(new Date(uploadedAt))}</span>
      </div>
    </div>
  </div>
);

export default VideoInfo;
