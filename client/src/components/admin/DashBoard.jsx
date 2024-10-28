import { GlobalState } from "../../GlobalState";
import React, { useContext, useState } from "react";
import {
  FaUserCircle,
  FaInbox,
  FaBoxOpen,
  FaHeart,
  FaCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import AdminUsers from "./adminPanelPages/AdminUsers";
import AdminProduct from "./adminPanelPages/AdminProduct";


const DashBoard = () => {
  const state = useContext(GlobalState);
  const [isUserDATA] = state.userAPI.isUserDATA;
  const createProducts = state.productAPI.createProducts;
  
  console.log(state)
  const logout = () => {
    localStorage.removeItem('firstLogin')
    window.location.href = "/login";
   };
  
  
  const [products] = state.productAPI.products;
  // const [userUpdate] = state.userAPI.userUpdate;
  console.log(products)

  console.log(isUserDATA)

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-200">
              Dashboard Content
            </h2>
          </div>
        );
      case "Products":
        return <AdminProduct product={products} create={ createProducts} />
      case "Customer Info":
        return <AdminUsers userDATA={ isUserDATA} />
      case "Support":
        return <div className="p-6">Support Content</div>;
      case "Orders":
        return <div className="p-6">Order Content</div>;
      case "Settings":
        return <div className="p-6">Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="m-7">
      <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 flex">
        {/* Sidebar */}
        <div
          className={`bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg ${
            isSidebarOpen ? "w-64" : "w-20"
          } p-4 text-gray-800 transition-all duration-300 ease-in-out flex flex-col`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              className="text-gray-600"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {/* Show close icon when sidebar is open and hamburger icon when closed */}
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Manager's Profile */}
          <div className="flex items-center space-x-2 mb-6">
            <FaUserCircle className="text-3xl" />
            {isSidebarOpen && (
              <div>
                <h3 className="text-lg font-semibold">Phuke</h3>
                <p className="text-sm text-gray-600">Manager</p>
              </div>
            )}
          </div>

          {/* Sidebar Links */}
          <div className="space-y-4 flex-1">
            <button
              className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-teal-500 hover:text-white transition ${
                activeTab === "Dashboard"
                  ? "bg-teal-500 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("Dashboard")}
            >
              <FaUserCircle className="text-xl" />
              {isSidebarOpen && <span>Dashboard</span>}
            </button>

            <button
              className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-teal-500 hover:text-white transition ${
                activeTab === "Products"
                  ? "bg-teal-500 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("Products")}
            >
              <FaBoxOpen className="text-xl" />
              {isSidebarOpen && <span>Products</span>}
            </button>

            <button
              className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-teal-500 hover:text-white transition ${
                activeTab === "Customer Info"
                  ? "bg-teal-500 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("Customer Info")}
            >
              <FaInbox className="text-xl" />
              {isSidebarOpen && <span>Customer Info</span>}
            </button>

            <button
              className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-teal-500 hover:text-white transition ${
                activeTab === "Support"
                  ? "bg-teal-500 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("Support")}
            >
              <FaHeart className="text-xl" />
              {isSidebarOpen && <span>Support</span>}
            </button>

            <button
              className={`flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-teal-500 hover:text-white transition ${
                activeTab === "Settings"
                  ? "bg-teal-500 text-white"
                  : "text-gray-800"
              }`}
              onClick={() => setActiveTab("Settings")}
            >
              <FaCog className="text-xl" />
              {isSidebarOpen && <span>Settings</span>}
            </button>
          </div>

          {/* Sidebar Footer */}
          <div className="flex-shrink-0 mt-4">
            <button className="flex items-center space-x-2 w-full py-2 px-3 rounded-lg hover:bg-red-600 hover:text-white transition text-gray-800">
              <TbLogout onClick={logout} className="text-xl" />
              {isSidebarOpen && <span>Logout</span>}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md rounded-lg p-6 shadow-lg">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;