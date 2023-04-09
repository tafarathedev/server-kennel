const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth.js');
const User = require('../models/UserModel.js');
const { sendWelcomeEmail } = require('../email/account.js');
const app = express()
//create user account
router.post("/register", async(req,res)=>{
    const { email , password , firstName , lastName ,avatar, agree} = req.body
  try {
    const user = new User({email, password ,avatar, firstName, lastName , agree})
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


router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});




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


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));



cloudinary.config({
  cloud_name: "dno5yxgti",
  api_key: "777595589566972",
  api_secret: "GuVeqR7wVAh0Gp8pmqGx8FngT7g",
  secure: true
});

router.post('/upload', async (req, res) => {
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    
      const fileStr = req.body.data;
      const uploadResponse = await cloudinary.uploader.upload(fileStr,options);
      console.log(uploadResponse);
      res.json({ msg: 'yaya' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ err: 'Something went wrong' });
  }
});









module.exports = router