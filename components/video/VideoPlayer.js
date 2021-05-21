import { useVideo } from "../../contexts/video";

export default function VideoPlayer(props) {
  const { video } = useVideo();

  return (
    <video
      style={{ width: "853px", height: "480px" }}
      autoPlay
      controls
      src={video.src}
    />
  );
}
