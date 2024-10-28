import React, { useState, useEffect, useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegHeart, FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import logo from './uixLogo.png'

const Header = () => {
  const state = useContext(GlobalState);
  // console.log(state);
  // console.log("Header component render");
  const [cart]=state.userAPI.cart
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const [isVisible, setIsVisible] = useState(true); // Track visibility of the header
  const [lastScrollY, setLastScrollY] = useState(0); // Track the last scroll positio

  // const [placeholder, setPlaceholder] = useState("Search");

  const logoutUser = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
  };
  const adminRouter = () => {
    return (
      <Link
        to="/dashboard"
        className="inline-block px-6 py-3 bg-slate-400 text-white font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 hover:text-gray-100"
      >
        {" "}
        ADMIN PANEL
      </Link>
    );
  };

  const accountRouter = () => {
    
    return (
      <div>
        <Link
          onClick={toggleMenu}
          to="/account"
          className="inline-block px-6 py-3 bg-slate-400 text-white font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 hover:text-gray-100"
        >
          ACCOUNT
        </Link>
      </div>
    );
  };

  // const placeholders = useMemo(() => [
  //     "Search for t shirt",
  //     "Search for shorts",
  //     "Search for accessories",
  //     "Search for deals",
  //   ],
  //   []
  // );

  useEffect(() => {
    // console.log('this')
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // useEffect(() => {
  //   const changePlaceholder = () => {
  //     setPlaceholder((prev) => {
  //       const currentIndex = placeholders.indexOf(prev);
  //       return placeholders[(currentIndex + 1) % placeholders.length];
  //     });
  //   };

  //   const intervalId = setInterval(changePlaceholder, 3000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [placeholders]); // Dependency array with memoized placeholders

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed text-white top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-slate-950 shadow-md opacity-90" : "bg-transparent"
      } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-6 transition-all duration-300">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className={`h-8 transition-all duration-300 ${
                isScrolled ? "h-6" : "h-8"
              }`}
            />
          </Link>
          {isAdmin ? (
            <h3 className="inline-block px-6 py-3 text-white font-semibold shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 hover:text-gray-100">
              ADMiN
            </h3>
          ) : (
            ""
          )}
        </div>
        {/* Navigation Links for Large Screens */}
        <nav className="text-white hidden md:flex md:items-center space-x-8 text-sm font-semibold  transition-all duration-300">
          <Link to="/men" className="hover:text-gray-700">
            MEN
          </Link>
          <Link to="/women" className="hover:text-gray-700">
            WOMEN
          </Link>
          <Link to="/kids" className="hover:text-gray-700">
            KIDS
          </Link>
          <Link to="/lifestyle" className="hover:text-gray-700">
            LIFESTYLE
          </Link>

          {isLogged ? (
            isAdmin ? (
              adminRouter()
            ) : (
              accountRouter()
            )
          ) : (
            <Link
              to="/login"
              className="inline-block px-6 py-3 bg-slate-400 text-white font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600 hover:text-gray-100"
            >
              {" "}
              JOIN US
            </Link>
          )}
        </nav>

        {/* Search and Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="search"
              className="bg-gray-100 text-gray-900 pl-4 pr-8 py-2 rounded-full text-sm focus:outline-none transition-all duration-300"
            />
            <HiOutlineSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500" />
          </div>

          {/*<Link to="/profile" className="relative hover:text-gray-700">
            <FaUserCircle className="text-xl transition-all duration-300" />
          </Link>*/}

          {isAdmin ? (
            ""
          ) : (
            <Link to="/wishlist" className="hover:text-gray-700">
              <FaRegHeart className="text-xl transition-all duration-300" />
            </Link>
          )}
          {isAdmin ? (
            ""
          ) : (
            <Link to="/cart" className="relative hover:text-gray-700">
              <IoCartOutline className="text-xl transition-all duration-300" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            </Link>
          )}

          {/* Hamburger Menu for Small Screens */}
          <div className="md:hidden z-50">
            <button onClick={toggleMenu} aria-label="Toggle Menu">
              {isOpen ? (
                <AiOutlineClose size={24} className="text-black" />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sliding Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-slate-200 shadow-lg transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <nav className="flex flex-col p-6 space-y-6 text-black  bg-slate-200 ">
          <Link to="/new" onClick={toggleMenu}>
            New & Featured
          </Link>
          <Link to="/men" onClick={toggleMenu}>
            Men
          </Link>
          <Link to="/women" onClick={toggleMenu}>
            Women
          </Link>
          <Link to="/kids" onClick={toggleMenu}>
            Kids
          </Link>
          <Link to="/sale" onClick={toggleMenu}>
            Sale
          </Link>
          <Link to="/customize" onClick={toggleMenu}>
            Customize
          </Link>
        </nav>

        <div className="p-6 text-sm text-white bg-black">
          <Link
            to="/jordan"
            className="flex items-center space-x-2 mb-4"
            onClick={toggleMenu}
          >
            <img src="../jordan.png" alt="Jordan" className="h-6" />
            <span>Jordan</span>
          </Link>
          <p>
            Become a Member for the best products, inspiration, and stories in
            sport.{" "}
            <Link to="/learn-more" className="underline" onClick={toggleMenu}>
              Learn more
            </Link>
          </p>
          <div className="flex space-x-4 mt-4">
            {isLogged ? (
              accountRouter()
            ) : (
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded-full"
                onClick={toggleMenu}
              >
                Join Us
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
