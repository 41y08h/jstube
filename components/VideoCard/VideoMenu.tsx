import Menu from "@material-ui/core/Menu";
import { MouseEvent, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";

export default function VideoMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} edge="end">
        <MoreVertIcon
          className="text-primary"
          style={{ width: "20px", height: "20px" }}
        />
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
