import { FC } from "react";
import VideoCard from "../VideoCard";
import { QVideo } from "../../interfaces/Video";

const VideosList: FC<{ videos: QVideo[] }> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 2xl:grid-cols-6 2xl:gap-x-5 gap-3 gap-y-0 sm:p-4 items-start">
      {videos.map((video) => (
        <VideoCard data={video} />
      ))}
    </div>
  );
};

export default VideosList;
