import Item from "./Item";
import { FC } from "react";
import HomeIcon from "../../icons/home.svg";
import ExploreIcon from "../../icons/explore.svg";
import SubscriptionsIcon from "../../icons/subscriptions.svg";
import LibraryIcon from "../../icons/library.svg";
import HistoryIcon from "../../icons/history.svg";
import VideosIcon from "../../icons/videos.svg";
import WatchLaterIcon from "../../icons/watchLater.svg";
import LikedVideosIcon from "../../icons/likedVideos.svg";
import MusicIcon from "../../icons/music.svg";
import PremiumIcon from "../../icons/premium.svg";
import MoviesIcon from "../../icons/movies.svg";
import GamingIcon from "../../icons/gaming.svg";
import LiveIcon from "../../icons/live.svg";
import FashionIcon from "../../icons/fashion.svg";
import LearningIcon from "../../icons/learning.svg";
import SportsIcon from "../../icons/sports.svg";
import SettingsIcon from "../../icons/settings.svg";
import ReportHistoryIcon from "../../icons/reportHistory.svg";
import HelpIcon from "../../icons/help.svg";
import FeedbackIcon from "../../icons/feedback.svg";
import Subscriptions from "./Subscriptions";
import Footer from "./Footer";

const TopItems = [
  { icon: HomeIcon, active: true, text: "Home", href: "/" },
  { icon: ExploreIcon, active: false, text: "Explore", href: "/feed/explore" },
  {
    icon: SubscriptionsIcon,
    active: false,
    text: "Subscriptions",
    href: "/feed/subscriptions",
  },
];

const BottomItems = [
  { icon: LibraryIcon, active: false, text: "Library", href: "/feed/library" },
  { icon: HistoryIcon, active: false, text: "History", href: "/feed/history" },
  {
    icon: VideosIcon,
    active: false,
    text: "Your videos",
    href: "/my-videos",
  },
  {
    icon: WatchLaterIcon,
    active: false,
    text: "Watch later",
    href: "/playlists/watch-later",
  },
  {
    icon: LikedVideosIcon,
    active: false,
    text: "Liked videos",
    href: "/playlists/liked",
  },
  {
    icon: MusicIcon,
    active: false,
    text: "Music",
    href: "/playlists/music",
  },
];

const MoreItems = [
  {
    icon: PremiumIcon,
    active: false,
    text: "JsTube Premium",
    href: "/premium",
  },
  {
    icon: MoviesIcon,
    active: false,
    text: "Movies",
    href: "/playlists/movies",
  },
  {
    icon: GamingIcon,
    active: false,
    text: "Gaming",
    href: "/playlists/gaming",
  },
  {
    icon: LiveIcon,
    active: false,
    text: "Live",
    href: "/channels/live",
  },
  {
    icon: FashionIcon,
    active: false,
    text: "Fashion & Beauty",
    href: "/channels/live",
  },
  {
    icon: LearningIcon,
    active: false,
    text: "Learning",
    href: "/channels/live",
  },
  {
    icon: SportsIcon,
    active: false,
    text: "Sports",
    href: "/channels/live",
  },
];

const OtherItems = [
  {
    icon: SettingsIcon,
    active: false,
    text: "Settings",
    href: "/account",
  },
  {
    icon: ReportHistoryIcon,
    active: false,
    text: "Report history",
    href: "/report-history",
  },
  {
    icon: HelpIcon,
    active: false,
    text: "Help",
    href: "/help",
  },
  {
    icon: FeedbackIcon,
    active: false,
    text: "Send Feedback",
    href: "/feedback",
  },
];

const Sidebar: FC = () => (
  <aside className="bg-white pt-1 h-full overflow-y-auto themed-scrollbar">
    {TopItems.map((props, i) => (
      <Item key={i} {...props} />
    ))}
    <hr className="my-3" />
    {BottomItems.map((props, i) => (
      <Item key={i} {...props} />
    ))}
    <hr className="my-3" />
    <Subscriptions />
    <hr className="my-3" />
    <span className="uppercase text-sm font-medium text-secondary px-6">
      More from JsTube
    </span>
    {MoreItems.map((props, i) => (
      <Item key={i} {...props} />
    ))}
    <hr className="my-3" />
    {OtherItems.map((props, i) => (
      <Item key={i} {...props} />
    ))}
    <hr className="my-3" />
    <Footer />
  </aside>
);

export default Sidebar;
