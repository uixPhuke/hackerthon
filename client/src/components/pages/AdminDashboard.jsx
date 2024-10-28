import { Routes, Route } from 'react-router-dom';

// Admin Dashboard Key Components
import ManageUsers from '../components/AdminDashboard/ManageUsers';
import ManageProviders from '../components/AdminDashboard/ManageProviders';
import ServiceAnalytics from '../components/AdminDashboard/ServiceAnalytics';

const AdminDashboard = () => {
    return (
        <div>
            <Routes>
                <Route path="manage-users" element={<ManageUsers />} />
                <Route path="manage-providers" element={<ManageProviders />} />
                <Route path="service-analytics" element={<ServiceAnalytics />} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
