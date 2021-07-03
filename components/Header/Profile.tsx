import Link from "next/link";
import { MouseEvent } from "react";
import { useState, FC } from "react";
import { DetailedHTMLProps } from "react";
import Menu from "@material-ui/core/Menu";
import { AnchorHTMLAttributes } from "react";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../../contexts/Auth";
import HelpIcon from "@material-ui/icons/Help";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import { SvgIconTypeMap } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

interface Props {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  text: string;
}

const MenuItemContent: FC<Props> = ({ Icon, text }) => {
  return (
    <>
      <Icon className="mr-3 text-secondary" fontSize="small" />
      <Typography variant="inherit">{text}</Typography>
    </>
  );
};

const useStyles = makeStyles({
  divider: { margin: "12px 0" },
  menu: { width: 220 },
});

export default function Profile() {
  const { user } = useAuth();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const openMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <div>
      <button onClick={openMenu}>
        <Avatar
          style={{ width: "2rem", height: "2rem" }}
          src={user?.picture}
          alt={user?.name}
        />
      </button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={closeMenu}
        elevation={1}
        classes={{ paper: classes.menu }}
      >
        <div className="p-4 pb-2 flex items-center space-x-4">
          <Avatar src={user?.picture} alt={user?.name} />
          <Typography variant="h6" className="truncate">
            {user?.name}
          </Typography>
        </div>
        <Divider className={classes.divider} />
        <MenuItem onClick={closeMenu}>
          <Link href={`/channel/${user?.id}`}>
            <a>
              <MenuItemContent Icon={AccountBoxIcon} text="Your channel" />
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <a href="/api/logout">
            <MenuItemContent Icon={ExitToAppIcon} text="Sign out" />
          </a>
        </MenuItem>
        <Divider className={classes.divider} />
        <MenuItem onClick={closeMenu}>
          <Link href="/">
            <a>
              <MenuItemContent Icon={SettingsIcon} text="Settings" />
            </a>
          </Link>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <Link href="/">
            <a>
              <MenuItemContent Icon={HelpIcon} text="Help" />
            </a>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
