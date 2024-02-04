import React, { useEffect, useState } from 'react'
import {FaPlay,FaPlus, FaCheck, FaInfoCircle, FaStar } from 'react-icons/fa'
import './card.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAddToWatchlistMutation,useGetWatchlistQuery } from '../../redux/user/userApiSlice'

export default React.memo( function Card({id,title,imageUrl,imdbRating,handleNavigate})  {
  
    return (
        <div className='list-item' onClick={handleNavigate}  >
        <img className='list-image' src={imageUrl} alt="" />
        <div className="item-info">
          <h4 className='item-title'>{title}</h4>
          <div className="icons">
            <span className='imdb'> <FaStar/>  {imdbRating}</span>
          </div>
        
         
        </div>
      </div>
  
    )
  }
   
)




 