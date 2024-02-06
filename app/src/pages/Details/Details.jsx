import React, { useEffect, useState } from 'react'
import './details.css'

import useFetch from '../../hooks/useFetch'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {FaPlay,FaPlus,FaCheck, FaStar, FaSave, FaRegBookmark, FaBookmark} from 'react-icons/fa'
import dayjs from 'dayjs'
import Genres from '../../components/Genres/Genres'
import { useAddToWatchlistMutation,useRemoveFromWatchlistMutation,useGetRatingQuery,useGetWatchlistQuery, useAddToWatchHistoryMutation } from '../../redux/user/userApiSlice'
import Rating from '../../components/Rating/Rating'
import SliderList from '../../components/SliderList/SliderList'

const Details = () => {
    const {mediaType,id}=useParams()
    const {content,loading}=useFetch(`/${mediaType}/${id}`)
    const {url}=useSelector(state=>state.content)
    const genresData = content?.genre_ids || content?.genres?.map(g => g.id) || [];

    const dispatch=useDispatch()
    const navigate=useNavigate()
   const {userInfo}=useSelector((state)=>state.auth)
   const [addToWatchlist] = useAddToWatchlistMutation();
   const [removeFromWatchlist]=useRemoveFromWatchlistMutation()
   const { data: getWatchlist,error: watchlistError, isLoading: watchlistIsLoading } = useGetWatchlistQuery();
   const {data:getRating,error: ratingError, isLoading: ratingIsLoading }= useGetRatingQuery(id)
   const [addToWatchHistory]=useAddToWatchHistoryMutation()

   const [inWatchList,setInWatchList]=useState(false)
   const[inWatchHistory,setInWatchHistory]=useState(false)
  

  useEffect(() => {
    const fetchData = () => {
      try {
        const isInWatchlist = getWatchlist?.some((item) => item.contentId === id);
        setInWatchList(isInWatchlist);
        getRating
        console.log(getRating)
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getWatchlist,getRating, id]);

   
  const handleAddToWathHistory = async () => {
    try {
      if (!userInfo) {
        navigate('/login');
        return;
      }


      if (inWatchHistory) {
        console.log('Movie is already in the watchHistory');
        return;
      }

      const newItem = {
        user: userInfo.id,
        contentId: String(id),
        contentTitle: content?.title || content?.name || content?.original_name,
        contentPoster:  url.poster + content.poster_path,
        contentType:mediaType,
        contentRating:content?.vote_average.toFixed(1)
      };

      const response = await addToWatchHistory(newItem).unwrap();
      console.log(response);
      setInWatchHistory(true);

    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };


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
        contentType:mediaType,
        contentRating:content?.vote_average.toFixed(1)
      };

      const response = await addToWatchlist(newItem).unwrap();
      console.log(response);
      setInWatchList(true);

    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const handleRemoveFromWatchlist=async()=>{
    try {
      const formatcontentId=String(id)
        await removeFromWatchlist( formatcontentId ).unwrap()


       
    } catch (error) {
       console.error('Error removing from watchlist:', error);
    }
  }

 
  
    
  return (
    <>
      <div className='details'>
      <div className="backdrop">
        <img src={url?.backdrop + content?.backdrop_path} alt="" className='backdrop-image' />
      </div>
      <div className="banner-info">
      
          <span className="banner-title">
            <h1>{content?.title || content?.name || content?.original_name}</h1> 
          </span>
          <div className="other-info">
            <span>
            {mediaType.toUpperCase()}
            </span>
              <span>
                {`${dayjs(content?.release_date).format('YYYY')}`}
              </span>
              <span className='imdb-rating'>
              IMDb : <FaStar/>   {content?.vote_average.toFixed(1)}
              </span>
          </div>
          <span className='genres'>
            <Genres data={genresData}/>
          </span>
          
          <span className="banner-description">
            <p> {content?.overview}</p>
          </span>
          
         
          <span className="banner-btns">
              <button title='play' className='details-btns' onClick={handleAddToWathHistory}><Link to='/player'><FaPlay/></Link></button>
              
                  {inWatchList ? (
              <button title='Unsave' className="details-btns" onClick={handleRemoveFromWatchlist}><FaBookmark/></button>
              ) : (
                <button title='save' className="details-btns" onClick={handleAddToWatchlist}><FaRegBookmark/></button>
              )}

              <Rating rating={getRating} contentId={id}/>
          </span>
          
    </div>
   
    </div>
    <div className="recommendations-container">
      
      <SliderList title='Recommended for you'  endpoint={`/${mediaType}/${id}/recommendations`}  category={mediaType}/>
    </div>
    </>
    
  )
}

export default Details
