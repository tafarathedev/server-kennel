 import mongoose  from 'mongoose'


 const CartSchema = new mongoose.Schema(
    {
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: "User"
      },
      products: [
        {
          product_id: String,
          quantity: Number,
          name: String,
          price: Number
        }
    ],
    createdOn:{
        type: Date,
        default:new Date().getTime()
    }
 }
  );
  
  const Cart = mongoose.model("Cart", CartSchema);
  
  export default Cart 

