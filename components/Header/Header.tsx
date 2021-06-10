import MenuIcon from "../../icons/menu.svg";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { FC } from "react";
import SignInButton from "./SignInButton";

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
        <Link href="/watch-later">wl</Link>
      </div>
      <SearchBar />
      <SignInButton />
    </div>
  );
};

export default Header;
