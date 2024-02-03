const express=require('express')
const { 
    registerUser,
    loginUser,
    logoutUser,
    userProfile,
    updateUserProfile,
    
                    } = require('../controllers/userController')
const { viewAvailableSubscriptions, checkoutSession, viewUserSubscriptionDetails } = require('../controllers/subscriptionController')
const router=express.Router()
const {protectedRoutes} =require('../middlewares/authenticationMiddleware')
const { addToWatchlist, getWatchlist, removeFromWatchlist, clearWatchlist } = require('../controllers/watchlistController')
const { like, getRating, dislike } = require('../controllers/ratingController')

router.post('/register',registerUser)
router.post('/login',loginUser)
router.post('/logout',protectedRoutes,logoutUser)


router.get('/profile',protectedRoutes,userProfile)
router.put('/profile',protectedRoutes,updateUserProfile)


router.get('/subscribe',viewAvailableSubscriptions)
router.post('/checkout',protectedRoutes,checkoutSession)
router.get('/subscriptionDetails',protectedRoutes,viewUserSubscriptionDetails)

router.get('/watchList',protectedRoutes,getWatchlist)
router.post('/watchList',protectedRoutes,addToWatchlist)
router.delete('/watchList/:contentId',protectedRoutes,removeFromWatchlist)
router.delete('/watchList',protectedRoutes,clearWatchlist)

router.post('/like/:contentId',protectedRoutes,like)
router.post('/dislike/:contentId',protectedRoutes,dislike)
router.get('/rating/:contentId',protectedRoutes,getRating)



module.exports=router