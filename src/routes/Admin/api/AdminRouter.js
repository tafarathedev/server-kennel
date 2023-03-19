import express from 'express'
//import adminAuth from '../../../middleware/adminAuth.js'
const router = express.Router()
import {sendWelcomeEmail} from '../../../email/account.js'
import sharp from 'sharp' 
import multer from 'multer'
import AdminUser from '../../../models/Admin/api/AdminModel.js'



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



// more user controls here

export default router