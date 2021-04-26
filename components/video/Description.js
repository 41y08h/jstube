import { useState } from "react";
import { useVideo } from "../../contexts/video";

const shortLength = 160;

export default function Description({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { video } = useVideo();

  return (
    <div className="pr-60">
      <p className="text-sm whitespace-pre-wrap">
        {isExpanded
          ? video.description
          : video.description.substring(0, shortLength + 1)}
      </p>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="uppercase text-sm text-secondary mt-6 font-medium"
      >
        Show {isExpanded ? "less" : "more"}
      </button>
    </div>
  );
}
