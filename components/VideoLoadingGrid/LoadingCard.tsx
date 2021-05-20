import { FC } from "react";

// 253x142
const LoadingCard: FC = () => (
  <div className="w-64">
    <div className="animate-pulse space-y-3">
      <div className="h-36 bg-gray-300 rounded-sm" />
      <div className="flex space-x-3">
        <div className="rounded-full h-9 w-9 bg-gray-300" />
        <div className="space-y-2">
          <div className="bg-gray-300 h-4 w-44 rounded-sm" />
          <div className="bg-gray-300 h-4 w-32 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
);

export default LoadingCard;
