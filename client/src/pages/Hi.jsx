import React, { useState } from "react";
import { FaBars, FaMoon, FaSun, FaUserCircle, FaStickyNote, FaSignOutAlt } from "react-icons/fa";

const Hi = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} h-screen flex`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-64" : "w-16"} bg-gray-800 text-white p-5 transition-all`}> 
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-xl">
          <FaBars />
        </button>
        <ul className="mt-5 space-y-4">
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaStickyNote /> {sidebarOpen && "Notes"}
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
            <FaUserCircle /> {sidebarOpen && "Profile"}
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-300 text-red-400">
            <FaSignOutAlt /> {sidebarOpen && "Logout"}
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-4 bg-gray-700 text-white">
          <h1 className="text-xl font-bold">Notes Dashboard</h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-xl">
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
            <FaUserCircle className="text-2xl" />
          </div>
        </div>
        
        {/* Notes Area */}
        <div className="p-4 flex flex-col gap-4">
          <textarea className="w-full h-96 p-3 border rounded bg-white text-black" placeholder="Write your notes here..." />
        </div>
      </div>
    </div>
  );
};

export default Hi;
