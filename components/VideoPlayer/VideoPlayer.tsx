import { FC } from "react";

const VideoPlayer: FC<any> = (props) => (
  <video
    style={{ height: "480px", width: "853px" }}
    autoPlay
    controls
    {...props}
  />
);

export default VideoPlayer;
