import React from 'react'
import { useSelector } from 'react-redux'
import './profile.css'
import {FaUserAlt} from 'react-icons/fa'
import {  useNavigate } from 'react-router-dom'
import profileImage from '../../images/user_profile_image.png'
import {useClearWatchHistoryMutation}from '../../redux/user/userApiSlice'
import WatchHistory from '../../components/WatchHistory/WatchHistory'

const Profile = () => {
  const navigate=useNavigate()
  const {userInfo}=useSelector((state)=>state.auth)
  const [clearWatchHistory]=useClearWatchHistoryMutation()
  
  const handleClearWatchHistory=async()=>{
    try {
      await clearWatchHistory()
    } catch (error) {
      console.error('Error clearing watchlist:', error);
    }
  }

  return (
    <div className='user-profile'>
       <div className="profile-title">
        <h2><FaUserAlt/>  User Profile</h2>
    </div> 
    <div className="profile-card">
   
    <div className="user-info">
      
      <div className="profile-image">
         <img src={profileImage || 'https://wallpapers.com/images/high/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.webp'} alt='profile-image'/> 
      </div>
  
        <h2>{userInfo.name}</h2>
        <span>{userInfo.email}</span>
        <button onClick={()=>navigate('/updateProfile')}>
          Update profile
          </button>
        </div>

    </div>
      <div className="content-consumed">
        <h2>Continue watching</h2>
        <button onClick={handleClearWatchHistory}>Clear all</button>
        <WatchHistory/>  
      </div>
    </div>
  )
}

export default Profile
