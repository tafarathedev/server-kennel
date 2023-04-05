const express = require('express');
const router = express.Router();
const User = require('../../models/UserModel')

router.get('/', async (req, res) => {
    const users = await User.find({})
  
    res.render('index', {users})
  });

  module.exports = router;
