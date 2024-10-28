import React from "react";
import {
  FaTachometerAlt,
  FaBox,
  FaUser,
  FaEnvelope,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 p-4 flex flex-col space-y-6">
      <div className="text-2xl font-bold">WEB LUBINGA</div>
      <nav className="flex flex-col space-y-4">
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaTachometerAlt /> <span>Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaBox /> <span>Products</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaUser /> <span>Customer Info</span>
        </a>
        <a
          href='/orders'
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaUser /> <span>Orders</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaEnvelope /> <span>Support</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaCogs /> <span>Settings</span>
        </a>
        <a
          href="#"
          className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
        >
          <FaSignOutAlt /> <span>Log Out</span>
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
