import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import {FaUserAlt} from 'react-icons/fa'
import { setCredentials } from '../../redux/auth/authSlice'
import { Link } from 'react-router-dom'


const Profile = () => {
    const {userInfo}=useSelector((state)=>state.auth)
  return (
    <div className='user-profile'>
      <div className="profile-title">
        <h2>User Profile</h2>
    </div> 
    <div className="profile-image">
        <FaUserAlt/>
    </div>

      <span>{userInfo.name}</span>
      <span>{userInfo.email}</span>
      <button>
         <Link to ='/updateProfile'>Update profile</Link>
        </button>
     
    </div>
  )
}

export default Profile
