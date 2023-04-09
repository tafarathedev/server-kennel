const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

//mongoose schema type here
const dogSchema = new mongoose.Schema({
     name:{
        type:String ,
        trim:true
     },breed:{
      type:String,
      trim:true
     },
   color:{
      type:String,
      trim:true
     },
     image:{
     type:String,
     trim:true
     },color:{

     },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"AdminUser"
     }
   ,
   date:{
      type:Date,
      default:new Date
   }
  
})




const Dog = mongoose.model("Dog" , dogSchema)

module.exports = Dog