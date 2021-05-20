import { FC } from "react";
import LoadingCard from "./LoadingCard";

const VideoLoadingGrid: FC = () => (
  <div className="px-8 p-4 py-6 grid grid-cols-4 gap-8 bg-gray-100">
    {Array(4 * 6)
      .fill("card")
      .map(() => (
        <LoadingCard />
      ))}
  </div>
);

export default VideoLoadingGrid;
