import React, { useEffect, useState } from 'react'
import {FaPlay,FaPlus, FaCheck } from 'react-icons/fa'
import './card.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAddToWatchlistMutation,useGetWatchlistQuery } from '../../redux/user/userApiSlice'

export default React.memo( function Card({id,title,imageUrl,itemGenre,handleNavigate})  {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
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
        contentTitle: title,
        contentPoster: imageUrl,
      };

      const response = await addToWatchlist(newItem).unwrap();
      console.log(response);
      setInWatchList(true);

    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

 



    return (
        <div className='list-item'  onClick={handleNavigate} >
        <img className='list-image' src={imageUrl} alt=""/>
        <div className="item-info">
          <h5 className='item-title'>{title}</h5>
          {/* <span>
          {itemGenre?.map((g)=>{
        if (genres[g]?.name) return
        return (
          <span key={g} >
            {genres[g]?.name}
          </span>
        
        )
      })}

          </span> */}
          <div className="icons">
              <FaPlay/>
             
              {inWatchList ? <FaCheck /> : <FaPlus onClick={handleAddToWatchlist} />}
        
              
          </div>
        
         
        </div>
      </div>
  
    )
  }
   
)




  //const {genres}=useSelector((state)=>state.content)
  
  //const [addToList]=useAddToWatchListMutation()

 // const [isInWatchlist, setIsInWatchlist] = useState(false);
  // useEffect(() => {
    
  //   setIsInWatchlist(watchlist.some(item => item.id === id));
  // }, [watchlist, id]);

  // const handleAddToWatchlist = async(e) => {
  //  try {
  //   if (!userInfo) {
  //     // If user is not logged in, redirect to login page
  //     navigate('/login');
  //     return;
  //   }
  //   const newData = { id, title, imageUrl };
  //   await addToList(  newData ).unwrap();

  //   dispatch(addToWatchListSuccess(newData));
  //  } catch (error) {
  //   console.error('Error adding to watchlist:', error);
  //  }
  // };
