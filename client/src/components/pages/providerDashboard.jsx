import { Routes, Route } from 'react-router-dom';

// Provider Dashboard Key Components
import ProviderProfile from '../components/ProviderDashboard/ProviderProfile';
import AvailabilityManagement from '../components/ProviderDashboard/AvailabilityManagement';
import RespondToRequests from '../components/ProviderDashboard/RespondToRequests';

const ProviderDashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="profile" element={<ProviderProfile />} />
                <Route path="availability" element={<AvailabilityManagement />} />
                <Route path="respond-to-requests" element={<RespondToRequests />} />
            </Routes>
        </div>
    );
};

export default ProviderDashboard;
