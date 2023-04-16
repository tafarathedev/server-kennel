const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth.js');
const User = require('../models/UserModel.js');
const { sendWelcomeEmail } = require('../email/account.js');
const app = express()
//create user account
router.post("/register", async(req,res)=>{
    const { email , password , firstName ,avatar, lastName, agree} = req.body
  try {
    const user = new User({email, password ,avatar, firstName, lastName , agree})
    const token = await user.setAuthToken()
     
    sendWelcomeEmail(user.email)
     await user.save()
    res.status(200)
    .send({
      success:true,
      user,
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
      message:e.message,
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





/* router.post('/upload',auth, async (req, res) => {
  // allow overwriting the asset with new versions
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  })
  try {
       // Get the user ID from the authenticated user object
       const id = req.user._id;
       // Update the user's avatar field with the new URL
       const user = await User.findOne(id)
       user.avatar = req.body.avatar
       await user.save()
      
      
      res.status(200).send(user.avatar)
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ err: 'Something went wrong' });
  }
});
 */

//imag eupload route 
 router.patch('/upload/avatar', auth, async (req, res) => {
  // allow overwriting the asset with new versions
  const updates = Object.keys(req.body)
  const allowUpdates = ['avatar']
  const IsValidOperation = updates.every((update) => allowUpdates.includes(update))


  if (!IsValidOperation) return res.send({ error: 'invalid updates ' })
  try {
    const user = await User.findByIdAndUpdate(req.user._id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

    // Set headers to allow CORS
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })

    res.status(200).send(user.avatar)

  } catch (err) {
    console.error(err.message);
    // res.status(500).json({ err: 'Something went wrong' });
  }
});
 
router.delete('/delete/avatar', auth, async(req, res) => {
  try {
      const user = await User.findOne({ _id: req.user._id })
      user.avatar = "https://i0.wp.com/vssmn.org/wp-content/uploads/2018/12/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png?fit=860%2C681&ssl=1"
      await user.save()


      res.status(200).send(user)
  } catch (e) {
      res.status(400).send(e)
  }
})

//image viewing route
router.get('/user/:id/avatar', async(req, res) => {
  try {
      const user = await User.findById(req.params.id)
      if (!user || !user.avatar) {
          throw new Error()
      }
      res.set('Content-Type', 'image/jpg')
      res.send(user.avatar)
  } catch (e) {
      res.status(400).send(e)
  }

})





module.exports = router