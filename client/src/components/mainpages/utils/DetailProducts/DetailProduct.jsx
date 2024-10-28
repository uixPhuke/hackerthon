import React, { useContext, useEffect,useState } from 'react'
import {useParams,Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState';


const DetailProduct = () => {
    const params =useParams()
    console.log(params);
    const state = useContext(GlobalState);
    const [products] = state.productAPI.products;
    console.log(state);
    console.log(products);
     const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        if (params) {
            products.forEach(product => {
                if(product._id===params.id) setDetailProduct(product)
            })
            
        }

    },[params, products])
    console.log(detailProduct)
     if(detailProduct.length === 0) return null;

    return (
      <div className="p-3">
        <div className="text-white flex flex-col lg:flex-row items-center lg:items-start p-3  lg:p-2 bg-black/80 rounded-lg shadow-lg ">
          <img
            src={detailProduct.images.url}
            alt={detailProduct.title}
            className="w-full lg:w-1/3 h-auto object-contain rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105"
          />
          <div className="flex flex-col w-full lg:w-1/2 mt-6 lg:mt-0 lg:ml-8 space-y-4">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold">{detailProduct.title}</h2>
              <h6 className="text-gray-100">{detailProduct.product_id}</h6>
            </div>
            <span className="text-2xl text-green-600 font-semibold">
              ₹ {detailProduct.price}
            </span>
            <p className="text-gray-200">{detailProduct.description}</p>
            <p className="text-gray-200">{detailProduct.content}</p>
            <p className="text-gray-300">Sold: {detailProduct.sold}</p>
            <div className="flex space-x-4">
              <Link
                to="/cart"
                className="px-6 py-2 bg-slate-400 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 text-center"
              >
                Add to Cart
              </Link>
              <Link
                to="/buy"
                className="px-6 py-2 bg-zinc-600 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 text-cente"
              >
                Buy Now
              </Link>
              <Link
                to="/wishlist"
                className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 text-cente"
              >
                Add to Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DetailProduct