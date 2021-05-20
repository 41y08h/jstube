import Link from "next/link";
import { FC } from "react";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";

interface Props {
  toggleMenu: Function;
}

const Header: FC<Props> = ({ toggleMenu }) => {
  return (
    <div className="flex justify-between items-center px-6 bg-white h-16 fixed top-0 left-0 z-20 w-full">
      <div className="flex space-x-6">
        <MenuIcon onClick={toggleMenu} className="h-6 cursor-pointer" />
        <Link href="/">
          <a>
            <img className="h-5" src="/jstube_logo.svg" alt="jstube logo" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Header;
