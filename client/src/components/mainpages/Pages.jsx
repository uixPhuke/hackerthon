import React from 'react'
import Product from './products/Product';
import Login from './login/Login';
import Register from './login/Register';
import Cart from './cart/Cart';
import { Route, Routes } from 'react-router-dom';
import DetailProduct from './utils/DetailProducts/DetailProduct';
import UserProfile from './account/UserProfile';
import DashBoard from '../admin/DashBoard';
import AdminOrders from '../admin/adminPanelPages/AdminOrders';

const Pages = () => {
  return (
    <div className="pt-16">
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<UserProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/detail/:id" element={<DetailProduct />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/order" element={<AdminOrders />} />
      </Routes>
    </div>
  );
}

export default Pages