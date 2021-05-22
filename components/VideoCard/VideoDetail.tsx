import { FC } from "react";
import formatNumber from "../../lib/formatNumber";
import timeSince from "../../lib/timeSince";
import dateformat from "dateformat";

interface Props {
  views: number;
  uploadedAt: Date;
  exactDate?: boolean;
}

const VideoDetail: FC<Props> = ({ views, uploadedAt, exactDate = false }) => (
  <div>
    <span>
      {formatNumber(views)} view{views === 1 ? "" : "s"}
    </span>
    <span className="mx-1 font-bold text-md">·</span>
    <span>
      {exactDate
        ? dateformat(uploadedAt, "mmm d, yyyy")
        : timeSince(new Date(uploadedAt))}
    </span>
  </div>
);

export default VideoDetail;
