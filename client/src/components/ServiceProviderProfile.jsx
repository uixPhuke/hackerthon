import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ServiceProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    // Mock fetch for provider data based on `id`
    const fetchProviderData = async () => {
      // Simulating a fetch call with mock data
      const data = {
        id,
        name: "John Doe",
        contact: "johndoe@example.com",
        availability: "9 AM - 6 PM",
        serviceArea: "Downtown",
      };
      setProvider(data);
    };

    fetchProviderData();
  }, [id]);

  return (
    <div className="provider-profile p-4">
      <h2 className="text-xl font-bold">Service Provider Profile</h2>
      {provider ? (
        <div className="provider-info mt-4">
          <p><strong>Name:</strong> {provider.name}</p>
          <p><strong>Contact:</strong> {provider.contact}</p>
          <p><strong>Availability:</strong> {provider.availability}</p>
          <p><strong>Service Area:</strong> {provider.serviceArea}</p>
          <button className="bg-blue-500 text-white p-2 mt-4 rounded">Book Now</button>
        </div>
      ) : (
        <p>Loading provider information...</p>
      )}
    </div>
  );
}

export default ServiceProviderProfile;
