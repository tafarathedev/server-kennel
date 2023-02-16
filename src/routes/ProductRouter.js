import express from  'express'
import { faker } from '@faker-js/faker';
//use express router  
const router = express.Router()
// import user model 
import Product from '../models/ProductModel.js'
import adminAuth from '../middleware/adminAuth.js'



//post router for dog products 
router.post("/products", async(req,res)=>{
  try {
 let count = 1 
    for (var i = 0; i < 10; i++) {
      const product = new Product({
        
        id:faker.random.numeric(),
        name : faker.name.firstName(),
        desc: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.avatar()
      });
    await product.save();
    }
   /*  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); */
    res.status(200).send(product)
  } catch (error) {
     res.status(400).send({
      success:false,
      message:error.message
     })
  }
    
})


//view all products 
 router.get("/products" , async(req,res)=>{

  //products info
    const product =  await Product.find()
     //validate 
     res.send(product)
     try {
         
          
     } catch (error) {
         return res.send(error.message)
     }
 })


 router.get("/product/:id" , async(req,res)=>{
 // const product =  await Product.find({})
 const product = await Product.findById(req.params.id)

   //validate 

   try {
         if(!product){
          return res.send("problem in try state")
         }
         res.status(200).send(product)
   } catch (error) {
       return res.send(error.message)
   }
})
 export default  router