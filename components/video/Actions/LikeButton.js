import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Action from "./Action";

export default function LikeButton() {
  const { video, setVideo } = useVideo();
  const { authAction } = useAuth();

  const likeMutation = useMutation(
    () => axios.patch(`/api/videos/${video._id}/like`),
    {
      onSuccess(res) {
        setVideo(res.data.video);
        toast.success("Added to liked videos.");
      },
      onError(err) {
        toast.error(err.response.data.message);
      },
    }
  );

  return (
    <Action
      onClick={() => authAction(likeMutation.mutate)}
      icon={<ThumbUpIcon />}
      text={video._likes.length}
    />
  );
}
