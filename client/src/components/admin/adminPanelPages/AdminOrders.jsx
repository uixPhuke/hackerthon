import React from "react";

const orders = [
  {
    id: "#78522135",
    productName: "Smart Watch",
    address: "351 Sherwood Forest Drive",
    date: "20/03/2021",
    price: "$376.00",
    status: "Complete",
  },
  {
    id: "#78522135",
    productName: "Headphones",
    address: "6391 Elgin St. Celina",
    date: "21/03/2021",
    price: "$276.00",
    status: "Pending",
  },
  {
    id: "#78522135",
    productName: "Iphone Pro",
    address: "8502 Preston Rd. Inglewood",
    date: "01/04/2021",
    price: "$300.00",
    status: "Canceled",
  },
  // Add more orders here...
];

const OrderPage = () => {
  return (
    <div className="p-8 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Order</h2>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Mar-April,2021
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100 transition duration-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {order.id}
                </td>
                <td className="py-3 px-6 text-left">{order.productName}</td>
                <td className="py-3 px-6 text-left">{order.address}</td>
                <td className="py-3 px-6 text-left">{order.date}</td>
                <td className="py-3 px-6 text-left">{order.price}</td>
                <td className="py-3 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs ${
                      order.status === "Complete"
                        ? "bg-green-200 text-green-600"
                        : order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>Showing 1 to 10 of 100 entries</div>
        <div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 hover:bg-blue-600">
            1
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
