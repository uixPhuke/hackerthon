import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Config";

const ProductAPI = () => {
  const [products, setProducts] = useState([]);
  const [createProduct, setCreateProduct] = useState([]);

  const getProducts = async () => {
    const res = await axios.get(`${API_URL}/api/products`);
    // console.log(res)
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);
  //
  const createProducts = async (newProduct) => {
    try {
      const res = await axios.post(`${API_URL}/api/products`, newProduct);
      setCreateProduct(res.data.createProduct);
      getProducts(); // Refresh products list after creation
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return {
    products: [products, setProducts],
    createProduct: [createProduct, setCreateProduct],
    createProducts: createProducts,
  };
};

export default ProductAPI;
