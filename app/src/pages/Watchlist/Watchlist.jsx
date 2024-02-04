import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './watchlist.css'
import Card from '../../components/Card/Card';
import { useNavigate, useParams } from 'react-router-dom';
import ResultCard from '../Search/ResultCard/ResultCard';
import {useGetWatchlistQuery,useRemoveFromWatchlistMutation,useClearWatchlistMutation} from '../../redux/user/userApiSlice'
import { FaCross } from 'react-icons/fa';


const Watchlist = () => {
    const dispatch=useDispatch()
    //const { mediaType } = useParams();
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
      
      <div className="watchlist-top">
        <h2>Your List</h2>
        <button onClick={handleClearWatchlist}>Clear watchlist</button>
      </div>
       
        <div className="watchlist-container">

          {isLoading && <p>Loading watchlist....</p>}
          {error && <p>Error fetching watchlist: {error.message}</p>}

        
            { getWatchlist&& getWatchlist?.map((item)=>{
            const title = item.contentTitle || item.name;
              return (
                <div className="watchlist-item">
                   <Card className="watchlist-card"
                  key={item.contentId} 
                  title={title}
                  imageUrl={item.contentPoster}
                  imdbRating={item?.contentRating}
                  handleNavigate={()=>navigate(`/${item?.contentType }/${item.contentId}`)}
                  />
                  <button onClick={() => handleRemoveFromWatchlist(item.contentId)}> &#10006;</button>

                </div>
                 
               
              )
          })
          } 

        
    </div>
     
    </div>
  )
}

export default Watchlist
