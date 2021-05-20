import Header from "../Header";
import Head from "next/head";
import { FC, Fragment } from "react";
import { siteName } from "../../config";
import Sidebar from "../Sidebar";

const Layout: FC = ({ children }) => {
  return (
    <Fragment>
      <Head>
        <title>{siteName}</title>
      </Head>
      <Header />
      <div className="flex pt-16">
        <div
          style={{ height: "calc(100vh - 64px)" }}
          className="fixed top-16 left-0 w-60 z-20"
        >
          <Sidebar />
        </div>
        <div className="border-t pl-60">{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
