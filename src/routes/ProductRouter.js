const express = require('express');
const { faker } = require('@faker-js/faker');

//use express router  
const router = express.Router();

// import user model 
const Product = require('../models/ProductModel.js');
const adminAuth = require('../middleware/adminAuth.js');




//post router for dog products 
router.post("/products", async(req,res)=>{
  try {
 
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        id:faker.random.numeric(),
        name : faker.name.firstName(),
        desc: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.avatar()
      });
    await product.save();
    }
   
    res.status(200).send(product)

  } catch (error) {
     res.status(400).send({
      success:false,
      message:error.message
     })
  }
    
})


// view all products 
router.get("/products", async (req, res) => {
  try {
    // get all products
    const products = await Product.find();
    // send response with products
    res.send(products);
  } catch (error) {
    // send error message if any error occurs
    res.send(error.message);
  }
});



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
module.exports = router