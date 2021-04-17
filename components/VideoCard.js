import Link from "next/link";
import formatTime from "../lib/formatTime";
import timeSince from "../lib/timeSince";
import formatNumber from "../lib/formatNumber";

export default function VideoCard({ data }) {
  return (
    <Link href={`/watch/${data.id}`}>
      <div>
        <div className="relative">
          <img
            style={{ width: "280px", height: "156px" }}
            className="w-68 h-48 object-cover"
            src={data.thumb}
            alt={data.title}
          />
          <span className="absolute bottom-2 right-1 bg-gray-900 py-1 px-2 text-xs text-white rounded">
            {formatTime(data.duration)}
          </span>
        </div>
        <div className="flex space-x-3 pt-2 justify-start">
          <span className="w-10 h-10 rounded-full bg-gray-500 text-white text-center py-3">
            {data.subtitle.substring(0, 1)}
          </span>
          <div>
            <p className="text-sm font-medium mb-1">{data.title}</p>
            <div className="flex flex-col text-gray-500 text-sm">
              <span>{data.subtitle}</span>
              <div>
                <span>{formatNumber(data.views)} views</span>
                <span className="mx-1 font-bold text-md">·</span>
                <span>{timeSince(new Date(data.uploadedOn))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
