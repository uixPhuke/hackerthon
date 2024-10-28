import { Routes, Route } from 'react-router-dom';

// User Dashboard Key Components
import UserProfile from '../components/UserDashboard/UserProfile';
import ServiceSearch from '../components/UserDashboard/ServiceSearch';
import ServiceDetails from '../components/UserDashboard/ServiceDetails';

const UserDashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="profile" element={<UserProfile />} />
                <Route path="service-search" element={<ServiceSearch />} />
                <Route path="service-details/:serviceId" element={<ServiceDetails />} />
            </Routes>
        </div>
    );
};

export default UserDashboard;
