import { FC, MouseEvent, useState } from "react";
import { useQuery } from "react-query";
import { QVideo } from "../interfaces/Video";
import { Avatar, ButtonBase, MenuItem } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Link from "next/link";
import formatTime from "../lib/formatTime";
import formatNumber from "../lib/formatNumber";
import timeSince from "../lib/timeSince";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

function VideoMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        elevation={1}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <WatchLaterIcon className="mr-3 text-secondary" fontSize="small" />
          <Typography variant="inherit">Save to Watch later</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PlaylistAddIcon className="mr-3 text-secondary" fontSize="small" />
          <Typography variant="inherit">Save to playlist</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}

const Video: FC<{ data: QVideo }> = ({ data }) => {
  const links = {
    video: `/watch?v=${data.id}`,
    channel: `/channel/${data.channel.id}`,
  };

  return (
    <>
      <ButtonBase
        component="div"
        style={{ padding: "4px", borderRadius: "6px" }}
      >
        <div className="w-64 cursor-pointer">
          <div className="h-36 w-full relative">
            <Link href={links.video}>
              <a>
                <img
                  className="w-64 h-36 object-cover"
                  src={data.thumbnail}
                  alt={data.title}
                />
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
          <div className="mt-3 flex items-start space-x-2 relative">
            <div className="absolute -top-3 -right-3">
              <VideoMenu />
            </div>
            <Link href={links.channel}>
              <a>
                <Avatar
                  style={{ width: "2.25rem", height: "2.25rem" }}
                  src={data.channel.picture}
                  alt={data.channel.name}
                />
              </a>
            </Link>
            <div className="flex flex-col text-md leading-tight">
              <Link href={links.video}>
                <a>
                  <Typography
                    className="pr-8 line-clamp-2"
                    variant="subtitle2"
                    component="p"
                  >
                    {data.title}
                  </Typography>
                </a>
              </Link>

              <div className="mt-1 text-secondary">
                <Link href={links.channel}>
                  <a className="flex items-center space-x-1">
                    <Typography variant="body2">{data.channel.name}</Typography>
                    <CheckCircleIcon style={{ width: "12px" }} />
                  </a>
                </Link>
                <div className="flex">
                  <Typography variant="body2">
                    {data.views
                      ? `${formatNumber(data.views)} views`
                      : "No views"}
                  </Typography>
                  <span className="mx-1.5 text-xl font-bold leading-none">
                    ·
                  </span>
                  <Typography variant="body2">
                    {timeSince(new Date(data.uploadedAt))}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ButtonBase>
    </>
  );
};

export default function StoryBook() {
  const { data } = useQuery<QVideo[]>("/api/videos");

  return (
    <div className="container mx-auto py-8">
      {data && data[0] && <Video data={data[0]} />}
    </div>
  );
}
