import React from "react";
import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-800 p-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <FaSearch className="text-lg" />
        <FaBell className="text-lg" />
        <FaUserCircle className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
