import Link from "next/link";
import { FC } from "react";
import Thumbnail from "./Thumbnail";
import Avatar from "./Avatar";
import VideoInfo from "./VideoInfo";
import QVideo from "../../interfaces/queries/Video";
import { Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

interface Props {
  data: QVideo;
}

const VideoCard: FC<Props> = ({ data }) => {
  const queryClient = useQueryClient();
  const wlMutation = useMutation(
    () => axios.post(`/api/watchlater/${data.id}`),
    { onSuccess: () => queryClient.invalidateQueries("/api/watchlater") }
  );

  return (
    <div className="w-60 my-4 mx-3 cursor-pointer">
      <div className="space-y-3">
        <Thumbnail data={data} />
        <div className="flex space-x-2 w-full">
          <div className="w-1/5">
            <Avatar channel={data.channel} />
          </div>
          <div className="space-y-2 w-4/5">
            <VideoInfo data={data} />
          </div>
          <Button variant="primary" onClick={wlMutation.mutate}>
            Add to watch later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
