const express = require('express');
const { faker } = require('@faker-js/faker');

//use express router  
const router = express.Router();

// import user model 
const Product = require('../models/ProductModel.js');
const adminAuth = require('../middleware/adminAuth.js');
const uuid = require('uuid');




//post router for dog products 
router.post('/products', async (req, res) => {
  const { id, name, desc, price, image } = req.body;

  try {
    const product = new Product({
      id: uuid.v4(),
      name,
      desc,
      price,
      image
    });
    await product.save();
    res.redirect('/all_products')
    //res.status(201).send(product);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



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