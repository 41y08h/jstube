import { FC, Fragment, useState } from "react";
import { siteName } from "../../config";
import Sidebar from "../Sidebar";
import Header from "../Header";
import Head from "next/head";

const Layout: FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const sidebarStyles = {
    height: "calc(100vh - 64px)",
    transition: "transform ease 0.2s",
    transform: isMenuOpen ? undefined : "translateX(-100%)",
  };
  const childrenStyles = {
    transition: "padding ease 0.2s",
    paddingLeft: isMenuOpen ? "15rem" : undefined,
  };

  const toggleMenu = () => setIsMenuOpen((previous) => !previous);

  return (
    <Fragment>
      <Head>
        <title>{siteName}</title>
      </Head>
      <Header toggleMenu={toggleMenu} />
      <div className="flex pt-16">
        <div style={sidebarStyles} className="fixed top-16 left-0 w-60 z-20">
          <Sidebar />
        </div>
        <div style={childrenStyles} className="border-t pb-10">
          {children}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
