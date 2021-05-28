import Link from "next/link";
import { FC } from "react";
import QVideo from "../../interfaces/queries/Video";
import formatTime from "../../lib/formatTime";

interface Props {
  data: QVideo;
}

const Thumbnail: FC<Props> = ({ data }) => (
  <div className="relative">
    <Link href={`/watch?v=${data.id}`}>
      <a>
        <img
          className="w-full h-32 object-cover"
          src={data.thumbnail}
          alt={data.title}
        />
      </a>
    </Link>
    <span className="absolute bottom-1 right-1 bg-gray-900 px-1 text-xs text-white rounded-sm">
      {formatTime(data.duration)}
    </span>
  </div>
);

export default Thumbnail;
