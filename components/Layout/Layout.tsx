import { FC, useState } from "react";
import Sidebar from "../Sidebar2";
import Header from "../Header";

const Layout: FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((previous) => !previous);

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebar} />
      {children}
    </>
  );
};

export default Layout;
