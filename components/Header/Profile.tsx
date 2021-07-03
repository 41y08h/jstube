import { useState } from "react";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import { useAuth } from "../../contexts/Auth";
import MenuItem from "@material-ui/core/MenuItem";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Typography from "@material-ui/core/Typography";
import { MouseEvent } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";

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
          <AccountBoxIcon className="mr-3 text-secondary" fontSize="small" />
          <Typography variant="inherit">Your channel</Typography>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <a href="/api/logout">
            <ExitToAppIcon className="mr-3 text-secondary" fontSize="small" />
            <Typography variant="inherit">Sign out</Typography>
          </a>
        </MenuItem>
      </Menu>
    </div>
  );
}
