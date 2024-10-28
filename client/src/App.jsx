import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ServiceProviderProfile from './components/ServiceProviderProfile';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import SignIn from './components/SignIn';
import Register from './components/SignUp'; // Import Register component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<Register />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/provider/:id" element={<ServiceProviderProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
