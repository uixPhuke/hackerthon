const ServiceSearch = () => (
    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Find a Service</h2>
        <input type="text" className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Search..." />
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
            Search
        </button>
    </div>
);

export default ServiceSearch;
