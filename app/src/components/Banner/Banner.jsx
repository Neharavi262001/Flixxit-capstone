import React, { useState, useEffect } from 'react'
import './banner.css'
import {FaPlay,FaPlus} from 'react-icons/fa'
import useFetch from '../../hooks/useFetch'
import { useSelector } from 'react-redux'

const Banner = () => {
     const [background,setBackground]=useState('')
     const [title,setTitle]=useState('')
     const [description,setDescription]=useState('')

     const {url}=useSelector((state)=>state.content)

     const {content,loading}=useFetch('/trending/all/week')

     const truncate=(string,number)=>{
      return string?.length>number ? string.substring(0,number-1) + '...' : string
    }
    useEffect(() => {
      const fetchData = () => {
        const moviesWithBackdrop = content?.results?.filter((movie) => movie.backdrop_path);
  
        if (moviesWithBackdrop && moviesWithBackdrop.length > 0) {
          const bannerMovie = moviesWithBackdrop[Math.floor(Math.random() * moviesWithBackdrop.length)];
          console.log(bannerMovie);
  
          const movieTitle = bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name;
          setTitle(movieTitle);
  
          const movieOverview = bannerMovie?.overview;
          setDescription(truncate(movieOverview, 200));
  
          const backgroundImage = url?.backdrop + bannerMovie?.backdrop_path;
          setBackground(backgroundImage);
        }
      };
  
      fetchData();
    }, [content, url]);
    
   

  return (
    <div className='banner'>
        <img className='banner-image'
        width='100%'
        src={background} alt="" />

      <div className="banner-info">
      
        <span className="banner-title">
           <h1>{title}</h1> 
        </span>
        <span className="banner-description">
          {description}
           
        </span>
        <span className="banner-btns">
            <button className='banner-btn'><FaPlay/><span>Play</span></button>
            <button className="banner-btn"><FaPlus/><span> My Wishlist</span></button>
        </span>
       
      </div>
   

    </div>
  )
}

export default Banner
