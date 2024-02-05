import React, { useEffect, useState } from 'react'
import './navbar.css'
import navLogo from '../../images/flixxit_logo.png'
import {FaSearch,FaUserCircle,FaCaretDown,FaSignOutAlt,FaBars} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutMutation } from '../../redux/user/userApiSlice'
import {clearCredentials} from '../../redux/auth/authSlice'



const Navbar = () => {

    const [scrolling,setScrolling]=useState(false)
    const [query,setQuery]=useState("")
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    

    
    const toggleSearch = () => {
        setIsSearchVisible(!isSearchVisible);
      };

      const handleSearch = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
         navigate(`/search/${query}`);
         setTimeout(() => {
          setIsSearchVisible(false)
      }, 1000);
        }
      };

      const handleSearchIconClick = () => {
        if (query.length > 0) {
          navigate(`/search/${query}`);
        }
      };

      const handleSearchIconClickAndToggle = () => {
        handleSearchIconClick();  
        toggleSearch();  
      };

    const {userInfo}=useSelector((state)=>state.auth)
   

    const dispatch =useDispatch()
    const navigate=useNavigate()
    const [logout] =useLogoutMutation()

    useEffect(()=>{
        const handleScroll=()=>{
            if(window.scrollY>20){
                setScrolling(true)
            }else{
                setScrolling(false)
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
          }; 
        
    },[])


    const logoutHandler=async()=>{
        try {
           await logout().unwrap()
           dispatch(clearCredentials())
           navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <nav className={`navbar ${scrolling ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
            <section className="left-section">
                
               <div className="nav-logo">
                
               <img src={ navLogo || "https://app.gemoo.com/share/image-annotation/604743199318691840?codeId=vzxlEYOROQBX9&origin=imageurlgenerator&card=604743196353318912"} alt="logo" width='85px' height='25px' />
               </div>
               <div className="nav-links">
               <Link to='/'>Home</Link>
               <Link to='/explore/movie'>Movies</Link>
                <Link to='explore/tv'>TV shows</Link>
                <Link to='/watchlist'>Watchlist</Link>
               
               </div>
            </section>
            <section className="right-section">
                <div className={`search-container ${isSearchVisible ? 'search-visible' : ''}`}>
                {isSearchVisible && (
                    <div className="search-bar">
                        <input 
                            type="text" 
                            placeholder="Search..."
                            onChange={(e)=>setQuery(e.target.value)}
                            onKeyUp={handleSearch}
                         />
                    </div>
                )}
            <div className="search-icon icons" onClick={handleSearchIconClickAndToggle}>
            
                <FaSearch />
                
            </div>

                </div>
          
           

            <div className="profile icons">
                <FaUserCircle className='profile-icon'/> 
                <FaCaretDown className='profile-dropdown'/>
                <div className="options">
                    <span className='profile-dropdown dropdown'><Link to='/profile'>Settings</Link>  </span>
                    <span className='profile-dropdown dropdown'>About us</span>
                    <span className='profile-dropdown dropdown' onClick={logoutHandler}> <FaSignOutAlt /> Logout </span>
                </div>
            </div>
            
            </section>
        </div>

    </nav>
  )
}

export default Navbar
