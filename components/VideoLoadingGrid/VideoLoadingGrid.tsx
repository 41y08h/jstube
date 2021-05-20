import { FC } from "react";
import LoadingCard from "./LoadingCard";

// 1320 Change sidebar width
const VideoLoadingGrid: FC = () => (
  <div className="p-2 flex flex-wrap justify-center bg-gray-100">
    {Array(4 * 6)
      .fill("card")
      .map(() => (
        <LoadingCard />
      ))}
  </div>
);

export default VideoLoadingGrid;
