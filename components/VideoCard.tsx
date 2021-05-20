import Link from "next/link";
import formatTime from "../lib/formatTime";
import timeSince from "../lib/timeSince";
import formatNumber from "../lib/formatNumber";
import { FC } from "react";
import QueryVideo from "../interfaces/queries/Video";

interface Props {
  data: QueryVideo;
}

const VideoCard: FC<Props> = ({ data }) => {
  return (
    <Link href={`/watch?v=${data.id}`}>
      <div style={{ maxWidth: "280px" }}>
        <div className="relative">
          <img
            style={{ width: "100%", height: "148px" }}
            className="w-68 h-48 object-cover"
            src={data.thumbnail}
            alt={data.title}
          />
          <span className="absolute bottom-2 right-1 bg-gray-900 px-1 text-xs text-white rounded">
            {formatTime(data.duration)}
          </span>
        </div>
        <div className="flex space-x-3 pt-2 justify-start">
          <div className="w-10 h-10 rounded-full overflow-hidden">
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