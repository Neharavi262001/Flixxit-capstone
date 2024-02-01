import React from 'react'
import './resultCard.css'
import {FaPlay,FaPlus, FaThumbsDown, FaThumbsUp } from 'react-icons/fa'

const ResultCard = ({id,title,imageUrl,itemGenre,handleNavigate}) => {
  return (
    <div>
       <div className='list-item' onClick={handleNavigate}>
        <img className='list-image' src={imageUrl} alt="" />
        <div className="item-info">
          <h5 className='item-title'>{title}</h5>
          <div className="icons">
              <FaPlay/>
          </div>
        
         
        </div>
      </div>
  
    </div>
  )
}

export default ResultCard
