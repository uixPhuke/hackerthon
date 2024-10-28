import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ServiceProviderProfile from './components/ServiceProviderProfile';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/home" element={<Home />} /> 
        <Route path="/provider/:id" element={<ServiceProviderProfile />} />
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
