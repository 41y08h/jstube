import { FC } from "react";
import formatTime from "../../lib/formatTime";

interface Props {
  src: string;
  alt: string;
  duration: number;
}

const Thumbnail: FC<Props> = ({ src, alt, duration }) => (
  <div className="relative">
    <img className="w-full h-32 object-cover" src={src} alt={alt} />
    <span className="absolute bottom-1 right-1 bg-gray-900 px-1 text-xs text-white rounded-sm">
      {formatTime(duration)}
    </span>
  </div>
);

export default Thumbnail;
