import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Main Dashboard Pages
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProviderDashboard from './pages/ProviderDashboard';

// Additional Feature Pages
import MapViewPage from './pages/MapViewPage';
import PaymentPage from './pages/PaymentPage';

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow p-4">
                    <Routes>
                        {/* User Dashboard */}
                        <Route path="/user/*" element={<UserDashboard />} />

                        {/* Admin Dashboard */}
                        <Route path="/admin/*" element={<AdminDashboard />} />

                        {/* Provider Dashboard */}
                        <Route path="/provider/*" element={<ProviderDashboard />} />

                        {/* Additional Feature Pages */}
                        <Route path="/map-view" element={<MapViewPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
