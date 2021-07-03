import axios from "axios";
import { toast } from "react-toastify";
import Menu from "@material-ui/core/Menu";
import { FC, MouseEvent, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useMutation, useQueryClient, InfiniteData } from "react-query";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import { QVideos } from "../../interfaces/Video";
import { useAuth } from "../../contexts/Auth";

interface Props {
  id: number;
  isInWL: boolean;
}

const VideoMenu: FC<Props> = ({ id, isInWL }) => {
  const { authenticate } = useAuth();
  const queryClient = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { mutate: addToWL, isLoading: isAdding } = useMutation(
    () => axios.post(`/api/watchlater/${id}`),
    {
      onSuccess: () => {
        updateIsInWL();
        toast.dark("Saved to Watch Later", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      },
    }
  );
  const { mutate: removeFromWL, isLoading: isDeleting } = useMutation(
    () => axios.delete(`/api/watchlater/${id}`),
    {
      onSuccess: () => {
        updateIsInWL();
        toast.dark("Removed from Watch Later", {
          position: "bottom-left",
          hideProgressBar: true,
        });
      },
    }
  );

  function updateIsInWL() {
    queryClient.setQueryData<InfiniteData<QVideos>>("/api/videos", (data) => ({
      pages:
        data?.pages.map((page) => ({
          ...page,
          items: page.items.map((video) =>
            video.id === id ? { ...video, isInWL: !isInWL } : video
          ),
        })) ?? [],
      pageParams: data?.pageParams ?? [],
    }));
  }

  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  function handleMenuItemClick(fn: any) {
    const run = authenticate(fn);
    run();
    closeMenu();
  }

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
          onClick={() => handleMenuItemClick(isInWL ? removeFromWL : addToWL)}
          disabled={isDeleting || isAdding}
        >
          <>
            {isInWL ? (
              <DeleteIcon className="mr-3 text-secondary" fontSize="small" />
            ) : (
              <WatchLaterIcon
                className="mr-3 text-secondary"
                fontSize="small"
              />
            )}
          </>
          <Typography variant="inherit">
            {isInWL ? "Remove from Watch later" : "Save to Watch later"}
          </Typography>
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
