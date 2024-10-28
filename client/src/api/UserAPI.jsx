import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/mainpages/utils/PopUps/Popup";
import { API_URL } from "../Config";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userProfile, setUserProfile] = useState([]);
  const [userDATA, setUserDATA] = useState([]);
  const [userEditDATA, setUserEditDATA] = useState([]);
  const [userDeleteDATA, setUserDeleteDATA] = useState([]);
  const [upload, setUpload] = useState([]);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("uixCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("uixCart", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/user/infor`, {
            headers: { Authorization: token },
          });
          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          if (res.data.role === 1) {
            getAllUser();
          }
          setUserProfile(res.data);

          if (cart.length === 0) {
            const savedCart = localStorage.getItem("uixCart");
            if (savedCart) {
              setCart(JSON.parse(savedCart));
            }
          }
        } catch (err) {
          alert(err.response.data.msg);
        }
      }
    };
    getUser();

    const getAllUser = async () => {
      if (token) {
        try {
          const users = await axios.get(`${API_URL}/api/customer`, {
            headers: { Authorization: token },
          });

          setUserDATA(users.data);
        } catch (err) {
          alert(err.response.data.msg);
        }
      }
    };
  }, [token]);
  // Update user information (Admin only)
  const editUser = async (id, updatedData) => {
    if (token && isAdmin) {
      try {
        const updateUser = await axios.put(
          `${API_URL}/api/edit/${id}`,
          updatedData,
          {
            headers: { Authorization: token },
          }
        );

        setUserEditDATA(updateUser.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  const deleteUser = async (id) => {
    if (token && isAdmin) {
      try {
        await axios.delete(`${API_URL}/api/edit/${id}`, {
          headers: { Authorization: token },
        });
        setUserDeleteDATA((prevData) =>
          prevData.filter((user) => user._id !== id)
        );
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };
  const uploads = async (formData) => {
    if (token && isAdmin) {
      try {
        const response = await axios.post(`${API_URL}/api/upload`, formData, {
          headers: {
            headers: { Authorization: token },
          },
        });
        setUpload(response.data);
      } catch (err) {
        alert(err.response.data.msg);
      }
    }
  };

  const addCart = (product) => {
    // if (!isLogged) return alert("Please log in first.");

    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product has already been added to the cart.");
    }
  };

  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    isProfile: [userProfile, setUserProfile],
    isUserDATA: [userDATA, setUserDATA],
    cart: [cart, setCart],
    addCart: addCart,
    editUser: editUser,
    deleteUser: deleteUser,
    uploads: uploads,
    isUpload: [upload, setUpload],
    isUserEditDATA: [userEditDATA, setUserEditDATA],
    isUserDeleteDATA: [userDeleteDATA, setUserDeleteDATA],
  };
};

export default UserAPI;
