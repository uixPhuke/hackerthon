


function UserProfile() {
  return (
    <div className="user-profile p-4">
      <h2 className="text-xl font-bold">My Profile</h2>
      <div className="past-bookings mt-4">
        <h3 className="text-lg font-semibold">Past Bookings</h3>
        <ul>
          <li>Plumber - 2023-10-15</li>
          <li>Electrician - 2023-11-01</li>
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
