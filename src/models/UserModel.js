const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({
    firstName:{
       type:String,
       lowercase:true,
       trim:true       

    },lastName:{
        type:String,
        lowercase:true,
        trim:true
    },
    age:{
        type:Number,
        trim:true,
       
       
    },
    password:{
        type:String,
        
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`password can not be ${value}`)
            }
        },
        trim:true
    },
    agree:{
 type:Boolean,
 default:false
    },
    email:{
        type:String,
        lowercase:true,
        required:true,  
        unique:true,
        validate(value){
        if( !validator.isEmail(value)){
            throw new Error(`${value} is not a valid email address`)
        }
        },
        trim:true
    },
    avatar:{
     type:'String'
      
    },
    tokens: [{
        token: {
            type: String,
            required: true,
            trim:true
        }
    }], 
    date:{  
        type:Date,
        default:Date.now
    }

}) 

//virtual schema 
userSchema.virtual("cart", {
    ref: 'Cart',
    localField: '_id',
    foreignField: 'owner'
})




//user login 
userSchema.statics.findByCredentials = async(email ,password)=>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error("check your email address")
    }
    const isMatch = await bcrypt.compare(password , user.password)
    if(!isMatch){
        throw new Error("Please provide correct password")
    }
    return user
}

//generate AuthToken
userSchema.methods.setAuthToken = async function () {
    
    const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET,{expiresIn:"24h"})
    this.tokens = this.tokens.concat({ token })
    await this.save()

    return token
}

userSchema.pre("save" ,async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10)
    }
    next()
})

// Delete user tasks when user is removed
userSchema.pre('remove', async function (next) {
  
    await User.deleteMany({ owner: this._id })
    next()
 })
 

const User = mongoose.model("User" , userSchema)

module.exports = User