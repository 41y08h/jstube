import { useQuery } from "react-query";
import { QVideo } from "../interfaces/Video";
import VideosList from "../components/VideosList";

export default function StoryBook() {
  const { data } = useQuery<QVideo[]>("/api/videos");

  return data && <VideosList videos={data} />;
}
