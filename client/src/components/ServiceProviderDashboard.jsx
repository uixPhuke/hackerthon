import { useState } from 'react';

const ServiceProviderDashboard = () => {
    const [providers, setProviders] = useState([]);
    const [newProvider, setNewProvider] = useState({
        name: '',
        contactInfo: '',
        availability: '',
        serviceArea: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProvider({ ...newProvider, [name]: value });
    };

    const handleAddProvider = () => {
        // Simulate adding a provider locally
        const provider = { id: Date.now(), ...newProvider }; // Simulated unique ID
        setProviders([...providers, provider]);
        setNewProvider({ name: '', contactInfo: '', availability: '', serviceArea: '' });
    };

    const handleDeleteProvider = (id) => {
        setProviders(providers.filter(provider => provider.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Service Provider Dashboard</h2>
            
            <div className="mb-6 p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-2">Add New Service Provider</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProvider.name}
                    onChange={handleChange}
                    className="p-2 border rounded mb-2 w-full"
                />
                <input
                    type="text"
                    name="contactInfo"
                    placeholder="Contact Info"
                    value={newProvider.contactInfo}
                    onChange={handleChange}
                    className="p-2 border rounded mb-2 w-full"
                />
                <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    value={newProvider.availability}
                    onChange={handleChange}
                    className="p-2 border rounded mb-2 w-full"
                />
                <input
                    type="text"
                    name="serviceArea"
                    placeholder="Service Area"
                    value={newProvider.serviceArea}
                    onChange={handleChange}
                    className="p-2 border rounded mb-4 w-full"
                />
                <button
                    onClick={handleAddProvider}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Provider
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h3 className="text-xl font-semibold mb-2 p-4">Service Providers List</h3>
                <ul>
                    {providers.map((provider) => (
                        <li key={provider.id} className="border-b p-4 flex justify-between items-center">
                            <div>
                                <h4 className="font-semibold">{provider.name}</h4>
                                <p>Contact: {provider.contactInfo}</p>
                                <p>Availability: {provider.availability}</p>
                                <p>Service Area: {provider.serviceArea}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteProvider(provider.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ServiceProviderDashboard;
