import Menu from "@material-ui/core/Menu";
import { FC, MouseEvent, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import axios from "axios";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

interface Props {
  id: number;
}

const VideoMenu: FC<Props> = ({ id }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const wlMutation = useMutation(() => axios.post(`/api/watchlater/${id}`), {
    onSuccess: () => {
      toast.dark("Saved to Watch Later", {
        position: "bottom-left",
        hideProgressBar: true,
      });
    },
  });

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (fn: Function) => () => {
    fn();
    closeMenu();
  };

  return (
    <>
      <IconButton onClick={openMenu} edge="end">
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
        onClose={closeMenu}
      >
        <MenuItem
          onClick={handleMenuItemClick(wlMutation.mutate)}
          disabled={wlMutation.isLoading}
        >
          <WatchLaterIcon className="mr-3 text-secondary" fontSize="small" />
          <Typography variant="inherit">Save to Watch later</Typography>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <PlaylistAddIcon className="mr-3 text-secondary" fontSize="small" />
          <Typography variant="inherit">Save to playlist</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default VideoMenu;
