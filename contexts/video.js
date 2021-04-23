import { createContext, useContext } from "react";

export const VideoContext = createContext();

export function useVideo() {
  return useContext(VideoContext);
}
