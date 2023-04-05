const express = require('express');
const auth = require('../middleware/auth.js');
const Cart = require('../models/CartModel.js');

const router = express.Router()  


/// define all route
router.post("/cart",auth , async (req, res) => {

         const cart = new Cart({
          ...req.body , 
          owner:req.user._id
         })
        try {
             if(cart){
              await cart.save()
              res.status(200).send(cart)
             }
        } catch (error) {
            return Error(error.message)
        }
  });
 

  
module.exports = router