const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const multer = require('multer');
const AdminUser = require('../../../models/Admin/api/AdminModel.js');
const User = require('../../../models/UserModel.js');
const adminAuth = require('../../../middleware/adminAuth.js');
const { sendWelcomeEmail } = require('../../../email/account.js');


//create user account
router.post("/admin/create", async(req,res)=>{
    const { email , password , firstName , lastName} = req.body
  try {
    const admin = new AdminUser({email, password , firstName, lastName })
    const token =  await admin.setAdminAuthToken()
    sendWelcomeEmail(admin.email )
     await admin.save()
    res.status(200)
  .json({admin , token})
       
  } catch (error) {
   
      return new Error(error.message)
  }
    
})

//login user
router.post("/admin/login", async(req,res)=>{
  const {email , password} = req.body
  const admin = await AdminUser.findByCredentials(email , password);
    const token =  await admin.setAdminAuthToken()
   
  try {
     await admin.save()
   return res.status(200).json({admin,token})
} catch (e) {
    return res.json(e.message);
}
}) 

 // Define a route to get a user's profile
 router.get('/admin/users', async (req, res) => {

  
  try {
  
     const users = await User.find({});
    
    if (!users) {
      return res.status(404).send('User not found');
    } 
    
      res.status(200).json(users)  // Render the profile view with the user object
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the user profile');
  } 
});

// more user controls here

module.exports = router