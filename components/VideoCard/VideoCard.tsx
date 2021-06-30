import { FC } from "react";
import Link from "next/link";
import VideoMenu from "./VideoMenu";
import timeSince from "../../lib/timeSince";
import formatTime from "../../lib/formatTime";
import Avatar from "@material-ui/core/Avatar";
import { QVideo } from "../../interfaces/Video";
import formatNumber from "../../lib/formatNumber";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const VideoCard: FC<{ data: QVideo }> = ({ data }) => {
  const links = {
    video: `/watch?v=${data.id}`,
    channel: `/channel/${data.channel.id}`,
  };

  return (
    <ButtonBase component="div" className="overflow-hidden">
      <div className="w-full space-y-3 pb-6">
        <div className="relative">
          <Link href={links.video}>
            <a>
              <div className="aspect-ratio">
                <img src={data.thumbnail} alt={data.title} />
              </div>
            </a>
          </Link>
          <Typography
            variant="caption"
            className="absolute bottom-1 right-1 text-white px-1 py-0 rounded font-medium"
            style={{ backgroundColor: "rgb(0, 0, 0, 0.8)", fontWeight: 500 }}
          >
            {formatTime(data.duration)}
          </Typography>
        </div>
        <div className="flex items-start relative w-full pt-0 p-2 pl-4">
          <Link href={links.channel}>
            <a>
              <Avatar
                style={{ width: "2.25rem", height: "2.25rem" }}
                src={data.channel.picture}
                alt={data.channel.name}
              />
            </a>
          </Link>
          <div className="flex flex-col pl-4 space-y-0.5 text-md leading-tight pr-8 w-full">
            <div className="pl-1 absolute -top-2 right-3">
              <VideoMenu />
            </div>
            <Link href={links.video}>
              <a>
                <Typography
                  className="line-clamp-2"
                  variant="subtitle2"
                  component="p"
                >
                  {data.title}
                </Typography>
              </a>
            </Link>

            <div className="text-secondary flex flex-wrap items-center w-full">
              <Link href={links.channel}>
                <a className="flex items-center space-x-2 pr-2">
                  <Typography variant="body2" component="span">
                    {data.channel.name}
                  </Typography>
                  <CheckCircleIcon style={{ width: "12px" }} />
                </a>
              </Link>
              <div className="flex items-center flex-wrap">
                <Typography variant="body2" component="span">
                  {data.views
                    ? `${formatNumber(data.views)} views`
                    : "No views"}
                </Typography>
                <span className="mx-1.5 text-xl font-bold leading-none">·</span>
                <Typography variant="body2" component="span">
                  {timeSince(new Date(data.uploadedAt))}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};

export default VideoCard;
