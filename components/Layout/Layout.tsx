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
      <div style={{ paddingTop: "64px" }} className="flex">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 border-t">{children}</div>
      </div>
    </Fragment>
  );
};

export default Layout;
