import { createContext, useEffect, useState } from "react";
import ProductAPI from "./api/ProductAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import { API_URL } from "./Config";


export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  
   const refreshToken = async () => {
     try {
       const res = await axios.get(`${API_URL}/user/refresh_token`, {
         withCredentials: true,
       },{});
       setToken(res.data.accesstoken);
     } catch (error) {
       console.error(
         "Error refreshing token:",
         error.response?.data || error.message
       );
     }
   };

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken();
        
    },[])

  const state = {
    token: [token, setToken],
      productAPI: ProductAPI(),
    userAPI: UserAPI(token),
   
  };

  ProductAPI();
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};