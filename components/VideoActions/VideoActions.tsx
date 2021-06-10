import { FC } from "react";
import Ratings from "./Ratings";
import ActionButton from "./ActionButton";
import ShareIcon from "../../icons/share.svg";
import { QVideoDetailed } from "../../interfaces/Video";

interface Props {
  data: QVideoDetailed;
}

const VideoActions: FC<Props> = ({ data }) => (
  <div className="flex space-x-5 items-start justify-center">
    <Ratings data={data} />
    <ActionButton icon={ShareIcon}>Share</ActionButton>
  </div>
);

export default VideoActions;
