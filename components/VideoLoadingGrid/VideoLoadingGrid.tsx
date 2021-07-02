import { FC } from "react";
import LoadingCard from "./LoadingCard";

const VideoLoadingGrid: FC = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-4 2xl:grid-cols-6 2xl:gap-x-5 gap-3 gap-y-0 sm:p-4 items-start">
    {Array(4 * 6)
      .fill("card")
      .map((value, i) => (
        <LoadingCard key={i} />
      ))}
  </div>
);

export default VideoLoadingGrid;
