const express = require('express');
const router = express.Router();
const Blog = require('../models/BlogModel.js');



//post router for blog blogs 
router.post("/blogs" , async(req,res)=>{
  try {
   
    for(let i = 0; i < 10; i++){
      const blogs = new Blog({
        title : faker.name.firstName(),
        image: faker.image.abstract(),
        article: faker.commerce.productDescription(),
        month: 5,
        day:12
      });
    await blogs.save();
    }
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