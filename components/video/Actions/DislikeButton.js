import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Action from "./Action";
import formatNumber from "../../../lib/formatNumber";

export default function DislikeButton() {
  const { video, setVideo } = useVideo();
  const { user, authAction } = useAuth();

  const hasUserDisliked = user && video._dislikes.includes(user._id);

  const dislikes = useMutation(
    () =>
      axios(`/api/videos/${video._id}/dislike`, {
        method: hasUserDisliked ? "delete" : "patch",
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
      className={hasUserDisliked ? "text-blue-700" : ""}
      onClick={() => authAction(dislikes.mutate)}
      disabled={dislikes.isLoading}
      icon={<ThumbUpIcon className="transform rotate-180" />}
      text={formatNumber(video._dislikes.length)}
    />
  );
}
