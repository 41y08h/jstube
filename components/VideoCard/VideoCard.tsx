import Link from "next/link";
import timeSince from "../../lib/timeSince";
import formatNumber from "../../lib/formatNumber";
import { FC } from "react";
import QueryVideo from "../../interfaces/queries/Video";
import Thumbnail from "./Thumbnail";
import Avatar from "./Avatar";

interface Props {
  data: QueryVideo;
}

const VideoCard: FC<Props> = ({ data }) => {
  return (
    <div className="w-60 my-4 mx-3">
      <div className="space-y-3">
        <Thumbnail
          src={data.thumbnail}
          alt={data.title}
          duration={data.duration}
        />
        <div className="flex space-x-2 w-full">
          <div className="w-1/5">
            <Avatar src={data.channel.picture} alt={data.channel.name} />
          </div>
          <div className="space-y-2 w-4/5">
            <p className="max-h-10 pr-4 text-sm font-medium text-primary line-clamp-2 overflow-ellipsis whitespace-normal overflow-hidden">
              {data.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/watch?v=${data.id}`}>
      <div className="w-60 my-4 mx-3">
        <div className="relative">
          <img
            className="w-full h-32 object-cover rounded-sm"
            src={data.thumbnail}
            alt={data.title}
          />
          <span className="absolute bottom-2 right-1 bg-gray-900 px-1 text-xs text-white rounded">
            {formatTime(data.duration)}
          </span>
        </div>
        <div className="flex space-x-3 pt-2 justify-start">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <img
              src={data.channel.picture}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">{data.title}</p>
            <div className="flex flex-col text-secondary text-sm">
              <span>{data.channel.name}</span>
              <div>
                <span>{formatNumber(data.views)} views</span>
                <span className="mx-1 font-bold text-md">·</span>
                <span>{timeSince(new Date(data.uploadedAt))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
