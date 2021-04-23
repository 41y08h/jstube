import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Action from "./Action";
import formatNumber from "../../../lib/formatNumber";

export default function LikeButton() {
  const { video, setVideo } = useVideo();
  const { user, authAction } = useAuth();

  const hasUserLiked = user && video._likes.includes(user._id);

  const likes = useMutation(
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
      onClick={() => authAction(likes.mutate)}
      disabled={likes.isLoading}
      icon={<ThumbUpIcon />}
      text={formatNumber(video._likes.length)}
    />
  );
}
