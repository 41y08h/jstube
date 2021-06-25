import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import PersonalVideoIcon from "@material-ui/icons/PersonalVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

type TItem =
  | "divider"
  | {
      Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
      text: string;
      link: string;
      isAuthRequired?: boolean;
    };

const items: TItem[] = [
  {
    Icon: HomeIcon,
    text: "Home",
    link: "/",
  },
  {
    Icon: ExploreIcon,
    text: "Explore",
    link: "/",
  },
  {
    Icon: SubscriptionsIcon,
    text: "Subscriptions",
    link: "/",
  },
  "divider",
  {
    Icon: VideoLibraryIcon,
    text: "Library",
    link: "/",
  },
  {
    Icon: HistoryIcon,
    text: "History",
    link: "/feed/history",
  },
  {
    Icon: PersonalVideoIcon,
    text: "Your Videos",
    link: "/my-videos",
    isAuthRequired: true,
  },
  {
    Icon: WatchLaterIcon,
    text: "Watch Later",
    link: "/playlists/watch-later",
    isAuthRequired: true,
  },
  {
    Icon: ThumbUpIcon,
    text: "Liked Videos",
    link: "/playlists/liked",
    isAuthRequired: true,
  },
  {
    Icon: PlaylistPlayIcon,
    text: "Created Playlist",
    link: "/",
    isAuthRequired: true,
  },
  "divider",
];

export default items;
