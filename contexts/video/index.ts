import { createContext, useContext } from "react";
import QueryVideo from "../../interfaces/queries/VideoWatch";

const VideoContext = createContext(undefined);
export default VideoContext;

interface Value {
  video: QueryVideo;
  setVideo: (value: boolean) => void;
}

export function useVideo() {
  return useContext<Value>(VideoContext);
}
