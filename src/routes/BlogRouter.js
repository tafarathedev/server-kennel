const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogModel.js');



//post router for blog blogs 
router.post("/blogs" , async(req,res)=>{
  const {
    title ,
    image,
    article,
    date
  } = req.body
  const today = new Date();
  const day = today.getDate();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const monthIndex = Math.round(today.getMonth());
  const month = monthNames[monthIndex];
  const year = today.getFullYear();
  try {
   
   
      const blogs = new Blog({
        title ,
        image,
        article,
       date:` ${month} ${day} , ${year}`
      });
    await blogs.save();
    
    res.status(200).send(blogs)
       
  } catch (error) {
   
     res.status(400).send({
      success:false,
      message:error.message
     })
  }
    
})


//view all blogs 
 router.get("/blogs" , async(req,res)=>{
  //blogs info
    const blog = await Blog.find({})
     //validate 
     try {
           res.status(200).send(blog)
     } catch (error) {
         return res.send(error.message)
     }
 })


 router.get("/blogs/:id" , async(req,res)=>{
 // const blog =   awaiblogfind({})
 const blog =  Blog.findById(req.params.id)
   //validate 
   try {
         if(!blog){
          return res.send("problem in try state")
         }
         res.status(200).send({message:"fetched!...",blog,success:true})
   } catch (error) {
       return res.send(error.message)
   }
})
module.exports = router