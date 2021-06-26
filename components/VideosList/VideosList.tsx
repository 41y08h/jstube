import { FC } from "react";
import VideoCard from "../VideoCard";
import { QVideo } from "../../interfaces/Video";

const VideosList: FC<{ videos: QVideo[] }> = ({ videos }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 gap-y-8 sm:m-4 w-screen">
      {videos.map((video) => (
        <VideoCard data={video} />
      ))}
    </div>
  );
};

export default VideosList;
