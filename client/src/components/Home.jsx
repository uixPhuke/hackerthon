// src/components/Home.jsx
import { useState, Suspense } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes

// ServiceList Component for Displaying Services
const ServiceList = ({ searchTerm }) => {
  const services = [
    { name: "Plumber", area: "Downtown", rating: "★★★★☆" },
    { name: "Electrician", area: "Midtown", rating: "★★★★★" },
    { name: "Carpenter", area: "Uptown", rating: "★★★☆☆" },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="services mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredServices.length > 0 ? (
        filteredServices.map((service, index) => (
          <div key={index} className="service-card border border-gray-200 rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105">
            <h2 className="font-semibold text-lg text-blue-600">{service.name}</h2>
            <p className="text-gray-600">Available in <span className="font-medium">{service.area}</span></p>
            <p className="text-yellow-500">Ratings: {service.rating}</p>
          </div>
        ))
      ) : (
        <p className="text-red-500">No services found.</p>
      )}
    </div>
  );
};

// Define prop types for ServiceList
ServiceList.propTypes = {
  searchTerm: PropTypes.string.isRequired,  // Define searchTerm as a required string
};

function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Civvia Directory</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-3 border border-gray-300 rounded-lg shadow-md w-full max-w-md"
        />
      </div>
      <Suspense fallback={<div className="text-center">Loading Services...</div>}>
        <ServiceList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

export default Home;
