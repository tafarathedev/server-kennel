import express from  'express'
import { faker } from '@faker-js/faker';
//use express router  
const router = express.Router()
// import user model 
import Product from '../models/ProductModel.js'
import adminAuth from '../middleware/adminAuth.js'



//post router for dog products 
router.post("/products",adminAuth, async(req,res)=>{
  try {
 let count = 1 
    for (var i = 0; i < 50; i++) {
      const product = new Product({
        owner:req.admin._id,
        id:faker.random.numeric(),
        name: faker.name.firstName(),
        desc: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.avatar()
      });
    await product.save();
    }
    res.status(200).send(product)
   /*  const product = new Product({...req.body , owner:req.admin._id})
    
     await product.save()

     res
    .status(200).cookie("postCookies", product ,{
      secure:true,
      httpOnly:true,
      maxAge:1000 * 60 * 60 * 24
    }).redirect("/site/view_product")
        */
  } catch (error) {
   
     res.status(400).json({
      success:false,
      message:error.message
     })
  }
    
})


//view all products 
 router.get("/products" , async(req,res)=>{

/*   //params query for pagination
  const query = {} */


/* 
    const skip = parseInt(req.query.skip) || 0
    const limit = parseInt(req.query.limit) || 10 */
  //products info
    const product =  await Product.find()
     //validate 
     res.send(product)
     try {
         
          
     } catch (error) {
         return res.json(error.message)
     }
 })


 router.get("/product/:id" , async(req,res)=>{
 // const product =  await Product.find({})
 const product = await Product.findById(req.params.id)

   //validate 

   try {
         if(!product){
          return res.json("problem in try state")
         }
         res.status(200).json(product)
   } catch (error) {
       return res.json(error.message)
   }
})
 export default  router