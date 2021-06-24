import { useState } from "react";
import Sidebar from "../components/Sidebar2";

export default function StoryBook() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function toggleSidebarOpen() {
    console.log("hit");
    setIsSidebarOpen((old) => !old);
  }

  return (
    <div>
      <button onClick={() => toggleSidebarOpen()} className="p-8">
        open
      </button>
      <Sidebar isOpen={isSidebarOpen} toggleIsOpen={toggleSidebarOpen} />
    </div>
  );
}
