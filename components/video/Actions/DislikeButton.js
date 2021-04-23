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

  const dislikeMutation = useMutation(
    () => axios.patch(`/api/videos/${video._id}/dislike`),
    {
      onSuccess(res) {
        setVideo(res.data.video);
        toast.success("You dislike this video.");
      },
      onError(err) {
        toast.error(err.response.data.message);
      },
    }
  );

  return (
    <Action
      onClick={() => authAction(dislikeMutation.mutate)}
      icon={<ThumbUpIcon className="transform rotate-180" />}
      text={video._dislikes.length}
    />
  );
}
