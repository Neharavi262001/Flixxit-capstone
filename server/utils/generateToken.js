const jwt =require('jsonwebtoken')


const generateToken=(res,userId)=>{

    const token =jwt.sign({userId},process.env.SECRET_TOKEN,{expiresIn:'10d'})
    
    // res.cookie('jwt',token,{
    //     httpOnly:true,
    //     secure:process.env.NODE_ENV !== 'development',
    //     sameSite:'strict',
    //     maxAge:10*24*60*60*1000

    // })
    return token;
    
}

module.exports=generateToken