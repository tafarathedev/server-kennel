import express from  'express'
//use express router  
const router = express.Router()
// import user model 
 import Blog from '../models/BlogModel.js'
import adminAuth from '../middleware/adminAuth.js'



//post router for blog blogs 
router.post("/blogs",adminAuth, async(req,res)=>{
  try {
    const blog = new Blog({...req.body , owner:req.admin._id})
    
      await blog.save()

     res
    .status(200).cookie("blogCookies", req.admin.token)
       
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
 export default  router