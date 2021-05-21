import { FC, useState } from "react";

interface Props {
  text: string;
}

const VideoDescription: FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shortLength = 160;
  return (
    <div className="pr-24">
      <p className="text-sm whitespace-pre-wrap">
        {isExpanded ? text : text.substring(0, shortLength + 1)}
      </p>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="uppercase text-sm text-secondary mt-6 font-medium"
      >
        Show {isExpanded ? "less" : "more"}
      </button>
    </div>
  );
};

export default VideoDescription;
