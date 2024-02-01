const Watchlist=require('../models/watchlistModel')
const asyncHandler=require('express-async-handler')
const mongoose=require('mongoose')
const addToWatchlist=asyncHandler(async(req,res)=>{
 
   try {
    const {contentId,contentTitle,contentPoster}=req.body
    const isAdded=await Watchlist.findOne({
        user:req.user.id,
        contentId
    })

    if(isAdded) {
       return res.status(200).json(isAdded)
    }

   

    const addItem=new Watchlist({
        contentId,
        contentPoster,
        contentTitle,
        user:req.user.id,
        
    })

    await addItem.save()
     res.status(201).json(addItem)

   } catch (error) {
    console.error("Error adding to watchlist:", error);
    res.status(500).json({ error: "Internal Server Error" });

   }
})


const removeFromWatchlist = asyncHandler(async (req, res) => {
    try {
     // const { watchlistItemId } = req.params;
     const { contentId } = req.params;
  
      // if (!mongoose.Types.ObjectId.isValid(contentId)) {
      //   return res.status(400).json({ error: "Invalid watchlistItemId" });
      // }
  
      const inWatchlist = await Watchlist.findOneAndDelete({
        user: req.user.id,
        contentId
        // _id: watchlistItemId
      });
  
      if (!inWatchlist) {
        return res.status(404).json({ error: "Not found" });
      }
  
     
  
      res.status(200).json({ message: "Removed from watchlist", removedItem: inWatchlist });
    } catch (error) {
      console.error("Error removing from watchlist:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

const getWatchlist=asyncHandler(async(req,res)=>{
    try {
        const watchlist=await Watchlist.find({user:req.user.id}).sort("-createdAt");
        res.status(200).json(watchlist)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

const clearWatchlist = asyncHandler(async (req, res) => {
    try {
      // Find all items in the watchlist for the user
      const watchlistItems = await Watchlist.find({ user: req.user.id });
  
      if (watchlistItems.length === 0) {
        return res.status(404).json({ error: "Watchlist is already empty" });
      }
  
      // Remove all items from the watchlist
      await Watchlist.deleteMany({ user: req.user.id });
  
      res.status(200).json({ message: "Watchlist cleared successfully" });
    } catch (error) {
      console.error("Error clearing watchlist:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  


module.exports={addToWatchlist,getWatchlist,removeFromWatchlist,clearWatchlist}