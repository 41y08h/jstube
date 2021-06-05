import { createContext, useContext } from "react";
import { QVideoDetailed } from "../interfaces/Video";

const VideoContext = createContext<any>(undefined);
export default VideoContext;

interface Value {
  video: QVideoDetailed;
  setVideo: (value: boolean) => void;
}

export function useVideo() {
  return useContext<Value>(VideoContext);
}
