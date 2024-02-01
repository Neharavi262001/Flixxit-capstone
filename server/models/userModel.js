const mongoose=require('mongoose')
const Schema=mongoose.Schema
const bcrypt=require('bcryptjs')

const userSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        isUnique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    stripeCustomerId:{
        type:String,
        required:true,
    },
  

  

},{
    timestamps:true
})



userSchema.pre('save',async function(next){
   if (!this.isModified('password')){
    next()
   } 

   const salt = await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(this.password,salt)
    this.password=hash
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

module.exports=mongoose.model('User',userSchema)