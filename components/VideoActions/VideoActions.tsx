import { FC } from "react";
import Ratings from "./Ratings";
import ActionButton from "./ActionButton";
import QueryVideo from "../../interfaces/queries/Video";
import { ReactComponent as ShareIcon } from "../../icons/share.svg";

interface Props {
  data: QueryVideo;
}

const VideoActions: FC<Props> = ({ data }) => (
  <div className="flex space-x-5 items-start justify-center">
    <Ratings data={data} />
    <ActionButton icon={ShareIcon}>Share</ActionButton>
  </div>
);

export default VideoActions;
