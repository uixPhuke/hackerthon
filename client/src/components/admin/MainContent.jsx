import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { ResponsiveLine } from "@nivo/line"; // for charts
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";

const MainContent = () => {
  const state = useContext(GlobalState);
  const [isUserDATA] = state.userAPI.isUserDATA;
  const [products] = state.productAPI.products;

  console.log(isUserDATA);
  console.log(products);

  const lineData = [
    {
      id: "products",
      color: "hsl(217, 70%, 50%)",
      data: products.map((product, index) => ({
        x: product.title,
        y: 500,
      })),
    },
  ];

  const barData = products.map((product) => ({
    product: product.title,
    price: 700,
  }));

  const pieData = isUserDATA.map((user) => ({
    id: user.name,
    value: 200,
  }));

  return (
    <main className="p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Total MRR</h2>
          <p className="text-2xl">$356.48K</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Net New MRR</h2>
          <p className="text-2xl">$26.06K</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Churned MRR</h2>
          <p className="text-2xl">$8.06K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Monthly Recurring Revenue</h2>
          {/*<ResponsiveLine data={lineData} /* other chart settings / />*/}
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Website Revenue</h2>
          {/*<ResponsiveBar data={barData} /* other chart settings  />*/}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Visitors</h2>
          {/* <ResponsivePie data={pieData} /* other chart settings / />*/}
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg">Net MRR Churn Rate</h2>
          {/*<ResponsiveBar data={barData} /* other chart settings / />*/}
        </div>
      </div>
    </main>
  );
};

export default MainContent;