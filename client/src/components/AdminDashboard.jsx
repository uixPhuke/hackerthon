// src/components/Dashboard.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("dashboard");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || uploadedFile.type === 'text/csv')) {
      setFile(uploadedFile);
      setError(null);
    } else {
      setError("Please upload a valid Excel (.xlsx) or CSV file.");
      setFile(null);
    }
  };

  // Sample chart data
  const chartData = {
    labels: ['Profile', 'Posts', 'Users', 'Comments'],
    datasets: [
      {
        label: 'Engagement Level',
        data: [4.2, 5.0, 3.8, 4.5], // Example data points
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Engagement Across Tabs',
      },
    },
  };

  const renderTabContent = () => {
    switch (tab) {
      case "profile":
        return <p>Profile Component Loaded</p>;
      case "posts":
        return <p>Posts Component Loaded</p>;
      case "users":
        return <p>Users Component Loaded</p>;
      case "comments":
        return <p>Comments Component Loaded</p>;
      default:
        return <p>Dashboard Overview Component Loaded</p>;
    }
  };

  return (
    <div className="dashboard min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
        
        {/* Bulk Upload Section */}
        <div className="bulk-upload bg-white shadow-md rounded-lg p-6 mb-8">
          <label htmlFor="upload" className="block text-lg font-semibold mb-2">Bulk Upload Providers</label>
          <input
            type="file"
            id="upload"
            onChange={handleFileUpload}
            className="p-3 border border-gray-300 rounded-md w-full"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />
          {file && <p className="mt-3 text-green-600">File selected: {file.name}</p>}
          {error && <p className="mt-3 text-red-600">{error}</p>}
        </div>

        {/* Ratings Chart */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Service Ratings</h3>
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Dynamic Tab Content */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

// Navbar Component
// Navbar Component
// Navbar Component
// Navbar Component
// Navbar Component

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-neutral-900 text-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto flex items-center p-4">
        <div className="text-2xl font-bold mr-4">SmartServe Admin</div>
        
        {/* Links for Larger Screens, aligned to the right */}
        <div className="hidden md:flex ml-auto space-x-6">
          <a href="/" className="hover:text-blue-200">Dashboard</a>
          <a href="/admin" className="hover:text-blue-200">Manage Providers</a>
          <a href="/reports" className="hover:text-blue-200">Reports</a>
        </div>

        {/* Menu Button for Smaller Screens */}
        <div className="md:hidden ml-auto">
          <button
            onClick={toggleMenu}
            className="bg-blue-500 hover:bg-blue-400 text-white rounded-md px-4 py-2 transition duration-200"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Slide-in Mobile Menu from the Right */}
      <div
        className={`absolute top-full right-0 w-2/3 bg-green-600 text-white transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } z-10`}
      >
        <div className="flex flex-col items-start p-4 space-y-4">
          <button onClick={toggleMenu} className="text-white text-2xl font-bold self-end">
            &times;
          </button>
          <a href="/" className="hover:text-green-200 text-lg">Dashboard</a>
          <a href="/admin" className="hover:text-green-200 text-lg">Manage Providers</a>
          <a href="/reports" className="hover:text-green-200 text-lg">Reports</a>
        </div>
      </div>
    </nav>
  );
}






