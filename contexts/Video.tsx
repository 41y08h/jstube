import { createContext, useContext } from "react";
import { QVideoDetailed } from "../interfaces/Video";

export const VideoContext = createContext<any>(undefined);

interface Value {
  video: QVideoDetailed;
  setVideo: (value: boolean) => void;
}

export function useVideo() {
  return useContext<Value>(VideoContext);
}
