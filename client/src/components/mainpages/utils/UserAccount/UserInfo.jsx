import React, { useContext, useState } from "react";
import Settings from "./Settings";
import axios from "axios";
import {
  FaUserCircle,
  FaInbox,
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaEdit,
} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { GlobalState } from "../../../../GlobalState";

const UserInfo = ({ userData }) => {
  const state=useContext(GlobalState)
  const [activeTab, setActiveTab] = useState("Profile");
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const renderTabContent = () => {
    switch (activeTab) {
      case "Profile":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {userData.name}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-400">Nike Member Since April 2023</p>
          </div>
        );
      case "Inbox":
        return <div className="p-6">Inbox Content</div>;
      case "Orders":
        return <div className="p-6">Orders Content</div>;
      case "Favorites":
        return <div className="p-6">Favorites Content</div>;
      case "Settings":
        return <Settings settings={userData} />;
      default:
        return null;
    }
  };

  //go to my account
   const logoutUser = async () => {
     await axios.get("/user/logout");
     localStorage.removeItem('firstLogin')
     setIsAdmin(false);
     setIsLogged(false);
     window.location.href = "/login";
   };

  return (
    <div className="p-4 md:p-6">
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center p-4 md:p-6">
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row items-center p-6 bg-gray-100 border-b border-gray-200">
            <FaUserCircle className="text-6xl text-gray-400" />
            <div className="ml-4 text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData.name}
              </h2>
              <p className="text-gray-600">UiX Member Since April 2023</p>
            </div>
            <button className="ml-auto text-teal-400 hover:text-teal-600">
              <TbLogout className="text-2xl" onClick={logoutUser} />
              <span className="sr-only">Edit Profile</span>
            </button>
          </div>

          {/* Tab Headers */}
          <div className="flex flex-col md:flex-row bg-gray-50 p-4 space-y-2 md:space-y-0 md:space-x-4">
            {/* Mobile view: show only icons */}
            <div className="flex md:hidden space-x-2">
              <button
                className={`p-2${
                  activeTab === "Profile" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Profile")}
              >
                <FaUserCircle />
              </button>
              <button
                className={`p-2 ${
                  activeTab === "Inbox" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Inbox")}
              >
                <FaInbox />
              </button>
              <button
                className={`p-2 ${
                  activeTab === "Orders" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Orders")}
              >
                <FaBoxOpen />
              </button>
              <button
                className={`p-2 ${
                  activeTab === "Favorites" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Favorites")}
              >
                <FaHeart />
              </button>
              <button
                className={`p-2 ${
                  activeTab === "Settings" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Settings")}
              >
                <FaCog />
              </button>
            </div>

            {/* Desktop view: show icons and text */}
            <div className="hidden md:flex flex-row space-x-4">
              <button
                className={`flex items-center space-x-2 text-lg font-semibold ${
                  activeTab === "Profile" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Profile")}
              >
                <FaUserCircle />
                <span>Profile</span>
              </button>
              <button
                className={`flex items-center space-x-2 text-lg font-semibold ${
                  activeTab === "Inbox" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Inbox")}
              >
                <FaInbox />
                <span>Inbox</span>
              </button>
              <button
                className={`flex items-center space-x-2 text-lg font-semibold ${
                  activeTab === "Orders" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Orders")}
              >
                <FaBoxOpen />
                <span>Orders</span>
              </button>
              <button
                className={`flex items-center space-x-2 text-lg font-semibold ${
                  activeTab === "Favorites" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Favorites")}
              >
                <FaHeart />
                <span>Favorites</span>
              </button>
              <button
                className={`flex items-center space-x-2 text-lg font-semibold ${
                  activeTab === "Settings" ? "text-teal-400" : "text-gray-600"
                } hover:text-teal-600`}
                onClick={() => setActiveTab("Settings")}
              >
                <FaCog />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
