import { useVideo } from "../../contexts/video";

export default function VideoChannelAvatar({ picture, name }) {
  const { video } = useVideo();

  return (
    <div className="h-14 w-14 rounded-full overflow-hidden">
      <img
        className="object-cover w-full h-full"
        src={video._user.picture}
        alt={video._user.name}
      />
    </div>
  );
}
