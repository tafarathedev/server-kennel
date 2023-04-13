const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel')
const Product = require('../../models/ProductModel')
const Dog = require('../../models/DogsModels')

router.get('/', async (req, res) => {
    const users = await User.find({})
  
    res.render('index', {users})
  });


  router.get('/all_products' , async(req,res)=>{

    //products info
      const products =  await Product.find({})
      
        res.render('products', {products})
            
      
   })


//view all dogs 
 router.get("/dogs" , async(req,res)=>{
 
  
  //dogs info
  const dogs =  await Dogs.find({})
         res.render('dogs', {
          dogs
         })
           //res.status(200).send(dog)
    
 })

  module.exports = router;
