import { useVideo } from "../../contexts/video";
import formatNumber from "../../lib/formatNumber";

export default function ChannelBar() {
  const { video } = useVideo();

  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col justify-center">
        <span className="text-sm font-medium">{video._user.name}</span>
        <span className="text-sm text-secondary">
          {formatNumber(video._user.subscribers)} subscribers
        </span>
      </div>
      <button className="uppercase bg-red-700 px-4 py-0 text-white h-9 font-medium text-sm">
        Subscribe
      </button>
    </div>
  );
}
