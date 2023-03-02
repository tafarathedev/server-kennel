import express from 'express'
import auth from '../middleware/auth.js'
const router = express.Router()
import User from '../models/UserModel.js'
import {sendWelcomeEmail} from '../email/account.js'
import fs from 'fs';
import sharp from 'sharp' 
import multer from 'multer'


//create user account
router.post("/register", async(req,res)=>{
    const { email , password , firstName , lastName , agree} = req.body
  try {
    const user = new User({email, password , firstName, lastName , agree})
    const token = await user.setAuthToken()
     
    sendWelcomeEmail(user.email)
     await user.save()
    res.status(200)
    .send({
      success:true,
      user,
      message:"User Account Created Successfully",
      token
    })
       
  } catch (error) {
   
     res.status(400).send({
      success:false,
      message:error.message
     })
  }
    
})

//login user
router.post("/login", async(req,res)=>{
  const {email , password} = req.body
  try {
    const user = await User.findByCredentials(email,password);
    const token = await user.setAuthToken()
    await user.save()
    res.status(200).send({user , token})
} catch (e) {
    res.status(400).send({
      success:false,
      error:e.message
    });
}
}) 


//logout from current mobile~
router.post('/logout', auth, async (req, res) => {
   
   try {
      req.user.tokens = req.user.tokens.filter((token) => {
          return token.token !== req.token
      })
      await req.user.save().status().json({
      success:true,
     message :"Logout Successful"
    })
  } catch (e) {
      res.status(500).send()
    } 
  })
  
  //logout of all sessions 
router.post('/me/logoutAll', auth, async (req, res) => {
  try {
      req.user.tokens = []
      await req.user.save()
      res.send()
  } catch (e) {
      res.status(500).send()
  }
})
//view personal account
router.get("/me/profile",auth, async(req, res) => {
  
  try {
      const user = await User.findOne({id:req.user.id})   
    
  } catch (e) {
      res.status(402).json(e.message)
  }
})
//delete your personal account
router.delete("delete/me",auth ,async(req,res)=>{
   const user = req.user.remove()
   try {
      await user.save()
     res.status(200).json({
      message:"account deleted successfully",
      user
     })
    
   } catch (error) {
    
   }
})

 //uqpdate personal account information
 
router.patch('/me/upload', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['first_name','last_name', 'email', 'password' , 'age' ]
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }

// Create a Multer instance with the desired configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/images'); // Set the upload directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg'); // Set the file name
  }
})

const upload = multer({ storage: storage });

// Define a route to handle image uploads
router.post('/image-upload', upload.single('image'), (req, res) => {
  // The uploaded image can be accessed through req.file
  res.send('Image uploaded successfully!');
});


// Define a route to delete an image
router.delete('/delete-image/:filename', (req, res) => {
  const filename = req.params.filename;
  const path = `uploads/images/${filename}`; // Set the path to the image file

  // Check if the file exists
  if (fs.existsSync(path)) {
    // Delete the file
    fs.unlinkSync(path);
    res.send('Image deleted successfully!');
  } else {
    res.status(404).send('Image not found!');
  }
});


/* // Define a route to get a user's profile
router.get('/users/:userId/profile', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    res.render('profile', { user }); // Render the profile view with the user object
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching the user profile');
  }
});
 */

})

export default router