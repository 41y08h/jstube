import { useState } from "react";
import Sidebar from "../components/Sidebar2";
import Header from "../components/Header";

export default function StoryBook() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebar() {
    console.log("hit");
    setIsSidebarOpen((old) => !old);
  }

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebar} />
    </div>
  );
}
