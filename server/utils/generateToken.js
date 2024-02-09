const jwt =require('jsonwebtoken')

const generateToken=(userId)=>{


    const token =jwt.sign({userId},process.env.SECRET_TOKEN,{expiresIn:'10d'})
    
   
    return token;
    
}

module.exports=generateToken
