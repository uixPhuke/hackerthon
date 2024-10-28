// import React, { useContext, useEffect, useState } from "react";
// import { GlobalState } from "../../../GlobalState";

// const Cart = () => {
//   const state = useContext(GlobalState);
//   const [cart, setCart] = state.userAPI.cart;
//   const [country, setCountry] = useState("");
//   const [stateCity, setStateCity] = useState("");
//   const [zipCode, setZipCode] = useState("");
//   const [couponCode, setCouponCode] = useState("");

// // console.log(cart)
//   // useEffect(() => {
//   //   localStorage.setItem('uixCart',JSON.stringify(state.userAPI.cart))
//   // },[state.userAPI.cart])

//   const incrementQuantity = (index) => {
//     const newCart = [...cart];
//     newCart[index].quantity += 1;
//     setCart(newCart);
//   };

//   const decrementQuantity = (index) => {
//     const newCart = [...cart];
//     if (newCart[index].quantity > 1) {
//       newCart[index].quantity -= 1;
//       setCart(newCart);
//     }
//   };

//   if (cart.length === 0)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <h2 className="text-2xl text-gray-600">Nothing in cart</h2>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Cart Items */}
//         <div className="flex-1">
//           <h2 className="text-3xl font-semibold mb-6">Shopping Bag</h2>
//           <p className="text-gray-500 mb-4">{cart.length} items in your bag.</p>
//           <div className="space-y-4">
//             {cart.map((product, index) => (
//               <div
//                 key={index}
//                 className="flex flex-col md:flex-row justify-between items-center p-4 bg-white/70 shadow-lg rounded-lg"
//               >
//                 <img
//                   className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg"
//                   src={product.images.url}
//                   alt={product.title}
//                 />
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full p-4">
//                   <div className="flex flex-col space-y-2 mb-4 md:mb-0">
//                     <h2 className="text-xl font-semibold text-gray-800">
//                       {product.title}
//                     </h2>
//                     <h6 className="text-sm text-gray-500">
//                       {product.product_id}
//                     </h6>
//                     <p className="text-gray-600">Color: {product.color}</p>
//                     <p className="text-gray-600">Size: {product.size}</p>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     <span className="text-lg font-bold text-gray-800">
//                       ₹{product.price}
//                     </span>
//                     <div className="flex items-center border rounded-lg">
//                       <button
//                         className="px-2 py-1"
//                         onClick={() => decrementQuantity(index)}
//                       >
//                         -
//                       </button>
//                       <input
//                         className="w-12 text-center border-x outline-none"
//                         type="number"
//                         value={product.quantity}
//                         readOnly
//                       />
//                       <button
//                         className="px-2 py-1"
//                         onClick={() => incrementQuantity(index)}
//                       >
//                         +
//                       </button>
//                     </div>
//                     <span className="text-lg font-bold text-gray-800">
//                       ₹{(product.price * product.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Summary Section */}
//         <div className="w-full lg:w-1/3">
//           {/* Calculated Shipping */}
//           <div className="p-4 bg-white/70 shadow-lg rounded-lg mb-6">
//             <h3 className="text-xl font-semibold mb-4">Calculated Shipping</h3>
//             <div className="space-y-4">
//               <select
//                 className="w-full p-2 border rounded-lg"
//                 value={country}
//                 onChange={(e) => setCountry(e.target.value)}
//               >
//                 <option value="">Country</option>
//                 <option value="USA">USA</option>
//                 <option value="Canada">Canada</option>
//                 {/* Add more options as needed */}
//               </select>
//               <div className="flex space-x-4">
//                 <input
//                   className="flex-1 p-2 border rounded-lg"
//                   type="text"
//                   placeholder="State / City"
//                   value={stateCity}
//                   onChange={(e) => setStateCity(e.target.value)}
//                 />
//                 <input
//                   className="w-1/3 p-2 border rounded-lg"
//                   type="text"
//                   placeholder="ZIP Code"
//                   value={zipCode}
//                   onChange={(e) => setZipCode(e.target.value)}
//                 />
//               </div>
//               <button className="w-full bg-black text-white p-2 rounded-lg">
//                 Update
//               </button>
//             </div>
//           </div>

//           {/* Coupon Code */}
//           <div className="p-4 bg-white/70 shadow-lg rounded-lg mb-6">
//             <h3 className="text-xl font-semibold mb-4">Coupon Code</h3>
//             <p className="text-sm text-gray-500 mb-4">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//               eiusmod tempor incididunt ut labore et dolore magna aliqua.
//             </p>
//             <input
//               className="w-full p-2 border rounded-lg mb-4"
//               type="text"
//               placeholder="Coupon Code"
//               value={couponCode}
//               onChange={(e) => setCouponCode(e.target.value)}
//             />
//             <button className="w-full bg-black text-white p-2 rounded-lg">
//               Apply
//             </button>
//           </div>

//           {/* Cart Total */}
//           <div className="p-4 bg-white/70 shadow-lg rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">Cart Total</h3>
//             <div className="space-y-2 text-lg">
//               <div className="flex justify-between">
//                 <span>Cart Subtotal</span>
//                 <span>
//                   ₹
//                   {cart
//                     .reduce(
//                       (sum, product) => sum + product.price * product.quantity,
//                       0
//                     )
//                     .toFixed(2)}
//                 </span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>Free</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Discount</span>
//                 <span>- ₹40.00</span>
//               </div>
//               <div className="flex justify-between text-orange-500 font-bold">
//                 <span>Total</span>
//                 <span>
//                   ₹
//                   {(
//                     cart.reduce(
//                       (sum, product) => sum + product.price * product.quantity,
//                       0
//                     ) - 40
//                   ).toFixed(2)}
//                 </span>
//               </div>
//             </div>
//             <button className="w-full bg-black text-white p-2 rounded-lg mt-4">
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
 



import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [country, setCountry] = useState("");
  const [stateCity, setStateCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      setCart(newCart);
    }
  };

  const deleteItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl text-gray-600">Nothing in cart</h2>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <h2 className="text-3xl font-semibold mb-6 text-white">Shopping Bag</h2>
          <p className="text-white mb-4">{cart.length} items in your bag.</p>
          <div className="space-y-4">
            {cart.map((product, index) => (
              <div
                key={index}
                className="relative flex flex-col md:flex-row justify-between items-center p-4 bg-white/70 shadow-lg rounded-lg"
              >
                <img
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg"
                  src={product.images.url}
                  alt={product.title}
                />
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full p-4">
                  <div className="flex flex-col space-y-2 mb-4 md:mb-0">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.title}
                    </h2>
                    <h6 className="text-sm text-gray-500">
                      {product.product_id}
                    </h6>
                    <p className="text-gray-600">Color: {product.color}</p>
                    <p className="text-gray-600">Size: {product.size}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-bold text-gray-800">
                      ₹{product.price}
                    </span>
                    <div className="flex items-center border rounded-lg">
                      <button
                        className="px-2 py-1"
                        onClick={() => decrementQuantity(index)}
                      >
                        -
                      </button>
                      <input
                        className="w-12 text-center border-x outline-none"
                        type="number"
                        value={product.quantity}
                        readOnly
                      />
                      <button
                        className="px-2 py-1"
                        onClick={() => incrementQuantity(index)}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-bold text-gray-800">
                      ₹{(product.price * product.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                {/* Delete Button */}
                <div className="absolute right-4 bottom-4">
                  <button
                    className="text-red-500 hover:text-red-700 font-bold"
                    onClick={() => deleteItem(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-1/3">
          {/* Calculated Shipping */}
          <div className="p-4 bg-white/70 shadow-lg rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Calculated Shipping</h3>
            <div className="space-y-4">
              <select
                className="w-full p-2 border rounded-lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                {/* Add more options as needed */}
              </select>
              <div className="flex space-x-4">
                <input
                  className="flex-1 p-2 border rounded-lg"
                  type="text"
                  placeholder="State / City"
                  value={stateCity}
                  onChange={(e) => setStateCity(e.target.value)}
                />
                <input
                  className="w-1/3 p-2 border rounded-lg"
                  type="text"
                  placeholder="ZIP Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <button className="w-full bg-black text-white p-2 rounded-lg">
                Update
              </button>
            </div>
          </div>

          {/* Coupon Code */}
          <div className="p-4 bg-white/70 shadow-lg rounded-lg mb-6">
            <h3 className="text-xl font-semibold mb-4">Coupon Code</h3>
            <p className="text-sm text-gray-500 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <input
              className="w-full p-2 border rounded-lg mb-4"
              type="text"
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="w-full bg-black text-white p-2 rounded-lg">
              Apply
            </button>
          </div>

          {/* Cart Total */}
          <div className="p-4 bg-white/70 shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Cart Total</h3>
            <div className="space-y-2 text-lg">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span>
                  ₹
                  {cart
                    .reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>- ₹40.00</span>
              </div>
              <div className="flex justify-between text-orange-500 font-bold">
                <span>Total</span>
                <span>
                  ₹
                  {(
                    cart.reduce(
                      (sum, product) => sum + product.price * product.quantity,
                      0
                    ) - 40
                  ).toFixed(2)}
                </span>
              </div>
            </div>
            <button className="w-full bg-black text-white p-2 rounded-lg mt-4">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
