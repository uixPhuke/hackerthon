import React from 'react'
import { GlobalState } from '../../../GlobalState';
import { useContext } from 'react';
import UserInfo from '../utils/UserAccount/UserInfo';
//import Settings from '../utils/UserAccount/Settings';
import DashBoard from '../../admin/DashBoard';
const UserProfile = () => {
    const state = useContext(GlobalState);
    console.log(state);
    const [isProfile] = state.userAPI.isProfile;
    console.log(isProfile)
  return (
    <div>
      <UserInfo key={isProfile.id} userData={isProfile} />;
     
   
      
    </div>
  );
}

export default UserProfile