import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../components/mainpages/utils/PopUps/Popup";

const AdminAPI = (token) => {
 
  const [userDATA, setUserDATA] = useState([]);
  


  useEffect(() => {
    const getAllUser = async () => {
      if (token) {
          try {
             
          const users = await axios.get("/api/customer", {
            headers: { Authorization: token },
          });
          //           // const updateUser = await axios.get('/user/edituser', {
          //           //   headers:{Authorization:token}
          //           // })
          setUserDATA(users);
          console(users);
          //  setUserUpdate(updateUser.data);
          
          
        } catch (err) {
          alert(err.response.data.msg);
        }
      }
    };
    getAllUser();
  }, [token]);

 

  return {
    
    isUserDATA: [userDATA, setUserDATA],
   
    // userUpdate:[userUpdate,setUserUpdate]
  };
};

export default AdminAPI;
