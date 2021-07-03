import FlagIcon from "@material-ui/icons/Flag";
import HelpIcon from "@material-ui/icons/Help";
import TSidebarItem from "../../@types/TSidebarItem";
import YouTubeIcon from "@material-ui/icons/YouTube";
import TheatersIcon from "@material-ui/icons/Theaters";
import FeedbackIcon from "@material-ui/icons/Feedback";
import SettingsIcon from "@material-ui/icons/Settings";
import AssistantIcon from "@material-ui/icons/Assistant";
import SportsRugbyIcon from "@material-ui/icons/SportsRugby";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import WifiTetheringIcon from "@material-ui/icons/WifiTethering";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";

const moreItems: TSidebarItem[] = [
  {
    text: "JsTube Premium",
    Icon: YouTubeIcon,
    link: "/",
  },
  {
    text: "Films",
    Icon: TheatersIcon,
    link: "/",
  },
  {
    text: "Gamimg",
    Icon: VideogameAssetIcon,
    link: "/",
  },
  {
    text: "Live",
    Icon: WifiTetheringIcon,
    link: "/",
  },
  {
    text: "Fashion & beauty",
    Icon: AssistantIcon,
    link: "/",
  },
  {
    text: "Learning",
    Icon: EmojiObjectsIcon,
    link: "/",
  },
  {
    text: "Sport",
    Icon: SportsRugbyIcon,
    link: "/",
  },
  "divider",
  {
    text: "Settings",
    Icon: SettingsIcon,
    link: "/",
  },
  {
    text: "Report history",
    Icon: FlagIcon,
    link: "/",
  },
  {
    text: "Help",
    Icon: HelpIcon,
    link: "/",
  },
  {
    text: "Feedback",
    Icon: FeedbackIcon,
    link: "/",
  },
  "divider",
];

export default moreItems;
