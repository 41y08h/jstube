import { FC } from "react";
import VideoCard from "../VideoCard";
import { QVideo } from "../../interfaces/Video";

const VideosList: FC<{ videos: QVideo[] }> = ({ videos }) => {
  return (
    <>
      <div
        className="flex flex-wrap justify-center"
        style={{ maxWidth: "fit-content" }}
      >
        {videos.map((video) => (
          <div key={video.id} className="mx-1 my-4">
            <VideoCard data={video} />
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosList;
