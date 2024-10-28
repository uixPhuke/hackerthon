import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductList/ProductList";


const Product = () => {
  const state = useContext(GlobalState);
  // console.log(state)
  const [products] = state.productAPI.products;
  const [isAdmin]=state.userAPI.isAdmin
 
  console.log(products) //nhi aara
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => {
          return <ProductList key={product._id} product={product} isAdmin={isAdmin} />;
        })}
      </div>
    </div>
  );
};

export default Product;
