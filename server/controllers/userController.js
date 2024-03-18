const asyncHandler=require('express-async-handler')
const User =require('../models/userModel')
const generateToken=require('../utils/generateToken')
const passwordValidator = require('password-validator');
const bcrypt=require('bcryptjs')

const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(8)                                  
    .is().max(100)                                 
    .has().uppercase()                              
    .has().lowercase()                            
    .has().digits()                                
                                   


const loginUser=asyncHandler(async(req,res)=>{
   const {email,password}=req.body
   const user = await User.findOne({email})
  
   if (user &&(await user.matchPassword(password))){
      try {
        if (user) {

          generateToken(res,user._id)

        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } 
    } catch (error) {
      console.error( error);
      res.status(500).json({ error: 'Internal Server Error' });
    }

    
}else{
 
  res.status(401)
  throw new Error('Invalid credentials')
}

})

const registerUser=asyncHandler(async(req,res)=>{
  const { name, email, password } = req.body;
    if (!passwordSchema.validate(password)) {
      res.status(400);
      throw new Error('Password must be at least 8 characters long and include uppercase, lowercase and digits.');
  }

    const userExists=await User.findOne({email})
    if (userExists){
        res.status(400)
        throw Error('Email already in use')
    }

   
    const user= await User.create(
        {
            name,
            email,
            password,
        }
    )



    if (user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }

    
})

const logoutUser=asyncHandler(async(req,res)=>{
   res.cookie('jwt','',{
    httpOnly:true,
    secure:true,
    expires:new Date(0)
   })
   res.status(200).json({message:"Logged out successfully"})
})


const userProfile=asyncHandler(async(req,res)=>{
    const {_id,name,email}=req.user
    const user ={
        _id:_id,
        name:name,
        email:email,
    }
    res.status(200).json(user)
})

const updateUserProfile = asyncHandler(async (req, res) => {
  try {
      const user = await User.findById(req.user._id);

      if (!user) {
          res.status(404).json({ error: 'User not found' });
          return;
      }
      
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.newPassword) {

        if (!passwordSchema.validate(req.body.newPassword)) {
          res.status(400);
          throw new Error('Password must be at least 8 characters long and include uppercase, lowercase and digits.');
      }
            const isCurrentPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (!isCurrentPasswordValid) {
                res.status(401)
                throw new Error('Current password is incorrect');
            } 
          user.password = req.body.newPassword
      }

      const updatedUser = await user.save();


    generateToken(res, updatedUser._id);

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      message: 'Profile updated successfully',
    });
  } catch (error) {
      console.error('Error updating user profile:', error);

      res.status(500).json({ error: 'Internal Server Error' });
      throw new Error(error)
  }
});







module.exports={registerUser,loginUser,logoutUser,updateUserProfile,userProfile}
