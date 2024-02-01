import React, { useEffect, useState } from 'react'
import './details.css'
//import { addToWishlistAsync } from '../../redux/auth/authSlice';
import useFetch from '../../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaPlay,FaPlus,FaCheck} from 'react-icons/fa'
import dayjs from 'dayjs'
import Genres from '../../components/Genres/Genres'
import { useAddToWatchlistMutation,useGetWatchlistQuery } from '../../redux/user/userApiSlice'

const Details = () => {
    const {mediaType,id}=useParams()
    const {content,loading}=useFetch(`/${mediaType}/${id}`)
    const {url}=useSelector(state=>state.content)
    const genresData = content?.genre_ids || content?.genres?.map(g => g.id) || [];

    const dispatch=useDispatch()
    const navigate=useNavigate()
   const {userInfo}=useSelector((state)=>state.auth)
   const [addToWatchlist] = useAddToWatchlistMutation();
   const [inWatchList,setInWatchList]=useState(false)
   const { data: getWatchlist } = useGetWatchlistQuery();

   
  useEffect(()=>{
  
    const isInWatchlist = getWatchlist?.some((item) => item.contentId === id);
    setInWatchList(isInWatchlist)
    
  },[getWatchlist,id])

  const handleAddToWatchlist = async () => {
    try {
      if (!userInfo) {
        navigate('/login');
        return;
      }


      if (inWatchList) {
        console.log('Movie is already in the watchlist');
        return;
      }

      const newItem = {
        user: userInfo.id,
        contentId: String(id),
        contentTitle: content?.title || content?.name || content?.original_name,
        contentPoster:  url.poster + content.poster_path,
      };

      const response = await addToWatchlist(newItem).unwrap();
      console.log(response);
      setInWatchList(true);

    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

 
  
    
  return (
    <div className='details'>
      <div className="backdrop">
        <img src={url?.backdrop + content?.backdrop_path} alt="" className='backdrop-image' />
      </div>
      <div className="banner-info">
      
      <span className="banner-title">
         <h1>{content?.title || content?.name || content?.original_name}</h1> 
      </span>
      <span className="banner-description">
        <h3>Overview</h3>
        {content?.overview}
         
      </span>
      <span>
        {`${dayjs(content?.release_date).format('YYYY')}`}
      </span>
      <span>
       IMDb {content?.vote_average.toFixed(1)}
      </span>
      <Genres data={genresData}/>
      <span className="banner-btns">
          <button className='banner-btn'><FaPlay/><span>Play</span></button>
        
          
          
          
              {inWatchList ? (
           <button className="banner-btn"><FaCheck/><span> Added </span></button>
          ) : (
            <button className="banner-btn" onClick={handleAddToWatchlist}><FaPlus/><span>  Watchlist</span></button>
          )}
      </span>
     
    </div>
      
    </div>
  )
}

export default Details
