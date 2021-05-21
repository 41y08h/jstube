import Link from "next/link";
import { FC } from "react";
import QueryVideo from "../../interfaces/queries/Video";
import formatNumber from "../../lib/formatNumber";
import timeSince from "../../lib/timeSince";

interface Props {
  data: QueryVideo;
}

const VideoInfo: FC<Props> = ({ data }) => (
  <div>
    <Link href={`/watch?v=${data.id}`}>
      <a className="max-h-10 pr-4 text-sm font-medium text-primary line-clamp-2 overflow-ellipsis whitespace-normal overflow-hidden">
        {data.title}
      </a>
    </Link>
    <div className="flex flex-col text-secondary text-sm mt-2">
      <Link href={`/channel/${data.channel.id}`}>
        <a className="hover:text-gray-700 w-min transition-colors duration-100">
          {data.channel.name}
        </a>
      </Link>
      <div>
        <span>{formatNumber(data.views)} views</span>
        <span className="mx-1 font-bold text-md">·</span>
        <span>{timeSince(new Date(data.uploadedAt))}</span>
      </div>
    </div>
  </div>
);

export default VideoInfo;
