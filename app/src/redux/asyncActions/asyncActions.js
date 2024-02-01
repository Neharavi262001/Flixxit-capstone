import { addToWatchListSuccess,removeFromWatchList } from "../auth/authSlice";
import { useAddToWatchListMutation,useRemoveFromWatchListMutation,useWatchListQuery } from "../user/userApiSlice";
// Async Thunk for adding to the watchList
export const addToWatchList = (newData) => async (dispatch) => {
    const addToWatchListMutation = useAddToWatchListMutation();
    try {
      const response = await dispatch(addToWatchListMutation(newData));
      dispatch(addToWatchListSuccess(response.data));
    } catch (error) {
      
      console.error('Error adding to watchlist:', error);
    }
  };
  
 
// Async Thunk for removing from the watchList
export const removeFromWatchList = (movieId) => async (dispatch) => {
    const removeFromWatchListMutation = useRemoveFromWatchListMutation();
  
    try {
      const response = await dispatch(removeFromWatchListMutation(movieId));
      dispatch(authSlice.actions.removeFromWatchListSuccess(response.data));
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };
  
  // Async Thunk for fetching the watchList
  export const fetchWatchList = () => async (dispatch) => {
    const watchListQuery = useWatchListQuery();
  
    try {
      const response = await dispatch(watchListQuery());
      dispatch(authSlice.actions.setCredentials(response.data));
    } catch (error) {
      console.error('Error fetching watchlist:', error);
    }
  };
