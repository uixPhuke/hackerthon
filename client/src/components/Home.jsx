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
    <div className="services mt-4 grid grid-cols-2 gap-4">
      {filteredServices.length > 0 ? (
        filteredServices.map((service, index) => (
          <div key={index} className="service-card border p-4 rounded">
            <h2 className="font-semibold">{service.name}</h2>
            <p>Available in {service.area}, Ratings: {service.rating}</p>
          </div>
        ))
      ) : (
        <p>No services found.</p>
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
    <div className="home p-4">
      <h1 className="text-2xl font-bold">SmartServe Service Directory</h1>
      <input
        type="text"
        placeholder="Search services..."
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border border-gray-300 rounded mt-4 w-full"
      />
      <Suspense fallback={<div>Loading Services...</div>}>
        <ServiceList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

export default Home;
