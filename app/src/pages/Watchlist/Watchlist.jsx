import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
//import { fetchWatchList } from '../../redux/auth/authSlice';
import Card from '../../components/Card/Card';
import { useNavigate } from 'react-router-dom';
import ResultCard from '../Search/ResultCard/ResultCard';
import {useGetWatchlistQuery,useRemoveFromWatchlistMutation,useClearWatchlistMutation} from '../../redux/user/userApiSlice'


const Watchlist = () => {
    const dispatch=useDispatch()
   
    const {url}=useSelector((state)=>state.content)
    const navigate=useNavigate()

    const {data:getWatchlist,error, isLoading}=useGetWatchlistQuery()
    const [removeFromWatchlist]=useRemoveFromWatchlistMutation()
    const [clearWatchlist]=useClearWatchlistMutation()


    const handleRemoveFromWatchlist =async(contentId)=>{
      try {
        const formatcontentId=String(contentId)
          await removeFromWatchlist( formatcontentId ).unwrap()


         
      } catch (error) {
         console.error('Error removing from watchlist:', error);
      }
    }

    const handleClearWatchlist=async()=>{
      try {
        await clearWatchlist()
      } catch (error) {
        console.error('Error clearing watchlist:', error);
      }
    }



  return (
    <div className='watchlist-page'>
        <h2>Your List</h2>
        <div className="result-container">

        {isLoading && <p>Loading watchlist....</p>}
        {error && <p>Error fetching watchlist: {error.message}</p>}

        <button onClick={handleClearWatchlist}>Clear watchlist</button>

       { getWatchlist&& getWatchlist?.map((item)=>{
         const title = item.contentTitle || item.name;
        
          return (
            <>
             <Card
            key={item.contentId} 
            title={title}
            imageUrl={item.contentPoster}
                handleNavigate={()=>navigate(`/${item.media_type || category}/${item.contentId}`)}
            />
            <button onClick={() => handleRemoveFromWatchlist(item.contentId)}>Remove</button>
            </>
           
            
          )
      })
      } 

        </div>
     
    </div>
  )
}

export default Watchlist
