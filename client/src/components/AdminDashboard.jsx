// src/components/AdminDashboard.jsx
import { useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];

    if (uploadedFile && (uploadedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || uploadedFile.type === 'text/csv')) {
      setFile(uploadedFile);
      setError(null);
      console.log('Uploaded file:', uploadedFile);
    } else {
      setError("Please upload a valid Excel (.xlsx) or CSV file.");
      setFile(null);
    }
  };

  // Sample chart data
  const chartData = {
    labels: ['Plumber', 'Electrician', 'Carpenter', 'Painter'],
    datasets: [
      {
        label: 'Average Ratings',
        data: [4.2, 4.8, 3.6, 4.5], // Example ratings
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
        text: 'Service Provider Ratings',
      },
    },
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gray-100">
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
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">SmartServe Admin</div>
        <div className="flex space-x-6">
          <a href="/" className="hover:text-blue-200">Dashboard</a>
          <a href="/admin" className="hover:text-blue-200">Manage Providers</a>
          <a href="/reports" className="hover:text-blue-200">Reports</a>
        </div>
      </div>
    </nav>
  );
}

export default AdminDashboard;
