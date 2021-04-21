import { useState } from "react";

const shortLength = 160;

export default function Description({ text }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <p className="text-sm whitespace-pre-wrap">
        {isExpanded ? text : text.substring(0, shortLength + 1)}
      </p>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="uppercase text-sm text-secondary mt-6 font-medium"
      >
        Show {isExpanded ? "less" : "more"}
      </button>
    </>
  );
}
