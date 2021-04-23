import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useVideo } from "../../../contexts/video";
import { useAuth } from "../../../contexts/auth";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import Action from "./Action";

export default function DislikeButton() {
  const { video, setVideo } = useVideo();
  const { user, authAction } = useAuth();

  const hasUserDisliked = user && video._dislikes.includes(user._id);

  const dislike = useMutation(
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
      onClick={() => authAction(dislike.mutate)}
      icon={<ThumbUpIcon className="transform rotate-180" />}
      text={video._dislikes.length}
    />
  );
}
