import React,{useContext} from "react";

import ButtonRender from "./ButtonRender";

const ProductList = ({ product,isAdmin  }) => {
  
 
  return (
    <div className="bg-white bg-opacity-80 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105 hover:shadow-lg max-w-full text-center p-4 m-2">
      {isAdmin && <input type="checkbox" checked={product.checked} />}
      <img
        src={product.images.url}
        alt={product.title}
        className="w-full h-auto transition-transform transform hover:scale-110"
      />

      <div className="p-4 bg-white bg-opacity-90">
        <h2 className="text-xl font-bold mb-2 truncate" title={product.title}>
          {product.title}
        </h2>
        <span className="text-lg font-bold text-red-500 mb-2 block">
          ₹{product.price}
        </span>
        <p className="text-sm text-gray-700">{product.description}</p>
      </div>

      <ButtonRender product={product}/>
    </div>
  );
};

export default ProductList;
