const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const productSchema = new mongoose.Schema({
    id:{
         type:Number
    },
     name:{
        type:String ,
        trim:true
     },
     image:{
     type:String,
     trim:true
     },
     desc:{
        type:String,
        trim:true, 
     },
     price:{
        type:Number,
        trim:true
     },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"AdminUser"
     }
   ,
   date:{
      type:Date,
      default:new Date().getTime()
   }
})


const Product = mongoose.model("Product" , productSchema)

module.exports =  Product