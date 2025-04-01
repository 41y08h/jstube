import { FC } from "react";

const LoadingCard: FC = () => (
  <div className="w-full pb-6">
    <div className="animate-pulse space-y-3">
      <div className="aspect-ratio bg-gray-300" />
      <div className="flex space-x-2 w-full p-2 pl-0">
        <div className="w-1/5">
          <div
            className="rounded-full bg-gray-300 mx-auto"
            style={{ width: "2.25rem", height: "2.25rem" }}
          />
        </div>
        <div className="space-y-2 w-4/5">
          <div className="bg-gray-300 h-5 w-5/6 rounded-sm" />
          <div className="bg-gray-300 h-5 w-4/6 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingCard;
