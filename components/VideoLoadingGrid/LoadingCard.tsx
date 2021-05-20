import { FC } from "react";

// 253x142
const LoadingCard: FC = () => (
  <div className="w-60 my-4 mx-3">
    <div className="animate-pulse space-y-3">
      <div className="h-32 bg-gray-300 rounded-sm" />
      <div className="flex space-x-2 w-full">
        <div className="w-1/5">
          <div className="rounded-full h-9 w-9 bg-gray-300" />
        </div>
        <div className="space-y-2 w-4/5">
          <div className="bg-gray-300 h-4 w-5/6 rounded-sm" />
          <div className="bg-gray-300 h-4 w-4/6 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingCard;
