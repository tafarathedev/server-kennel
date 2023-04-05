const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel')
const Product = require('../../models/ProductModel')

router.get('/', async (req, res) => {
    const users = await User.find({})
  
    res.render('index', {users})
  });


  router.get('/all_products' , async(req,res)=>{

    //products info
      const products =  await Product.find({})
      
        res.render('products', {products})
            
      
   })
  module.exports = router;
