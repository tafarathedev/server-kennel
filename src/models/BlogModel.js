const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

//schema here 
const BlogSchema = new mongoose.Schema({
     title:{
        type:String ,
        trim:true
     },
     image:{
     type:String,
     trim:true
     },
     article:{
       type:String,
       trim:true
     },
     owner:{
        type:mongoose.Schema.Types.ObjectId,
       
         ref:"AdminUser"
     }
   ,
   month:{
      type:Date,
      default:new Date().getMonth()
   },
   day:{
      type:Date,
      default:new Date().getDay()
   }
  
})
//shema virtual
BlogSchema.virtual('blogs', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'owner',
});



const Blog = mongoose.model("Blog" , BlogSchema)

module.exports = Blog