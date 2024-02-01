const asyncHandler=require('express-async-handler')
const User =require('../models/userModel')
const generateToken=require('../utils/generateToken')
const { stripe } = require('../utils/stripe')

const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body

   const user = await User.findOne({email})
   if (user &&(await user.matchPassword(password))){
    generateToken(res,user._id)
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    })
}else{
    res.status(401)
    throw new Error('Invalid credentials')
}

})

const registerUser=asyncHandler(async(req,res)=>{
  const { name, email, password } = req.body;
    console.log(req.body)

    const userExists=await User.findOne({email})
    if (userExists){
        res.status(400)
        throw Error('Email already in use')
    }

    //create stripe customer
    const customer=await stripe.customers.create({
      email,
      address: {
        country: 'IN',
      },
    })
    console.log('Stripe Customer:', customer);
    const user= await User.create(
        {
            name,
            email,
            password,
            stripeCustomerId:customer.id
           
        }
    )



    if (user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            stripeCustomerId:customer.id
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

    
})

const logoutUser=asyncHandler(async(req,res)=>{
   res.cookie('jwt','',{
    httpOnly:true,
    expires:new Date(0)
   })
   res.status(200).json({message:"Logged out successfully"})
})

//private
const userProfile=asyncHandler(async(req,res)=>{
    const {_id,name,email,stripeCustomerId}=req.user
    const user ={
        _id:_id,
        name:name,
        email:email,
        stripeCustomerId:stripeCustomerId
    }
    res.status(200).json(user)
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


const watchList=asyncHandler(async(req,res)=>{
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);
    
        if (user) {
          const watchList = user.watchList;
          return res.json({ watchList });
        } else {
          return res.status(404).json({ msg: "User not found." });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error retrieving watch list" });
      }
})

const addToWatchList = asyncHandler(async (req, res) => {
    try {
        const newData = req.body;
        console.log(req.body);
        const userId = req.user._id;
    
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ msg: "User not found." });
        }
        if (newData && newData.title) {
          const movieAlreadyInWatchList = user.watchList.find(({ id }) => id === newData.id);
    
          if (!movieAlreadyInWatchList) {
            user.watchList.push(newData);
            await user.save();
    
            return res.json({ msg: "Movie successfully added to watch list." });
          } else {
            return res.json({ msg: "Movie already in the watch list." });
          }
        } else {
          return res.status(400).json({ msg: "Invalid data format." });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error adding movie to the watch list" });
      }
   
});

const removeFromWatchedList=asyncHandler(async(req,res)=>{
    try {
        const userId = req.user._id;
        const dataIdToRemove = req.params.id;
    
        // Find the user by ID
        const user = await User.findById(userId);
    
        if (user) {
          // Check if the movie is in the watchList based on its title
          const indexToRemove = user.watchList.findIndex(({ id }) => id === dataIdToRemove);
    
          if (indexToRemove !== -1) {
            // Remove the movie from the watchList array
            user.watchList.splice(indexToRemove, 1);
    
            // Save the updated user with the modified watchList
            await user.save();
    
            return res.json({ msg: "Movie successfully removed from watch list." });
          } else {
            return res.json({ msg: "Movie not found in the watch list." });
          }
        } else {
          return res.status(404).json({ msg: "User not found." });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Error removing movie from watch list" });
      }
})





module.exports={registerUser,loginUser,logoutUser,updateUserProfile,userProfile,addToWatchList,watchList,removeFromWatchedList}