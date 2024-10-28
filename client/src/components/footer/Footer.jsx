import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
  FaReddit,
} from "react-icons/fa";

const Footer = () => {

  const login = () => {
     localStorage.removeItem("firstLogin");
     
     window.location.href = "/login";
  }
  return (
    <footer className="bg-white bg-opacity-80 px-4 py-8 mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Signup Section */}
          <div className="col-span-2 bg-yellow-400 text-center p-4 md:p-8 rounded-lg flex items-center justify-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                JOIN UiX AND GET 15% OFF
              </h2>
              <button onClick={login} className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                SIGN UP FOR FREE
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h3 className="font-bold mb-2">PRODUCTS</h3>
            <ul className="space-y-2">
              <li>T Shirt</li>
              <li>Shorts</li>
              <li>Accessories</li>
              
              <li>New Arrivals</li>
              <li>Special Offer</li>
              <li>Flat 50% Off!</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">COLLECTIONS</h3>
            <ul className="space-y-2">
              <li>Ultraboost</li>
              <li>Superstar</li>
              <li>NMD</li>
              <li>Stan Smith</li>
              <li>Sustainability</li>
              <li>Predator</li>
              <li>Parley</li>
              <li>Adicolor</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">SUPPORT</h3>
            <ul className="space-y-2">
              <li>Help</li>
              <li>Customer Services</li>
              <li>Returns & Exchanges</li>
              <li>Shipping</li>
              <li>Order Tracker</li>
              <li>Store Finder</li>
              <li>uixClub</li>
              <li>uixClub Terms and Conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">COMPANY INFO</h3>
            <ul className="space-y-2">
              <li>About Us</li>
              <li>stories</li>
              <li> Apps</li>
              <li>Entity Details</li>
              <li>Press</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-center lg:text-left">
              FOLLOW US
            </h3>
            <div className="flex justify-center lg:justify-start space-x-4">
              <FaInstagram
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaTwitter
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaYoutube
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaLinkedin
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
              <FaReddit
                size={30}
                className="text-black hover:text-gray-700 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <ul className="flex justify-center space-x-4 text-sm text-gray-600">
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Cookies</a>
            </li>
          </ul>
          <p className="text-gray-500 text-sm mt-4">
            ©2024 UiX India Marketing Pvt. Ltd
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
