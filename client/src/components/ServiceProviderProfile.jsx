import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ServiceProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    
    const fetchProviderData = async () => {
    
      const mockData = [
        {
          id: '1',
          name: 'John Doe',
          contact: 'johndoe@example.com',
          availability: '9 AM - 6 PM',
          serviceArea: 'Downtown',
          rating: '★★★★☆',
          description: 'Experienced plumber with a knack for quick fixes.',
        },
        {
          id: '2',
          name: 'Jane Smith',
          contact: 'janesmith@example.com',
          availability: '10 AM - 5 PM',
          serviceArea: 'Midtown',
          rating: '★★★★★',
          description: 'Electrician with 5 years of experience and excellent service.',
        },
      ];

      const data = mockData.find((provider) => provider.id === id);
      setProvider(data);
    };

    fetchProviderData();
  }, [id]);

  return (
    <div className="provider-profile min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Service Provider Profile</h2>
      {provider ? (
        <div className="provider-info bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">{provider.name}</h3>
          <p className="text-gray-600 mb-2"><strong>Contact:</strong> {provider.contact}</p>
          <p className="text-gray-600 mb-2"><strong>Availability:</strong> {provider.availability}</p>
          <p className="text-gray-600 mb-2"><strong>Service Area:</strong> {provider.serviceArea}</p>
          <p className="text-gray-600 mb-2"><strong>Rating:</strong> {provider.rating}</p>
          <p className="text-gray-600 mb-4"><strong>Description:</strong> {provider.description}</p>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-700 mt-6">Loading provider information...</p>
      )}
    </div>
  );
}

export default ServiceProviderProfile;
