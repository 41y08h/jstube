import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

type TSidebarItem =
  | "divider"
  | {
      Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
      text: string;
      link: string;
      isAuthRequired?: boolean;
    };

export default TSidebarItem;
