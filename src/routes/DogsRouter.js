import express from  'express'
//use express router  
const router = express.Router()
// import user model 
 import Dog from '../models/DogsModels.js'
import adminAuth from '../middleware/adminAuth.js'



//post router for dog dogs 
router.post("/dogs",adminAuth, async(req,res)=>{
  try {
    const dog = new Dog({...req.body , owner:req.admin._id})
    
      await dog.save()

     res
    .status(200).cookie("dogCookies", req.admin.token ,{
      secure:true,
      httpOnly:true,
      maxAge:1000 * 60 * 60 * 24
    })
       
  } catch (error) {
   
     res.status(400).send({
      success:false,
      message:error.message
     })
  }
    
})


//view all dogs 
 router.get("/dogs" , async(req,res)=>{
 
  //pagination count 
  //dogs info
    const dog =   await Dog.find({})
  

     //validate 
     try {
         
           res.status(200).send(dog)
     } catch (error) {
         return res.send(error.message)
     }
 })


 router.get("/dogs/:id" , async(req,res)=>{
 // const dog =   awaiDogfind({})
 const dog =  await Dog.findById(req.params.id)
   //validate 
   try {
         if(!dog){
          return res.send("problem in try state")
         }
         res.status(200).send(dog)
   } catch (error) {
       return res.send(error.message)
   }
})
 export default  router