const UserProfile = () => (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h2>
        <p className="text-gray-700">Jane Doe</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Edit Profile
        </button>
    </div>
);

export default UserProfile;
