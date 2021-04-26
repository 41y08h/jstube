import { useVideo } from "../../contexts/video";
import numberWithCommas from "../../lib/numberWithCommas";
import dateFormat from "dateformat";

export default function Info() {
  const { video } = useVideo();

  return (
    <div>
      <span>{numberWithCommas(video.views)} views</span>
      <span className="mx-1 font-bold text-md">·</span>
      <span>{dateFormat(new Date(video.createdAt), "mmm d, yyyy")}</span>
    </div>
  );
}
