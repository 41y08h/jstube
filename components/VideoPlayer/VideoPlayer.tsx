import { FC } from "react";

const VideoPlayer: FC<any> = (props) => (
  <video style={{ width: "100%" }} autoPlay controls {...props} />
);

export default VideoPlayer;
