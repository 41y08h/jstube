import Link from "next/link";
import { FC } from "react";
import QueryVideo from "../../interfaces/queries/Video";
import Thumbnail from "./Thumbnail";
import Avatar from "./Avatar";
import VideoInfo from "./VideoInfo";

interface Props {
  data: QueryVideo;
}

const VideoCard: FC<Props> = ({ data }) => {
  return (
    <Link href={`/watch?v=${data.id}`}>
      <div className="w-60 my-4 mx-3 cursor-pointer">
        <div className="space-y-3">
          <Thumbnail data={data} />
          <div className="flex space-x-2 w-full">
            <div className="w-1/5">
              <Avatar channel={data.channel} />
            </div>
            <div className="space-y-2 w-4/5">
              <VideoInfo data={data} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
