import React, { useContext, useState } from "react";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { GlobalState } from "../../../GlobalState";

const AdminUsers = () => {
  const state = useContext(GlobalState);
  const {
    isUserDATA: [userDATA, setUserDATA],
    editUser,
    deleteUser,
  } = state.userAPI;

  const [searchTerm, setSearchTerm] = useState("");
  const [editUserState, setEditUserState] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (customer) => {
    setEditUserState(customer);
    setEditedName(customer.name);
    setEditedEmail(customer.email);
  };

  const handleEditSave = async () => {
    if (editUserState) {
      const updatedData = { name: editedName, email: editedEmail };
      await editUser(editUserState._id, updatedData);
      setUserDATA(
        userDATA.map((user) =>
          user._id === editUserState._id
            ? { ...user, name: editedName, email: editedEmail }
            : user
        )
      );
      setEditUserState(null);
    }
  };

  const handleDelete = async (customerId) => {
    // Call the deleteUser function from UserAPI
    await deleteUser(customerId);
    // Update the local state to remove the deleted user
    setUserDATA(userDATA.filter((user) => user._id !== customerId));
  };

  const filteredCustomers = userDATA.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 p-6">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Customer Info</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {editUserState && (
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-4">Edit User</h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              placeholder="Name"
              className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              placeholder="Email"
              className="block w-full mb-4 p-2 border border-gray-300 rounded-md"
            />
            <button
              onClick={handleEditSave}
              className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditUserState(null)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        )}

        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-teal-100 transition-colors duration-200"
              >
                <td className="px-4 py-2">{customer._id}</td>
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2 flex space-x-4">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(customer._id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
