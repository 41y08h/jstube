import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Action from "./Action";

export default function LikeButton() {
  const { video, setVideo } = useVideo();
  const { user, authAction } = useAuth();

  const hasUserLiked = user && video._likes.includes(user._id);

  const likeMutation = useMutation(
    () =>
      axios(`/api/videos/${video._id}/like`, {
        method: hasUserLiked ? "delete" : "patch",
      }),
    {
      onSuccess(res) {
        setVideo(res.data);
      },
      onError(err) {
        toast.error(err.response.data.message);
      },
    }
  );

  return (
    <Action
      className={hasUserLiked ? "text-blue-700" : ""}
      onClick={() => authAction(likeMutation.mutate)}
      icon={<ThumbUpIcon />}
      text={video._likes.length}
    />
  );
}
