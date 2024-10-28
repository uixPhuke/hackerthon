import React from 'react'
import {
  FaUserAlt,
  FaMapMarkerAlt,
  FaLink,
  FaCog,
  FaRegEnvelope,
} from "react-icons/fa";

const Settings = ({ settings }) => {
    console.log(settings)
  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/4 p-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <FaUserAlt />
              <span>Account Details</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt />
              <span>Delivery Addresses</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaCog />
              <span>Shop Preferences</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaRegEnvelope />
              <span>Communication Preferences</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaLink />
              <span>Linked Accounts</span>
            </li>
          </ul>
        </div>
        <div className="lg:w-3/4 p-4">
          <h2 className="text-xl font-bold mb-4">Account Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value="rohanux@gmail.com"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                value="password"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="Add Phone Number"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value="2002-03-31"
                className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <select className="mt-1 block w-full border border-gray-300 p-2 rounded-md">
                <option>India</option>
                <option>USA</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings