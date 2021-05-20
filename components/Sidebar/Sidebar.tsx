import Item from "./Item";
import { FC } from "react";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import { ReactComponent as ExploreIcon } from "../../icons/explore.svg";
import { ReactComponent as SubscriptionsIcon } from "../../icons/subscriptions.svg";
import { ReactComponent as LibraryIcon } from "../../icons/library.svg";
import { ReactComponent as HistoryIcon } from "../../icons/history.svg";
import { ReactComponent as VideosIcon } from "../../icons/videos.svg";
import { ReactComponent as WatchLaterIcon } from "../../icons/watchLater.svg";
import { ReactComponent as LikedVideosIcon } from "../../icons/likedVideos.svg";
import { ReactComponent as MusicIcon } from "../../icons/music.svg";
import { ReactComponent as PremiumIcon } from "../../icons/premium.svg";
import { ReactComponent as MoviesIcon } from "../../icons/movies.svg";
import { ReactComponent as GamingIcon } from "../../icons/gaming.svg";
import { ReactComponent as LiveIcon } from "../../icons/live.svg";
import { ReactComponent as FashionIcon } from "../../icons/fashion.svg";
import { ReactComponent as LearningIcon } from "../../icons/learning.svg";
import { ReactComponent as SportsIcon } from "../../icons/sports.svg";
import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";
import { ReactComponent as ReportHistoryIcon } from "../../icons/reportHistory.svg";
import { ReactComponent as HelpIcon } from "../../icons/help.svg";
import { ReactComponent as FeedbackIcon } from "../../icons/feedback.svg";
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
    href: "/profile/videos",
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
    {TopItems.map((props) => (
      <Item {...props} />
    ))}
    <hr className="my-3" />
    {BottomItems.map((props) => (
      <Item {...props} />
    ))}
    <hr className="my-3" />
    <Subscriptions />
    <hr className="my-3" />
    <span className="uppercase text-sm font-medium text-secondary px-6">
      More from JsTube
    </span>
    {MoreItems.map((props) => (
      <Item {...props} />
    ))}
    <hr className="my-3" />
    {OtherItems.map((props) => (
      <Item {...props} />
    ))}
    <hr className="my-3" />
    <Footer />
  </aside>
);

export default Sidebar;
