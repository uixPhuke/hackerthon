import { FaUserCircle } from 'react-icons/fa';
import { MdEventAvailable } from 'react-icons/md';

function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 min-h-screen py-10 px-6">
      <div className="container mx-auto max-w-lg">
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
          <FaUserCircle className="text-blue-600 text-6xl mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
          <p className="text-gray-500">Welcome back! Check your past bookings and manage your account.</p>
        </div>

        {/* Past Bookings Section */}
        <div className="past-bookings bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-800 flex items-center mb-6">
            <MdEventAvailable className="text-blue-600 mr-2" /> Past Bookings
          </h3>
          <ul className="space-y-4">
            <li className="bg-blue-50 p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Plumber</span>
              <span className="text-gray-500">2023-10-15</span>
            </li>
            <li className="bg-blue-50 p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="text-lg font-medium text-gray-700">Electrician</span>
              <span className="text-gray-500">2023-11-01</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
